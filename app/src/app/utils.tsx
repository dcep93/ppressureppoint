import { ItemType } from "./Items";

export const defaultSettings = {
  category: null,
  timer: 10,
  audio: 0,
  challenge: null,
};

export type SettingsType = {
  category: string | null;
  timer: number;
  audio: number;
  challenge: { t: number; items: ItemType[] } | null;
};

export type AnswerType = {
  value: string;
  latency: number;
};

export const DATE_OFFSET = 1743112004047;

export function getHashSettings(): SettingsType {
  function hashToState(hash: string): SettingsType {
    if (!hash) {
      return defaultSettings;
    }
    var parsed = {};
    try {
      parsed = JSON.parse(atob(hash));
    } catch (e) {
      console.log("error caught", { e, hash });
      console.error(e);
    }
    return { ...defaultSettings, ...parsed };
  }
  const s = hashToState(window.location.hash.slice(1));
  return { ...defaultSettings, ...s };
}

export function stateToHash(state: SettingsType): string {
  return `/#${btoa(JSON.stringify(state))}`;
}
