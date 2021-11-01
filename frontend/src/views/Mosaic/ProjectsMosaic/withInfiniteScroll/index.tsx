// types
import type { Project } from '@api';
import type { LocationWithState } from '../withState';
import type { Grid } from 'application/reducers/grid';
// libs
import { useState, useEffect } from 'react';
// store utils
import { useAppDispatch } from 'application/hooks';
import { incrementPagination } from 'application/actions/pagination';
// hooks
import useIntersectionObserver from 'hooks/useIntersectionObserver';
// component
import MosaicListContainer from '../MosaicListContainer';

type PropsFromWithState = {
  location: LocationWithState;
  status: FetchStatus;
  error: null | string;
  data: Project[];
  community?: boolean;
  cb?: (ref: HTMLElement) => void;
};

const WithInfiniteScroll = (props: PropsFromWithState) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
  const dispatch = useAppDispatch();
  const cb = (ref: HTMLElement) => {
    setRef(ref);
  };

  useEffect(() => {
    if (entry?.isIntersecting) {
      dispatch(incrementPagination());
    }
  }, [entry, dispatch]);

  return <MosaicListContainer cb={cb} {...props} />;
};

export default WithInfiniteScroll;
