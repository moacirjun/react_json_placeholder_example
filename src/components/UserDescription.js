import React from 'react';
import propTypes from 'proptypes';

const UserDescription = ({ user }) => (
  <section id="user-description">
    <div className="media my-3">
      <img src="https://via.placeholder.com/75/771796" alt="avatar" className="rounded-circle mr-3" />
      <div className="media-bldy">
        <h5 className="mt-0 mb-1">{user.name}</h5>
        <p className="mb-0">{user.email}</p>
        <small>
          {user.website}
          {' | '}
          {user.company.name}
        </small>
      </div>
    </div>
  </section>
);

UserDescription.propTypes = {
  user: propTypes.shape({
    name: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    website: propTypes.string.isRequired,
    company: propTypes.shape({
      name: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UserDescription;
