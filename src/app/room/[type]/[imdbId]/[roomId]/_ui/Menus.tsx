"use client";
// @ts-nocheck
import React, { useEffect, useState, type ReactElement } from "react";
import ReactDOM from "react-dom";
import {
  Menu,
  Tooltip,
  useCaptionOptions,
  type MenuPlacement,
  type TooltipPlacement,
} from "@vidstack/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClosedCaptionsIcon,
  RadioButtonIcon,
  RadioButtonSelectedIcon,
  SettingsIcon,
} from "@vidstack/react/icons";

import { buttonClass, tooltipClass } from "./Buttons";
import { useGetStreams } from "../features/videoplayer/filePlayer/useGetStreams";
import { useSourceContext } from "../features/videoplayer/filePlayer/useSourceContext";
import { useGetInstance } from "../features/instance/useGetInstance";
import { Box, Heading, Separator, Text } from "@radix-ui/themes";
import Spinner from "./Spinner";

export interface SettingsProps {
  placement: MenuPlacement;
  tooltipPlacement: TooltipPlacement;
}

export const menuClass =
  "!overflow-hidden bg-white text-black opacity-90 animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 flex h-[var(--menu-height)] max-h-[300px] min-w-[230px] flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-black/95 p-2.5 text-[14px] outline-none backdrop-blur-sm transition-[height] duration-150 will-change-[height] data-[resizing]:overflow-hidden";

export const submenuClass =
  "hidden w-full flex-col items-start justify-center outline-none data-[keyboard]:mt-[3px] ";

export function Settings({ placement, tooltipPlacement }: SettingsProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openMenuId, setOpenMenuId] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Menu.Root className="parent">
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Menu.Button className={buttonClass}>
            <SettingsIcon className="h-6 w-6 transform transition-transform duration-200 ease-out group-data-[open]:rotate-90" />
          </Menu.Button>
        </Tooltip.Trigger>
        <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
          Settings
        </Tooltip.Content>
      </Tooltip.Root>
      {/* FOR LOWER THAN 768px DEVICES */}
      {windowWidth < 768 &&
        ReactDOM.createPortal(
          <Menu.Content
            className={`${menuClass} fixed bottom-0 left-20 right-20  sm:hidden`}
          >
            <CaptionSubmenu
              openMediaId={openMenuId}
              setOpenMediaId={setOpenMenuId}
            />
            <SourcesSubmenu
              openMediaId={openMenuId}
              setOpenMediaId={setOpenMenuId}
            />
          </Menu.Content>,
          document.body,
        )}
      {/* FOR BIGGER THAN 768px DEVICES */}
      {windowWidth >= 768 && (
        <Menu.Content
          className={`${menuClass} hidden sm:block`}
          placement={"top end"}
        >
          <CaptionSubmenu
            openMediaId={openMenuId}
            setOpenMediaId={setOpenMenuId}
          />
          <SourcesSubmenu
            openMediaId={openMenuId}
            setOpenMediaId={setOpenMenuId}
          />
        </Menu.Content>
      )}
    </Menu.Root>
  );
}

function CaptionSubmenu({
  openMediaId,
  setOpenMediaId,
}: {
  openMediaId: string;
  setOpenMediaId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const options = useCaptionOptions(),
    hint = options.selectedTrack?.label ?? "Off";
  const isOpen = openMediaId === "captions";
  const allIsClosed = openMediaId === "";
  return (
    //@ts-ignore
    <Menu.Root label="Captions">
      {(allIsClosed || isOpen) && (
        <SubmenuButton
          label="Captions"
          hint={hint}
          disabled={options.disabled}
          // @ts-ignore
          icon={ClosedCaptionsIcon}
          onClick={() =>
            openMediaId === "captions"
              ? setOpenMediaId("")
              : setOpenMediaId("captions")
          }
          isOpen={isOpen}
        />
      )}
      <Menu.Content
        className={`${submenuClass} ${
          openMediaId === "captions" ? "!inline-block" : ""
        }`}
      >
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

function SourcesSubmenu({
  openMediaId,
  setOpenMediaId,
}: {
  openMediaId: string;
  setOpenMediaId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { status, streamsData } = useGetStreams();
  const { state, dispatch } = useSourceContext();
  const { instance } = useGetInstance();
  const mainSourceLength = instance?.rootRoom.videoLinks
    ? instance.rootRoom.videoLinks.length
    : 0;
  const isOpen = openMediaId === "sources";
  const allIsClosed = openMediaId === "";

  return (
    //@ts-ignore
    <Menu.Root label="Sources">
      {(allIsClosed || isOpen) && (
        <SubmenuButton
          label="Sources"
          hint={
            state.curSourceIndex >= mainSourceLength
              ? `${
                  streamsData?.[state.curSourceIndex - mainSourceLength]
                    ?.embedName
                }`
              : `${instance?.rootRoom.videoLinks[state.curSourceIndex].name}`
          }
          // disabled={options.disabled}
          // @ts-ignore
          icon={ClosedCaptionsIcon}
          onClick={() =>
            isOpen ? setOpenMediaId("") : setOpenMediaId("sources")
          }
          isOpen={isOpen}
        />
      )}
      <Menu.Content
        className={`${submenuClass} ${
          openMediaId === "sources" ? "!inline-block" : ""
        }`}
      >
        <Menu.RadioGroup
          className="flex w-full flex-col"
          value={
            state.curSourceIndex >= mainSourceLength
              ? `${
                  streamsData?.[state.curSourceIndex - mainSourceLength]
                    ?.embedName
                }${state.curSourceIndex}`
              : `${instance?.rootRoom.videoLinks[state.curSourceIndex].name}${
                  state.curSourceIndex
                }`
          }
        >
          <Heading size="1" mt="2" mx="2">
            MAIN LINKS:
          </Heading>
          {instance?.rootRoom.videoLinks &&
          instance?.rootRoom.videoLinks.length > 0 ? (
            instance?.rootRoom.videoLinks.map((src, i) => (
              <Radio
                value={`${src.name}${i}`}
                key={`${src.name}${i}`}
                onClick={() =>
                  dispatch({ type: "SELECT", payload: { index: i } })
                }
              >
                {src.name}
              </Radio>
            ))
          ) : (
            <Box ml="2" mt="1" className="bg-accent-12 p-2 text-sm">
              No source provided.
            </Box>
          )}

          <Separator size={"4"} />
          <Heading size="1" mt="2" mx="2">
            GENERATED LINKS:
          </Heading>
          {(streamsData?.length === 0 || status === "error") && (
            <Box ml="2" mt="1" className="bg-accent-12 p-2 text-sm">
              No source can be found.
            </Box>
          )}
          {status === "pending" && (
            <Box className="mt-4 flex items-center justify-center">
              <Spinner size="small" />
            </Box>
          )}
          {streamsData?.map((streamSrc, i) => (
            <Radio
              value={`${streamSrc?.embedName}${i + mainSourceLength}`}
              key={`${streamSrc?.embedName}${i + mainSourceLength}`}
              onClick={() =>
                dispatch({
                  type: "SELECT",
                  payload: { index: i + mainSourceLength },
                })
              }
            >
              {streamSrc?.embedName}
            </Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

export interface RadioProps extends Menu.RadioProps {}

function Radio({ children, ...props }: RadioProps) {
  return (
    <Menu.Radio
      className="ring-media-focus data-[hocus]:bg-accent-10 group relative m-1 flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-1.5 outline-none data-[focus]:ring-[3px]"
      {...props}
    >
      <RadioButtonIcon className="h-4 w-4  group-data-[checked]:hidden" />
      <RadioButtonSelectedIcon
        className="hidden h-4 w-4  group-data-[checked]:block"
        type="radio-button-selected"
      />
      <span className="ml-2">{children}</span>
    </Menu.Radio>
  );
}

export interface SubmenuButtonProps {
  label: string;
  hint: string;
  disabled?: boolean;
  icon: ReactElement;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}

function SubmenuButton({
  label,
  hint,
  icon: Icon,
  disabled,
  onClick,
  isOpen,
}: SubmenuButtonProps) {
  return (
    <Menu.Button
      className="ring-media-focus data-[hocus]:bg-accent-10 z-10 flex w-full cursor-pointer select-none items-center  justify-start rounded-sm p-1.5 outline-none ring-inset transition-all data-[open]:sticky data-[open]:-top-2.5 data-[focus]:ring-[3px]"
      disabled={disabled}
      onClick={onClick}
      //@ts-ignore
      onKeyDownCapture={onClick}
    >
      <ChevronLeftIcon
        className={`-ml-0.5 mr-1.5  h-[18px] w-[18px]  ${
          isOpen ? "" : "hidden"
        }`}
      />
      <div className="parent-data-[open]:hidden contents">
        {/* <Icon className="w-5 h-5" /> */}
      </div>
      <span className="parent-data-[open]:ml-0 ml-1.5">{label}</span>
      <span className="ml-auto text-sm ">{hint}</span>
      <ChevronRightIcon
        className={`ml-0.5 h-[18px] w-[18px] text-sm  ${
          isOpen ? "hidden" : ""
        }`}
      />
    </Menu.Button>
  );
}
