const INITIAL_DATA = {
  isFetching: false,
  error: null,
  items: [],
};

function posts(state = INITIAL_DATA, action) {
  switch (action.type) {
    case 'REQUEST_POSTS':
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case 'REQUEST_POSTS_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case 'REQUEST_POSTS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        error: null,
        items: action.posts,
      };
    default:
      return state;
  }
}

export default function postsByUser(state = {}, action) {
  switch (action.type) {
    case 'REQUEST_POSTS':
    case 'REQUEST_POSTS_FAILURE':
    case 'REQUEST_POSTS_SUCCESS':
      return {
        ...state,
        [action.userId]: posts(state[action.userId], action),
      };
    default:
      return state;
  }
}
