export type MetaInfo = {
  awards: string;
  cast: string[];
  country: string;
  description: string;
  director: string[];
  dvdRelease: string;
  genre: string[];
  imdbRating: string;
  imdb_id: string;
  moviedb_id: number;
  name: string;
  popularity: number;
  poster: string;
  released: string;
  runtime: string;
  trailers: Trailer[];
  type: string;
  writer: string[];
  year: string;
  background: string;
  logo: string;
  popularities: {
    moviedb: number;
    stremio: number;
    trakt: number;
    stremio_lib: number;
  };
  slug: string;
  id: string;
  genres: string[];
  releaseInfo: string;
  videos: any[];
  trailerStreams: TrailerStream[];
  links: Link[];
  behaviorHints: {
    defaultVideoId: string;
    hasScheduledVideos: boolean;
  };
};

type Trailer = {
  source: string;
  type: string;
};

type TrailerStream = {
  title: string;
  ytId: string;
};

type Link = {
  name: string;
  category: string;
  url: string;
};
