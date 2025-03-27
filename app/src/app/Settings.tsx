import { useState } from "react";
import useSound from "use-sound";
import suggestions, { Domain } from "./suggestions";

// @ts-ignore
import beepMp3 from "./mp3/beep.mp3";

const defaultSettings = {
  category: null,
  timer: 10,
  audio: 0,
  challenge: null,
};

export type SettingsType = {
  category: string | null;
  timer: number;
  audio: number;
  challenge: { hint: string; answers: AnswerType[] } | null;
};

export type AnswerType = {
  value: string;
  latency: number;
  hints: string[];
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

export default function Settings() {
  const [sessionSettings, updateSessionSettings] =
    useState<SettingsType>(defaultSettings);
  const [domain, updateDomain] = useState(Domain.ANY);
  const [categoryInput, updateCategoryInput] = useState("");
  const [revealed, updateRevealed] = useState(false);

  const [playSound] = useSound(beepMp3, { volume: sessionSettings.audio });

  function CategoryRevealer() {
    return (
      <button
        onClick={() => Promise.resolve().then(() => updateRevealed(true))}
        disabled={!sessionSettings.category}
      >
        {!sessionSettings.category
          ? "*none*"
          : !revealed
          ? "*reveal*"
          : sessionSettings.category}
      </button>
    );
  }
  return (
    <div style={{ minWidth: "20em" }}>
      <div>
        <div>
          <div style={{ display: "flex" }}>
            <div>
              timer_seconds:{" "}
              <input
                type="number"
                value={sessionSettings.timer}
                onChange={(e) =>
                  updateSessionSettings({
                    ...sessionSettings,
                    timer: parseInt(e.target.value),
                  })
                }
                style={{ width: "2em" }}
              />
            </div>
            <div style={{ width: "1em" }}></div>
            <div>
              <label>
                volume:{" "}
                <input
                  type="number"
                  max={1}
                  step={0.05}
                  value={sessionSettings.audio}
                  onChange={(e) =>
                    Promise.resolve(parseFloat(e.target.value)).then((audio) =>
                      Promise.resolve()
                        .then(() => playSound())
                        .then(() =>
                          updateSessionSettings({
                            ...sessionSettings,
                            audio,
                          })
                        )
                    )
                  }
                  style={{ width: "3.5em" }}
                />
              </label>
            </div>
          </div>
        </div>
        <div>
          <div>
            domain:{" "}
            <select
              style={{ width: "6em" }}
              onChange={(e) =>
                updateDomain(Domain[e.target!.value as any] as any)
              }
            >
              {enumArray(Domain).map((d) => (
                <option key={d}>{Domain[d]}</option>
              ))}
            </select>
            <button
              onClick={(e) =>
                Promise.resolve()
                  .then(() => e.preventDefault())
                  .then(() =>
                    randomFrom(
                      suggestions.filter(
                        (s) => domain === Domain.ANY || s.domain === domain
                      )
                    )
                  )
                  .then((s) =>
                    updateSessionSettings({
                      ...sessionSettings,
                      category: s.value,
                    })
                  )
                  .then(() => updateRevealed(false))
              }
            >
              suggest
            </button>
          </div>
        </div>
        <div>
          <div>
            category:{" "}
            <form
              style={{ display: "inline" }}
              onSubmit={(e) =>
                Promise.resolve()
                  .then(() => e.preventDefault())
                  .then(() =>
                    updateSessionSettings({
                      ...sessionSettings,
                      category: categoryInput,
                    })
                  )
                  .then(() => updateRevealed(false))
              }
            >
              <input
                value={categoryInput}
                onChange={(e) => updateCategoryInput(e.target.value)}
                style={{ width: "6em" }}
              />
            </form>
            <CategoryRevealer />
          </div>
        </div>
      </div>
    </div>
  );
}

function enumArray<X>(enumType: { [k: string]: string | X }): X[] {
  return Object.values(enumType)
    .filter((e) => typeof e === "number")
    .map((e) => e as unknown as number)
    .sort((a, b) => a - b)
    .map((e) => e as unknown as X);
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
