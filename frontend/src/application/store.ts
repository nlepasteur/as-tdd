// libraries
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
// reducers
import isLogged from './reducers/isLogged';

const rootReducer = combineReducers({ isLogged });

const store = createStore(rootReducer, applyMiddleware(logger));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
