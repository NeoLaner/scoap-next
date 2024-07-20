import BgLogo from "./BgLogo";

async function BgLogoBox({ className }: { className?: string }) {
  return (
    <div className="relative h-full">
      <BgLogo className={className} />
    </div>
  );
}

export default BgLogoBox;
