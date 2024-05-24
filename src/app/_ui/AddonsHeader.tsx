import Link from "next/link";
import LogoSVG from "./LogoSVG";
import SearchHeader from "./SearchHeader";
import UserDropMenu from "./UserDropMenu";
import { getServerAuthSession } from "~/server/auth";

async function AddonsHeader() {
  const session = await getServerAuthSession();
  if (!session) return null;

  return (
    <header className="fixed z-20  h-[72px] w-full bg-gray-1">
      <div className="flex h-full w-full items-center justify-between px-4">
        {/* LOGO */}
        <LogoSVG fill="var(--red-10)" />
        {/* USER PROFILE */}
        <div className="flex items-center justify-center gap-2">
          <Link href="/addons">Addons</Link>
          <UserDropMenu user={session?.user} />
        </div>
      </div>
    </header>
  );
}

export default AddonsHeader;
