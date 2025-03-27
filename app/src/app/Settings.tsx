import { useState } from "react";
import useSound from "use-sound";
import suggestions, { Domain } from "./suggestions";

import { SettingsType } from "./utils";

// @ts-ignore
import beepMp3 from "./mp3/beep.mp3";

const BLACKOUT_DURATION_MS = 1000;

const seenCategories: string[] = [];

export default function Settings(props: {
  triggerReveal: () => void;
  triggerTimer: () => void;
  sessionSettings: SettingsType;
  updateSessionSettings: (_sessionSettings: SettingsType) => void;
}) {
  const [domain, updateDomain] = useState(Domain.ANY);
  const [timeout, updateTimeout] = useState<NodeJS.Timeout | null>(null);
  const [blackout, updateBlackout] = useState(false);

  const [playSound] = useSound(beepMp3, {
    volume: props.sessionSettings.volume,
  });

  function setTimeoutHook() {
    Promise.resolve()
      .then(() =>
        setTimeout(triggerTimer, props.sessionSettings.timer_s * 1000)
      )
      .then((createdTimeout) => updateTimeout(createdTimeout))
      .then(props.triggerReveal);
  }

  function clearTimeoutHook() {
    Promise.resolve()
      .then(() => clearTimeout(timeout!))
      .then(() => updateTimeout(null));
  }

  function triggerTimer() {
    playSound();
    updateBlackout(true);
    setTimeout(() => updateBlackout(false), BLACKOUT_DURATION_MS);
    props.triggerTimer();
  }

  function Blackout() {
    return !blackout ? null : (
      <div
        style={{
          position: "fixed",
          backgroundColor: "black",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        blackout
      </div>
    );
  }

  function TimerSettings() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <div>
            timer_seconds:{" "}
            <input
              type="number"
              value={props.sessionSettings.timer_s}
              onChange={(e) =>
                props.updateSessionSettings({
                  ...props.sessionSettings,
                  timer_s: parseInt(e.target.value),
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
                value={props.sessionSettings.volume}
                onChange={(e) =>
                  Promise.resolve(parseFloat(e.target.value)).then((volume) =>
                    Promise.resolve()
                      .then(() => playSound())
                      .then(() =>
                        props.updateSessionSettings({
                          ...props.sessionSettings,
                          volume,
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
    );
  }

  function DomainSettings() {
    return (
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
                    suggestions
                      .filter(
                        (s) => domain === Domain.ANY || s.domain === domain
                      )
                      .map((s) => s.value)
                  )
                )
                .then((category) =>
                  props.updateSessionSettings({
                    ...props.sessionSettings,
                    category,
                  })
                )
                .then(clearTimeoutHook)
            }
          >
            suggest
          </button>
        </div>
      </div>
    );
  }

  function CategorySettings() {
    const [categoryInput, updateCategoryInput] = useState("");
    return (
      <div>
        <div>
          category:{" "}
          <form
            style={{ display: "inline" }}
            onSubmit={(e) =>
              Promise.resolve()
                .then(() => e.preventDefault())
                .then(() =>
                  props.updateSessionSettings({
                    ...props.sessionSettings,
                    category: categoryInput,
                  })
                )
                .then(clearTimeoutHook)
            }
          >
            <input
              value={categoryInput}
              onChange={(e) => updateCategoryInput(e.target.value)}
              style={{ width: "6em" }}
            />
          </form>
          <button
            onClick={() =>
              timeout !== null || props.sessionSettings.timer_s === 0
                ? clearTimeoutHook()
                : setTimeoutHook()
            }
            disabled={!props.sessionSettings.category}
          >
            {!props.sessionSettings.category
              ? "*none*"
              : timeout === null
              ? "*reveal*"
              : props.sessionSettings.category}
          </button>
          {!props.sessionSettings.category || timeout !== null ? null : (
            <button onClick={() => updateTimeout(setTimeout(() => null))}>
              *preview*
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Blackout />
        <TimerSettings />
        <DomainSettings />
        <CategorySettings />
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

function randomFrom(possibleCategories: string[]): string {
  const c = possibleCategories
    .map((c) => ({
      c,
      s: Math.random() + (seenCategories.includes(c) ? 1 : 0),
    }))
    .sort((a, b) => a.s - b.s)[0].c;
  seenCategories.push(c);
  return c;
}
