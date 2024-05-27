import { type ReactNode } from "react";

async function layout({
  params,
}: {
  params: { roomId: string };
  children: ReactNode;
}) {
  const { roomId } = params;
  return (
    <section className="relative h-full w-full overflow-hidden">
      {roomId}
    </section>
  );
}

export default layout;
