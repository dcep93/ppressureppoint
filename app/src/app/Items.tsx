import { RefObject, useState } from "react";
import { ChallengeType } from "./utils";

export type ItemType = { c: string; t: number };

export default function Items(props: {
  reveal: number;
  firstRef: RefObject<HTMLInputElement | null>;
  items: ItemType[];
  updateItems: (_items: ItemType[]) => void;
  challenge: ChallengeType;
}) {
  function Item(pprops: { item: ItemType; i: number }) {
    const [c, updateC] = useState(pprops.item.c);
    return (
      <div style={{ display: "flex" }}>
        <form
          onSubmit={(e) =>
            Promise.resolve()
              .then(() => e.preventDefault())
              .then(() =>
                !c
                  ? null
                  : Promise.resolve(Date.now()).then((t) =>
                      props.updateItems(
                        pprops.item.t === 0
                          ? props.items.concat({
                              t,
                              c,
                            })
                          : props.items
                              .splice(pprops.i, 1, { ...pprops.item, t, c })
                              .slice(1)
                              .concat(props.items)
                      )
                    )
              )
          }
        >
          <div style={{ display: "flex" }}>
            <input type="submit" value="☑" disabled={pprops.item.c === c} />
            <input
              ref={pprops.item.t === 0 ? props.firstRef : undefined}
              value={c}
              onChange={(e) => updateC(e.target.value)}
              autoFocus={props.reveal > 0 && pprops.item.t === 0}
              style={{
                width: "8em",
              }}
            />
          </div>
        </form>
        <div style={{ display: "inline-block", width: "8em" }}>
          {pprops.item.t === 0 ? null : (
            <div>
              <span>#{pprops.i + 1}</span>
              {" / "}
              {props.reveal === 0 ? null : (
                <span>
                  {((pprops.item.t - props.reveal) / 1000).toFixed(3)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4>ANSWERS</h4>
      <div style={{ display: "flex" }}>
        <div>
          {props.items
            .concat({
              c: "",
              t: 0,
            })
            .map((item, i) => ({ item, i }))
            .reverse()
            .map(({ item, i }) => (
              <div key={i}>
                <Item item={item} i={i} />
              </div>
            ))}
        </div>
        {props.challenge === null ? null : (
          <div>
            <h4>challenge!</h4>
            {props.challenge.map((c, i) => (
              <div key={i}>
                <ChallengeItem i={i} item={c} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ChallengeItem(props: { i: number; item: ItemType }) {
  if (props.item.c.includes("\\")) {
    const parts = props.item.c.split("\\");
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>#{props.i + 1}</span>
        <span style={{ width: "1em" }}></span>
        <img
          alt={parts[0]}
          onClick={() => alert(parts[0])}
          src={parts[1]}
          style={{ width: "16em", cursor: "pointer" }}
        />
      </div>
    );
  }
  return (
    <span>
      <span style={{ display: "inline-block", width: "8em" }}>
        #{props.i + 1} / {(props.item.t / 1000).toFixed(3)}
      </span>
      ☑ {props.item.c}
    </span>
  );
}
