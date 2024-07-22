import { Button } from "~/app/_components/ui/Button";
import * as Buttons from "./Buttons";
import eventEmitter from "~/lib/eventEmitter/eventEmitter";
export type ServerMessagesId = "NO_SOURCE" | "OFFLINE" | "ONLINE";

export const serverMessagesContent = {
  NO_SOURCE:
    "No source found, Please go to the streams tab and select a video link.",
  OFFLINE:
    "Your room is offline and no one can join, By clicking watch together button you can make it accessible to others.",
  ONLINE:
    "This room is online! You can send the invite link to your friends and watch this video together.",
};

export default function ServerMessages({ id }: { id: ServerMessagesId }) {
  switch (id) {
    case "NO_SOURCE":
      return <NoSource />;
    case "OFFLINE":
      return <Offline />;
    case "ONLINE":
      return <Online />;
    default:
      return <></>;
  }
}

function Online() {
  function dismissHandler() {
    eventEmitter.emit("server:message_dismissed", "ONLINE");
  }
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-success p-3 text-success-foreground">
      <p>{serverMessagesContent.ONLINE}</p>

      <div className="flex items-center gap-2 self-end ">
        <Button
          onClick={dismissHandler}
          variant={"link"}
          className="text-success-foreground  "
        >
          Dismiss
        </Button>
        <Buttons.Share showTooltip={false} />
      </div>
    </div>
  );
}

export function OnlineText() {
  return;
}

function Offline() {
  function dismissHandler() {
    eventEmitter.emit("server:message_dismissed", "OFFLINE");
  }
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-warning p-3 text-warning-foreground">
      <p>{serverMessagesContent.OFFLINE}</p>

      <div className="flex items-center gap-2 self-end ">
        <Button
          onClick={dismissHandler}
          variant={"link"}
          className="text-warning-foreground"
        >
          Dismiss
        </Button>
        <Buttons.Together showTooltip={false} />
      </div>
    </div>
  );
}

function NoSource() {
  function dismissHandler() {
    eventEmitter.emit("server:message_dismissed", "NO_SOURCE");
  }
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-warning p-3 text-warning-foreground">
      <p>{serverMessagesContent.NO_SOURCE}</p>

      <div className="flex items-center gap-2 self-end ">
        <Button
          onClick={dismissHandler}
          variant={"link"}
          className="text-warning-foreground"
        >
          Dismiss
        </Button>
        <Buttons.Streams />
      </div>
    </div>
  );
}
