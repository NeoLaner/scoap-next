"use client";
import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import * as Popover from "@radix-ui/react-popover";
import ButtonFullscreen from "./ButtonFullscreen";
import * as Separator from "@radix-ui/react-separator";

const UserDropMenu = ({
  user,
}: {
  user: {
    name?: string | null;
    image?: string | null;
  };
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="bg-white focus:shadow-black inline-flex h-[35px] w-[35px] cursor-default items-center justify-center rounded-full text-primary-10 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-primary-3 focus:shadow-[0_0_0_2px]"
          aria-label="Update dimensions"
        >
          <div className="flex gap-5">
            <Avatar.Root className="inline-flex h-[35px] w-[35px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
              <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src={user.image ?? ""}
                alt="Pedro Duarte"
              />
              <Avatar.Fallback
                className="leading-1 bg-white flex h-full w-full items-center justify-center text-[15px] font-medium text-primary-11"
                delayMs={600}
              >
                JD
              </Avatar.Fallback>
            </Avatar.Root>
          </div>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="bg-white z-20 mr-3 w-[260px] rounded bg-gray-2 p-5 text-gray-12 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] shadow-primary-3 will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.primary-7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          sideOffset={19}
        >
          <div>
            <div className="flex gap-2">
              <Avatar.Root className="inline-flex h-[35px] w-[40px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] object-cover"
                  src={user.image ?? ""}
                  alt={user.name ?? "No Name"}
                />
                <Avatar.Fallback
                  className="leading-1 bg-white flex h-full w-full items-center justify-center text-[15px] font-medium text-primary-11"
                  delayMs={600}
                >
                  JD
                </Avatar.Fallback>
              </Avatar.Root>

              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-sm">{user.name}</p>
                  <p className="text-xs">Guest</p>
                </div>

                <div>
                  <button>Logout</button>
                </div>
              </div>
            </div>
            <Separator.Root className="my-[15px] bg-primary-7 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px" />
            <ButtonFullscreen />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default UserDropMenu;
