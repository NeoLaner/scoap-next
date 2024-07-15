import { createNanoEvents } from "nanoevents";
import { type MessageProp } from "../@types/Message";
interface Events {
  "user:message": (message: MessageProp) => void;
}

const eventEmitter = createNanoEvents<Events>();

export default eventEmitter;
