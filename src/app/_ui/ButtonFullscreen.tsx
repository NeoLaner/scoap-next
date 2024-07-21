import React, { useEffect, useState } from "react";
import { PiCornersInBold, PiCornersOutBold } from "react-icons/pi";
import { Button } from "../_components/ui/Button";

export const ButtonFullscreen = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  // const isActive = useMediaState("fullscreen");
  const [isActive, setIsActive] = useState(false);
  useEffect(() => setIsActive(document.fullscreenElement !== null), []);
  const toggleFullscreen = async () => {
    const elem = document.body; // This targets the root element of the document
    setIsActive((value) => !value);
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        // Firefox
        await elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        await elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        // IE/Edge
        await elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        await document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, and Opera
        await document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        await document.msExitFullscreen();
      }
    }
  };
  return (
    <Button
      onClick={toggleFullscreen}
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
