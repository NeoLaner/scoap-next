"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Icons } from "~/components/icons";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={() => onSubmit}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.discord className="mr-2 h-4 w-4" />
            )}{" "}
            Login with Discord
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={() => onSubmit}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}{" "}
            Login with Google
          </Button>
        </div>
      </form>
    </div>
  );
}
