"use client";
import React from "react";
import * as Form from "@radix-ui/react-form";
import { Button } from "~/app/_components/ui/Button";

function UserDetails() {
  return (
    <Form.Root className="w-[260px]">
      <Form.Field className="mb-[10px] grid" name="name">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-solid-gray-2 text-[15px] font-medium leading-[35px]">
            Name
          </Form.Label>
          <Form.Message
            className="text-solid-gray-2 text-[13px] opacity-[0.8]"
            match="valueMissing"
          >
            Please enter your name
          </Form.Message>
          <Form.Message
            className="text-solid-gray-2 text-[13px] opacity-[0.8]"
            match="typeMismatch"
          >
            Please provide a valid name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="selection:color-white  bg-app-color-gray-2 text-solid-gray-2 shadow-blackA6 selection:bg-blackA6 hover:outline-border-color-stronger-focus focus:outline-border-color-stronger-focus box-border inline-flex h-[35px] w-full appearance-none items-center justify-center   rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] hover:outline focus:shadow-[0_0_0_2px_black] focus:outline"
            type="name"
            required
            placeholder="example: Yasin"
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="mb-[10px] grid" name="userId">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-solid-gray-2 text-[15px] font-medium leading-[35px]">
            User ID
          </Form.Label>
          <Form.Message
            className="text-solid-gray-2 text-[13px] opacity-[0.8]"
            match="valueMissing"
          >
            Please enter a user id
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="selection:color-white bg-app-color-gray-2 text-solid-gray-2 shadow-blackA6 selection:bg-blackA6 hover:outline-border-color-stronger-focus focus:outline-border-color-stronger-focus box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] hover:outline focus:shadow-[0_0_0_2px_black] focus:outline"
            required
            placeholder="example: ylaner"
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <Button className="bg-solid-primary-1 text-solid-gray-2 shadow-blackA4 hover:bg-solid-primary-2 mt-[10px] box-border inline-flex h-[35px] w-full items-center justify-center rounded-[4px] px-[15px] font-medium leading-none shadow-[0_2px_10px] transition-all focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Update profile
        </Button>
      </Form.Submit>
    </Form.Root>
  );
}

export default UserDetails;
