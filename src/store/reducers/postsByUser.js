const INITIAL_DATA = {
  isFetching: false,
  error: null,
  items: [],
};

function posts(state = INITIAL_DATA, action) {
  switch (action.types) {
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

export default function postsByUser(state = {
  1: {
    ...INITIAL_DATA,
    items: [{
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit"',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    }],
  },
}, action) {
  switch (action.types) {
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
