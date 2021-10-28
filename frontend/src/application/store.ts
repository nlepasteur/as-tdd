// libraries
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
// reducers
import isLogged from './reducers/isLogged';
import dimension from './reducers/dimension';
import explore from './reducers/explore';
import grid from './reducers/grid';

const rootReducer = combineReducers({ isLogged, dimension, explore, grid });

const persistedState = loadState(['dimension', 'explore', 'grid']);

const store = createStore(rootReducer, persistedState, applyMiddleware(logger));

function loadState(keys: string[]) {
  return keys
    .map((key) => {
      try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
          return undefined;
        }
        return { [key]: JSON.parse(serializedState) };
      } catch (error) {
        return undefined;
      }
    })
    .reduce((acc, cur) => ({ ...acc, ...cur }));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
