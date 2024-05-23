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
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`flex h-16 w-16 flex-col items-center rounded-lg p-2 py-2 transition-all ${active ? "text-primary-10" : "text-gray-12"} `}
    >
      {active ? IconActive : Icon}

      <p className=" text-sm">{name}</p>
    </Link>
  );
}

export default ButtonLinkNav;
