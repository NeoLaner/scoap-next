import AddAddonModal from "./_ui/AddAddonModal";
import InstalledAddons from "./_ui/InstalledAddons";

async function Page() {
  return (
    <div className="relative h-full w-full px-4 pt-8 md:px-8">
      <div className="fixed flex h-[48px] w-full items-center">
        <select className="h-min bg-app-color-gray-2">
          <option>Installed</option>
        </select>
      </div>
      <div className="pt-[48px]">
        <InstalledAddons />
        <AddAddonModal />
      </div>
    </div>
  );
}

export default Page;
