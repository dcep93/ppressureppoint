import { ItemType } from "./Items";
import saved_challenges from "./saved_challenges";

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
  const savedChallenge = saved_challenges[window.location.pathname.slice(1)];
  if (savedChallenge !== undefined) {
    return savedChallenge;
  }
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

export const bubbleStyle = {
  display: "inline-block",
  borderRadius: "1em",
  border: "2px solid black",
  padding: "0.7em",
  margin: "0.5em",
};
