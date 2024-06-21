import { type MediaUserState } from "@socket/@types/mediaTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiArrowRightBold } from "react-icons/pi";
import { useInstanceData } from "~/app/_hooks/useInstanceData";
import { mediaSocket } from "~/lib/socket/socket";

function UsersStatus() {
  const { instanceData } = useInstanceData();
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

  const notReadyDataUsers = usersState.filter(
    (user) => user.status === "notReady",
  );

  if (usersState.length === 0) return null;
  return (
    <div
      className={`${hover || waitingForDataUsers.length || notReadyDataUsers.length ? "" : "ml-6  -translate-x-full"} my-auto flex h-fit items-center justify-center  transition-all`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`flex flex-col items-center justify-center gap-2 rounded-xl bg-app-color-primary-1 px-[0.35rem] py-[0.4rem] transition-all`}
      >
        {usersState?.map((userData) => (
          <div className="flex flex-col" key={userData.id}>
            {userData.image && (
              <Image
                src={userData.image}
                alt={`${userData.userName} image profile`}
                width={30}
                height={30}
                className={`w-9 rounded-full border-[2.8px] ${userData.status === "waitingForData" || userData.status === "notReady" ? "!border-border-color-stronger-focus" : "border-solid-green-1"} ${userData.userId === instanceData.ownerId ? "border-[blue]" : ""}`}
                quality="100"
              />
            )}
          </div>
        ))}
      </div>
      <div className={`rounded-r-xl bg-app-color-primary-1 px-1 py-3`}>
        <PiArrowRightBold size={20} className="" />
      </div>
    </div>
  );
}

export default UsersStatus;
