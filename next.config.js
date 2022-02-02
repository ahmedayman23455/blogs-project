// that is default node.js import syntax
// we not use the default import beacues this file (other import statement not work yet)
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/* -------------------------------------------------------------------------- */
// that is export in node.js    like  (export default in js)
// this object allow us to set various configuration options
// we can use these enviroment variables for both our api route or any component .
// this object form ( exist function form too)

// module.exports = {
//     env: {
//         mongodb_username: 'ahmed-1' ,
//         mongodb_password: 'ahmedayman',
//         mongodb_clustername: 'cluster0'  ,
//         mongodb_database: 'myFirstDatabase'
//     },
//   }
/* -------------------------------------------------------------------------- */
/*  
* if we use fucntion form we can add a if check in which phase we are so if 
    the configuration is loaded for the development server or for production   
* tis fucntion will executed by js and will pase (phase paramter)
 */
module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'ahmed-1',
        mongodb_password: 'ahmedayman',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'mySecondeDatabase',
      },
    };
  }
  return {
    env: {
      mongodb_username: 'ahmed-1',
      mongodb_password: 'ahmedayman',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'myFirstDatabase',
    },
  };
};
