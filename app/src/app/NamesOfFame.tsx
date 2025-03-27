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
      <Instructions />
      <Names />
    </div>
  );
}
