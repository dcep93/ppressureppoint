import { ItemType } from "./Items";

export const defaultSettings = {
  category: null,
  timer_s: 10,
  volume: 0,
  challenge: null,
};

export type SettingsType = {
  category: string | null;
  timer_s: number;
  volume: number;
  challenge: ChallengeType;
};

export type ChallengeType = ItemType[] | null;

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
    return { ...defaultSettings, ...parsed, volume: 0 };
  }
  const s = hashToState(window.location.hash.slice(1));
  return { ...defaultSettings, ...s };
}

export function stateToHash(state: SettingsType): string {
  return `/#${btoa(JSON.stringify(state))}`;
}
