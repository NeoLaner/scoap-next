import UserProfile from "./_ui/UserProfile";
import UserDetails from "./_ui/UserDetails";
import UserEmail from "./_ui/UserEmail";
import { getServerAuthSession } from "~/server/auth";
import LoginLogoutBtn from "../../_ui/LoginLogoutBtn";

async function Page() {
  const session = await getServerAuthSession();
  return (
    <div className="flex h-full w-full items-center justify-center gap-8 overflow-y-auto">
      <div className="flex flex-col justify-center gap-8 py-8">
        <div className="flex items-center gap-4 ">
          <UserProfile />
          <div className="flex flex-col gap-2">
            <UserEmail />
            <LoginLogoutBtn
              user={{ image: session?.user.image, name: session?.user.name }}
            />
          </div>
        </div>
        <UserDetails />
      </div>
    </div>
  );
}

export default Page;
