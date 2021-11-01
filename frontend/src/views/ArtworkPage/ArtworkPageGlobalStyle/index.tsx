// types
import type { ReactElement } from 'react';
// style
import './ArtworkPageGlobalStyle.css';

const ArtworkPageGlobalStyle = ({ children }: { children: ReactElement[] }) => (
  <div className="artwork-page">{children}</div>
);

export default ArtworkPageGlobalStyle;
