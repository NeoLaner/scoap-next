"use client";
import { useRouter } from "next/navigation";
import { HiArrowCircleLeft } from "react-icons/hi";

function ButtonGoBack() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <HiArrowCircleLeft size={30} />
    </button>
  );
}

export default ButtonGoBack;
