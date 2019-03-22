import t from '../action-types'
import { reduceReducers, loadReducer } from './helpers'

const initialState = {
  list: []
};

const personsReducer = reduceReducers(initialState,
  loadReducer(t.LOAD_PERSONS, (state, action) => ({
    ...state,
    list: action.result
  }))
);

export default personsReducer