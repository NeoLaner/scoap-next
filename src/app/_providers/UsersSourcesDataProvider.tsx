import { ReactNode } from "react";
import { api } from "~/trpc/server";

type UsersSourcesData = NonNullable<
  Awaited<NonNullable<ReturnType<typeof api.room.getUsersSource>>>
>["Sources"];

function UsersSourcesDataProvider({
  children,
}: {
  children: ReactNode;
  initialUsersDataProvider: {};
}) {}

export default UsersSourcesDataProvider;
