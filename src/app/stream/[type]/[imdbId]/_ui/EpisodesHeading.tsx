import * as Select from "@radix-ui/react-select";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { type ReactNode, useCallback, type LegacyRef } from "react";
import { type Video } from "~/app/_services/stremIo/types";
import classnames from "classnames";

const extractUniqueSeasons = (videos: Video[]) => {
  const seasons = new Set(videos.map((video) => video.season));
  return Array.from(seasons);
};

function EpisodesHeading({ videos }: { videos: Video[] }) {
  const searchParams = useSearchParams();
  const season = searchParams.get("season");
  const router = useRouter();
  const pathname = usePathname();
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const uniqueSeasons = extractUniqueSeasons(videos);
  if (!season) return null;

  return (
    <div className="flex items-center justify-center py-5">
      <Select.Root
        value={season}
        onValueChange={(value) =>
          router.push(pathname + "?" + createQueryString("season", value))
        }
      >
        <Select.Trigger
          className="bg-white text-violet11 shadow-black/10 hover:bg-mauve3 focus:shadow-black data-[placeholder]:text-violet9 inline-flex h-[35px] items-center justify-center gap-[5px] rounded px-[15px] text-[13px] leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px]"
          aria-label="Food"
        >
          <Select.Value placeholder="Select a fruit…" />
          <Select.Icon className="text-violet11">
            {/* <ChevronDownIcon /> */}
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden rounded-md bg-gray-12 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
            <Select.ScrollUpButton className="bg-white text-violet11 flex h-[25px] cursor-default items-center justify-center">
              {/* <ChevronUpIcon /> */}
            </Select.ScrollUpButton>
            <Select.Viewport className="p-[5px]">
              <Select.Group>
                {uniqueSeasons.map((season) => (
                  <SelectItem key={season} value={String(season)}>
                    season {season}
                  </SelectItem>
                ))}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className="bg-white text-violet11 flex h-[25px] cursor-default items-center justify-center">
              {/* <ChevronDownIcon /> */}
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

const SelectItem = React.forwardRef(
  (
    {
      children,
      className,
      value,
      ...props
    }: { children: ReactNode; className?: string; value: string },
    forwardedRef: LegacyRef<HTMLDivElement>,
  ) => {
    return (
      <Select.Item
        className={classnames(
          "text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none",
          className,
        )}
        {...props}
        value={value}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          {/* <CheckIcon /> */}
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);

SelectItem.displayName = "SelectItem";

export default EpisodesHeading;
