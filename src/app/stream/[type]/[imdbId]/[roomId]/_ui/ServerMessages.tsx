import { Button } from "~/app/_components/ui/Button";
import * as Buttons from "./Buttons";
import { useChatData } from "~/app/_hooks/useChatData";
import eventEmitter from "~/lib/eventEmitter/eventEmitter";

export type ServerMessagesId = "NO_SOURCE";

export default function ServerMessages({ id }: { id: ServerMessagesId }) {
  switch (id) {
    case "NO_SOURCE":
      return <NoSource />;

    default:
      return <></>;
  }
}

function NoSource() {
  function dismissHandler() {
    eventEmitter.emit("server:message_dismissed", "NO_SOURCE");
  }
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-warning p-3 text-warning-foreground">
      <p>
        No source found, Please go to the streams tab and select a video link.
      </p>

      <div className="flex items-center gap-2 self-end">
        <Button onClick={dismissHandler} variant={"ghost"}>
          Dismiss
        </Button>
        <Buttons.Streams />
      </div>
    </div>
  );
}
