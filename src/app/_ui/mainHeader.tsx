import LogoSVG from "./LogoSVG";
import UserDropMenu from "./UserDropMenu";
import { getServerAuthSession } from "~/server/auth";

async function MainHeader() {
  const session = await getServerAuthSession();
  if (!session) return null;

  return (
    <header className="bg-primary-1 fixed  z-20 h-[72px]  w-full">
      <div className="flex h-full w-full items-center justify-between px-4">
        {/* LOGO */}
        <LogoSVG fill="var(--red-10)" />
        {/* SEARCH */}
        <input className="w-32" />
        {/* USER PROFILE */}
        <UserDropMenu user={session?.user} />
      </div>
    </header>
  );
}

export default MainHeader;
