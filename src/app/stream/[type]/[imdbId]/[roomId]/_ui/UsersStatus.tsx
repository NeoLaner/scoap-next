import { type MediaUserState } from "@socket/@types/mediaTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiArrowRightBold } from "react-icons/pi";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { mediaSocket } from "~/lib/socket/socket";
import { getFirstTwoLetters } from "~/lib/utils";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${paddedMinutes}:${paddedSeconds}`;
}

function UsersStatus() {
  const { roomData } = useRoomData();
  const [usersState, setUsersState] = useState<MediaUserState[]>([]);
  const [hover, setHover] = useState(false);

  useEffect(function () {
    mediaSocket.on("updateUserMediaState", (wsData) => {
      console.log(wsData.payload);
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
      className={`${hover || waitingForDataUsers.length ? "" : "ml-6  -translate-x-full"} my-auto flex h-fit items-center justify-center  transition-all`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`bg-app-color-primary-1 flex flex-col items-center justify-center gap-2 rounded-xl px-[0.35rem] py-[0.4rem] transition-all`}
      >
        {usersState?.map((userData) => (
          <div className="flex items-center gap-1" key={userData.id}>
            {/* {userData.image && (
              <Image
                src={userData.image}
                alt={`${userData.userName} image profile`}
                width={30}
                height={30}
                className={`w-9 rounded-full border-[2.8px] ${userData.waitForData ? "!border-border-color-stronger-focus" : "border-solid-green-1"} ${userData.id === roomData.ownerId ? "border-[blue]" : ""}`}
                quality="100"
              />
            )} */}
            <Avatar>
              <AvatarImage src={userData.image ?? ""} />
              <AvatarFallback>
                {getFirstTwoLetters(userData.userName ?? "Guest")}
              </AvatarFallback>
            </Avatar>

            <p className="text-sm">{formatTime(userData.videoTs)}</p>
          </div>
        ))}
      </div>
      <div className={`bg-app-color-primary-1 rounded-r-xl px-1 py-3`}>
        <PiArrowRightBold size={20} className="" />
      </div>
    </div>
  );
}

export default UsersStatus;
