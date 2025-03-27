import { useState } from "react";

const startTime = Date.now();

export default function Items() {
  const [items, update] = useState<({ c: string; t: number } | null)[]>([]);
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
                        "input"
                      ) as string
                  )
                  .then((c) =>
                    !c
                      ? null
                      : Promise.resolve(Date.now() - startTime).then((t) =>
                          update(
                            i < items.length
                              ? items
                                  .splice(i, 1, { t, c })
                                  .slice(1)
                                  .concat(items)
                              : items.concat({ t, c })
                          )
                        )
                  )
              }
            >
              <input
                name="input"
                autoFocus={j === 0}
                style={{ width: "8em" }}
              />
              <div style={{ display: "inline-block", width: "8em" }}>
                {item === null ? null : (
                  <div>
                    <span>#{i + 1}</span>{" "}
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
