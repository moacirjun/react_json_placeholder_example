import api from '../../services/api';

/**
 * types
 */
export const types = {
  REQUEST: 'users/REQUEST',
  REQUEST_SUCCESS: 'users/REQUEST_SUCCESS',
  REQUEST_FAILURE: 'users/REQUEST_FAILURE',
};

/**
 * reducers
 */
const INITIAL_DATA = {
  isFetching: false,
  error: null,
  items: [],
};

export default function usersReducer(state = INITIAL_DATA, action) {
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
        items: action.users,
      };
    default:
      return state;
  }
}

/**
 * actions
 */
const requestUsers = () => ({
  type: types.REQUEST,
});

const requestUsersSuccess = users => ({
  type: types.REQUEST_SUCCESS,
  users,
});

const requestUsersFailure = error => ({
  type: types.REQUEST_FAILURE,
  error,
});

const fetchAllUsers = () => async (dispatch) => {
  dispatch(requestUsers());

  try {
    const response = await api.get('/users');
    dispatch(requestUsersSuccess(response.data));
  } catch (error) {
    dispatch(requestUsersFailure(error));
  }
};

const shouldFetchPosts = (state) => {
  const { users } = state;

  if (!users) {
    return true;
  }

  if (users.isFetching) {
    return false;
  }

  if (users.items.length > 0) {
    return false;
  }

  return true;
};

export const fetchUsersIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchAllUsers());
  }
};
