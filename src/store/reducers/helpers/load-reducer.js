const SUCCESS_MOD = '_SUCCESS';
const FAIL_MOD = '_FAIL';

const INITIAL = {
  loaded   : false,
  loading  : false,
  error    : null,
  errorCode: null
};

const defaultSuccessReducer = state => state;

export function loadReducer(actionType, successReducer = defaultSuccessReducer) {
  const REQUEST = actionType;
  const SUCCESS = actionType + SUCCESS_MOD;
  const FAIL = actionType + FAIL_MOD;

  return (state = INITIAL, action) => {

    switch (action.type) {
      case REQUEST:
        return {
          ...state,
          loading  : true,
          error    : null,
          errorCode: null
        };

      case SUCCESS:
        return successReducer({
          ...state,
          loading: false,
          loaded : true
        }, action);

      case FAIL:
        return {
          ...state,
          loading  : false,
          error    : action.error,
          errorCode: action.errorCode
        };

      default:
        return {
          ...INITIAL,
          ...state
        };
    }
  }
}