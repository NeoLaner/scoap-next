"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { useUserData } from "~/app/_hooks/useUserData";
import { getFirstTwoLetters } from "~/lib/utils";

function UserProfile() {
  const { userData } = useUserData();
  return (
    <Avatar className="h-16 w-16 rounded-md">
      <AvatarImage src={userData.image ?? ""} alt={userData.name ?? ""} />
      <AvatarFallback className="h-8 w-8 rounded-md" delayMs={600}>
        {getFirstTwoLetters(userData.name)}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserProfile;
