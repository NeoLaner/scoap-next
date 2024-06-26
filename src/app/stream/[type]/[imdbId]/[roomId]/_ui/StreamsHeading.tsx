"use client";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { addDirectLink } from "~/app/_actions/addDirectLink";
import { useRoomData } from "~/app/_hooks/useRoomData";

function StreamsHeading() {
  const pathname = usePathname();
  const { roomData } = useRoomData();
  return (
    <div className="flex w-full items-center justify-between px-2 py-5">
      <Link href={pathname} className="p-4">
        X
      </Link>

      <Form.Root
        autoComplete="off"
        className="w-[260px]"
        action={(data) => addDirectLink(data, roomData.id)}
      >
        <Form.Field className="mb-[10px] grid" name="name">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-solid-gray-2">
              Direct link
            </Form.Label>
            <Form.Message
              className="text-[13px] text-solid-gray-2 opacity-[0.8]"
              match="valueMissing"
            >
              Please enter your link
            </Form.Message>
            <Form.Message
              className="text-[13px] text-solid-gray-2 opacity-[0.8]"
              match="typeMismatch"
            >
              Please provide a valid link
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="selection:color-white  box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-app-color-gray-2 px-[10px] text-[15px] leading-none text-solid-gray-2   shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 hover:shadow-[0_0_0_1px_black] hover:outline hover:outline-border-color-stronger-focus focus:shadow-[0_0_0_2px_black] focus:outline focus:outline-border-color-stronger-focus"
              type="link"
              required
              placeholder="***.mp4/mkv/..."
              id="link"
              name="link"
            />
          </Form.Control>
        </Form.Field>
        {/* <Form.Submit asChild>
          <button className="focus:shadow-black mt-[10px] box-border inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-solid-primary-1 px-[15px] font-medium leading-none text-solid-gray-2 shadow-[0_2px_10px] shadow-blackA4 transition-all hover:bg-solid-primary-2 focus:shadow-[0_0_0_2px] focus:outline-none">
            Update profile
          </button>
        </Form.Submit> */}
      </Form.Root>
    </div>
  );
}

export default StreamsHeading;
