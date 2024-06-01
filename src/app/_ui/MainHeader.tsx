import LogoSVG from "./LogoSVG";
import SearchHeader from "./SearchHeader";
import UserDropMenu from "./UserDropMenu";
import { getServerAuthSession } from "~/server/auth";

async function MainHeader() {
  const session = await getServerAuthSession();
  if (!session) return null;

  return (
    <header className="fixed z-20 h-[72px] w-full  bg-gradient-to-r from-app-color-gray-1 to-app-color-primary-2">
      <div className="flex h-full w-full items-center justify-between px-4">
        {/* LOGO */}
        <LogoSVG fill="var(--red-dark-10)" />
        {/* SEARCH */}
        <SearchHeader />
        {/* USER PROFILE */}
        <div className="flex items-center justify-center gap-2">
          <UserDropMenu user={session?.user} />
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
