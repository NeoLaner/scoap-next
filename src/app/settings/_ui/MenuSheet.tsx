import { Button } from "~/app/_components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/app/_components/ui/sheet";
import MenuButtons from "./MenuButtons";

function MenuSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open</Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-full p-0">
        <MenuButtons />
      </SheetContent>
    </Sheet>
  );
}

export default MenuSheet;
