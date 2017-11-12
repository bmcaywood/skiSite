const clientRequests: any = {
  USERLOGIN: 'userLogin',
  USERREGISTER: 'userRegister',
  GETRESORTS: 'getResorts',
  ADDRESORT: 'addResort',
  GETPOSTS: 'getPosts',
  GETPOSTSBYUSER: 'getPostsByUser',
  GETPOSTSBYRESORT: 'getPostsByResort',
  ADDPOST: 'addPost',
  REMOVEPOST: 'removePost',
  ADDRATING: 'addRating',
  REMOVERATING: 'removeRating',
  GETRATINGSBYUSER: 'getRatingsByUser',
  GETRATINGSBYRESORT: 'getRatingsByResort',
};

const serverResponse: any = {
  USERLOGGEDIN: 'userLoggedIn',
  USERREGISTERED: 'userRegistered',
  ADDEDRESORT: 'addedResort',
  RESORTS: 'resorts',
  POSTS: 'posts',
  POSTSBYUSER: 'postsByUser',
  POSTSBYRESORT: 'postsByResort',
  NEWPOST: 'newPost',
  UPDATEDPOST: 'updatedPost',
  REMOVEDPOST: 'removedPost',
  NEWRATING: 'newRating',
  UPDATEDRATING: 'updatedRating',
  REMOVEDRATING: 'removedRating',
  RATINGSBYUSER: 'ratingsByUser',
  RATINGSBYRESORT: 'ratingsByResort',
};

export {clientRequests, serverResponse};
