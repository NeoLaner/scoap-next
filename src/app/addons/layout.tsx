import { type ReactNode } from "react";
import AddonsLayout from "../_ui/AddonsLayout";

function Layout({ children }: { children: ReactNode }) {
  return (
    <AddonsLayout>
      <section>Addons</section>
    </AddonsLayout>
  );
}

export default Layout;
