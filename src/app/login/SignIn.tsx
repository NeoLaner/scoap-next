"use client";
import { type getProviders, signIn } from "next-auth/react";
import { PiDiscordLogo } from "react-icons/pi";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";

type Providers = Awaited<ReturnType<typeof getProviders>>;
export default function SignIn({ providers }: { providers: Providers }) {
  if (!providers) return;
  return (
    <>
      {Object.values(providers).map((provider) => {
        if (provider.name === "Discord")
          return (
            <Button
              key={provider.name}
              variant="outline"
              type="button"
              onClick={() => signIn(provider.id)}
              className="mx-6"
            >
              <PiDiscordLogo className="mr-2 h-5 w-5 text-blue-500" />
              Login with Discord
            </Button>
          );
        if (provider.name === "Google")
          return (
            <Button
              key={provider.name}
              variant="outline"
              type="button"
              onClick={() => signIn(provider.id)}
              className="mx-6"
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Login with Google
            </Button>
          );
      })}
    </>
  );
}
