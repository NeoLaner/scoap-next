"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiArrowCircleLeft } from "react-icons/hi";
import { Button } from "~/components/ui/button";

function ButtonGoBack() {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/home");
    }
  }

  return (
    <div className="flex items-center justify-center rounded-full bg-background">
      <Button
        // onClick={() => router.back()}
        onClick={handleBack}
        className="rounded-full"
        size={"icon"}
        variant={"ghost"}
        asChild
      >
        <Link href={"/home"}>
          <HiArrowCircleLeft size={30} />
        </Link>
      </Button>
    </div>
  );
}

export default ButtonGoBack;
