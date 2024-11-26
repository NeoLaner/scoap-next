"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type CheckedState } from "@radix-ui/react-checkbox";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { IconText } from "~/components/ui/icon-components";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { z } from "zod";
import {
  checkIsDynamic,
  createUrlFromPrats,
  makeRawSource,
} from "~/lib/source";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { type api as apiServer } from "~/trpc/server";
import { updateSourcesDomain } from "~/app/_actions/updateSourcesDomain";
import { useQuery } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

type DomainsStatus = {
  error: boolean;
  url: string;
  message: string;
}[];

type Srcs = NonNullable<
  Awaited<ReturnType<typeof apiServer.user.getAllSrcByDomain>>
>["sourcesGroupedByDomain"][number];

type Src = Srcs[string]["srcs"][number];

const formSchema = z.object({
  domain: z.string().min(3).max(50),
});

function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
}

async function checkUrlStatus(url: string) {
  try {
    await fetch(url);
    return {
      error: false,
      url,
      message: "",
    };
  } catch (err) {
    // If fetch fails, log the error message
    let errorMessage = "An unknown error occurred";
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return {
      url,
      error: true,
      message: errorMessage,
    };
  }
}

function Sources() {
  const { data } = api.user.getAllSrcByDomain.useQuery();
  const { user } = api.useUtils();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [domainsStatus, setDomainsStatus] = useState([] as DomainsStatus);
  const [selectedUrls, setSelectedUrls] = useState([] as Src[]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.

    // ✅ This will be type-safe and validated.
    await updateSourcesDomain(
      selectedUrls.map((src) => src.id),
      isValidUrl(values.domain)
        ? new URL(values.domain).hostname
        : values.domain,
    );
    await user.invalidate();
    setSelectedUrls([]);
    closeBtnRef.current?.click();
  }

  const domains = data?.domains;

  useEffect(
    function () {
      async function promise() {
        if (!domains) return;
        await Promise.all(
          domains.map(async (domain) => {
            const domainStatus = await checkUrlStatus(`https://${domain}`);
            setDomainsStatus((prv) => {
              return [...prv, domainStatus];
            });
          }),
        );
      }

      //eslint-disable-next-line
      promise();
    },
    [domains],
  );

  return (
    <div>
      <Dialog>
        {selectedUrls.length > 0 && (
          <div className="flex w-full justify-between">
            <div>
              <div>{selectedUrls.length} Selected</div>
            </div>
            <DialogTrigger asChild>
              <div>
                <Button>Edit</Button>
              </div>
            </DialogTrigger>
          </div>
        )}
        {data?.sourcesGroupedByDomain?.map((srcs, i) => {
          return (
            <div key={i}>
              {Object.keys(srcs).map((domain) => {
                return (
                  <Accordion key={domain} type="multiple" className="w-full">
                    <AccordionItem value={domain} className="w-full">
                      <Trigger
                        selectedUrls={selectedUrls}
                        domainsStatus={domainsStatus}
                        srcs={srcs}
                        domain={domain}
                        setSelectedUrls={setSelectedUrls}
                      />
                      <Content
                        selectedUrls={selectedUrls}
                        setSelectedUrls={setSelectedUrls}
                        domain={domain}
                        srcs={srcs}
                      />
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </div>
          );
        })}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update sources domain</DialogTitle>
            <DialogDescription>
              Update selected sources domain by specify new domain.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New domain</FormLabel>
                    <FormControl>
                      <Input placeholder="dl.movies.com" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <DialogClose asChild>
            <Button ref={closeBtnRef} className="hidden">
              close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Trigger({
  domainsStatus,
  srcs,
  domain,
  selectedUrls,
  setSelectedUrls,
}: {
  domainsStatus: DomainsStatus;
  srcs: Srcs;
  domain: string;
  selectedUrls: Src[];
  setSelectedUrls: Dispatch<SetStateAction<Src[]>>;
}) {
  const curDomainSrcs = srcs[domain]?.srcs;
  const curSelectedSrcs = selectedUrls.filter((src) => src.domain === domain);
  if (!curDomainSrcs) return;
  const isChecked = curDomainSrcs?.length === curSelectedSrcs.length;
  const isIndeterminate =
    !isChecked &&
    curSelectedSrcs.length !== 0 &&
    curDomainSrcs?.length > curSelectedSrcs.length;
  const isUnchecked =
    !isChecked && curDomainSrcs?.length > curSelectedSrcs.length;
  const checked = (function (): CheckedState | undefined {
    if (isChecked) return true;
    if (isIndeterminate) return "indeterminate" as const;
    if (isUnchecked) return false;
  })();

  return (
    <div className="flex w-full items-center gap-2">
      <Checkbox
        checked={checked}
        onClick={() => {
          if (checked)
            setSelectedUrls((prv) => {
              return prv.filter((src) => src.domain !== domain);
            });
          else
            setSelectedUrls((prv) => {
              const removeAllSelected = prv.filter(
                (src) => src.domain !== domain,
              );
              const selectedSrcs = srcs[domain];
              if (selectedSrcs)
                return [...removeAllSelected, ...selectedSrcs.srcs];
              else return [...prv];
            });
        }}
        // onCheckedChange={(prv) => onCheckedChange(Boolean(prv))}
      />
      <AccordionTrigger className="w-full justify-normal gap-4 text-muted-foreground">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  domainsStatus.filter(
                    (domainStatus) => domainStatus.url === `https://${domain}`,
                  )[0]?.error
                    ? "text-danger-foreground"
                    : "text-success-foreground",
                )}
              >
                {domain}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div>
                {
                  domainsStatus.filter(
                    (domainStatus) =>
                      domainStatus.url === domain && domainStatus.error,
                  )[0]?.message
                }
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div>{srcs?.[domain]?.srcs.length} total</div>
        <div>
          {srcs?.[domain]?.srcs.filter((src) => src.type === "media").length}{" "}
          videos
        </div>
        <div>
          {srcs?.[domain]?.srcs.filter((src) => src.type === "subtitle").length}{" "}
          subs
        </div>
      </AccordionTrigger>
    </div>
  );
}

function Content({
  srcs,
  domain,
  selectedUrls,
  setSelectedUrls,
}: {
  srcs: Srcs;
  domain: string;
  selectedUrls: Src[];
  setSelectedUrls: Dispatch<SetStateAction<Src[]>>;
}) {
  return (
    <AccordionContent className="space-y-1">
      {srcs?.[domain]?.srcs.map((src) => {
        return (
          <Url
            key={src.id}
            src={src}
            selectedUrls={selectedUrls}
            setSelectedUrls={setSelectedUrls}
          />
        );
      })}
    </AccordionContent>
  );
}

function Url({
  src,
  selectedUrls,
  setSelectedUrls,
}: {
  src: Src;
  selectedUrls: Src[];
  setSelectedUrls: Dispatch<SetStateAction<Src[]>>;
}) {
  const url = createUrlFromPrats({
    protocol: src.protocol,
    domain: src.domain,
    pathname: src.pathname,
  });
  const { error, status } = useQuery({
    queryFn: () => {
      let source = url;
      if (checkIsDynamic(url))
        source = makeRawSource({
          source: url,
          season: src.seasonBoundary[0],
          episode: 1,
        });
      return fetch(source, { method: "HEAD" });
    },
    queryKey: [url],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retryOnMount: false,
  });

  return (
    <div className="flex items-center gap-2">
      {status === "pending" && <div className="loader-spinner mr-1 !w-1" />}
      {status === "error" && (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <TriangleAlert className="w-5 text-danger-foreground" />
            </TooltipTrigger>
            <TooltipContent>{error.message}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {status === "success" && <div className="w-5" />}
      <Checkbox
        checked={
          selectedUrls.filter((selSrc) => selSrc.id === src.id).length > 0
        }
        onCheckedChange={(checked) => {
          if (checked === true) setSelectedUrls((prv) => [...prv, src]);
          if (checked === false)
            setSelectedUrls((prv) => {
              return prv.filter((source) => source.id !== src.id);
            });
        }}
      />
      <div
        className={cn(
          "flex items-center gap-4",
          status === "error" && "text-danger-foreground",
          status === "pending" && "text-muted-foreground",
          status === "success" && "text-success-foreground",
        )}
      >
        <div>
          <IconText>{src.type === "media" ? "med" : "sub"}</IconText>{" "}
        </div>
        <div>{src.name}</div>

        <div>
          <Link href={`/stream/${src.mediaType}/${src.imdbId}`} target="_blank">
            {src.imdbId}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sources;
