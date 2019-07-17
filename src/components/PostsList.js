import React from 'react';
import propTypes from 'proptypes';

import Card from './Card/Card';

const PostsList = ({ posts }) => (
  <section id="posts">
    {posts.map(post => (
      <Card key={post.id} hoverEffect={false}>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.body}</p>
        </div>
      </Card>
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
