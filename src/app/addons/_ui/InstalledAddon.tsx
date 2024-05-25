import AddonService from "~/app/_services/addon/addonService";
import { type Addon } from "~/lib/@types/Addons";

async function InstalledAddon({ transportUrl }: { transportUrl: string }) {
  const addon = (await AddonService.detectFromURL(transportUrl)) as Addon;

  return <div>{addon.manifest.name} installed</div>;
}

export default InstalledAddon;
