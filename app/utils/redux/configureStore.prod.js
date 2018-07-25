import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {browserHistory} from 'react-router';

import backendReducer from '../../backend/backendReducer';
import fileUploadReducer from '../fileupload/fileUploadReducer';

const middleware = routerMiddleware(browserHistory);

export default function configureStore(initialState) {
  return createStore(
    combineReducers({
      routing: routerReducer,
      form: formReducer,
      backend: backendReducer,
      fileupload: fileUploadReducer
    }),
    initialState,
    applyMiddleware(middleware, thunk)
  );
}
