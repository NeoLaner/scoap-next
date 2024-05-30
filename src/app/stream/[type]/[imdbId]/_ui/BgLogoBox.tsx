import BgLogo from "./BgLogo";

async function BgLogoBox({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="relative h-full">
      <BgLogo name={name} logo={logo} />
    </div>
  );
}

export default BgLogoBox;
