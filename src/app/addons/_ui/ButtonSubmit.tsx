"use client";
import { useFormStatus } from "react-dom";

function ButtonSubmit() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="absolute bottom-4 right-4 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-solid-green-1 px-[15px] font-medium leading-none hover:bg-solid-green-2 focus:shadow-[0_0_0_2px] focus:shadow-solid-green-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-solid-gray-1"
    >
      {pending ? "Saving..." : "Save addon"}
    </button>
  );
}

export default ButtonSubmit;
