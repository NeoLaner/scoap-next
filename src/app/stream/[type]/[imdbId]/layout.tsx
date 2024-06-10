import { type ReactNode } from "react";
import StremioService from "~/app/_services/stremIo/stremIoServices";
import { type MetaInfo } from "~/app/_services/stremIo/types";
import { getServerAuthSession } from "~/server/auth";
import { MetaDataProvider } from "~/app/_providers/MetaProvider";
import ProtectedRoute from "~/app/_ui/ProtectedRoute";
import { redirect } from "next/navigation";

async function layout({
  children,
  params,
}: {
  params: { imdbId: string; type: "movie" | "series" };
  children: ReactNode;
}) {
  const { imdbId, type } = params;
  const session = await getServerAuthSession();
  if (!session) return redirect("/api/auth/signin");
  let metaData = {} as MetaInfo;
  if (type === "movie") metaData = await StremioService.getMetaMovie(imdbId);
  if (type === "series") metaData = await StremioService.getMetaSeries(imdbId);

  if (!metaData) return <div>Not found</div>;

  return (
    <ProtectedRoute>
      <MetaDataProvider metaData={metaData}>{children}</MetaDataProvider>
    </ProtectedRoute>
  );
}

export default layout;
