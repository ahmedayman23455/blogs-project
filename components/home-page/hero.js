import React from 'react';
import classes from './hero.module.css';
import Image from 'next/image';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image 
        src="/images/avatar.png" 
        alt="this is maxillian image" 
        width={300}  
        height={300}
         />  
      </div>  

      <h1>Hi, i'm Ahmed</h1>   
      <p> 
          I blog about web development - especially frontend frameworks like  
          angular or react   
      </p>

    </section>
  );
}

export default Hero;
