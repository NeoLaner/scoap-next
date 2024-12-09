"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { languages } from "~/lib/languages";

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "in progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

export function LanguagePopover({
  selectedLanguage,
  setSelectedLanguage,
}: {
  selectedLanguage: (typeof languages)[number] | null;
  setSelectedLanguage: Dispatch<
    SetStateAction<(typeof languages)[number] | null>
  >;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Language</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedLanguage ? <>{selectedLanguage}</> : <>+ Set language</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-[99999999999] p-0"
          side="right"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Change language..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {languages.map((language) => (
                  <CommandItem
                    key={language}
                    value={language}
                    onSelect={(value) => {
                      setSelectedLanguage(
                        languages.find((priority) => priority === value) ??
                          null,
                      );
                      setOpen(false);
                    }}
                  >
                    {language}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
