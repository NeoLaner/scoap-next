import PopularMedias from "./_ui/popularMedias";
import StremioService from "../services/stremIo/stremIoServices";

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

export default async function Home() {
  const popularMovies = await StremioService.getPopularMovies();
  const popularSeries = await StremioService.getPopularSeries();

  return (
    <div className="space-y-10 px-10 pt-20">
      <PopularMedias items={popularMovies} heading="Popular Movies" />
      <PopularMedias items={popularSeries} heading="Popular Series" />
    </div>
  );
}
