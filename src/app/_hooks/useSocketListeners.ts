"use client";
import { useEffect } from "react";
import { chatSocket, mediaSocket } from "~/lib/socket/socket";
import type {
  ChatWsDataServerToClient,
  InstanceRes,
  MediaWsDataServerToClient,
  UserWsDataServerToClient,
} from "@socket/@types";
import { type QueryClient, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

type UpdateGuestsInstance = {
  queryClient: QueryClient;
  data: UserWsDataServerToClient;
  instanceId: string;
};

export type InstanceQuery = InstanceRes & {
  data: {
    instance: {
      media?: Omit<MediaWsDataServerToClient["payload"], "instanceId">;
    };
  };
};

function updateGuestsInstance({
  queryClient,
  data,
  instanceId,
}: UpdateGuestsInstance) {
  queryClient.setQueryData(["guests", instanceId], data);
}

type UpdateChatInstance = {
  queryClient: QueryClient;
  data: ChatWsDataServerToClient;
  instanceId: string;
};
function updateChatInstance({
  queryClient,
  data,
  instanceId,
}: UpdateChatInstance) {
  queryClient.setQueryData(
    ["chat", instanceId],
    (oldData: ChatWsDataServerToClient[]) => {
      const newData = [...oldData, data];
      return newData;
    },
  );
}

//get real-time updates from server
export function useSocketListeners() {
  const queryClient = useQueryClient();
  const instanceId = useParams().instanceId!;
  console.log("instanceId", instanceId);

  useEffect(function () {
    mediaSocket.auth = {
      instanceId,
    };
    chatSocket.auth = {
      instanceId,
    };

    // socket.connect();
    mediaSocket.connect();
    chatSocket.connect();
    //User

    //Chat
    chatSocket.on("chat", function (data: ChatWsDataServerToClient) {
      updateChatInstance({ queryClient, data, instanceId });
    });

    () => {
      mediaSocket.disconnect();
      chatSocket.disconnect();
    };
  }, []);
}
