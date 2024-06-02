import { getServerAuthSession } from "~/server/auth";
import UserProfile from "./_ui/UserProfile";
import UserDetails from "./_ui/UserDetails";
import Link from "next/link";
import { Separator } from "@radix-ui/react-separator";

async function Page() {
  const session = await getServerAuthSession();
  const user = session?.user;
  if (!user) return null;

  return (
    <div className="flex h-full w-full items-center justify-center gap-8 overflow-y-auto">
      <div className="flex flex-col justify-center gap-8 py-8">
        <div className="flex items-center gap-4 ">
          <UserProfile image={user.image} name={user.name} />
          <div className="flex flex-col gap-2">
            <p>{user.email}</p>
            <Link href="/api/auth/signout">logout</Link>
          </div>
        </div>
        <UserDetails />
      </div>
    </div>
  );
}

export default Page;
