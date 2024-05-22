import Image from "next/image";
import ScrollAreaX from "~/app/_ui/scrollAreaX";

const items = [
  {
    id: "tt5177120",
    title: "The Ministry of Ungentlemanly Warfare",
    image: "https://images.metahub.space/poster/small/tt5177120/img",
  },
  {
    id: "tt12037194",
    title: "Furiosa: A Mad Max Saga",
    image: "https://images.metahub.space/poster/small/tt12037194/img",
  },
  {
    id: "tt10128846",
    title: "Megalopolis",
    image: "https://live.metahub.space/poster/small/tt10128846/img",
  },
  {
    id: "tt9466114",
    title: "The Idea of You",
    image: "https://images.metahub.space/poster/small/tt9466114/img",
  },
  {
    id: "tt16426418",
    title: "Challengers",
    image: "https://images.metahub.space/poster/small/tt16426418/img",
  },
  {
    id: "tt27489557",
    title: "Abigail",
    image: "https://images.metahub.space/poster/small/tt27489557/img",
  },
  {
    id: "tt14539740",
    title: "Godzilla x Kong: The New Empire",
    image: "https://images.metahub.space/poster/small/tt14539740/img",
  },
  {
    id: "tt21064584",
    title: "The Iron Claw",
    image: "https://images.metahub.space/poster/small/tt21064584/img",
  },
  {
    id: "tt15239678",
    title: "Dune: Part Two",
    image: "https://images.metahub.space/poster/small/tt15239678/img",
  },
  {
    id: "tt26047818",
    title: "Anyone But You",
    image: "https://images.metahub.space/poster/small/tt26047818/img",
  },
];

function PopularMovies() {
  return (
    <section className="">
      <h2 className="text-xl font-semibold">Popular Movies</h2>
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

export default PopularMovies;
