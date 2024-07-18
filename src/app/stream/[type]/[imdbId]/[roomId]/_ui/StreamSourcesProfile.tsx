import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { getFirstTwoLetters } from "~/lib/utils";

function StreamSourcesProfile({
  users,
}: {
  users: { name: string; image: string }[];
}) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      className="flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {users.map((user, index) => (
        <Avatar
          key={index}
          className={`${isHover ? "mr-0" : "-mr-4"} flex h-8 w-8 items-center justify-center rounded-md border-2 shadow-2xl transition-all`}
        >
          <AvatarImage src={user.image} className="" />
          <AvatarFallback className="rounded-md">
            {getFirstTwoLetters(user.name ?? ":(")}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

export default StreamSourcesProfile;
