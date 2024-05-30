import BgMedia from "./BgMedia";

async function BgMediaBox({
  background,
  name,
}: {
  background: string;
  name: string;
}) {
  return (
    <div>
      <BgMedia background={background} name={name} />
    </div>
  );
}

export default BgMediaBox;
