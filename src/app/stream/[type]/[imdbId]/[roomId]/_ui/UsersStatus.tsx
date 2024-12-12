import { type MediaUserState } from "@socket/@types/mediaTypes";
import { useEffect, useState } from "react";
import { PiArrowRightBold } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { useRoomData } from "~/app/_hooks/useRoomData";
import { mediaSocket } from "~/lib/socket/socket";
import { getFirstTwoLetters } from "~/lib/utils";

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = hours > 0 ? hours.toString() : null;
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(remainingSeconds).padStart(2, "0");

  if (formattedHours !== null) {
    return `${formattedHours}:${paddedMinutes}:${paddedSeconds}`;
  } else {
    return `${paddedMinutes}:${paddedSeconds}`;
  }
}

function UsersStatus() {
  const [usersState, setUsersState] = useState<MediaUserState[]>([]);
  const [hover, setHover] = useState(false);

  useEffect(function () {
    mediaSocket.on("updateUserMediaState", (wsData) => {
      wsData.payload;
      setUsersState(wsData.payload);
    });
    return () => {
      mediaSocket.off("updateUserMediaState");
    };
  }, []);

  const waitingForDataUsers = usersState.filter((user) => user.waitForData);

  if (usersState.length === 0) return null;
  return (
    <div
      className={`z-50 ${hover || waitingForDataUsers.length ? "" : "ml-4  -translate-x-full"} my-auto flex h-fit items-center justify-center  transition-all`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`${usersState.length > 1 ? "rounded-r-md" : ""} flex flex-col items-center justify-center gap-2 bg-background px-[0.35rem] py-[0.4rem] transition-all`}
      >
        {usersState?.map((userData) => (
          <div className="flex items-center gap-2" key={userData.id}>
            <Avatar className="h-8 w-8 rounded-md">
              <AvatarImage src={userData.image ?? ""} />
              <AvatarFallback className="h-8 w-8 rounded-md">
                {getFirstTwoLetters(userData.userName)}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm">{formatTime(userData.videoTs)}</p>
          </div>
        ))}
      </div>
      <div className={`rounded-r-xl bg-background py-2`}>
        <PiArrowRightBold size={16} className="" />
      </div>
    </div>
  );
}

export default UsersStatus;
