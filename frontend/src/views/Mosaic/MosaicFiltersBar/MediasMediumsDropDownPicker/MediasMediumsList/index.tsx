// types
import type { ComponentType } from 'react';
import type { Medium as MediumType } from '@api';
import type { Media as MediaType } from 'application/reducers/medias';
// components
import Media from '../Media';
import Medium from '../Medium';

type PropsFromWithSetters<T> = {
  data: T[];
  picked: string[];
  pick: (pickable: string) => void;
};

type WrappedComponentProps<T> = {
  pickable: T;
  picked: boolean;
  pick: (pickable: string) => void;
};

function mediasMediumsList<T>(
  Component: ComponentType<WrappedComponentProps<T>>
) {
  function MediasMediumsList(props: PropsFromWithSetters<T>) {
    return (
      <ul>
        {props.data.map((mediaMedium, i) => {
          const isMedium = (pickable: unknown): pickable is MediumType => {
            return 'id' in mediaMedium;
          };
          const isMedia = (pickable: unknown): pickable is MediaType => {
            return !('id' in mediaMedium);
          };
          return isMedium(mediaMedium) ? (
            <li key={mediaMedium.id}>
              <Medium
                pickable={mediaMedium}
                picked={props.picked.includes(mediaMedium.id)}
                pick={props.pick}
              />
            </li>
          ) : (
            isMedia(mediaMedium) && (
              <li key={i}>
                <Media
                  pickable={mediaMedium}
                  picked={props.picked.includes(mediaMedium.as_query)}
                  pick={props.pick}
                />
              </li>
            )
          );
        })}
      </ul>
    );
  }

  const wrappedComponentName =
    Component.displayName || Component.name || 'Component';
  MediasMediumsList.displayName = `mediasMediumsList(${wrappedComponentName})`;

  return MediasMediumsList;
}

export default mediasMediumsList;
