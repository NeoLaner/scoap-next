import { Socket, io } from "socket.io-client";
import config from "./config";
import {
  MediaClientToServerEvents,
  MediaServerToClientEvents,
} from "@socket/@types";
const backendUrlDev = config.backendUrlDev;
const backendUrl = config.backendUrl;
// "undefined" means the URL will be computed from the `window.location` object
const env = "development";
const USER_URL =
  env === "development" ? `${backendUrlDev}/user` : `${backendUrl}/user`;
const MEDIA_URL =
  env === "development" ? `${backendUrlDev}/media` : `${backendUrl}/media`;
const CHAT_URL =
  env === "development" ? `${backendUrlDev}/chat` : `${backendUrl}/chat`;

// export const socket = io(URL, { autoConnect: false });

export const userSocket = io(USER_URL, {
  autoConnect: false,
  withCredentials: true,
});
export const mediaSocket: Socket<
  MediaServerToClientEvents,
  MediaClientToServerEvents
> = io(MEDIA_URL, {
  autoConnect: false,
  withCredentials: true,
});
export const chatSocket = io(CHAT_URL, {
  autoConnect: false,
  withCredentials: true,
});
