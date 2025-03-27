import { RefObject, useState } from "react";

type ItemType = { c: string; t: number };

export default function Items(props: {
  reveal: number;
  firstRef: RefObject<HTMLInputElement | null>;
}) {
  const [items, updateItems] = useState<ItemType[]>([]);

  function Item(pprops: { item: ItemType; i: number }) {
    const [c, updateC] = useState(pprops.item.c);
    return (
      <form
        onSubmit={(e) =>
          Promise.resolve()
            .then(() => e.preventDefault())
            .then(() =>
              !c
                ? null
                : Promise.resolve(Date.now()).then((t) =>
                    updateItems(
                      pprops.item.t === 0
                        ? items.concat({
                            t,
                            c,
                          })
                        : items
                            .splice(pprops.i, 1, { ...pprops.item, t, c })
                            .slice(1)
                            .concat(items)
                    )
                  )
            )
        }
      >
        <input type="submit" value="☑" disabled={pprops.item.c === c} />
        <input
          ref={pprops.item.t === 0 ? props.firstRef : undefined}
          value={c}
          onChange={(e) => updateC(e.target.value)}
          autoFocus={pprops.item.t === 0}
          style={{
            width: "8em",
          }}
        />
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
      </form>
    );
  }

  return (
    <div>
      {items
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
  );
}
