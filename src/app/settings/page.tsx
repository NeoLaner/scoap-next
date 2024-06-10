import UserProfile from "./_ui/UserProfile";
import UserDetails from "./_ui/UserDetails";
import Link from "next/link";
import { useUserData } from "../_hooks/useUserData";
import UserEmail from "./_ui/UserEmail";

async function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-8 overflow-y-auto">
      <div className="flex flex-col justify-center gap-8 py-8">
        <div className="flex items-center gap-4 ">
          <UserProfile />
          <div className="flex flex-col gap-2">
            <UserEmail />
            <Link href="/api/auth/signout">logout</Link>
          </div>
        </div>
        <UserDetails />
      </div>
    </div>
  );
}

export default Page;
