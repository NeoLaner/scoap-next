import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import LogoSVG from "../_ui/LogoSVG";
import StremioService from "../_services/stremIo/stremIoServices";

export const metadata: Metadata = {
  title: "Login | Scoap",
  description: "Login to your Scoap account",
};

import { getProviders } from "next-auth/react";
import SignIn from "./SignIn";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

const mediaIds = [
  { type: "movie", id: "tt0468569", message: "", name: "" },
  {
    type: "movie",
    id: "tt0068646",
    message: "I'm going to make him an offer he can't refuse.",
    name: "The Godfather",
  },
];

export default async function LoginPage() {
  const session = await getServerAuthSession();
  if (session?.user) redirect("home");
  const selectedMedia = mediaIds[1];
  const meta = await StremioService.getMetaMovie(selectedMedia?.id ?? "");
  const providers = await getProviders();

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src={meta.background}
            fill
            style={{ objectFit: "cover" }}
            alt="Cinema background"
          />
          <div className="absolute inset-0 bg-zinc-900/60" />
        </div>
        <div className="relative z-20 flex items-center text-muted-foreground">
          <LogoSVG fill="hsl(var(--primary))" />
          <div className="text-4xl font-bold uppercase">coap</div>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">&ldquo;{selectedMedia?.message}&rdquo;</p>
            <footer className="text-sm">{selectedMedia?.name}</footer>
          </blockquote>
        </div>
      </div>
      <div className="my-20 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome to Scoap
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
          <SignIn providers={providers} />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
