import { createRef, useState } from "react";
import Instructions from "./Instructions";
import Items, { ItemType } from "./Items";
import recorded_sha from "./recorded_sha";
import Settings from "./Settings";

export default function PPressurePPoint() {
  console.log(recorded_sha);
  const firstRef = createRef<HTMLInputElement>();
  const [reveal, updateReveal] = useState(0);
  const [items, updateItems] = useState<ItemType[]>([]);
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
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Instructions />
        <Settings
          triggerReveal={() =>
            Promise.resolve()
              .then(() => firstRef.current?.focus())
              .then(() => updateReveal(Date.now()))
          }
        />
        <Items
          firstRef={firstRef}
          reveal={reveal}
          items={items}
          updateItems={updateItems}
        />
      </div>
    </div>
  );
}
