import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

type Params = {
  roomId: string;
  imdbId: string;
  type: string;
};

function TitleLayout() {
  const params = useParams<Params>();
  const { data } = api.room.get.useQuery({ roomId: params.roomId });

  return (
    <div>
      {data?.roomName} S{data?.season}E{data?.episode}
    </div>
  );
}

export default TitleLayout;
