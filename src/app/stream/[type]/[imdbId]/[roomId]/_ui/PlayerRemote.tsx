import {
  useMediaRemote,
  useMediaStore,
  type MediaPlayerInstance,
} from "@vidstack/react";
import { useEffect, type RefObject } from "react";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { useUserData } from "~/app/_hooks/useUserData";
import { mediaSocket } from "~/lib/socket/socket";

function PlayerRemote({
  playerRef,
}: {
  playerRef: RefObject<MediaPlayerInstance>;
}) {
  const remote = useMediaRemote(playerRef);
  const { currentTime, waiting, playbackRate } = useMediaStore(playerRef);
  const videoTs = Math.floor(currentTime);
  const { userData } = useUserData();
  const { setRoomData } = useRoomData();

  useEffect(function () {
    mediaSocket.on("roomDataChanged", (wsData) => {
      setRoomData(wsData.payload);
    });
    return () => {
      mediaSocket.off("roomDataChanged");
    };
  }, []);

  useEffect(
    function () {
      mediaSocket.emit("updateUserMediaState", {
        payload: {
          createdAt: Date.now(),
          downloadSpeed: 0,
          forceUnsync: false,
          playbackRate: playbackRate,
          synced: true,
          videoTs: currentTime,
          waitForData: waiting,
        },
      });
    },
    [videoTs, waiting, playbackRate],
  );

  useEffect(
    function () {
      mediaSocket.on("play", () => {
        remote.play();
      });

      mediaSocket.on("pause", () => {
        remote.pause();
      });

      mediaSocket.on("seek", (wsData) => {
        remote.seek(wsData.payload.videoTs);
      });
      return () => {
        mediaSocket.off("play");
        mediaSocket.off("pause");
        mediaSocket.off("seek");
      };
    },
    [remote],
  );

  useEffect(function () {
    mediaSocket.on("updateUserMediaState", (wsData) => {
      const leader = wsData.payload.reduce((maxUser, currentUser) => {
        return currentUser.videoTs > maxUser.videoTs ? currentUser : maxUser;
      });
      const curUser = wsData.payload.filter(
        (user) => user.id === userData.id,
      )[0];
      let pbr = 1.01;
      const delta = leader.videoTs - (curUser?.videoTs ?? 0);
      console.log("delta", leader.videoTs, curUser?.videoTs);

      pbr += Number((delta / 10).toFixed(2));
      pbr = Math.min(pbr, 1.1);

      remote.changePlaybackRate(pbr);
    });
    return () => {
      mediaSocket.off("updateUserMediaState");
    };
  }, []);

  return null;
}

export default PlayerRemote;
