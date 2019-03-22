import { createStore as createReduxStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from './reducers';

export const createStore = () => createReduxStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    apiCall,
    createLogger({ collapsed: true })
  )
);

function apiCall({ dispatch }) {
  return next => action => {
    if (!action.apiCall) {
      return next(action)
    }

    const { apiCall, types = [], ...restAction } = action;
    const [REQUEST, REQUEST_SUCCESS, REQUEST_FAIL] = types;

    if (REQUEST) {
      dispatch({ type: REQUEST, ...restAction })
    }

    return apiCall()
      .then(result => {

        if (REQUEST_SUCCESS) {
          dispatch({ type: REQUEST_SUCCESS, ...restAction, result })
        }
      })
      .catch(error => {
        console.log('An error occurred.', error);

        if (REQUEST_FAIL) {
          dispatch({ type: REQUEST_FAIL, ...restAction, error: error.message, errorCode: error.code })
        }

        throw error
      });
  }
}