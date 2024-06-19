import { chatSocket, mediaSocket } from "~/lib/socket/socket";
import type {
  InstanceRes,
  MediaEvents,
  MediaSocket,
  MessageDataApi,
  UserDataRes,
  WsDataCtS,
} from "@socket/@types";
import type { Socket } from "socket.io-client";
import { MediaUserState } from "@socket/@types/mediaTypes";
import { EVENT_NAMES } from "~/lib/socket/EVENT_NAMES";

function sendMessage(data: MessageDataApi) {
  chatSocket.emit(EVENT_NAMES.CHAT_MSG_SUB, data);
}

type EmitFnProps = {
  userData: UserDataRes;
  instance: InstanceRes;
};

//Media
type EmitMediaFnProps = EmitFnProps & {
  playedSeconds: number;
  caused?: MediaCaused;
};

function sendUserMediaState(userState: WsDataCtS<"updateUserMediaState">) {
  mediaSocket.emit(EVENT_NAMES.UpdateUserMediaState, userState);
}

function pausedVideo({
  userData,
  instance,
  playedSeconds,
  caused,
}: Required<EmitMediaFnProps>) {
  const isHost = instance.ownerId === userData.id;
  const wsData: MediaWsDataClientToServer = {
    payload: {
      caused,
      playedSeconds,
    },
  };
  // only host can emit media event.
  //auto caused don't need to send
  if (!isHost || caused === "auto") return;
  mediaSocket.emit(EVENT_NAMES.MEDIA_PAUSED, wsData);
}

function playedVideo({ userData, instance, playedSeconds }: EmitMediaFnProps) {
  console.log(instance.ownerId, userData.id);

  const isHost = instance.ownerId === userData.id;
  const wsData: MediaWsDataClientToServer = {
    payload: {
      playedSeconds: playedSeconds,
    },
  };
  if (!isHost) return; // only host can emit media event.

  mediaSocket.emit(EVENT_NAMES.MEDIA_PLAYED, wsData);
}

//User

function readyToPlay() {
  console.log("ready to play emitted");
  // userSocket.emit(EVENT_NAMES.USER_READY);
}

function waitingForData() {
  // userSocket.emit(EVENT_NAMES.USER_WAITING_FOR_DATA);
  mediaSocket.emit(EVENT_NAMES.MEDIA_WAITING_FOR_DATA);
}

function receivedData() {
  // userSocket.emit(EVENT_NAMES.USER_READY);
  mediaSocket.emit(EVENT_NAMES.MEDIA_RECEIVED_DATA);
}

function sourceChanged() {
  // userSocket.emit(EVENT_NAMES.USER_CHANGE_SOURCE);
}

function joinRoom(socket: Socket) {
  socket.emit("joinRoom");
}

function unsync({
  userData,
  userId,
  instance,
}: {
  userData: UserDataRes;
  userId: string;
  instance: InstanceRes;
}) {
  const isHost = instance.ownerId === userData.id;
  const wsData = {
    payload: {
      targetId: userId,
    },
  };
  if (!isHost) return; // only host can emit media event.
  // userSocket.emit(EVENT_NAMES.UNSYNC, wsData);
}

function kick({
  userData,
  userId,
  instance,
}: {
  userData: UserDataRes;
  instance: InstanceRes;
  userId: string;
}) {
  const wsData: MediaWsDataClientToServer = {
    payload: {
      targetId: userId,
    },
  };
  const isHost = instance.ownerId === userData.id;
  if (!isHost) return; // only host can emit media event.
  mediaSocket.emit(EVENT_NAMES.KICK, wsData);
  unsync({ userData, userId, instance });
}

function seeked({
  userData,
  instance,
  curTime,
}: EmitFnProps & { curTime: number }) {
  const wsData: MediaWsDataClientToServer = {
    payload: {
      playedSeconds: curTime,
    },
  };
  const isHost = instance.ownerId === userData.id;
  if (!isHost) return; // only host can emit media event.
  mediaSocket.emit(EVENT_NAMES.MEDIA_SEEKED, wsData);
}

const socketEmitters = {
  sendUserMediaState,
  sendMessage,
  pausedVideo,
  playedVideo,
  seeked,
  joinRoom,
  readyToPlay,
  waitingForData,
  receivedData,
  unsync,
  kick,
  sourceChanged,
};

export default socketEmitters;
