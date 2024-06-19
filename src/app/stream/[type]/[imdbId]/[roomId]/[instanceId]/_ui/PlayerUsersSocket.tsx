"use client";

import { type UserWsDataServerToClient } from "@socket/@types";
import { useEffect } from "react";
import { useUsersSocketContext } from "~/app/_hooks/useUsersSocket";

function PlayerUsersSocket() {
  const { dispatch } = useUsersSocketContext();

  return null;
}

export default PlayerUsersSocket;
