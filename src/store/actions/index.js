export const fetchAllUsers = () => ({
  type: 'REQUEST_USERS',
});

export const fetchAllPostsOfUser = userId => ({
  type: 'REQUEST_POSTS',
  userId,
});
