import { combineReducers } from 'redux';

import users from './users';
import postsByUser from './postsByUser';

export default combineReducers({
  users,
  postsByUser,
});
