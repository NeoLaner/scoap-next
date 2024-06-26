import Link from "next/link";
import { usePathname } from "next/navigation";

function StreamsMenuFooter() {
  const pathname = usePathname();
  return (
    <Link href={pathname} className="p-4">
      X
    </Link>
  );
}

export default StreamsMenuFooter;
