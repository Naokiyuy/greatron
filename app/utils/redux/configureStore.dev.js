import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import {browserHistory} from 'react-router';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import DevTools from "./DevTools";

import backendReducer from '../../backend/backendReducer';

const middleware = routerMiddleware(browserHistory);

export default function configureStore(initialState) {
  return createStore(
    combineReducers({
      routing: routerReducer,
      form: formReducer,
      backend: backendReducer
    }),
    initialState,
    compose(
      applyMiddleware(middleware, thunk, createLogger()),
      DevTools.instrument()
    )
  );
}
