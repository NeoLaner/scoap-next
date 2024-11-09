"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/app/_components/ui/accordion";
import { IconText } from "~/app/_components/ui/IconComponents";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/app/_components/ui/tooltip";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

function Sources() {
  const { data } = api.user.getAllSrcByDomain.useQuery();
  const [domainsStatus, setDomainsStatus] = useState(
    [] as {
      error: boolean;
      domain: string;
      message: string;
    }[],
  );
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

  console.log(domainsStatus);
  return (
    <div>
      {data?.sourcesGroupedByDomain?.map((srcs, i) => {
        return (
          <div key={i}>
            {Object.keys(srcs).map((domain) => {
              return (
                <Accordion key={domain} type="multiple">
                  <AccordionItem value={domain}>
                    <AccordionTrigger className="justify-normal gap-4">
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                domainsStatus.filter(
                                  (domainStatus) =>
                                    domainStatus.domain === domain,
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
                                    domainStatus.domain === domain &&
                                    domainStatus.error,
                                )[0]?.message
                              }
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div>{srcs?.[domain]?.srcs.length} total</div>
                      <div>
                        {
                          srcs?.[domain]?.srcs.filter(
                            (src) => src.type === "media",
                          ).length
                        }{" "}
                        videos
                      </div>
                      <div>
                        {
                          srcs?.[domain]?.srcs.filter(
                            (src) => src.type === "subtitle",
                          ).length
                        }{" "}
                        subs
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-1">
                      {srcs?.[domain]?.srcs.map((src) => {
                        return (
                          <div
                            key={src.url}
                            className="flex items-center gap-4"
                          >
                            <div>
                              <IconText>
                                {src.type === "media" ? "med" : "sub"}
                              </IconText>{" "}
                            </div>
                            <div>{src.name} </div>
                            <div>{src.imdbId} </div>
                            {/* <div key={src.url}>{src.name} </div> */}
                          </div>
                        );
                      })}
                    </AccordionContent>
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

export default Sources;
