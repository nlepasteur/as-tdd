type MediaProps = {
  pickable: { name: string; as_query: string };
  pick: (media: string) => void;
  picked: boolean;
};

const Media = (props: MediaProps) => (
  <label htmlFor={props.pickable.name}>
    <input
      type="checkbox"
      checked={props.picked}
      onChange={() => props.pick(props.pickable.as_query)}
    />
    {props.pickable.name}
    <span className="custom" />
  </label>
);

export default Media;
