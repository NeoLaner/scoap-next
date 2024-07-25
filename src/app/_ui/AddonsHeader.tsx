import LogoSVG from "./LogoSVG";
import UserDropMenu from "./UserDropMenu";
import { getServerAuthSession } from "~/server/auth";

async function AddonsHeader() {
  const session = await getServerAuthSession();
  if (!session) return null;

  return (
    <header className="fixed z-20  h-[72px] w-full bg-background">
      <div className="flex h-full w-full items-center justify-between px-4">
        {/* LOGO */}
        <LogoSVG fill="hsl(var(--primary))" />
        {/* USER PROFILE */}
        <div className="flex items-center justify-center gap-4">
          <UserDropMenu user={session?.user} />
        </div>
      </div>
    </header>
  );
}

export default AddonsHeader;
