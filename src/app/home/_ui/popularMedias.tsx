import Image from "next/image";
import ScrollAreaX from "~/app/_ui/scrollAreaX";

function PopularMedias({
  heading,
  items,
}: {
  heading: string;
  items: {
    title: string;
    image: string;
    id: string;
  }[];
}) {
  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">{heading}</h2>
        <div>See All</div>
      </div>
      <ScrollAreaX>
        <div className="flex min-w-0 shrink grow basis-0 gap-4 overflow-x-auto py-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-4">
              <div className="relative h-48 w-36">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <div className="text-center text-xs font-medium">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </ScrollAreaX>
    </section>
  );
}

export default PopularMedias;
