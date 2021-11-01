// libs
import { Link, useLocation } from 'react-router-dom';

const CloseButton = (props: { username: string }) => {
  const location = useLocation<{ from: string }>();
  console.log('location: ', location);
  return (
    <Link to={location.state && location.state.from ? location.state.from : ''}>
      X
    </Link>
  );
};

export default CloseButton;
