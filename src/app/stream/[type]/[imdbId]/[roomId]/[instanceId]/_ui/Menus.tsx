import type { ComponentType, ReactElement } from "react";

import {
  Menu,
  Tooltip,
  useVideoQualityOptions,
  useAudioOptions,
  useCaptionOptions,
  type MenuPlacement,
  type TooltipPlacement,
} from "@vidstack/react";
import {
  PiArrowLeftBold,
  PiArrowRightBold,
  PiCheckFatFill,
  PiClosedCaptioningFill,
  PiGearFill,
  PiSpeakerNoneFill,
} from "react-icons/pi";

import { buttonClass, tooltipClass } from "./Buttons";
import { IconType } from "react-icons/lib";

export interface SettingsProps {
  placement: MenuPlacement;
  tooltipPlacement: TooltipPlacement;
}

export const menuClass =
  "animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 flex h-[var(--menu-height)] max-h-[400px] min-w-[260px] flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-blackA10 p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] data-[resizing]:overflow-hidden";

export const submenuClass =
  "hidden w-full flex-col items-start justify-center outline-none data-[keyboard]:mt-[3px] data-[open]:inline-block";

export function Settings({ placement, tooltipPlacement }: SettingsProps) {
  return (
    <Menu.Root className="parent">
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Menu.Button className={buttonClass}>
            <PiGearFill size={26} className="text-solid-primary-2" />
          </Menu.Button>
        </Tooltip.Trigger>
        <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
          Settings
        </Tooltip.Content>
      </Tooltip.Root>
      <Menu.Content className={menuClass} placement={placement}>
        <CaptionSubmenu />
        <AudioSubmenu />
        <QualitySubmenu />
      </Menu.Content>
    </Menu.Root>
  );
}

function CaptionSubmenu() {
  const options = useCaptionOptions(),
    hint = options.selectedTrack?.label ?? "Off";

  console.log(options);

  return (
    <Menu.Root>
      <SubmenuButton
        label="Captions"
        hint={hint}
        disabled={options.disabled}
        icon={<PiClosedCaptioningFill size={25} />}
      />
      <Menu.Content className={submenuClass}>
        <Menu.RadioGroup
          className="flex w-full flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }, i) => (
            <Radio value={String(i)} onSelect={select} key={String(i)}>
              {label}
            </Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

function AudioSubmenu() {
  const options = useAudioOptions(),
    hint = options.selectedTrack?.label ?? "Off";
  return (
    <Menu.Root>
      <SubmenuButton
        label="Audios"
        hint={hint}
        disabled={options.disabled}
        icon={<PiSpeakerNoneFill size={25} />}
      />
      <Menu.Content className={submenuClass}>
        <Menu.RadioGroup
          className="flex w-full flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Radio value={value} onSelect={select} key={value}>
              {label}
            </Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

function QualitySubmenu() {
  const options = useVideoQualityOptions();

  return (
    <Menu.Root>
      <SubmenuButton
        label="Qualities"
        hint={""}
        disabled={options.disabled}
        icon={<PiSpeakerNoneFill size={25} />}
      />
      <Menu.Content className={submenuClass}>
        <Menu.RadioGroup
          className="flex w-full flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Radio value={value} onSelect={select} key={value}>
              {label}
            </Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

function Radio({ children, ...props }: Menu.RadioProps) {
  return (
    <Menu.Radio
      className="ring-media-focus data-[hocus]:bg-white/10 group relative flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none data-[focus]:ring-[3px]"
      {...props}
    >
      {/* <PiClosedCaptioningFill size={25} /> */}
      <PiCheckFatFill size={14} className="hidden group-data-[checked]:block" />

      <span className="ml-2">{children}</span>
    </Menu.Radio>
  );
}

export interface SubmenuButtonProps {
  label: string;
  hint: string;
  disabled?: boolean;
  icon: ReactElement;
}

function SubmenuButton({ label, hint, icon, disabled }: SubmenuButtonProps) {
  return (
    <Menu.Button
      className="ring-media-focus parent bg-black/60 data-[hocus]:bg-white/10 left-0 z-10 flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none ring-inset aria-disabled:hidden data-[open]:sticky data-[open]:-top-2.5 data-[focus]:ring-[3px]"
      disabled={disabled}
    >
      <PiArrowLeftBold className="parent-data-[open]:block -ml-0.5 mr-1.5 hidden h-[18px] w-[18px]" />

      {icon}
      <span className="parent-data-[open]:ml-0 ml-1.5">{label}</span>
      <span className="text-white/50 ml-auto text-sm">{hint}</span>
      <PiArrowRightBold className="parent-data-[open]:hidden text-white/50 ml-0.5 h-[18px] w-[18px] text-sm" />
    </Menu.Button>
  );
}
