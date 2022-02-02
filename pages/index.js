import { Fragment } from 'react';
import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
// import {dummyPosts} from '../dummy-data/dummy-data'  ;    
import {getFeaturedPosts} from '../helpers/posts-util'  ;   
import Head from 'next/head' ;  



function HomePage(props) {  
  const featuredPosts = props.featuredPosts ;      


  return (
    <Fragment>
      <Head> 
        <title> Max's Blog</title> 
        <meta name="description" content="I post about programming and web development"/>
      </Head>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </Fragment>
  );
}

export async function getStaticProps() {   
  const featuredPosts = getFeaturedPosts()  ; 
  return { 
    props: {featuredPosts }  
  }
}
export default HomePage;
