import { combineReducers } from 'redux'

import persons from './persons'

const rootReducer = combineReducers({
  persons
});

export default rootReducer;

export const getPersons = state => state.persons;
