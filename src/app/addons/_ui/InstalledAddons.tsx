import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import InstalledAddon from "./InstalledAddon";

async function InstalledAddons() {
  const session = await getServerAuthSession();
  if (!session) return <div>not logged in</div>;

  const transportUrls = await api.addon.getAddons();

  return (
    <div>
      {transportUrls.map((url) => (
        <InstalledAddon key={url} transportUrl={url} />
      ))}
    </div>
  );
}

export default InstalledAddons;
