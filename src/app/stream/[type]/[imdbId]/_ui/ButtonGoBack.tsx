"use client";
import { useRouter } from "next/navigation";
import { HiArrowCircleLeft } from "react-icons/hi";

function ButtonGoBack() {
  const router = useRouter();
  return (
    <div className="bg-background flex items-center justify-center rounded-full">
      <button onClick={() => router.back()} className="rounded-full   ">
        <HiArrowCircleLeft size={30} />
      </button>
    </div>
  );
}

export default ButtonGoBack;
