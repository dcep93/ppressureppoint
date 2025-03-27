import { ItemType } from "./Items";
import { SettingsType, stateToHash } from "./utils";

export default function ShareLink(props: {
  sessionSettings: SettingsType;
  items: ItemType[];
  reveal: number;
}) {
  const reveal = props.reveal || props.items[0]?.t;
  return (
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
  );
}
