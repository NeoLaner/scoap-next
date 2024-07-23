import { type ReactNode } from "react";
import MainLayout from "../_ui/MainLayout";
import ProtectedRoute from "../_ui/ProtectedRoute";
import { Button } from "../_components/ui/Button";

function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <MainLayout>
        <section className="relative m-2 my-10 h-full sm:m-6 md:m-20">
          <h1>Settings</h1>
          <div className="mt-10 grid h-full grid-cols-4 gap-3">
            <div className="hidden h-full flex-col rounded-lg bg-card p-4 md:flex">
              <Button variant={"ghost"} className="justify-start text-start">
                User profile
              </Button>
              <Button variant={"ghost"} className="justify-start text-start">
                About us
              </Button>
              <Button variant={"ghost"} className="justify-start text-start">
                Privacy&Policy
              </Button>
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
