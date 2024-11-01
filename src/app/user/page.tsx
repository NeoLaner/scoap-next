import { api } from "~/trpc/server";
import Test from "./_ui/Sources";

async function page() {
  const srcs = await api.user.getAllSrcByDomain();
  console.log(srcs);

  return (
    <div>
      <Test />
    </div>
  );
}

export default page;
