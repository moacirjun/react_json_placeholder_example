import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'proptypes';

import { fetchUsersIfNeeded } from '../../store/ducks/users';
import UsersList from '../../components/UsersList';

class Users extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUsersIfNeeded());
  }

  render() {
    const { users } = this.props;
    const { isFetching, error } = users;

    return (
      <main className="wrapper">
        <h1 className="text-center">Users</h1>

        {error && <div className="error">{error}</div>}

        {isFetching && <h4>Loading</h4>}

        {!isFetching && !error && <UsersList users={users.items} />}
      </main>
    );
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
