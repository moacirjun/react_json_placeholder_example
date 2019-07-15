import React from 'react';
import propTypes from 'proptypes';
import { Link } from 'react-router-dom';

const UserList = ({ users }) => (
  <div className="row">
    {users.map(user => (
      <div className="col-12 col-sm-6 col-md-4 col-xl-3 mb-4" key={user.id}>
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-center mb-3">
              <img src="https://via.placeholder.com/75/771796" alt="avatar" className="rounded-circle" />
            </div>
            <h5 className="card-title text-center">{user.name}</h5>
            <p className="card-text text-center">{user.email}</p>
            <div className="d-flex justify-content-center">
              <Link to={`users/${user.id}/posts`} className="btn btn-primary">View Posts</Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

UserList.propTypes = {
  users: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
  })).isRequired,
};

export default UserList;
