import Image from "next/image";
import { Button } from "~/app/_components/ui/Button";
import AddonService from "~/app/_services/addon/addonService";
import { type Addon } from "~/lib/@types/Addons";

async function InstalledAddon({ transportUrl }: { transportUrl: string }) {
  const addon = (await AddonService.detectFromURL(transportUrl)) as Addon;
  const addonLogo = addon.manifest.logo ?? addon.manifest.background;

  return (
    <div
      className="bg-app-color-gray-2 relative"
      title={addon.manifest.description}
    >
      <div className="flex items-center gap-2">
        <div className="relative h-16 w-16">
          {addonLogo && (
            <Image src={addonLogo} alt={addon.manifest.name} fill />
          )}
        </div>
        <div className="flex flex-col">
          <p>{addon.manifest.name}</p>
          <div className="flex gap-1">
            {addon.manifest.types.map((type) => (
              <p key={type}>{type}</p>
            ))}
          </div>
        </div>
      </div>

      <Button className="bg-app-color-gray-2 absolute right-0 top-1/2 flex h-full -translate-y-1/2 items-center px-4">
        Uninstall
      </Button>
    </div>
  );
}

export default InstalledAddon;
