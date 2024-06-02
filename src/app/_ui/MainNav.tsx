import { HiHome, HiOutlineHome } from "react-icons/hi";
import ButtonLinkNav from "./ButtonLinkNav";
import { PiGearFine, PiGearFineBold, PiGearFineFill } from "react-icons/pi";

function MainNav() {
  return (
    <nav className="fixed bottom-0 z-10 h-[72px] w-full bg-app-color-gray-1 md:h-full  md:w-[72px]  md:pt-[72px]">
      <div className="flex h-full w-full items-center justify-around gap-2 px-3 py-1 md:mt-8 md:flex-col md:justify-start md:px-0 md:py-0">
        <ButtonLinkNav
          name="Home"
          href="/home"
          Icon={<HiOutlineHome size={30} />}
          IconActive={<HiHome size={30} />}
        />
        <ButtonLinkNav
          name="Discover"
          href="/Discover"
          Icon={<HiOutlineHome size={30} />}
          IconActive={<HiHome size={30} />}
        />
        <ButtonLinkNav
          name="Addons"
          href="/addons"
          Icon={<HiOutlineHome size={30} />}
          IconActive={<HiHome size={30} />}
        />
        <ButtonLinkNav
          name="Settings"
          href="/settings"
          Icon={<PiGearFine size={30} />}
          IconActive={<PiGearFineFill size={30} />}
        />
      </div>
    </nav>
  );
}

export default MainNav;
