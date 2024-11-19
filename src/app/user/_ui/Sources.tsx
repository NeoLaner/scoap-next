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
} from "~/app/_components/ui/accordion";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { Input } from "~/app/_components/ui/input";

import { Button } from "~/app/_components/ui/Button";
import { Checkbox } from "~/app/_components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/_components/ui/dialog";
import { IconText } from "~/app/_components/ui/IconComponents";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/app/_components/ui/tooltip";
import { z } from "zod";
import { createUrlFromPrats } from "~/lib/source";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { type api as apiServer } from "~/trpc/server";
import { updateSourcesDomain } from "~/app/_actions/updateSourcesDomain";

type DomainsStatus = {
  error: boolean;
  domain: string;
  message: string;
}[];

type Srcs = NonNullable<
  Awaited<ReturnType<typeof apiServer.user.getAllSrcByDomain>>
>["sourcesGroupedByDomain"][number];

type Src = Srcs[string]["srcs"][number];

const formSchema = z.object({
  domain: z.string().min(3).max(50),
});

function Sources() {
  const { data } = api.user.getAllSrcByDomain.useQuery();
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
      values.domain,
    );
    closeBtnRef.current?.click();
    await api.useUtils().user.getAllSrcByDomain.invalidate();
  }

  const domains = data?.domains;

  useEffect(
    function () {
      async function promise() {
        if (!domains) return;
        const responds = await Promise.all(
          domains.map(async (domain) => {
            try {
              const res = await fetch(`https://${domain}`);
              setDomainsStatus((prv) => {
                return [
                  ...prv,
                  {
                    error: false,
                    domain,
                    message: "",
                  },
                ];
              });
            } catch (err) {
              // If fetch fails, log the error message
              let errorMessage = "An unknown error occurred";
              if (err instanceof Error) {
                errorMessage = err.message;
              }
              setDomainsStatus((prv) => {
                return [
                  ...prv,
                  {
                    domain,
                    error: true,
                    message: errorMessage,
                  },
                ];
              });
            }
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
        <div className="flex w-full justify-between">
          <div>
            <div>{selectedUrls.length} Selected</div>
          </div>
          <DialogTrigger asChild>
            <div>
              <Button>Edit</Button>
              <DialogClose ref={closeBtnRef} className="hidden" />
            </div>
          </DialogTrigger>
        </div>
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
                    <FormLabel>Username</FormLabel>
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
                    (domainStatus) => domainStatus.domain === domain,
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
                      domainStatus.domain === domain && domainStatus.error,
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
          <div
            key={createUrlFromPrats({
              pathname: src.pathname,
              domain: src.domain,
              protocol: src.protocol,
            })}
            className="ml-4 flex items-center gap-2"
          >
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
            <div className="flex items-center gap-4 text-muted-foreground">
              <div>
                <IconText>{src.type === "media" ? "med" : "sub"}</IconText>{" "}
              </div>
              <div>{src.name}</div>
              <div>{src.imdbId}</div>
            </div>
          </div>
        );
      })}
    </AccordionContent>
  );
}

export default Sources;
