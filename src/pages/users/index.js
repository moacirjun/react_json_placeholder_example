import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'proptypes';

const users = props => (
  props.users.items.map(user => (
    <div key={user.id}>
      <h2>{user.name}</h2>
      <h3>{user.email}</h3>
      <a href="posts?userId=1">View Posts</a>
    </div>
  ))
);

users.propTypes = {
  users: propTypes.shape({
    isFetching: propTypes.bool.isRequired,
    error: propTypes.object,
    items: propTypes.arrayOf(propTypes.shape({
      id: propTypes.number,
      name: propTypes.string,
      email: propTypes.string,
    })).isRequired,
  }),
};

const mapsStateToProps = state => ({
  users: state.users,
});

export default connect(mapsStateToProps)(users);
