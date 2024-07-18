import { createNanoEvents } from "nanoevents";
import { type MessageProp } from "../@types/Message";
import { type ServerMessagesId } from "~/app/stream/[type]/[imdbId]/[roomId]/_ui/ServerMessages";
interface Events {
  "user:message": (message: MessageProp) => void;
  "server:message": (messageKey: ServerMessagesId) => void;
  "server:message_dismissed": (messageKey: ServerMessagesId) => void;
}

const eventEmitter = createNanoEvents<Events>();

export default eventEmitter;
