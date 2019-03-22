import Backendless from 'backendless'

import t from '../action-types';

export const loadPersons = () => ({
  types  : [t.LOAD_PERSONS, t.LOAD_PERSONS_SUCCESS, t.LOAD_PERSONS_FAIL],
  apiCall: () => Backendless.Data.of('Person').find(),
});

export const createPerson = person => ({
  types  : [null, t.CREATE_PERSON_SUCCESS, null],
  apiCall: () => Backendless.Data.of('Person').save(person),
});

export const updatePerson = person => ({
  types  : [null, t.UPDATE_PERSON_SUCCESS, null],
  apiCall: () => Backendless.Data.of('Person').save(person),
});

export const removePerson = personId => ({
  personId,
  types  : [null, t.REMOVE_PERSON_SUCCESS, null],
  apiCall: () => Backendless.Data.of('Person').remove(personId),
});

export const onPersonCreate = person => ({
  person,
  type: t.ON_PERSON_CREATE,
});

export const onPersonUpdate = person => ({
  person,
  type: t.ON_PERSON_UPDATE,
});

export const onPersonRemove = person => ({
  person,
  type: t.ON_PERSON_REMOVE,
});
