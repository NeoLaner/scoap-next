import AddAddonModal from "./_ui/AddAddonModal";
import InstalledAddons from "./_ui/InstalledAddons";

async function Page() {
  return (
    <div className="relative h-full w-full">
      <h1>Addons</h1>
      <InstalledAddons />
      <AddAddonModal />
    </div>
  );
}

export default Page;
