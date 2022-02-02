import React from 'react';
import AllPosts from '../../components/posts/all-posts';
// import { dummyPosts } from '../../dummy-data/dummy-data';
import { getAllPosts } from '../../helpers/posts-util';
import Head from 'next/head';

function AllPostsPage(props) {
  const allPosts = props.posts;
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts !"
        />
      </Head>
      <AllPosts posts={allPosts} />
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: { posts: allPosts },
  };
}

export default AllPostsPage;
