"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/app/_components/ui/accordion";
import { Checkbox } from "~/app/_components/ui/checkbox";
import { IconText } from "~/app/_components/ui/IconComponents";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/app/_components/ui/tooltip";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { type api as apiServer } from "~/trpc/server";

type DomainsStatus = {
  error: boolean;
  domain: string;
  message: string;
}[];

type Srcs = NonNullable<
  Awaited<ReturnType<typeof apiServer.user.getAllSrcByDomain>>
>["sourcesGroupedByDomain"][number];

function Sources() {
  const { data } = api.user.getAllSrcByDomain.useQuery();
  const [domainsStatus, setDomainsStatus] = useState([] as DomainsStatus);
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
      {data?.sourcesGroupedByDomain?.map((srcs, i) => {
        return (
          <div key={i}>
            {Object.keys(srcs).map((domain) => {
              return (
                <Accordion key={domain} type="multiple" className="w-full">
                  <AccordionItem value={domain} className="w-full">
                    <Trigger
                      domainsStatus={domainsStatus}
                      srcs={srcs}
                      domain={domain}
                    />
                    <Content domain={domain} srcs={srcs} />
                  </AccordionItem>
                </Accordion>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function Trigger({
  domainsStatus,
  srcs,
  domain,
}: {
  domainsStatus: DomainsStatus;
  srcs: Srcs;
  domain: string;
}) {
  const [check, onCheckedChange] = useState(false);
  return (
    <div className="flex w-full items-center gap-2">
      <Checkbox
        checked={check}
        onCheckedChange={(prv) => onCheckedChange(Boolean(prv))}
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

function Content({ srcs, domain }: { srcs: Srcs; domain: string }) {
  return (
    <AccordionContent className="space-y-1">
      {srcs?.[domain]?.srcs.map((src) => {
        return (
          <div key={src.url} className="ml-4 flex items-center gap-2">
            <Checkbox />
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
