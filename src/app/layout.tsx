import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { PlayerProvider } from "./_providers/PlayerProvider";
import { ThemeProvider } from "./_ui/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import ProtectedRoute from "./_ui/ProtectedRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`h-dvh ${inter.variable} selection:bg-primary/60 selection:text-primary-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <ProtectedRoute>
              <PlayerProvider>
                <main className="flex h-full flex-col items-center justify-center bg-gradient-to-r from-background to-background-secondary  text-foreground">
                  {children}
                </main>
                <Toaster position="top-left" richColors />
              </PlayerProvider>
            </ProtectedRoute>
            <ReactQueryDevtools />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
