import { ItemType } from "./Items";
import saved_challenges from "./saved_challenges";
import { SettingsType, stateToHash } from "./utils";

export default function ShareLink(props: {
  sessionSettings: SettingsType;
  items: ItemType[];
  reveal: number;
}) {
  const reveal = props.reveal || props.items[0]?.t;
  return (
    <div style={{ display: "flex" }}>
      <div>
        <a
          href={stateToHash({
            ...props.sessionSettings,
            challenge: props.items.map((item) => ({
              ...item,
              t: item.t - reveal,
            })),
          })}
        >
          share_link
        </a>
      </div>
      <span style={{ width: "2em" }}></span>
      <div>
        <select
          onChange={(e) =>
            Promise.resolve(e.target!.value).then(
              (selected) =>
                saved_challenges[selected] && window.open(`/${selected}`)
            )
          }
        >
          <option>saved_challenges</option>
          {Object.keys(saved_challenges).map((key) => (
            <option onSelect={() => alert(key)} key={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
