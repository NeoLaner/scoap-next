import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/_components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/app/_components/ui/command";
import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import { Button } from "~/app/_components/ui/Button";
import flagEmojis from "~/lib/flags";
import { CheckIcon } from "lucide-react";
import { cn } from "~/lib/utils";

function Countries({
  setCountryEmoji,
}: {
  setCountryEmoji: Dispatch<SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const listRef = useRef<HTMLDivElement>(null);

  const handleInputChange = () => {
    // Scroll the list to the top whenever input changes
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
    // Handle other input change logic here if necessary
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full" asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between "
        >
          {value
            ? flagEmojis.find((emoji) => emoji.label === value)?.value +
              " " +
              flagEmojis.find((emoji) => emoji.label === value)?.label
            : "Select country... (optional)"}
          {/* <CaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-36 w-[200px] overflow-hidden p-0">
        <Command>
          <CommandInput
            placeholder="Search country..."
            className="h-9"
            onChangeCapture={handleInputChange}
          />
          <CommandList ref={listRef}>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {flagEmojis.map((emoji) => (
                <CommandItem
                  key={emoji.label}
                  value={emoji.label}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setCountryEmoji(emoji.value);
                  }}
                >
                  {emoji.value} {emoji.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === emoji.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Countries;
