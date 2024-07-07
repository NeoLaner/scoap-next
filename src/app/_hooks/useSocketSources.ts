import { useEffect } from "react";
import { mediaSocket } from "~/lib/socket/socket";
import { useSourcesData } from "./useSourcesData";

export function useSocketSources() {
  const { setSourcesData } = useSourcesData();
  useEffect(function () {
    mediaSocket.on("sourceDataChanged", (wsData) => {
      setSourcesData((sources) => {
        if (sources) return [wsData.payload, ...sources];
        else [wsData.payload];
      });
    });
    return () => {
      mediaSocket.off("sourceDataChanged");
    };
  }, []);
}
