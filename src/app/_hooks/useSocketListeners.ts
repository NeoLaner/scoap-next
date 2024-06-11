"use client";
import { useEffect } from "react";
import { chatSocket, mediaSocket, userSocket } from "~/lib/socket/socket";
import type {
  ChatWsDataServerToClient,
  InstanceRes,
  MediaWsDataServerToClient,
  UserWsDataServerToClient,
} from "@backend/utils/@types";
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

type UpdateMediaInstance = {
  queryClient: QueryClient;
  data: MediaWsDataServerToClient;
  instanceId: string;
};

function updateMediaInstance({
  queryClient,
  data,
  instanceId,
}: UpdateMediaInstance) {
  queryClient.setQueryData(
    ["instance", instanceId],
    (oldData: InstanceQuery): InstanceQuery => {
      const newData: InstanceQuery = {
        status: oldData.status,
        data: {
          ...oldData.data,
          instance: {
            ...oldData.data.instance,
            media: { ...data.payload },
          },
        },
      };
      return newData;
    },
  );
}
//get real-time updates from server
export function useSocketListeners({ token }: { token: string }) {
  const queryClient = useQueryClient();
  const instanceId = useParams().instanceId!;

  useEffect(function () {
    const instanceJwt = token;
    // socket.auth = {
    //   instanceJwt,
    // };
    userSocket.auth = {
      instanceJwt,
    };
    mediaSocket.auth = {
      instanceJwt,
    };
    chatSocket.auth = {
      instanceJwt,
    };
    // socket.connect();
    userSocket.connect();
    mediaSocket.connect();
    chatSocket.connect();
    //User
    userSocket.on("user", function (data: UserWsDataServerToClient) {
      updateGuestsInstance({ queryClient, data, instanceId });
    });

    //Media
    mediaSocket.on("media", function (data: MediaWsDataServerToClient) {
      updateMediaInstance({ queryClient, data, instanceId });
    });

    //Chat
    chatSocket.on("chat", function (data: ChatWsDataServerToClient) {
      updateChatInstance({ queryClient, data, instanceId });
    });

    () => {
      console.log(1);

      userSocket.disconnect();
      mediaSocket.disconnect();
      chatSocket.disconnect();
    };
  }, []);
}
