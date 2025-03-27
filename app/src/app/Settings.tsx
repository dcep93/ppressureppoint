export default function Settings() {
  return (
    <SettingsHelper settings={hashToState(window.location.hash.slice(1))} />
  );
}

function SettingsHelper(props: { settings: SettingsType }) {
  return <div>{JSON.stringify(props.settings)}</div>;
}

export type SettingsType = {
  category: string | null;
  timer: number; // negative to flash and audio ping
  challenge: { surpriseCategory: boolean; answers: AnswerType[] } | null;
};

export type AnswerType = {
  value: string;
  latency: number;
  hints: string[];
};

export function stateToHash(state: SettingsType): string {
  return btoa(JSON.stringify(state));
}

export function hashToState(hash: string): SettingsType {
  const defaultSettings: SettingsType = {
    category: null,
    timer: 0,
    challenge: null,
  };
  var parsed = {};
  try {
    parsed = JSON.parse(atob(hash));
  } catch (e) {
    console.error(e);
  }
  return Object.assign(defaultSettings, null, parsed as any);
}
