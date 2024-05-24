import StremioService from "~/app/_services/stremIo/stremIoServices";
import PopularMedias from "~/app/_ui/PopularMedias";

async function PopularMovies() {
  const popularMovies = await StremioService.getPopularMovies();
  return <PopularMedias items={popularMovies} heading="Popular Movies" />;
}

export default PopularMovies;
