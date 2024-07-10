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
          className={`${isHover ? "mr-0" : "-mr-4"} flex h-9 w-9 items-center justify-center rounded-full shadow-2xl transition-all`}
        >
          <AvatarImage
            src={user.image}
            className="h-9 w-9 rounded-full border-2"
          />
          <AvatarFallback>
            {getFirstTwoLetters(user.name ?? ":(")}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

export default StreamSourcesProfile;
