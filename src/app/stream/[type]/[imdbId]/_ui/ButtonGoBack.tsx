"use client";
import { useRouter } from "next/navigation";
import { HiArrowCircleLeft } from "react-icons/hi";

function ButtonGoBack() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center rounded-full bg-gray-1">
      <button onClick={() => router.back()} className="rounded-full   ">
        <HiArrowCircleLeft size={30} />
      </button>
    </div>
  );
}

export default ButtonGoBack;
