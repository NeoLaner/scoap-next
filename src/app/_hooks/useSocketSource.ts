import { useEffect } from "react";
import { mediaSocket } from "~/lib/socket/socket";

function useSocketSource() {
  useEffect(function () {
    mediaSocket.on("sourceDataChanged", (wsData) => {});
  }, []);
}
