import t from '../action-types'
import { reduceReducers, loadReducer, reducersMap } from './helpers'

const initialState = {
  list: []
};

const personsReducer = reduceReducers(initialState,
  loadReducer(t.LOAD_PERSONS, (state, action) => ({
    ...state,
    list: action.result
  })),

  reducersMap({
    [t.CREATE_PERSON_SUCCESS]: (state, action) => addPerson(state, action.result),
    [t.UPDATE_PERSON_SUCCESS]: (state, action) => updatePerson(state, action.result),
    [t.REMOVE_PERSON_SUCCESS]: (state, action) => deletePerson(state, action.personId),

    [t.ON_PERSON_CREATE]: (state, action) => addPerson(state, action.person),
    [t.ON_PERSON_UPDATE]: (state, action) => updatePerson(state, action.person),
    [t.ON_PERSON_REMOVE]: (state, action) => deletePerson(state, action.person.objectId)
  })
);

function addPerson(state, person) {
  if (state.list.find(p => p.objectId === person.objectId)) {
    return state
  }

  return {
    ...state,
    list: state.list.concat(person)
  }
}

function updatePerson(state, person) {
  return {
    ...state,
    list: state.list.map(p => p.objectId === person.objectId ? person : p)
  }
}

function deletePerson(state, personId) {
  return {
    ...state,
    list: state.list.filter(person => person.objectId !== personId)
  }
}

export default personsReducer