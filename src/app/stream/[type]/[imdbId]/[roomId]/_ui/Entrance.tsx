"use client";
import { Button } from "~/components/ui/button";
import { joinRoom } from "~/app/_actions/joinRoom";
import { useRoomData } from "~/app/_hooks/useRoomData";
import { useParams, useRouter } from "next/navigation";

function Entrance({ roomId, userId }: { roomId: string; userId: string }) {
  const { roomData } = useRoomData();
  return (
    <div className="h-full w-full backdrop-blur-lg">
      <div className="absolute left-1/2 top-1/2 min-w-72 max-w-80 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-4 shadow-lg shadow-background   ">
        {/* <BgLogoBox className="mb-4 w-36" /> */}
        <h2 className="mb-2 text-center text-lg">{roomData.name}</h2>
        {!roomData.online && <RoomIsOffline />}
        {roomData.online && <RoomIsOnline roomId={roomId} userId={userId} />}
      </div>
    </div>
  );
}

function RoomIsOnline({ roomId, userId }: { roomId: string; userId: string }) {
  return (
    <>
      <p>The room is online! Are you sure to proceeding?</p>
      <div className="mt-2 flex justify-end gap-1">
        <Button>Decline</Button>
        <Button onClick={async () => await joinRoom({ roomId, userId })}>
          Accept
        </Button>
      </div>
    </>
  );
}

function RoomIsOffline() {
  const router = useRouter();
  const { type, imdbId } = useParams<{ type: string; imdbId: string }>();
  return (
    <>
      <p>
        The room is offline. Wait the host make the room online or watch the
        video alone.
      </p>
      <div className="mt-2 flex justify-end gap-1">
        <Button onClick={() => router.push(`/stream/${type}/${imdbId}`)}>
          Watch alone
        </Button>
      </div>
    </>
  );
}

export default Entrance;
