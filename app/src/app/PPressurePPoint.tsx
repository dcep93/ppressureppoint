import { createRef, useState } from "react";
import Instructions from "./Instructions";
import Items, { ItemType } from "./Items";
import recorded_sha from "./recorded_sha";
import Settings from "./Settings";
import ShareLink from "./ShareLink";
import { DATE_OFFSET, getHashSettings } from "./utils";

export default function PPressurePPoint() {
  console.log(recorded_sha);
  const firstRef = createRef<HTMLInputElement>();
  const [reveal, updateReveal] = useState(0);
  const initialSettings = getHashSettings();
  const [sessionSettings, updateSessionSettings] = useState(initialSettings);
  const [items, updateItems] = useState<ItemType[]>([]);
  const [challengeRevealed, updateChallengeRevealed] = useState(true);
  return (
    <div
      style={{
        height: "100vH",
        width: "100vW",
        overflow: "scroll",
        backgroundColor: "grey",
        fontSize: "x-large",
      }}
    >
      <style>
        {`
        input,option,select,button {
          font-size: large;
        }
        `}
      </style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "35em",
          }}
        >
          <Instructions />
          <ShareLink
            sessionSettings={sessionSettings}
            items={items}
            reveal={reveal}
          />
          <Settings
            sessionSettings={sessionSettings}
            updateSessionSettings={updateSessionSettings}
            triggerReveal={() =>
              Promise.resolve()
                .then(() => firstRef.current?.focus())
                .then(() => updateReveal(Date.now() - DATE_OFFSET))
                .then(() => updateItems([]))
                .then(() => updateChallengeRevealed(false))
            }
            triggerTimer={() =>
              updateChallengeRevealed(
                sessionSettings.category === initialSettings.category
              )
            }
          />
          <Items
            firstRef={firstRef}
            reveal={reveal}
            items={items}
            updateItems={updateItems}
            challenge={!challengeRevealed ? null : sessionSettings.challenge}
          />
        </div>
      </div>
    </div>
  );
}
