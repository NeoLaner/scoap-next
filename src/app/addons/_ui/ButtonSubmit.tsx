"use client";
import { useFormStatus } from "react-dom";
import { Button } from "~/app/_components/ui/Button";

function ButtonSubmit() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className="bg-solid-green-1 hover:bg-solid-green-2 focus:shadow-solid-green-2 disabled:bg-solid-gray-1 absolute bottom-4 right-4 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none disabled:cursor-not-allowed"
    >
      {pending ? "Saving..." : "Save addon"}
    </Button>
  );
}

export default ButtonSubmit;
