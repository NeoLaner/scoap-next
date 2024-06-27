"use client";
import { useRouter } from "next/navigation";
import { HiArrowCircleLeft } from "react-icons/hi";
import { Button } from "~/app/_components/ui/Button";

function ButtonGoBack() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center rounded-full bg-background">
      <Button
        onClick={() => router.back()}
        className="rounded-full"
        size={"icon"}
        variant={"ghost"}
      >
        <HiArrowCircleLeft size={30} />
      </Button>
    </div>
  );
}

export default ButtonGoBack;
