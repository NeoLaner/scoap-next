import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import ScrollAreaY from "~/app/_ui/scrollAreaY";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
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
    <html lang="en">
      <body className={`h-dvh font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <main className="flex h-full flex-col items-center justify-center overflow-y-auto bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <ScrollAreaY className="!bottom-[72px] !top-[72px] md:!bottom-0">
              {children}
            </ScrollAreaY>
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
