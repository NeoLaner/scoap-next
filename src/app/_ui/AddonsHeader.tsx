import LogoSVG from "./LogoSVG";
import UserDropMenu from "./UserDropMenu";
import { getServerAuthSession } from "~/server/auth";

async function AddonsHeader() {
  const session = await getServerAuthSession();
  if (!session) return null;

  return (
    <header className="bg-background fixed  z-20 h-[72px] w-full">
      <div className="flex h-full w-full items-center justify-between px-4">
        {/* LOGO */}
        <LogoSVG fill="var(--red-dark-10)" />
        {/* USER PROFILE */}
        <div className="flex items-center justify-center gap-4">
          <UserDropMenu user={session?.user} />
        </div>
      </div>
    </header>
  );
}

export default AddonsHeader;
