import fs from 'fs'  ;  
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');


export function getPostsFiles() { 
  return fs.readdirSync(postsDirectory);
}

export function getPostData(fileName) {
  const postSlug = fileName.replace(/\.md$/, ''); // removes the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent); // will return object  with ( data: metadata , content: the actual content of metadata)  ;
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };
  return postData;  
}

export function getAllPosts() {
  // will return array (string) has the file names
  const postsFiles = getPostsFiles() ; 
  const allPosts = postsFiles.map((postFile) => {
    return getPostData(postFile);
  });
  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );
  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();  
  const featuredPosts = allPosts.filter(post => post.isFeatured) ;    
  return featuredPosts ;  
}