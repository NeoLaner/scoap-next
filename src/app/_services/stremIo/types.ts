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
  videos: Video[];
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

// probe media
export interface ProbeResponse {
  format: Format;
  streams: MediaTrack[];
  samples: undefined;
}

export interface Format {
  name: string;
  duration: number;
}

//for series
export interface Video {
  name: string;
  season: number;
  number: number;
  firstAired: string;
  tvdb_id: number;
  rating: string;
  overview: string;
  thumbnail: string;
  id: string;
  released: string;
  episode: number;
  description: string;
}

type VideoTrack = {
  id: number;
  index: number;
  track: "video";
  codec: string;
  streamBitRate: number;
  streamMaxBitRate: number;
  startTime: number;
  startTimeTs: number;
  timescale: number;
  width: number;
  height: number;
  frameRate: number;
  numberOfFrames: number | null;
  isHdr: boolean;
  isDoVi: boolean;
  hasBFrames: boolean;
  formatBitRate: number;
  formatMaxBitRate: number;
  bps: number;
  numberOfBytes: number;
  formatDuration: number;
};

type AudioTrack = {
  id: number;
  index: number;
  track: "audio";
  codec: string;
  streamBitRate: number;
  streamMaxBitRate: number;
  startTime: number;
  startTimeTs: number;
  timescale: number;
  sampleRate: number;
  channels: number;
  channelLayout: string;
  title: string;
  language: string;
};

type SubtitleTrack = {
  id: number;
  index: number;
  track: "subtitle";
  codec: string;
  streamBitRate: number;
  streamMaxBitRate: number;
  startTime: number;
  startTimeTs: number;
  timescale: number;
  title: string;
  language: string;
};

export type MediaTrack = VideoTrack | AudioTrack | SubtitleTrack;
