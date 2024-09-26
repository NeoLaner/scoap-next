import { useRoomData } from "~/app/_hooks/useRoomData";

function TitleLayout() {
  const { roomData } = useRoomData();

  return (
    <div>
      {roomData.type === "series" && (
        <>
          {roomData?.name}
          <span className="font-bold text-primary">
            {" "}
            S{roomData?.season}E{roomData?.episode}
          </span>
        </>
      )}

      {roomData.type === "movie" && <>{roomData?.name}</>}
    </div>
  );
}

export default TitleLayout;
