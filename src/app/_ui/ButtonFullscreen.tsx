import { useState } from "react";
import { PiCornersInBold, PiCornersOutBold } from "react-icons/pi";
import { Button } from "../_components/ui/Button";

export default function ButtonFullscreen({ className }: { className: string }) {
  // const isActive = useMediaState("fullscreen");
  const [isActive, setIsActive] = useState(false);
  const toggleFullscreen = () => {
    const elem = document.body; // This targets the root element of the document
    setIsActive((value) => !value);
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        // Firefox
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        // IE/Edge
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }
  };
  return (
    <Button onClick={toggleFullscreen} className={`${className}`} size={"icon"}>
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
}
