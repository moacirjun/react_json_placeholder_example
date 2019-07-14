import api from '../../services/api';

const requestUsers = () => ({
  type: 'REQUEST_USERS',
});

const requestUsersSuccess = users => ({
  type: 'REQUEST_USERS_SUCCESS',
  users,
});

const requestUsersFailure = error => ({
  type: 'REQUEST_USERS_FAILURE',
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

const requestPostsOfUser = userId => ({
  type: 'REQUEST_POSTS',
  userId,
});

const requestPostsOfUserSuccess = (userId, posts) => ({
  type: 'REQUEST_POSTS_SUCCESS',
  userId,
  posts,
});

const requestPostsOfUserFailure = (userId, error) => ({
  type: 'REQUEST_POSTS_FAILURE',
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
