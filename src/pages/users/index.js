import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'proptypes';
import { Link } from 'react-router-dom';

import { fetchUsersIfNeeded } from '../../store/ducks/users';

class Users extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUsersIfNeeded());
  }

  render() {
    const { users } = this.props;

    return users.items.map(user => (
      <div key={user.id}>
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>
        <Link to={`users/${user.id}/posts`}>View Posts</Link>
      </div>
    ));
  }
}

Users.propTypes = {
  users: propTypes.shape({
    isFetching: propTypes.bool.isRequired,
    error: propTypes.object,
    items: propTypes.arrayOf(propTypes.shape({
      id: propTypes.number,
      name: propTypes.string,
      email: propTypes.string,
    })).isRequired,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
};

const mapsStateToProps = state => ({
  users: state.users,
});

export default connect(mapsStateToProps)(Users);
