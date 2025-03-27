import Instructions from "./Instructions";
import Names from "./Names";

export default function NamesOfFame() {
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
        <Names />
      </div>
    </div>
  );
}
