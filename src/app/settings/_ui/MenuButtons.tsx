"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

function MenuButtons() {
  return (
    <>
      <MenuButton text="User profile" pathname="/settings/account" />
    </>
  );
}

const MenuButton = ({ text, pathname }: { text: string; pathname: string }) => {
  //eslint-disable-next-line
  const { push } = useRouter();
  const curPathname = usePathname();

  return (
    <Button
      onClick={() => {
        push(pathname);
      }}
      variant={"ghost"}
      className={`w-full justify-start rounded-none text-start ${curPathname === pathname ? "border-l-2 border-primary" : ""}`}
    >
      {text}
    </Button>
  );
};

export default MenuButtons;
