import { useParams } from "next/navigation";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { makeRoom } from "~/app/_actions/makeRoom";
import { useMetaData } from "~/app/_hooks/useMetaData";
import { useUserData } from "~/app/_hooks/useUserData";

function ButtonPlay() {
  const { imdbId, type } = useParams<{
    imdbId: string;
    type: "movie" | "series";
  }>();
  const { metaData } = useMetaData();
  const { userData } = useUserData();

  return (
    <Button
      className="rounded-md bg-background"
      onClick={async () =>
        await makeRoom({
          imdbId,
          type,
          ownerId: userData.id,
          name: metaData.name,
        })
      }
    >
      <BsFillPlayCircleFill size={30} />
    </Button>
  );
}

export default ButtonPlay;
