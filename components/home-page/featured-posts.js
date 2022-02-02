import React from 'react';
import classes from './featured-posts.module.css';  
import PostsGrid from '../posts/posts-grid';

function FeaturedPosts(props) {  
  const {posts} = props ;   

  return (
    <div className={classes.latest}>
      <h1>Featured Posts</h1>  
      <PostsGrid posts={props.posts}/> 
    </div>
  );
}

export default FeaturedPosts;
