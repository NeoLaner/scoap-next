import Link from "next/link";
import { HiHome, HiOutlineHome } from "react-icons/hi";

function LinkNav() {
  return (
    <Link
      href="home"
      className="text-gray-12 hover:bg-primary-9 flex h-16 w-16 flex-col items-center rounded-lg p-2 py-2 transition-all "
    >
      <HiOutlineHome size="30" className="" />
      <p className=" text-sm">Home</p>
    </Link>
  );
}

function MainNav() {
  return (
    <nav className="bg-primary-1 fixed bottom-0 z-10 h-[72px] w-full  md:h-full md:w-[72px] md:pt-[72px]">
      <div className="flex h-full w-full items-center justify-around gap-2 px-3 py-1 md:mt-8 md:flex-col md:justify-start md:px-0 md:py-0">
        <LinkNav />
        <LinkNav />
        <LinkNav />
        <LinkNav />
      </div>
    </nav>
  );
}

export default MainNav;
