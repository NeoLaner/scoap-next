"use client";
import React from "react";
import * as Avatar from "@radix-ui/react-avatar";

const UserProfile = () => (
  <div className="flex gap-5">
    <Avatar.Root className="inline-flex h-[35px] w-[35px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
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
);

export default UserProfile;
