import React from 'react';
import propTypes from 'proptypes';

const PostsList = ({ posts }) => (
  <section id="posts">
    {posts.map(post => (
      <div className="card mb-3" key={post.id}>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.body}</p>
        </div>
      </div>
    ))}
  </section>
);

PostsList.propTypes = {
  posts: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    body: propTypes.string.isRequired,
  })).isRequired,
};

export default PostsList;
