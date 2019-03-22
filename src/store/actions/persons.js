import Backendless from 'backendless'

import t from '../action-types';

export const loadPersons = () => ({
  types  : [t.LOAD_PERSONS, t.LOAD_PERSONS_SUCCESS, t.LOAD_PERSONS_FAIL],
  apiCall: () => Backendless.Data.of('Person').find(),
});
