import { type ReactNode } from "react";
import AddonsLayout from "../_ui/AddonsLayout";
import ProtectedRoute from "../_ui/ProtectedRoute";

function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <AddonsLayout>
        <section className="h-full w-full">{children}</section>
      </AddonsLayout>
    </ProtectedRoute>
  );
}

export default Layout;
