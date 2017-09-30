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

module.exports = {
    getAllPosts: getAllPosts,
    getPostsByResort: getPostsByResort,
    getPostsByUser: getPostsByUser,
}