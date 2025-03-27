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
  challenge: { answers: AnswerType[] } | null;
};

export type AnswerType = {
  value: string;
  latency: number;
};

export function getSettings(): SettingsType {
  const s = hashToState(window.location.hash.slice(1));
  return { ...defaultSettings, ...s };
}

export function stateToHash(state: SettingsType): string {
  return btoa(JSON.stringify(state));
}

export function hashToState(hash: string): SettingsType {
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
