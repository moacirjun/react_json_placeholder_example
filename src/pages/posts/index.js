import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'proptypes';
import { Link } from 'react-router-dom';

import { fetchPostsOfUsersIfNeeded } from '../../store/ducks/postsByUser';
import PostsList from '../../components/PostsList';
import UserDescription from '../../components/UserDescription';

class Posts extends Component {
  componentDidMount() {
    const { dispatch, userId } = this.props;
    dispatch(fetchPostsOfUsersIfNeeded(userId));
  }

  render() {
    const {
      posts,
      user,
      isFetching,
      error,
    } = this.props;

    return (
      <div className="container-fluid">
        <h1>Posts of User</h1>

        <div className="d-flex justify-content-end mb-3">
          <Link to="/" className="btn btn-primary">Back to Users Page</Link>
        </div>

        {user && <UserDescription user={user} />}

        {isFetching && <h4>Loading</h4>}

        {error && <div className="alert alert-danger">{error}</div>}

        {!isFetching && !error && <PostsList posts={posts} />}
      </div>
    );
  }
}

Posts.propTypes = {
  isFetching: propTypes.bool.isRequired,
  error: propTypes.string.isRequired,
  posts: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    userId: propTypes.number,
    title: propTypes.string,
    body: propTypes.string,
  })).isRequired,
  dispatch: propTypes.func.isRequired,
  userId: propTypes.string.isRequired,
  user: propTypes.shape({
    name: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    website: propTypes.string.isRequired,
    company: propTypes.shape({
      name: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { postsByUser } = state;
  const { match: { params } } = ownProps;
  const { isFetching, error, items: posts } = postsByUser[
    params.userId
  ] || {
    isFetching: true,
    error: null,
    items: [],
  };

  const user = state.users.items.filter(item => item.id === parseInt(params.userId, 10)).shift();

  return {
    isFetching,
    error,
    posts,
    userId: params.userId,
    user,
  };
};

export default connect(mapStateToProps)(Posts);
