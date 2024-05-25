/* eslint-disable */
import axios from "axios";
import {
  CINEMETA_URL,
  OPENSUBTITLES_URL,
  STREMIO_API_URL,
  STREMIO_STREAMING_SERVER,
} from "~/app/_config/API";
import { type MetaInfo } from "./types";

export type MovieSearchResult = {
  id: string;
  imdb_id: string;
  type: string;
  name: string;
  releaseInfo: string;
  poster: string;
  links: any[]; // Adjust this type if you know the specific structure of the links
  behaviorHints: {
    defaultVideoId: string;
    hasScheduledVideos: boolean;
  };
};

const StremioService = {
  async isServerOpen() {
    try {
      await axios.get(`${STREMIO_STREAMING_SERVER}/stats.json`);
      return Promise.resolve(true);
    } catch (e) {
      return Promise.resolve(false);
    }
  },

  async getPopularMovies() {
    const { data } = (await axios.get(
      `${CINEMETA_URL}/catalog/movie/top.json`,
    )) as unknown as {
      data: {
        metas: MetaInfo[];
      };
    };
    return data.metas;
  },

  async getPopularSeries() {
    const { data } = (await axios.get(
      `${CINEMETA_URL}/catalog/series/top.json`,
    )) as unknown as {
      data: {
        metas: MetaInfo[];
      };
    };
    return data.metas;
  },

  async getMetaSeries(imdbId: string) {
    const { data } = await axios.get(
      `${CINEMETA_URL}/meta/series/${imdbId}.json`,
    );
    return data.meta as MetaInfo;
  },

  async getMetaMovie(imdbId: string) {
    const { data } = await axios.get(
      `${CINEMETA_URL}/meta/movie/${imdbId}.json`,
    );
    return data.meta as MetaInfo;
  },

  async searchMovies(title: string) {
    const { data } = (await axios.get(
      `${CINEMETA_URL}/catalog/movie/top/search=${title}.json`,
    )) as unknown as {
      data: {
        metas: MovieSearchResult[];
      };
    };
    return data.metas;
  },

  async searchSeries(title: string) {
    const { data } = (await axios.get(
      `${CINEMETA_URL}/catalog/series/top/search=${title}.json`,
    )) as unknown as {
      data: {
        metas: MovieSearchResult[];
      };
    };
    return data.metas;
  },

  async getAddons() {
    const { data } = await axios.get(
      `${STREMIO_API_URL}/addonscollection.json`,
    );
    return data;
  },

  async createTorrentStream(stream: { infoHash: string; fileIdx: number }) {
    let { infoHash, fileIdx = null } = stream;
    const { data } = await axios.get(
      `${STREMIO_STREAMING_SERVER}/${infoHash}/create`,
    );
    const { files } = data;
    if (!fileIdx)
      fileIdx = files.indexOf(
        //@ts-ignore
        files.sort((a, b) => a.length - b.length).reverse()[0],
      );
    return `${STREMIO_STREAMING_SERVER}/${infoHash}/${fileIdx}`;
  },

  async getStats(streamUrl: string) {
    const { data } = await axios.get(`${streamUrl}/stats.json`);
    console.log(data);

    return data;
  },

  async getSubtitles({
    type,
    id,
    url,
  }: {
    type: string;
    id: string;
    url: string;
  }) {
    try {
      const { hash } = await getOpenSubInfo(url);
      return queryOpenSubtitles({
        type,
        id,
        videoHash: hash,
      });
    } catch (_) {
      return [];
    }
  },
};

async function getOpenSubInfo(streamUrl: string) {
  const { data } = await axios.get(
    `${STREMIO_STREAMING_SERVER}/opensubHash?videoUrl=${streamUrl}`,
  );
  const { result } = data;
  return result;
}

async function queryOpenSubtitles({
  type,
  id,
  videoHash,
}: {
  type: string;
  id: string;
  videoHash: string;
}) {
  const { data } = await axios.get(
    `${OPENSUBTITLES_URL}/subtitles/${type}/${id}/videoHash=${videoHash}.json`,
  );
  const { subtitles } = data;
  return subtitles;
}

export default StremioService;
