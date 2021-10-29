type MediaProps = {
  pickable: { name: string };
  pick: (media: string) => void;
  picked: boolean;
};

const Media = (props: MediaProps) => (
  <label htmlFor={props.pickable.name}>
    <input
      type="checkbox"
      checked={props.picked}
      onChange={() => props.pick(props.pickable.name)}
    />
    {props.pickable.name}
  </label>
);

export default Media;
