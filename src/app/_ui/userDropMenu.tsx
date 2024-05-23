"use client";
import React, { useEffect, useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import * as Popover from "@radix-ui/react-popover";
import ButtonFullscreen from "./ButtonFullscreen";

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
          className="inline-flex h-[35px] w-[35px] cursor-default items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
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
                className="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
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
          className="mr-3 w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          sideOffset={20}
        >
          <div>
            <div className="flex gap-2">
              <Avatar.Root className="inline-flex h-[35px] w-[35px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] object-cover"
                  src={user.image ?? ""}
                  alt={user.name ?? "No Name"}
                />
                <Avatar.Fallback
                  className="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
                  delayMs={600}
                >
                  JD
                </Avatar.Fallback>
              </Avatar.Root>

              <div className="flex flex-col">
                <p className="text-sm">{user.name}</p>
                <p className="text-xs">Guest</p>
              </div>
            </div>
            <ButtonFullscreen />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default UserDropMenu;
