import React from 'react';
import propTypes from 'proptypes';
import { Link } from 'react-router-dom';
import './UserList.css';

import Card from './Card/Card';

const UserList = ({ users }) => (
  <div className="users-container">
    {users.map(user => (
      <div className="item" key={user.id}>
        <Card>
          <div className="card-image">
            <img src="https://via.placeholder.com/75/771796" alt="avatar" className="rounded-circle" />
          </div>
          <h4 className="text-center">{user.name}</h4>
          <p className="text-center">{user.email}</p>
          <div className="card-footer">
            <Link to={`users/${user.id}/posts`} className="button">View Posts</Link>
          </div>
        </Card>
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
