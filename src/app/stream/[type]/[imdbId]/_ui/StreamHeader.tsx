import UserDropMenu from "~/app/_ui/UserDropMenu";
import { getServerAuthSession } from "~/server/auth";
import ButtonGoBack from "./ButtonGoBack";

async function StreamHeader() {
  const session = await getServerAuthSession();
  if (!session) return null;
  return (
    <header className="absolute top-0 z-[999] w-full p-4 pt-8  md:p-8">
      <div className="z-50 flex items-center justify-between">
        <ButtonGoBack />
        <UserDropMenu user={session?.user} />
      </div>
    </header>
  );
}

export default StreamHeader;
