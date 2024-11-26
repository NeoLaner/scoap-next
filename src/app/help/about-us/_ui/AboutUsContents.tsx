"use client";

import { PiTelegramLogoFill } from "react-icons/pi";
import { Button } from "~/components/ui/button";
import LogoSVG from "~/app/_ui/LogoSVG";

function AboutUsContents() {
  const openTelegramChannel = () => {
    window.open("https://t.me/scoapofficial", "_blank");
  };

  return (
    <div className="space-y-2 p-4 px-8">
      <div className="mb-8 mt-4 flex items-center justify-center">
        <LogoSVG fill="hsl(var(--primary))" />
        <p className="text-5xl font-bold text-primary">COAP</p>
      </div>
      <p>
        Scoap is a revolutionary video platform designed to bring people
        together through shared viewing experiences. With Scoap, you can watch
        videos in perfect sync with your friends, no matter where they are.
      </p>
      <p>
        Please note that this site streams videos from external sites and
        services; we do not store any video files on our servers.
      </p>
      <div className="flex items-center gap-2">
        <p>
          Stay updated with our latest news and updates on our social media
          channels:
        </p>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="h-8 w-8 text-primary"
          onClick={openTelegramChannel}
        >
          <PiTelegramLogoFill color="" size={"16"} />
        </Button>
      </div>
    </div>
  );
}

export default AboutUsContents;
