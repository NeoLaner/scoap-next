import LogoSVG from "./logoSVG";
import UserProfile from "./userProfile";

function MainHeader() {
  return (
    <header className="fixed z-20  h-[72px] w-full  bg-black">
      <div className="flex h-full w-full items-center justify-between px-4">
        {/* LOGO */}
        <LogoSVG fill="red" />
        {/* SEARCH */}
        <input className="w-32" />
        {/* USER PROFILE */}
        <UserProfile />
      </div>
    </header>
  );
}

export default MainHeader;
