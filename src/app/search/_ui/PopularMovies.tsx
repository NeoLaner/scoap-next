import StremioService from "~/app/_services/stremIo/stremIoServices";
import PopularMedias from "~/app/_ui/PopularMedias";

async function PopularMovies({ params }: { params: { searchInput: string } }) {
  const { searchInput } = params;
  const searchMovieData = await StremioService.searchMovies(searchInput);

  return <PopularMedias items={searchMovieData} heading="Popular Movies" />;
}

export default PopularMovies;
