import { chatSocket, mediaSocket, userSocket } from "~/lib/socket/socket";
import { EVENT_NAMES } from "scoap-type/build/constants";
import type {
  InstanceRes,
  MediaCaused,
  MediaWsDataClientToServer,
  MessageDataApi,
  UserDataRes,
} from "@backend/utils/@types";
import type { Socket } from "socket.io-client";

function sendMessage(data: MessageDataApi) {
  chatSocket.emit(EVENT_NAMES.CHAT_MSG_SUB, data);
}

type EmitFnProps = {
  userData: UserDataRes;
  instance: InstanceRes["data"]["instance"];
};

//Media
type EmitMediaFnProps = EmitFnProps & {
  playedSeconds: number;
  caused?: MediaCaused;
};
function pausedVideo({
  userData,
  instance,
  playedSeconds,
  caused,
}: Required<EmitMediaFnProps>) {
  const isHost = instance.hostId === userData.data.user._id;
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
  const isHost = instance.hostId === userData.data.user._id;
  const wsData: MediaWsDataClientToServer = {
    payload: {
      playedSeconds: playedSeconds,
    },
  };
  if (!isHost) return; // only host can emit media event.
  mediaSocket.emit(EVENT_NAMES.MEDIA_PLAYED, wsData);
}

//User

function readyToPlay({ userData, instance }: EmitFnProps) {
  userSocket.emit(EVENT_NAMES.USER_READY);
}

function waitingForData({ userData, instance }: EmitFnProps) {
  userSocket.emit(EVENT_NAMES.USER_WAITING_FOR_DATA);
}

function sourceChanged() {
  console.log(1);

  userSocket.emit(EVENT_NAMES.USER_CHANGE_SOURCE);
}

function joinRoom(socket: Socket) {
  socket.emit(EVENT_NAMES.JOIN_ROOM);
}

function unsync({
  userData,
  userId,
  instance,
}: {
  userData: UserDataRes;
  userId: string;
  instance: InstanceRes["data"]["instance"];
}) {
  const isHost = instance.hostId === userData.data.user._id;
  const wsData = {
    payload: {
      targetId: userId,
    },
  };
  if (!isHost) return; // only host can emit media event.
  userSocket.emit(EVENT_NAMES.UNSYNC, wsData);
}

function kick({
  userData,
  userId,
  instance,
}: {
  userData: UserDataRes;
  instance: InstanceRes["data"]["instance"];
  userId: string;
}) {
  const wsData: MediaWsDataClientToServer = {
    payload: {
      targetId: userId,
    },
  };
  const isHost = instance.hostId === userData.data.user._id;
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
  const isHost = instance.hostId === userData.data.user._id;
  if (!isHost) return; // only host can emit media event.
  mediaSocket.emit(EVENT_NAMES.MEDIA_SEEKED, wsData);
}

const socketEmitters = {
  sendMessage,
  pausedVideo,
  playedVideo,
  seeked,
  joinRoom,
  readyToPlay,
  waitingForData,
  unsync,
  kick,
  sourceChanged,
};

export default socketEmitters;
