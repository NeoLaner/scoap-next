import { useParams } from "next/navigation";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { toast } from "sonner";
import { makeRoom } from "~/app/_actions/makeRoom";
import { Button } from "~/components/ui/button";
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
      className="rounded-full bg-background"
      onClick={async () => {
        if (!userData)
          return toast.error("You must login to use this feature.");
        await makeRoom({
          imdbId,
          type,
          name: metaData.name,
        });
      }}
      size={"icon"}
    >
      <BsFillPlayCircleFill size={30} />
    </Button>
  );
}

export default ButtonPlay;
