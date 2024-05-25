import { type ReactNode } from "react";
import AddonsLayout from "../_ui/AddonsLayout";

function Layout({ children }: { children: ReactNode }) {
  return (
    <AddonsLayout>
      <section className="h-full w-full">{children}</section>
    </AddonsLayout>
  );
}

export default Layout;
