import UserDropMenu from "~/app/_ui/UserDropMenu";
import { getServerAuthSession } from "~/server/auth";
import ButtonGoBack from "./ButtonGoBack";

async function StreamHeader() {
  const session = await getServerAuthSession();
  if (!session) return null;
  return (
    <header
      className="absolute top-0 w-full p-4 pt-8 text-gray-2 md:p-8"
      style={{
        backgroundImage: `linear-gradient(to bottom, #000000a9 0%, rgba(0, 0, 0, 0) 100%)`,
      }}
    >
      <div className="flex items-center justify-between">
        <ButtonGoBack />
        <UserDropMenu user={session?.user} />
      </div>
    </header>
  );
}

export default StreamHeader;
