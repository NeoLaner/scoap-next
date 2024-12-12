export const toggleFullscreen = async ({
  setIsActive,
}: {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
