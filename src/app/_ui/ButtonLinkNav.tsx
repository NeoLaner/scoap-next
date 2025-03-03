"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

function ButtonLinkNav({
  name,
  Icon,
  IconActive,
  href,
}: {
  name: string;
  href: string;
  Icon: ReactNode;
  IconActive: ReactNode;
}) {
  const pathname = usePathname();
  const active =
    pathname.split("/").filter((str) => "/" + str === href).length > 0;
  pathname.split("/");

  return (
    <Link
      href={href}
      className={` hover:text-solid-primary-2 flex h-16 w-16 flex-col items-center rounded-lg p-2 py-2 transition-all ${active ? "text-primary" : "text-foreground"} `}
    >
      {active ? IconActive : Icon}

      <p className=" pt-[0.2rem] text-xs font-semibold">{name}</p>
    </Link>
  );
}

export default ButtonLinkNav;
