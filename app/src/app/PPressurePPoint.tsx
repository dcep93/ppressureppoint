import { createRef } from "react";
import Instructions from "./Instructions";
import Items from "./Items";
import recorded_sha from "./recorded_sha";
import Settings from "./Settings";

export default function PPressurePPoint() {
  console.log(recorded_sha);
  const firstRef = createRef<HTMLInputElement>();
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
        <Settings selectFirstRef={() => firstRef.current?.focus()} />
        <Items firstRef={firstRef} />
      </div>
    </div>
  );
}
