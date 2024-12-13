import { HiHome, HiOutlineHome } from "react-icons/hi";
import ButtonLinkNav from "./ButtonLinkNav";
import {
  PiBooks,
  PiBooksFill,
  PiGearFine,
  PiGearFineFill,
  PiNotebook,
  PiNotebookFill,
} from "react-icons/pi";

function MainNav() {
  return (
    <nav className="fixed bottom-0 z-10 h-[72px] w-full bg-background md:h-full  md:w-[72px]  md:pt-[72px]">
      <div className="flex h-full w-full items-center justify-around gap-2 px-3 py-1 md:mt-8 md:flex-col md:justify-start md:px-0 md:py-0">
        <ButtonLinkNav
          name="Home"
          href="/home"
          Icon={<HiOutlineHome size={28} />}
          IconActive={<HiHome size={28} />}
        />
        <ButtonLinkNav
          name="Collections"
          href="/collections"
          Icon={<PiBooks size={28} />}
          IconActive={<PiBooksFill fill="red" size={28} />}
        />
        {/* <ButtonLinkNav
          name="Discover"
          href="/Discover"
          Icon={<HiOutlineHome size={28} />}
          IconActive={<HiHome size={28} />}
        /> */}
        <ButtonLinkNav
          name="Help"
          href="/help"
          Icon={<PiNotebook size={28} />}
          IconActive={<PiNotebookFill size={28} />}
        />
        <ButtonLinkNav
          name="Settings"
          href="/settings"
          Icon={<PiGearFine size={28} />}
          IconActive={<PiGearFineFill size={28} />}
        />
      </div>
    </nav>
  );
}

export default MainNav;
