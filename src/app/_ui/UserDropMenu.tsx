"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/_components/ui/popover";
import ButtonFullscreen from "./ButtonFullscreen";
import * as Separator from "@radix-ui/react-separator";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar";
import { Button } from "../_components/ui/Button";

const UserDropMenu = ({
  user,
}: {
  user:
    | {
        name?: string | null;
        image?: string | null;
      }
    | undefined;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="rounded-full"
          aria-label="Update dimensions"
        >
          <Avatar className="bg-blackA1 inline-flex h-[35px] w-[35px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
            <AvatarImage
              className="h-full w-full rounded-[inherit] object-cover"
              src={user?.image ?? ""}
              alt={user?.name ?? "Anonymous"}
            />
            <AvatarFallback
              className="leading-1 text-primary-11 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
              delayMs={600}
            >
              JD
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>

      <PopoverContent sideOffset={8} className="mr-2">
        <div>
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage
                className=""
                src={user?.image ?? ""}
                alt={user?.name ?? "Anonymous Image"}
              />
              <AvatarFallback className="" delayMs={600}>
                JD
              </AvatarFallback>
            </Avatar>

            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col">
                <p className="text-sm">{user?.name ?? "Anonymous"}</p>
                <p className="text-xs">Guest</p>
              </div>

              {user ? (
                <div>
                  <Link href="/api/auth/signout">Logout</Link>
                </div>
              ) : (
                <div>
                  <Link href="/api/auth/signin">Login</Link>
                </div>
              )}
            </div>
          </div>
          <Separator.Root className="bg-primary-7 my-[15px] data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px" />
          <ButtonFullscreen className="" />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserDropMenu;
