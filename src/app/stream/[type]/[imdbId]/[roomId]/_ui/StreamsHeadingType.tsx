import { Separator } from "~/components/ui/separator";

export function StreamsHeadingType({ heading }: { heading: string }) {
  return (
    <>
      <div className="relative w-full">
        <Separator />
        <p className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs uppercase">
          {heading}
        </p>
      </div>
    </>
  );
}
