"use client";
import React from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { updateUserInfo } from "~/app/_actions/updateUserInfo";
import { api } from "~/trpc/react";

function UserDetails() {
  const { data: userData } = api.user.me.useQuery();
  return (
    // <Form.Root className="w-[260px]" action={updateUserInfo}>
    //   <Form.Field className="mb-[10px] grid" name="name">
    //     <div className="flex items-baseline justify-between">
    //       <Form.Label className="text-solid-gray-2 text-[15px] font-medium leading-[35px]">
    //         Name
    //       </Form.Label>
    //       <Form.Message
    //         className="text-solid-gray-2 text-[13px] opacity-[0.8]"
    //         match="valueMissing"
    //       >
    //         Please enter your name
    //       </Form.Message>
    //       <Form.Message
    //         className="text-solid-gray-2 text-[13px] opacity-[0.8]"
    //         match="typeMismatch"
    //       >
    //         Please provide a valid name
    //       </Form.Message>
    //     </div>
    //     <Form.Control asChild>
    //       <Input
    //         type="name"
    //         required
    //         placeholder="example: Yasin"
    //         defaultValue={userData?.name ?? ""}
    //       />
    //     </Form.Control>
    //   </Form.Field>
    //   <Form.Field className="mb-[10px] grid" name="userId">
    //     <div className="flex items-baseline justify-between">
    //       <Form.Label className="text-solid-gray-2 text-[15px] font-medium leading-[35px]">
    //         User ID
    //       </Form.Label>
    //       <Form.Message
    //         className="text-solid-gray-2 text-[13px] opacity-[0.8]"
    //         match="valueMissing"
    //       >
    //         Please enter a user id
    //       </Form.Message>
    //     </div>
    //     <Form.Control asChild>
    //       <Input
    //         required
    //         placeholder="example: ylaner"
    //         defaultValue={userData?.userId ?? ""}
    //       />
    //     </Form.Control>
    //   </Form.Field>
    //   <Form.Submit asChild>
    //     <Button className="w-full">Update profile</Button>
    //   </Form.Submit>
    // </Form.Root>
    <div>das</div>
  );
}

export default UserDetails;
