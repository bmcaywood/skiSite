const clientRequests: any = {
  USERLOGIN: 'userLogin',
  USERREGISTER: 'userRegister',
  GETRESORTS: 'getResorts',
  ADDRESORT: 'addResort',
  GETPOSTS: 'getPosts',
  GETPOSTSBYUSER: 'getPostsByUser',
  GETPOSTSBYRESORT: 'getPostsByResort',
  ADDPOST: 'addPost'
};

const serverResponse: any = {
  USERLOGGEDIN: 'userLoggedIn',
  USERREGISTERED: 'userRegistered',
  ADDEDRESORT: 'addedResort',
  RESORTS: 'resorts',
  POSTS: 'posts',
  POSTSBYUSER: 'postsByUser',
  POSTSBYRESORT: 'postsByResort',
};

export {clientRequests, serverResponse};
