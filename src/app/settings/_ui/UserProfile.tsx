"use client";
import * as Avatar from "@radix-ui/react-avatar";
import { useUserData } from "~/app/_hooks/useUserData";
import { getFirstTwoLetters } from "~/lib/utils";

function UserProfile() {
  const { userData } = useUserData();
  return (
    <Avatar.Root>
      <Avatar.Image
        className=""
        src={userData.image ?? ""}
        alt={userData.name ?? ""}
      />
      <Avatar.Fallback
        className="leading-1 text-primary-11 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        delayMs={600}
      >
        {getFirstTwoLetters(userData.name)}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}

export default UserProfile;
