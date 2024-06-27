"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { addAddon } from "../action";
import ButtonSubmit from "./ButtonSubmit";
import { Button } from "~/app/_components/ui/Button";

const AddAddonModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="bg-solid-green-1 text-text-gray-2 hover:bg-solid-green-2 absolute bottom-2 right-4 rounded-full p-3  py-1 transition-all md:bottom-2 md:right-6">
          + Addon
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="bg-app-color-gray-2 text-text-gray-2 data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="m-0 text-[17px] font-medium">
            Edit profile
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal">
            You can add an addon via an{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://stremio-addons.netlify.app/"
              className=" text-text-primary-1"
            >
              external link
            </Link>
            , which will appear under Installed addons.
          </Dialog.Description>
          <form action={addAddon} className="mb-14">
            <input
              className="bg-gray-4 hover:outline-border-color-stronger-focus focus:outline-border-color-stronger-focus w-48  rounded-md !border-none px-4 py-1 outline-none transition-all hover:outline focus:outline md:w-96"
              placeholder="Copy addon's url"
              id="transportUrl"
              name="transportUrl"
              autoCorrect="off"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
            />

            {/* <div className="h-35">x</div> */}
            <ButtonSubmit />
          </form>

          <div className="mt-[25px] flex justify-end"></div>
          <Dialog.Close asChild>
            <Button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              X
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddAddonModal;
