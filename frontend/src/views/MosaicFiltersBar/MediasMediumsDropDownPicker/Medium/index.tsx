// types
import type { Medium as MediumType } from '@api';

type MediumProps = {
  pickable: MediumType;
  pick: (media: string) => void;
  picked: boolean;
};

const Media = (props: MediumProps) => (
  <label htmlFor={props.pickable.name}>
    <input
      type="checkbox"
      checked={props.picked}
      onChange={() => props.pick(props.pickable.id)}
    />
    {props.pickable.name}
  </label>
);

export default Media;
