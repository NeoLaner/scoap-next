import LogoSVG from "./logoSVG";
import UserDropMenu from "./userDropMenu";
import { getServerAuthSession } from "~/server/auth";

async function MainHeader() {
  const session = await getServerAuthSession();
  if (!session) return null;

  return (
    <header className="fixed z-20  h-[72px] w-full  bg-black">
      <div className="flex h-full w-full items-center justify-between px-4">
        {/* LOGO */}
        <LogoSVG fill="red" />
        {/* SEARCH */}
        <input className="w-32" />
        {/* USER PROFILE */}
        <UserDropMenu user={session?.user} />
      </div>
    </header>
  );
}

export default MainHeader;
