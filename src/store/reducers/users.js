const INITIAL_DATA = {
  isFetching: false,
  error: null,
  items: [],
};

export default function users(state = INITIAL_DATA, action) {
  switch (action.type) {
    case 'REQUEST_USERS':
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case 'REQUEST_USERS_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case 'REQUEST_USERS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        error: null,
        items: action.users,
      };
    default:
      return state;
  }
}
