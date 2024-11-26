import { Suspense, type ReactNode } from "react";
import MainLayout from "../_ui/MainLayout";
import { Separator } from "~/components/ui/separator";
import MenuButtons from "./_ui/MenuButtons";
import { ScrollArea } from "~/components/ui/scroll-area";

function Layout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      <ScrollArea className="h-full" type="auto">
        <section className="relative m-2 my-10 h-fit sm:m-6 md:m-20">
          <h1>Help</h1>
          <div className="mt-10 grid h-full grid-cols-4 gap-3">
            <div className="hidden h-fit flex-col rounded-lg bg-card md:flex">
              <div className="text-md p-4">Help</div>
              <Separator />
              <MenuButtons />
            </div>

            <div className="col-span-4 col-start-1 mb-4 rounded-lg bg-card md:col-span-3 md:col-start-2">
              <Suspense fallback={<div>loading</div>}>{children}</Suspense>
            </div>
          </div>
        </section>
      </ScrollArea>
    </MainLayout>
  );
}

export default Layout;
