import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { PlayerProvider } from "./_providers/PlayerProvider";
import { ThemeProvider } from "./_ui/theme-provider";
import { Toaster } from "./_components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  // variable: "--font-sans",
});

export const metadata = {
  title: {
    template: "%s | Scoap",
    default: "Scoap",
  },
  description:
    "Gather your friends and watch videos together, even if you're miles apart. Simply share a link to your chosen video, and Scoap will seamlessly synchronize playback for everyone in the room. Enjoy live reactions, shared laughter, and a deeper connection to your content, all in real-time.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`h-dvh  ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <PlayerProvider>
              <main className="flex h-full flex-col items-center justify-center bg-gradient-to-r from-background to-background-secondary  text-foreground">
                {children}
              </main>
              <Toaster className="left-5 top-5" position="top-left" />
            </PlayerProvider>
            {/* <ReactQueryDevtools /> */}
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
