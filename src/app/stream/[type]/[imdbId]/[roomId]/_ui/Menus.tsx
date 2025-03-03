import type { ReactElement } from "react";

import {
  Captions,
  Menu,
  useMediaStore,
  usePlaybackRateOptions,
  type MenuPlacement,
  type TooltipPlacement,
} from "@vidstack/react";
import { PiGearFill } from "react-icons/pi";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  OdometerIcon,
  RadioButtonIcon,
  RadioButtonSelectedIcon,
} from "@vidstack/react/icons";
import { useRoomData } from "~/app/_hooks/useRoomData";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";

export interface SettingsProps {
  placement: MenuPlacement;
  tooltipPlacement: TooltipPlacement;
}

export const menuClass =
  "animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 flex h-[var(--menu-height)] max-h-[400px] min-w-[260px] flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-blackA10 p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] data-[resizing]:overflow-hidden";

// Re-use styles across other submenus.
const submenuClassName =
    "hidden w-full flex-col items-start justify-center outline-none data-[keyboard]:mt-[3px] data-[open]:inline-block",
  radioClassName =
    "ring-sky-400 group relative flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none data-[hocus]:bg-white/10 data-[focus]:ring-[3px]",
  radioIconClassName = "h-4 w-4 text-white group-data-[checked]:hidden",
  radioSelectedIconClassName =
    "text-indigo-400 hidden h-4 w-4 group-data-[checked]:block";

export function Settings({ placement, tooltipPlacement }: SettingsProps) {
  return (
    <Menu.Root>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Menu.Button
              className="text-solid-primary-2 group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4"
              aria-label="Settings"
            >
              <PiGearFill
                size={25}
                className="transform transition-transform duration-200 ease-out group-data-[open]:rotate-90"
              />
            </Menu.Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={30}>Settings</TooltipContent>
          <Menu.Items
            className="flex h-[var(--menu-height)] max-h-[400px] min-w-[260px] flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-black/95 p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] animate-out fade-out slide-out-to-bottom-2 data-[resizing]:overflow-hidden data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4"
            placement="top"
            offset={0}
          >
            {/* Menu Items + Submenus */}
            <SpeedSubmenu />
          </Menu.Items>
        </Tooltip>
      </TooltipProvider>
    </Menu.Root>
  );
}

function SpeedSubmenu() {
  const { roomData } = useRoomData();
  const { playbackRate } = useMediaStore();
  const options = usePlaybackRateOptions(),
    hint = options.selectedValue === "1" ? "Normal" : playbackRate + "x";
  return (
    <Menu.Root>
      <SubmenuButton
        label="Speed"
        hint={hint}
        disabled={options.disabled}
        icon={OdometerIcon}
      />
      {!roomData.online && (
        <Menu.Content className={submenuClassName}>
          <Menu.RadioGroup
            className="flex w-full flex-col"
            value={options.selectedValue}
          >
            {options.map(({ label, value, select }) => (
              <Menu.Radio
                className={radioClassName}
                value={value}
                onSelect={select}
                key={value}
              >
                <RadioButtonIcon className={radioIconClassName} />
                <RadioButtonSelectedIcon
                  className={radioSelectedIconClassName}
                />
                {label}
              </Menu.Radio>
            ))}
          </Menu.RadioGroup>
        </Menu.Content>
      )}
    </Menu.Root>
  );
}

interface SubmenuButtonProps {
  label: string;
  hint: string;
  disabled?: boolean;
  icon: ReactElement<any>;
}

function SubmenuButton({
  label,
  hint,
  icon: Icon,
  disabled,
}: SubmenuButtonProps) {
  return (
    <Menu.Button
      className="parent left-0 z-10 flex w-full cursor-pointer select-none items-center justify-start rounded-sm bg-black/60 p-2.5 outline-none ring-inset ring-sky-400 aria-disabled:hidden data-[open]:sticky data-[open]:-top-2.5 data-[hocus]:bg-white/10 data-[focus]:ring-[3px]"
      disabled={disabled}
    >
      <ChevronLeftIcon className="parent-data-[open]:block -ml-0.5 mr-1.5 hidden h-[18px] w-[18px]" />
      <Icon className="parent-data-[open]:hidden h-5 w-5" />
      <span className="parent-data-[open]:ml-0 ml-1.5">{label}</span>
      <span className="ml-auto text-sm text-white/50">{hint}</span>
      <ChevronRightIcon className="parent-data-[open]:hidden ml-0.5 h-[18px] w-[18px] text-sm text-white/50" />
    </Menu.Button>
  );
}
