/* eslint-disable */
//@ts-nocheck
import AddonClient from "stremio-addon-client";

const AddonService = {
  createCollection(addons) {
    const col = AddonClient.AddonCollection();

    addons.map((descriptor) => col.add(AddonClient.fromDescriptor(descriptor)));

    const filter = (manifest, resource, prefix = null) => {
      const { id, idPrefixes, resources, types } = manifest;
      return (
        (id !== "community.peario" &&
          (prefix ? idPrefixes && idPrefixes.includes(prefix) : true) &&
          resources &&
          resources.includes(resource) &&
          (types.includes("movie") || types.includes("series"))) ||
        resources.find(
          ({ name, idPrefixes, types }) =>
            name === resource &&
            (prefix ? idPrefixes && idPrefixes.includes(prefix) : true) &&
            types &&
            (types.includes("movie") || types.includes("series")),
        )
      );
    };

    const streams = col
      .getAddons()
      .filter(({ manifest }) => filter(manifest, "stream", "tt"));
    const subtitles = col
      .getAddons()
      .filter(({ manifest }) => filter(manifest, "subtitles"));

    return {
      streams,
      subtitles,
    };
  },

  async detectFromURL(url: string) {
    const { addon } = (await AddonClient.detectFromURL(url)) as {
      addon: Addon;
    };
    return addon;
  },

  async getStreams(collection: any[], type: string, id: string) {
    return (
      await Promise.all(
        collection.map(async (addon) => {
          try {
            const { streams } = await addon.get("stream", type, id);
            const { icon, logo } = addon.manifest;
            return streams.map((stream) => {
              const { infoHash, url } = stream;
              const type = infoHash
                ? "Torrent"
                : url
                  ? url.split(":")[0].toUpperCase()
                  : null;
              return {
                ...stream,
                icon: icon || logo,
                type,
                addon,
              };
            });
          } catch (e) {
            return [];
          }
        }),
      )
    ).flat();
  },

  async getSubtitles(collection, type, id) {
    return (
      await Promise.all(
        collection.map(async (addon) => {
          try {
            const { subtitles } = await addon.get("subtitles", type, id);
            return subtitles;
          } catch (e) {
            return [];
          }
        }),
      )
    )
      .filter((sub) => sub)
      .flat();
  },
};

export default AddonService;
