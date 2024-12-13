import { api } from "~/trpc/server";
import Sources from "./_ui/Sources";

import { getServerAuthSession } from "~/server/auth";

async function page() {
  const user = await getServerAuthSession();
  if (!user?.user.id) return <div>Login</div>;

  return (
    <div>
      <Sources />
    </div>
  );
}

export default page;
