var usrCtrl = require('../controllers/userController');
var resortCtrl = require('../controllers/resortsController');
var postCtrl = require('../controllers/postsController');
var { Client } = require('pg');

module.exports =
    function(app, server, client, format) {
        var io = require('socket.io').listen(server);
        server.listen(8000);
        io.set('origins', '*:*');


        io.on('connection', (socket) => {
            socket.on('userLogin', (user) => {
                console.log('here with user: ' + JSON.stringify(user));
                usrCtrl.login(client, format, user.username, user.pass, (err, user) => {
                    if (err) {
                        socket.emit('userLoggedIn', { error: err });
                    } else {
                        delete user.pass
                        socket.emit('userLoggedIn', user);
                    }
                });
            });
            socket.on('userRegister', (user) => {
                usrCtrl.createUser(
                    client, format, user.name, user.pass, user.email, user.username,
                    (err, user) => {
                        if (err) {
                            socket.emit('userRegistered', { error: err });
                        } else {
                            delete user.pass
                            socket.emit('userRegistered', user);
                        }
                    });
            });
            socket.on('getResorts', () => {
                resortCtrl.getResorts(client, format, (err, resorts) => {
                    if (err) {
                        socket.emit('resorts', { error: err });
                    } else {
                        socket.emit('resorts', resorts);
                    }
                });
            });
            socket.on('addResort', (resort) => {
                resortCtrl.addResort(client, format, resort, (err, addedResort) => {
                    if (err) {
                        socket.emit('addedResort', { error: err });
                    } else {
                        socket.emit('addedResort', addedResort);
                    }
                });
            });
            socket.on('getPosts', () => {
                postCtrl.getAllPosts(client, format, (err, posts) => {
                    if (err) {
                        socket.emit('posts', { error: err });
                    } else {
                        socket.emit('posts', posts);
                    }
                });
            });
            socket.on('getPostsByUser', (userId) => {
                postCtrl.getPostsByUser(client, format, userId, (err, posts) => {
                    if (err) {
                        socket.emit('postsByUser', { error: err });
                    } else {
                        socket.emit('postsByUser', posts);
                    }
                });
            });
            socket.on('getPostsByResort', (resortId) => {
                postCtrl.getPostsByResort(client, format, resortId, (err, posts) => {
                    if (err) {
                        socket.emit('postsByResort', { error: err });
                    } else {
                        socket.emit('postsByResort', posts);
                    }
                });
            });
            socket.on('addPost', (post) => {
                if(post.id) {
                    postCtrl.updatePost(client, format, post, (err, updatedPost) => {
                        if (err) {
                            socket.emit('updatedPost', { error: err });
                        } else {
                            // Broadcast new post to all users
                            io.emit('updatedPost', updatedPost);
                        }
                    });
                } else {
                    postCtrl.addPost(client, format, post, (err, newPost) => {
                        if (err) {
                            socket.emit('newPost', { error: err });
                        } else {
                            // Broadcast new post to all users
                            io.emit('newPost', newPost);
                        }
                    });
                }
            });
            socket.on('removePost', (postId) => {
                postCtrl.removePost(client, format, postId, (err, removedPostId) => {
                    if (err) {
                        socket.emit('removedPost', { error: err });
                    } else {
                        // Broadcast new post to all users
                        io.emit('removedPost', removedPostId);
                    }
                });
            });
        });
    }

// How to use
// io.on('connection', function(socket){
//     socket.emit('request', /* */); // emit an event to the socket
//     io.emit('broadcast', /* */); // emit an event to all connected sockets
//     socket.on('reply', function(){ /* */ }); // listen to the event
//   });