"use client";
import * as Avatar from "@radix-ui/react-avatar";

function UserProfile({
  image,
  name,
}: {
  image?: string | null;
  name?: string | null;
}) {
  return (
    <Avatar.Root className="inline-flex h-[70px] w-[70px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={image ?? ""}
        alt={name ?? ""}
      />
      <Avatar.Fallback
        className="leading-1 bg-white flex h-full w-full items-center justify-center text-[15px] font-medium text-primary-11"
        delayMs={600}
      >
        JD
      </Avatar.Fallback>
    </Avatar.Root>
  );
}

export default UserProfile;
