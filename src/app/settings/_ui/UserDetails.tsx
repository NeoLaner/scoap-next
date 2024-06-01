"use client";
import React from "react";
import * as Form from "@radix-ui/react-form";

function UserDetails() {
  return (
    <Form.Root className="w-[260px]">
      <Form.Field className="mb-[10px] grid" name="name">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-solid-gray-2">
            Name
          </Form.Label>
          <Form.Message
            className="text-[13px] text-solid-gray-2 opacity-[0.8]"
            match="valueMissing"
          >
            Please enter your name
          </Form.Message>
          <Form.Message
            className="text-[13px] text-solid-gray-2 opacity-[0.8]"
            match="typeMismatch"
          >
            Please provide a valid name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="selection:color-white  box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-app-color-gray-2 px-[10px] text-[15px] leading-none text-solid-gray-2   shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 hover:shadow-[0_0_0_1px_black] hover:outline hover:outline-border-color-stronger-focus focus:shadow-[0_0_0_2px_black] focus:outline focus:outline-border-color-stronger-focus"
            type="name"
            required
            placeholder="example: Yasin"
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="mb-[10px] grid" name="userId">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-solid-gray-2">
            User ID
          </Form.Label>
          <Form.Message
            className="text-[13px] text-solid-gray-2 opacity-[0.8]"
            match="valueMissing"
          >
            Please enter a user id
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="selection:color-white box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded-[4px] bg-app-color-gray-2 p-[10px] text-[15px] leading-none text-solid-gray-2 shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 hover:shadow-[0_0_0_1px_black] hover:outline hover:outline-border-color-stronger-focus focus:shadow-[0_0_0_2px_black] focus:outline focus:outline-border-color-stronger-focus"
            required
            placeholder="example: ylaner"
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="focus:shadow-black mt-[10px] box-border inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-solid-primary-1 px-[15px] font-medium leading-none text-solid-gray-2 shadow-[0_2px_10px] shadow-blackA4 transition-all hover:bg-solid-primary-2 focus:shadow-[0_0_0_2px] focus:outline-none">
          Update profile
        </button>
      </Form.Submit>
    </Form.Root>
  );
}

export default UserDetails;
