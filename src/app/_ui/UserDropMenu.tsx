"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/_components/ui/popover";
import { ButtonFullscreen } from "./ButtonFullscreen";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar";
import { Button } from "../_components/ui/Button";
import { getFirstTwoLetters } from "~/lib/utils";
import { useRouter } from "next/navigation";
import { PiTelegramLogo, PiTelegramLogoFill } from "react-icons/pi";
import { Separator } from "../_components/ui/separator";

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
  const router = useRouter();
  const openTelegramChannel = () => {
    window.open("https://t.me/scoapofficial", "_blank");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <Avatar className="h-8 w-8 rounded-md">
            <AvatarImage
              src={user?.image ?? ""}
              alt={user?.name ?? "Anonymous"}
            />
            <AvatarFallback className="h-8 w-8 rounded-md" delayMs={600}>
              {getFirstTwoLetters(user?.name ?? "Anonymous")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>

      <PopoverContent sideOffset={8} className="relative mr-2 pb-8">
        <div>
          <div className="flex gap-2">
            <Avatar className="h-8 w-8 rounded-md">
              <AvatarImage
                src={user?.image ?? ""}
                alt={user?.name ?? "Anonymous Image"}
              />
              <AvatarFallback className="h-8 w-8 rounded-md" delayMs={600}>
                {getFirstTwoLetters(user?.name ?? "Anonymous")}
              </AvatarFallback>
            </Avatar>

            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col">
                <p className="text-sm">{user?.name ?? "Anonymous"}</p>

                {user ? (
                  <Button
                    variant={"link"}
                    size={"sm"}
                    className="h-fit self-start p-0 text-xs"
                    onClick={() => router.push("/api/auth/signout")}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant={"link"}
                    size={"sm"}
                    className="h-fit self-start p-0 text-xs"
                    onClick={() => router.push("/api/auth/signin")}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
            <ButtonFullscreen className="" />
          </div>
          <Separator className="my-2" />

          <div className="grid grid-cols-2">
            <Button
              size={"sm"}
              variant={"link"}
              onClick={() => router.push("/")}
              className="w-fit text-xs text-primary-foreground"
            >
              Home
            </Button>
            <Button
              size={"sm"}
              variant={"link"}
              onClick={() => router.push("/account")}
              className="w-fit justify-self-end text-xs text-primary-foreground"
            >
              User settings
            </Button>
            <Button
              size={"sm"}
              variant={"link"}
              className="w-fit text-xs text-primary-foreground"
              onClick={() => router.push("/account/privacy&policy")}
            >
              Privacy & Policy
            </Button>
          </div>
        </div>

        <div className="absolute bottom-1 left-0 flex w-full justify-between px-2 text-xs text-primary-foreground">
          <div className="flex items-center gap-1">
            <p className="text-[10px]">FOLLOW US:</p>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="h-4 w-4 text-primary"
              onClick={openTelegramChannel}
            >
              <PiTelegramLogoFill color="" />
            </Button>
          </div>
          <p>v0.11-beta</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserDropMenu;
