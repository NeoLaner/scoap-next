import Link from "next/link";
import { HiArrowCircleLeft } from "react-icons/hi";
import UserDropMenu from "~/app/_ui/UserDropMenu";
import { getServerAuthSession } from "~/server/auth";

async function StreamHeader() {
  const session = await getServerAuthSession();
  if (!session) return null;
  return (
    <header
      className="text-gray-2 absolute top-0 w-full p-4 pt-8 md:p-8"
      style={{
        backgroundImage: `linear-gradient(to bottom, #000000a9 0%, rgba(0, 0, 0, 0) 100%)`,
      }}
    >
      <div className="flex items-center justify-between">
        <Link href="/home">
          <HiArrowCircleLeft size={30} />
        </Link>
        <UserDropMenu user={session?.user} />
      </div>
    </header>
  );
}

export default StreamHeader;
