import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { makeRoom } from "~/app/_actions/makeRoom";

function ButtonPlay({ userId }: { userId: string }) {
  const { imdbId, type } = useParams<{
    imdbId: string;
    type: "movie" | "series";
  }>();

  return (
    <button
      className="rounded-md bg-app-color-gray-1"
      onClick={() => makeRoom({ imdbId, type, ownerId: userId })}
    >
      <BsFillPlayCircleFill size={30} />
    </button>
  );
}

export default ButtonPlay;
