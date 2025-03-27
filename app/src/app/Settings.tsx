import { Domain } from "./suggestions";

export default function Settings() {
  return <SettingsHelper settings={getSettings()} />;
}

export function getSettings(): SettingsType {
  return hashToState(window.location.hash.slice(1));
}

function SettingsHelper(props: { settings: SettingsType }) {
  return (
    <div>
      <div>{JSON.stringify(props.settings)}</div>
      <div>
        <form onChange={(e) => console.log(e)}>
          <div>
            <div>
              category:{" "}
              <input style={{ width: "3em", backgroundColor: "#cccccc" }} />
            </div>
            <div>
              domain:{" "}
              <select style={{ width: "6em" }}>
                {enumArray(Domain).map((d) => (
                  <option key={d}>{Domain[d]}</option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export type SettingsType = {
  category: string | null;
  timer: number; // negative to flash and audio ping
  challenge: { hint: string; answers: AnswerType[] } | null;
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
  return Object.assign(defaultSettings, null, parsed as any);
}

function enumArray<X>(enumType: { [k: string]: string | X }): X[] {
  return Object.values(enumType)
    .filter((e) => typeof e === "number")
    .map((e) => e as unknown as number)
    .sort((a, b) => a - b)
    .map((e) => e as unknown as X);
}
