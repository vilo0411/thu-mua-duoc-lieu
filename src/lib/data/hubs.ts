import type { WikiHub } from "../../types";

const modules = import.meta.glob<{ default: WikiHub }>(
  "../../../content/wiki-hub/*.json",
  { eager: true },
);

export const WIKI_HUBS: WikiHub[] = Object.values(modules).map((m) => m.default);

export const getHubByHerbSlug = (herbSlug: string): WikiHub | undefined =>
  WIKI_HUBS.find((h) => h.herbSlug === herbSlug);

export const getHubById = (id: string): WikiHub | undefined =>
  WIKI_HUBS.find((h) => h.id === id);
