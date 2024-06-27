"use client";
import * as Form from "@radix-ui/react-form";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useRef,
  useState,
} from "react";
import { addDirectLink } from "~/app/_actions/addDirectLink";
import { useRoomData } from "~/app/_hooks/useRoomData";

function StreamForm() {
  const { roomData } = useRoomData();
  const [isFocused, setIsFocused] = useState(false);
  const [source, setSource] = useState("");
  const ref = useRef<HTMLFormElement>();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent new line
      ref.current?.requestSubmit();
      setSource("");
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Form.Root
        ref={ref}
        autoComplete="off"
        className="w-full"
        action={(data) => addDirectLink(data, roomData.id)}
      >
        <Form.Field className="flex flex-col items-center" name="name">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-solid-gray-2 text-[15px] font-medium leading-[35px]">
              Add direct link
            </Form.Label>
            <Form.Message
              className="text-solid-gray-2 text-[13px] opacity-[0.8]"
              match="valueMissing"
            >
              Please enter your link
            </Form.Message>
            <Form.Message
              className="text-solid-gray-2 text-[13px] opacity-[0.8]"
              match="typeMismatch"
            >
              Please provide a valid link
            </Form.Message>
          </div>
          <Form.Control asChild className="flex items-center justify-center">
            <textarea
              className={`selection:color-white bg-app-color-gray-2 text-solid-gray-2 shadow-blackA6  selection:bg-blackA6 hover:outline-border-color-stronger-focus focus:outline-border-color-stronger-focus box-border inline-flex w-[96%] appearance-none items-center justify-center rounded-[4px] px-[10px]   py-1 text-[15px] leading-none shadow-[0_0_0_1px] outline-none transition-all hover:shadow-[0_0_0_1px_black] hover:outline focus:shadow-[0_0_0_2px_black] focus:outline ${isFocused ? "h-20" : "h-8"}`}
              required
              placeholder="Add mp4/mkv/... link"
              id="link"
              name="link"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </Form.Control>
        </Form.Field>
        {/* <Form.Submit asChild>
          <Button className="focus:shadow-black mt-[10px] box-border inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-solid-primary-1 px-[15px] font-medium leading-none text-solid-gray-2 shadow-[0_2px_10px] shadow-blackA4 transition-all hover:bg-solid-primary-2 focus:shadow-[0_0_0_2px] focus:outline-none">
            Update profile
          </Button>
        </Form.Submit> */}
      </Form.Root>
    </div>
  );
}

export default StreamForm;
