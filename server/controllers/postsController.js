function getAllPosts(client, format, cb) {
    var query = format('SELECT * FROM blog_post');

    client.query(query, (err, res) => {
        if (err) {
            return cb(err, null)
        }
        if (res.rowCount == 0) {
            return cb('no posts found', null);
        }

        var posts = res.rows;
        client.end;
        return cb(null, posts);
    });
}

function getPostsByUser(client, format, userId, cb) {
    if (!userId) {
        return ('no user specified for which to request posts');
    }

    var query = format('SELECT * FROM blog_post WHERE user_id=%L', userId);

    client.query(query, (err, res) => {
        if (err) {
            return cb(err, null)
        }
        if (res.rowCount == 0) {
            return cb('no posts found by requested user', null);
        }

        var posts = res.rows;
        client.end;
        return cb(null, posts);
    });
}

function getPostsByResort(client, format, resortId, cb) {
    if (!resortId) {
        return ('no resort specified for which to request posts');
    }

    var query = format('SELECT * FROM blog_post WHERE user_id=%L', resortId);

    client.query(query, (err, res) => {
        if (err) {
            return cb(err, null)
        }
        if (res.rowCount == 0) {
            return cb('no posts found for the specified resort', null);
        }

        var posts = res.rows;
        client.end;
        return cb(null, posts);
    });
}

function addPost(client, format, post, cb) {
    if (!post || !post.userId || !post.resort.id || !post.title || !post.text) {
        return ('no user or post specified');
    }

    var query = format(
        'INSERT INTO blog_post(user_id, resort_id, text, title, time_stamp) VALUES(%L, %L, %L, %L, CURRENT_TIMESTAMP AT TIME ZONE "UTC") RETURNING *',
        post.userId, post.resort.id, post.text, post.title);

    client.query(query, (err, res) => {
        if (err) {
            return cb(err, null)
        }
        if (res.rowCount == 0) {
            return cb('no posts found for the specified resort', null);
        }

        var newPost = res.rows[0];
        client.end;
        return cb(null, newPost);
    });
}

function updatePost(client, format, post, cb) {
    if (!post || !post.id || !post.userId || !post.resort.id || !post.title ||
        !post.text) {
        return ('no user or post specified');
    }

    var query = format(
        'UPDATE blog_post SET user_id = %L, resort_id = %L, text = %L, title = %L, time_stamp = CURRENT_TIMESTAMP AT TIME ZONE "UTC" WHERE id=%L RETURNING *',
        post.userId, post.resort.id, post.text, post.title, post.id);

    client.query(query, (err, res) => {
        if (err) {
            return cb(err, null)
        }
        if (res.rowCount == 0) {
            return cb('no posts found for the specified resort', null);
        }

        var updatedPost = res.rows[0];
        client.end;
        return cb(null, updatedPost);
    });
}

function removePost(client, format, postId, cb) {
    if (!postId) {
        return ('no post specified');
    }

    var query = format('DELETE FROM blog_post WHERE id=%L RETURNING id', postId);

    client.query(query, (err, res) => {
        if (err) {
            return cb(err, null)
        }
        if (res.rowCount == 0) {
            return cb('no posts found for the specified resort', null);
        }

        var deletedPost = res.rows[0];
        client.end;
        return cb(null, deletedPost);
    });
}

module.exports = {
    getAllPosts: getAllPosts,
    getPostsByResort: getPostsByResort,
    getPostsByUser: getPostsByUser,
    addPost: addPost,
    updatePost: updatePost,
    removePost: removePost,
}