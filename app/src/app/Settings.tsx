import { useState } from "react";
import suggestions, { Domain } from "./suggestions";

const defaultSettings = {
  category: null,
  timer: 0,
  challenge: null,
};

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
  const [sessionSettings, updateSessionSettings] = useState<SettingsType>({
    category: null,
    timer: 0,
    challenge: null,
  });

  function CategoryButton() {
    return (
      <button disabled={!sessionSettings.category}>
        {sessionSettings.category || "no category"}
      </button>
    );
  }

  const [domain, updateDomain] = useState(Domain.ANY);
  const [categoryInput, updateCategoryInput] = useState("");
  return (
    <div>
      <div>
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
              }
            >
              suggest
            </button>
          </div>
        </div>
        <div>
          <form
            onSubmit={(e) =>
              Promise.resolve()
                .then(() => e.preventDefault())
                .then(() => alert("categoryInput"))
            }
          >
            <div>
              category:{" "}
              <input
                value={categoryInput}
                onChange={(e) => updateCategoryInput(e.target.value)}
                style={{ width: "6em" }}
              />{" "}
              <CategoryButton />
            </div>
          </form>
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
