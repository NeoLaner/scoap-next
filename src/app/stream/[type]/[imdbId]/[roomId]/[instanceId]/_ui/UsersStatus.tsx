import Image from "next/image";
import { useState } from "react";
import { PiArrowRightBold } from "react-icons/pi";
import { useInstanceData } from "~/app/_hooks/useInstanceData";
import { useUsersSocketContext } from "~/app/_hooks/useUsersSocket";

function UsersStatus() {
  const { instanceData } = useInstanceData();
  const { state } = useUsersSocketContext();
  const [hover, setHover] = useState(false);
  const waitingForDataUsers = state.filter(
    (user) => user.status === "waitingForData",
  );

  if (!instanceData.online) return null;

  const notReadyDataUsers = state.filter((user) => user.status === "notReady");

  if (state.length === 0) return null;
  return (
    <div
      className={`${hover || waitingForDataUsers.length || notReadyDataUsers.length ? "" : "ml-6  -translate-x-full"} my-auto flex h-fit items-center justify-center  transition-all`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`flex flex-col items-center justify-center gap-2 rounded-xl bg-app-color-primary-1 px-[0.35rem] py-[0.4rem] transition-all`}
      >
        {state?.map((userData) => (
          <div className="flex flex-col" key={userData.userId}>
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
