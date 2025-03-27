import { useState } from "react";

const startTime = Date.now();

type ItemType = { c: string; t: number };

export default function Items() {
  const [items, updateItems] = useState<ItemType[]>([]);

  function Item(props: { item: ItemType; i: number }) {
    const [c, updateC] = useState(props.item.c);
    return (
      <form
        onSubmit={(e) =>
          Promise.resolve()
            .then(() => e.preventDefault())
            .then(() =>
              !c
                ? null
                : Promise.resolve(Date.now() - startTime).then((t) =>
                    updateItems(
                      props.item.t === 0
                        ? items.concat({
                            t,
                            c,
                          })
                        : items
                            .splice(props.i, 1, { ...props.item, t, c })
                            .slice(1)
                            .concat(items)
                    )
                  )
            )
        }
      >
        <input type="submit" value="☑" disabled={props.item.c === c} />
        <input
          value={c}
          onChange={(e) => updateC(e.target.value)}
          name="item_input"
          autoFocus={props.item.t === 0}
          style={{
            width: "8em",
          }}
        />
        <div style={{ display: "inline-block", width: "8em" }}>
          {props.item.t === 0 ? null : (
            <div>
              <span>#{props.i + 1}</span>
              {" / "}
              <span>{(props.item.t / 1000).toFixed(3)}</span>
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
