import withState from './withState';
import withInfiniteScroll from './withInfiniteScroll';
import MosaicListContainer from './MosaicListContainer';

export default {
  shuffledProjectsMosaic: withState(MosaicListContainer),
  infiniteScrollProjectsMosaic: withState(withInfiniteScroll),
};
