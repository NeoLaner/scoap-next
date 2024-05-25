export interface addon {
  manifest: AddonManifest;
  transportUrl: string;
  installed: boolean;
}

export interface AddonManifest {
  id: string;
  version: string;
  name: string;
  description: string;
  contactEmail?: string;
  background?: string;
  logo?: string;
  types: string[];

  catalogs: Catalog[];

  resources: Array<ResourceClass | ResourceEnum>;
  behaviorHints?: BehaviorHints;
  idPrefixes?: string[];
  icon?: string;
  config?: Config[];
  isFree?: boolean;
  idProperty?: string[];
}

export interface BehaviorHints {
  configurable?: boolean;
  configurationRequired?: boolean;
  adult?: boolean;
}

export interface Catalog {
  id: string;
  type: Type;
  name?: string;
  extra?: Extra[];
  extraSupported?: ExtraSupported[];
  genres?: string[];
}

export interface Extra {
  name: ExtraSupported;
  isRequired?: boolean;
  options?: string[];
}

export type ExtraSupported = "search" | "skip" | "genre";

export type Type = "movie" | "series" | "music";

export interface Config {
  key: string;
  type: string;
  title: string;
}

export interface ResourceClass {
  name: ResourceEnum;
  types: Type[];
  idPrefixes: string[];
}

export type ResourceEnum = "catalog" | "stream" | "meta";
