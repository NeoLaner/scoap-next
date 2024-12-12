"use client";
import React, { useEffect, useState } from "react";
import { PiCornersInBold, PiCornersOutBold } from "react-icons/pi";
import { Button } from "~/components/ui/button";
import { toggleFullscreen } from "~/lib/btnEvent";

export const ButtonFullscreen = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  // const isActive = useMediaState("fullscreen");
  const [isActive, setIsActive] = useState(false);
  useEffect(() => setIsActive(document.fullscreenElement !== null), []);

  return (
    <Button
      onClick={() => toggleFullscreen({ setIsActive })}
      className={`${className}`}
      size={"icon"}
      variant={"ghost"}
      {...props}
      ref={ref}
    >
      {isActive ? (
        <div>
          <PiCornersInBold size={26} />
        </div>
      ) : (
        <div>
          <PiCornersOutBold size={26} />
        </div>
      )}
    </Button>
  );
});

ButtonFullscreen.displayName = "ButtonFullscreen";
