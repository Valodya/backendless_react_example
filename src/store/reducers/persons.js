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
    [t.CREATE_PERSON_SUCCESS]: (state, action) => ({
      ...state,
      list: state.list.concat(action.result)
    }),

    [t.UPDATE_PERSON_SUCCESS]: (state, action) => ({
      ...state,
      list: state.list.map(oldPerson => oldPerson.objectId === action.result.objectId ? action.result : oldPerson)
    }),

    [t.REMOVE_PERSON_SUCCESS]: (state, action) => ({
      ...state,
      list: state.list.filter(person => person.objectId !== action.personId)
    })
  })
);

export default personsReducer