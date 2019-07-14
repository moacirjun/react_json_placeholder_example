import api from '../../services/api';

/**
 * types
 */
export const types = {
  REQUEST: 'postsByUser/REQUEST',
  REQUEST_SUCCESS: 'postsByUser/REQUEST_SUCCESS',
  REQUEST_FAILURE: 'postsByUser/REQUEST_FAILURE',
};

/**
 * reducers
 */
const INITIAL_DATA = {
  isFetching: false,
  error: null,
  items: [],
};

function posts(state = INITIAL_DATA, action) {
  switch (action.type) {
    case types.REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case types.REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case types.REQUEST_SUCCESS:
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
    case types.REQUEST:
    case types.REQUEST_FAILURE:
    case types.REQUEST_SUCCESS:
      return {
        ...state,
        [action.userId]: posts(state[action.userId], action),
      };
    default:
      return state;
  }
}

/**
 * actions
 */
const requestPostsOfUser = userId => ({
  type: types.REQUEST,
  userId,
});

const requestPostsOfUserSuccess = (userId, data) => ({
  type: types.REQUEST_SUCCESS,
  userId,
  posts: data,
});

const requestPostsOfUserFailure = (userId, error) => ({
  type: types.REQUEST_FAILURE,
  userId,
  error,
});

const shouldFetchPostsOfUser = (state, userId) => {
  const postsOfUser = state.postsByUser[userId];

  if (!postsOfUser) {
    return true;
  }

  if (postsOfUser.isFetching) {
    return false;
  }

  if (postsOfUser.items.length > 0) {
    return false;
  }

  return true;
};

const fetchAllPostsOfUser = userId => async (dispatch) => {
  dispatch(requestPostsOfUser(userId));

  try {
    const response = await api.get(`/posts?userId=${userId}`);
    dispatch(requestPostsOfUserSuccess(userId, response.data));
  } catch (error) {
    dispatch(requestPostsOfUserFailure(userId, error));
  }
};

export const fetchPostsOfUsersIfNeeded = userId => (dispatch, getState) => {
  if (shouldFetchPostsOfUser(getState(), userId)) {
    return dispatch(fetchAllPostsOfUser(userId));
  }
};
