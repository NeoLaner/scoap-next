import { useEffect, useState } from "react";

export function useGetRightPanelSize() {
  const [rightPanelWidth, setRightPanelWidth] = useState(360); // Default to 360

  useEffect(() => {
    const element = document.getElementById("RightPanel");

    if (!element) return;

    const updateWidth = () => {
      setRightPanelWidth(element.offsetWidth);
    };

    // Initialize with the current width
    updateWidth();

    // Create a ResizeObserver to handle width changes
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    // Observe the element
    resizeObserver.observe(element);

    // Cleanup the observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { rightPanelWidth };
}
