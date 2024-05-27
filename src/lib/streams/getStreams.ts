export interface TorrentIoResponse {
  streams: Stream[];
  cacheMaxAge: number;
  staleRevalidate: number;
  staleError: number;
}

export interface Stream {
  name: string;
  title: string;
  infoHash: string;
  fileIdx: number;
  behaviorHints: BehaviorHints;
  sources?: string[];
}

export interface BehaviorHints {
  bingeGroup: string;
}

export async function getStreamsFromTorrentIo(type: string, imdbId: string) {
  // https://torrentio.strem.fun/stream/movie/tt5177120.json
  const url = `https://torrentio.strem.fun/stream/${type}/${imdbId}.json`;

  const res = await fetch(url);

  const data = (await res.json()) as TorrentIoResponse;

  return data.streams.map((stream) => {
    const extractData = extractTorrentInfo(stream.title);

    return {
      ...extractData,
      ...stream,
    };
  });
}

export type GetStreamsFromTorrentIo = Awaited<
  ReturnType<typeof getStreamsFromTorrentIo>
>;

interface TorrentInfo {
  seeds: number | null;
  size: string | null;
  server: string | null;
}

export function extractTorrentInfo(title: string): TorrentInfo {
  // Enhanced Regular Expressions
  const seedsRegex = /👤\s*(\d+)/;
  const sizeRegex = /💾\s*([\d.]+\s*[A-Za-z]+)/;
  const serverRegex = /⚙️\s*([^\n]+)/;

  // Match the regular expressions
  const seedsMatch = title.match(seedsRegex);
  const sizeMatch = title.match(sizeRegex);
  const serverMatch = title.match(serverRegex);

  // Return an object with potentially null values for fields that couldn't be matched
  return {
    seeds: seedsMatch ? parseInt(seedsMatch[1].trim(), 10) : null,
    size: sizeMatch ? sizeMatch[1].trim() : null,
    server: serverMatch ? serverMatch[1].trim() : null,
  };
}

// Test the function with the provided strings
