import withState from './withState';
import withInfiniteScroll from './withInfiniteScroll';
import MosaicListContainer from './MosaicListContainer';

export default {
  infiniteScrollProjectsMosaic: withState(MosaicListContainer),
  shuffledProjectsMosaic: withState(withInfiniteScroll),
};
