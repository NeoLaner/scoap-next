"use client";
import { useRouter } from "next/navigation";
import { Button } from "../_components/ui/Button";

function LoginLogoutBtn({
  user,
}: {
  user:
    | {
        name?: string | null;
        image?: string | null;
      }
    | undefined;
}) {
  const router = useRouter();
  return (
    <>
      {user ? (
        <Button
          variant={"link"}
          size={"sm"}
          className="h-fit self-start p-0 text-xs"
          onClick={() => router.push("/api/auth/signout")}
        >
          Logout
        </Button>
      ) : (
        <Button
          variant={"link"}
          size={"sm"}
          className="h-fit self-start p-0 text-xs"
          onClick={() => router.push("/api/auth/signin")}
        >
          Login
        </Button>
      )}
    </>
  );
}

export default LoginLogoutBtn;
