import { useState } from "react";

export default function ButtonFullscreen() {
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
    <button onClick={toggleFullscreen} className="w-full">
      {isActive ? (
        <div>
          <p>Exit Fullscreen</p>
          {/* <FullscreenExitIcon className="h-6 w-6" /> */}
        </div>
      ) : (
        <div>
          <p>Enter Fullscreen</p>
          {/* <FullscreenIcon className="h-5 w-5" /> */}
        </div>
      )}
    </button>
  );
}
