export function reduceReducers(initialState, ...reducers) {
  return (state = initialState, action) => {
    return reducers.reduce(
      (s, reducer) => reducer(s, action),
      state
    )
  }
}