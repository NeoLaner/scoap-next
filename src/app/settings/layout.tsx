import { type ReactNode } from "react";
import MainLayout from "../_ui/MainLayout";
import ProtectedRoute from "../_ui/ProtectedRoute";
import { Separator } from "../_components/ui/separator";
import MenuButtons from "./_ui/MenuButtons";

function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <MainLayout>
        <section className="relative m-2 my-10 h-full sm:m-6 md:m-20">
          <h1>Settings</h1>
          <div className="mt-10 grid h-full grid-cols-4 gap-3">
            <div className="hidden h-full flex-col rounded-lg bg-card md:flex">
              <div className="text-md p-4">Account settings</div>
              <Separator />
              <MenuButtons />
            </div>

            <div className="col-span-4 col-start-1 rounded-lg bg-card md:col-span-3 md:col-start-2">
              {children}
            </div>
          </div>
        </section>
      </MainLayout>
    </ProtectedRoute>
  );
}

export default Layout;
