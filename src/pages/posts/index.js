import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'proptypes';

class Posts extends Component {
  componentDidMount() {

  }

  render() {
    const { posts } = this.props;

    return posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  }
}

Posts.propTypes = {
  isFetching: propTypes.bool.isRequired,
  error: propTypes.object.isRequired,
  posts: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    userId: propTypes.number,
    title: propTypes.string,
    body: propTypes.string,
  })).isRequired,
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

  console.log(posts);

  return {
    isFetching,
    error,
    posts,
  };
};

export default connect(mapStateToProps)(Posts);
