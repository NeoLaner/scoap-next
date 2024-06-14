"use client";

import { type UserWsDataServerToClient } from "@socket/@types";
import { useEffect } from "react";
import { useUsersSocketContext } from "~/app/_hooks/useUsersSocket";
import { userSocket } from "~/lib/socket/socket";

function PlayerUsersSocket() {
  const { dispatch } = useUsersSocketContext();
  useEffect(
    function () {
      userSocket.on("user", function (data: UserWsDataServerToClient) {
        dispatch({ type: "UPDATE", payload: data });
      });
    },
    //eslint-disable-next-line
    [],
  );

  return null;
}

export default PlayerUsersSocket;
