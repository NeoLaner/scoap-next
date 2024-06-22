import type { ReactElement } from "react";

import {
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
import { useInstanceData } from "~/app/_hooks/useInstanceData";

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
      <Menu.Button
        className="hover:bg-white/20 group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-solid-primary-2 outline-none ring-inset data-[focus]:ring-4"
        aria-label="Settings"
      >
        <PiGearFill
          size={25}
          className="transform transition-transform duration-200 ease-out group-data-[open]:rotate-90"
        />
      </Menu.Button>
      <Menu.Items
        className="animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 border-white/10 bg-black/95 flex h-[var(--menu-height)] max-h-[400px] min-w-[260px] flex-col overflow-y-auto overscroll-y-contain rounded-md border p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] data-[resizing]:overflow-hidden"
        placement="top"
        offset={0}
      >
        {/* Menu Items + Submenus */}
        <SpeedSubmenu />
      </Menu.Items>
    </Menu.Root>
  );
}

function SpeedSubmenu() {
  const { instanceData } = useInstanceData();
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
      {!instanceData.online && (
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
  icon: ReactElement;
}

function SubmenuButton({
  label,
  hint,
  icon: Icon,
  disabled,
}: SubmenuButtonProps) {
  return (
    <Menu.Button
      className="ring-sky-400 parent bg-black/60 data-[hocus]:bg-white/10 left-0 z-10 flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none ring-inset aria-disabled:hidden data-[open]:sticky data-[open]:-top-2.5 data-[focus]:ring-[3px]"
      disabled={disabled}
    >
      <ChevronLeftIcon className="parent-data-[open]:block -ml-0.5 mr-1.5 hidden h-[18px] w-[18px]" />
      <Icon className="parent-data-[open]:hidden h-5 w-5" />
      <span className="parent-data-[open]:ml-0 ml-1.5">{label}</span>
      <span className="text-white/50 ml-auto text-sm">{hint}</span>
      <ChevronRightIcon className="parent-data-[open]:hidden text-white/50 ml-0.5 h-[18px] w-[18px] text-sm" />
    </Menu.Button>
  );
}
