import Instructions from "./Instructions";
import Items from "./Items";
import Settings from "./Settings";

export default function PPressurePPoint() {
  return (
    <div
      style={{
        height: "100vH",
        width: "100vW",
        overflow: "scroll",
        backgroundColor: "grey",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Instructions />
        <Settings />
        <Items />
      </div>
    </div>
  );
}
