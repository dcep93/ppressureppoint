import { createRef, useState } from "react";
import Instructions from "./Instructions";
import Items, { ItemType } from "./Items";
import recorded_sha from "./recorded_sha";
import Settings from "./Settings";
import ShareLink from "./ShareLink";
import { bubbleStyle, getHashSettings } from "./utils";

console.log(recorded_sha);

export default function PPressurePPoint() {
  const firstRef = createRef<HTMLInputElement>();
  const [reveal, updateReveal] = useState(0);
  const initialSettings = getHashSettings();
  const [sessionSettings, updateSessionSettings] = useState(initialSettings);
  const [items, updateItems] = useState<ItemType[]>([]);
  const [challengeRevealed, updateChallengeRevealed] = useState(false);
  console.log({ initialSettings });
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
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        // crossorigin="anonymous"
      />
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
            maxWidth: "35em",
          }}
        >
          <Instructions />
          <div style={{ ...bubbleStyle, backgroundColor: "white" }}>
            <h3>SETTINGS</h3>
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
                  .then(() => updateReveal(Date.now()))
                  .then(() => updateItems([]))
                  .then(() => updateChallengeRevealed(false))
              }
              triggerTimer={() =>
                updateChallengeRevealed(
                  sessionSettings.category === initialSettings.category
                )
              }
            />
          </div>
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
