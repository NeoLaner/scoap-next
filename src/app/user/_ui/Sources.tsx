"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/app/_components/ui/accordion";
import { api } from "~/trpc/react";

function Sources() {
  const { data } = api.user.getAllSrcByDomain.useQuery();

  return (
    <div>
      {data?.domains?.map((domain) => {
        const curDomainSrcs = data.sourcesGroupedByDomain.map(
          (srcs) => srcs[domain],
        );

        return (
          <Accordion key={domain} type="multiple">
            <AccordionItem value={domain}>
              <AccordionTrigger>
                <div>{domain}</div>
                <div>{curDomainSrcs.length}</div>
              </AccordionTrigger>
              <AccordionContent>
                {curDomainSrcs.map((srcsData) => {
                  return (
                    <>
                      {srcsData?.srcs.map((src) => (
                        <div key={src.url}>{src.url} </div>
                      ))}
                    </>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
}

export default Sources;
