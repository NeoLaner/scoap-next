import { useRoomData } from "~/app/_hooks/useRoomData";

function TitleLayout() {
  const { roomData } = useRoomData();

  return (
    <div>
      {roomData.type === "series" && (
        <>
          {roomData?.name} S{roomData?.season}E{roomData?.episode}
        </>
      )}

      {roomData.type === "movie" && <>{roomData?.name}</>}
    </div>
  );
}

export default TitleLayout;
