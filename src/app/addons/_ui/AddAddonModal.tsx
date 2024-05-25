"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";

const AddAddonModal = () => {
  const [transportUrl, setTransportUrl] = useState("");
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="absolute bottom-2 right-4 rounded-full bg-solid-green-1 p-3 py-1 text-text-gray-2  transition-all hover:bg-solid-green-2 md:bottom-2 md:right-6">
          + Addon
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-app-color-gray-2 p-[25px] text-text-gray-2 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              className="w-48 rounded-md !border-none bg-gray-4  px-4 py-1 outline-none transition-all hover:outline hover:outline-border-color-stronger-focus focus:outline focus:outline-border-color-stronger-focus md:w-96"
              placeholder="Copy addon's url"
              id="transportUrl"
              value={transportUrl}
              onChange={(e) => setTransportUrl(e.target.value)}
              autoCorrect="off"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </form>

          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-solid-green-1 px-[15px] font-medium leading-none hover:bg-solid-green-2 focus:shadow-[0_0_0_2px] focus:shadow-solid-green-2 focus:outline-none">
                Save addon
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddAddonModal;
