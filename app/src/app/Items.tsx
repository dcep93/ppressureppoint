import { createRef, RefObject, useState } from "react";

const startTime = Date.now();

type ItemType = { c: string; t: number; ref: RefObject<HTMLInputElement> };

function setBackgroundColor(item: ItemType) {
  item.ref.current.style.backgroundColor =
    item.c === item.ref.current.value ? "" : "lightpink";
}

export default function Items() {
  const [items, update] = useState<(ItemType | null)[]>([]);
  items.forEach((item) => item?.ref.current && setBackgroundColor(item));
  return (
    <div>
      {items
        .concat(null)
        .map((item, i) => ({ item, i }))
        .reverse()
        .map(({ item, i }, j) => (
          <div key={i}>
            <form
              onSubmit={(e) =>
                Promise.resolve()
                  .then(() => e.preventDefault())
                  .then(
                    () =>
                      new FormData(e.target as HTMLFormElement).get(
                        "item_input"
                      ) as string
                  )
                  .then((c) =>
                    !c
                      ? null
                      : Promise.resolve(Date.now() - startTime).then((t) =>
                          update(
                            item !== null
                              ? items
                                  .splice(i, 1, { ...item, t, c })
                                  .slice(1)
                                  .concat(items)
                              : items.concat({
                                  t,
                                  c,
                                  ref: createRef() as RefObject<HTMLInputElement>,
                                })
                          )
                        )
                  )
              }
            >
              <input
                ref={item?.ref}
                name="item_input"
                autoFocus={j === 0}
                onChange={() => item?.ref && setBackgroundColor(item)}
                style={{
                  width: "8em",
                }}
              />
              <div style={{ display: "inline-block", width: "8em" }}>
                {item === null ? null : (
                  <div>
                    <span>#{i + 1}</span>
                    {" / "}
                    <span>{(item.t / 1000).toFixed(3)}</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        ))}
    </div>
  );
}
