/* eslint-disable */
import axios from "axios";
import {
  CINEMETA_URL,
  OPENSUBTITLES_URL,
  STREMIO_API_URL,
  STREMIO_STREAMING_SERVER,
} from "~/app/_config/API";
import { ProbeResponse, type MetaInfo } from "./types";
import { type HLSSrc, type VideoSrc } from "@vidstack/react";

function generateRandomId(): string {
  const characters = "0123456789abcdef";
  let result = "";
  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

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

  // async createTorrentStream(stream: { infoHash: string; fileIdx: number }) {
  //   let { infoHash, fileIdx = null } = stream;
  //   const { data } = await axios.get(
  //     `${STREMIO_STREAMING_SERVER}/${infoHash}/create`,
  //   );
  //   const { files } = data;
  //   if (!fileIdx)
  //     fileIdx = files.indexOf(
  //       //@ts-ignore
  //       files.sort((a, b) => a.length - b.length).reverse()[0],
  //     );
  //   return `${STREMIO_STREAMING_SERVER}/${infoHash}/${fileIdx}`;
  // },

  async createTorrentStream(stream: {
    infoHash: string;
    fileIdx: number;
  }): Promise<VideoSrc | HLSSrc> {
    let { infoHash, fileIdx = null } = stream;
    const { data } = (await axios.get(
      `http://127.0.0.1:11470/hlsv2/probe?mediaURL=http://127.0.0.1:11470/${infoHash}/${fileIdx}`,
    )) as { data: ProbeResponse };

    if (
      data.format.name.split(",").filter((format) => format === "mp4").length >
      0
    ) {
      const type = "video/mp4";
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
      return {
        type,
        src: `${STREMIO_STREAMING_SERVER}/${infoHash}/${fileIdx}`,
      };
    } else {
      const randomId = generateRandomId();
      return {
        type: "application/mpegurl",
        // src: `http://127.0.0.1:11470/hlsv2/d6a27e2395785e62b3cd21688b358f1e/master.m3u8?mediaURL=http%3A%2F%2F127.0.0.1%3A11470%2F${infoHash}%2F${fileIdx}&videoCodecs=h264&videoCodecs=h265&videoCodecs=hevc&audioCodecs=aac&audioCodecs=mp3&audioCodecs=opus&maxAudioChannels=2`,
        src: `http://127.0.0.1:11470/hlsv2/${randomId}/master.m3u8?mediaURL=http%3A%2F%2F127.0.0.1%3A11470%2F${infoHash}%2F${fileIdx}`,
        // src: `http://127.0.0.1:11470/hlsv2/0017ec9182a4cd6fb35bf0cc00f258a5/master.m3u8?mediaURL=http%3A%2F%2F127.0.0.1%3A11470%2Fea704f6e0d91240ac0aa797c1d966f2f287b871e%2F0`,
      } as HLSSrc;
    }
  },

  async getStats(streamUrl: string) {
    const { data } = await axios.get(`${streamUrl}/stats.json`);

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
