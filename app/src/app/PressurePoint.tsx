import Instructions from "./Instructions";
import Items from "./Items";

export default function PressurePoint() {
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
        <Items />
      </div>
    </div>
  );
}
