import { useParams } from "next/navigation";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { makeRoom } from "~/app/_actions/makeRoom";
import { useMetaData } from "~/app/_hooks/useMetaData";

function ButtonPlay({ userId }: { userId: string }) {
  const { imdbId, type } = useParams<{
    imdbId: string;
    type: "movie" | "series";
  }>();
  const { metaData } = useMetaData();

  return (
    <button
      className="rounded-md bg-app-color-gray-1"
      onClick={async () =>
        await makeRoom({ imdbId, type, ownerId: userId, name: metaData.name })
      }
    >
      <BsFillPlayCircleFill size={30} />
    </button>
  );
}

export default ButtonPlay;
