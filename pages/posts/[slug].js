import PostContent from '../../components/posts/post-detail/post-content';
import {  getFeaturedPosts , getPostData } from '../../helpers/posts-util';  
import Head from 'next/head' ; 

function PostDetailsPage(props) {  

  return <> 
  <Head>  
    <title>{props.postData.title} </title> 
    <meta name="description" content={props.postData.excerpt}/>
  </Head>
  <PostContent post={props.postData} />
  </>;
}

export async function getStaticProps(context) {
  const { params } = context;
  const postSlug = params.slug;    


  // const postData = getAllPosts().find((post) => post.slug === postSlug);   
  const postData = getPostData(postSlug) ; 

  return {
    props: {
      postData,
    },  
    revalidate: 600
  };
}

export async function getStaticPaths() {
  const featuredPosts = getFeaturedPosts() ;  

  const slugs = featuredPosts.map(post => post.slug) ;    
  const pathsWithParams  = slugs.map(slug => ({params: {slug: slug } } ))  ; 


  return {
    paths: pathsWithParams , 
    fallback: 'blocking',
  };
}
export default PostDetailsPage;
