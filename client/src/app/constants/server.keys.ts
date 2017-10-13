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
};

export {clientRequests, serverResponse};
