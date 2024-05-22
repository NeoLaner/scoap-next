import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi";

function MainNav() {
  return (
    <nav className="fixed bottom-0 z-10 h-[72px] w-full bg-black md:h-full md:w-[72px] md:pt-[72px]">
      <div className="flex h-full  w-full items-center md:mt-8 md:flex-col">
        <Link
          href="home"
          className="flex h-16 w-16 flex-col items-center rounded-lg p-2 py-2 transition-all hover:bg-red-900 "
        >
          <HiOutlineHome size="30" />
          <p className="text-sm">Home</p>
        </Link>
      </div>
    </nav>
  );
}

export default MainNav;
