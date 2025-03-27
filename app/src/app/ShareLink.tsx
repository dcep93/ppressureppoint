import { ItemType } from "./Items";
import { SettingsType, stateToHash } from "./utils";

export default function ShareLink(props: {
  sessionSettings: SettingsType;
  items: ItemType[];
  reveal: number;
}) {
  return (
    <div>
      <a
        href={stateToHash({
          ...props.sessionSettings,
          challenge: { t: props.reveal, items: props.items },
        })}
      >
        share_link
      </a>
    </div>
  );
}
