var mapping = require('../config/mapping');
var objectMapper = require('object-mapper');

function getAllRatings(client, format, cb) {
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

function getRatingsByUser(client, format, userId, cb) {
    if (!userId) {
        return ('no user specified for which to request ratings');
    }

    var query = format(
        'SELECT * FROM rating r join rating_mapping rm on r.id=rm.rating_id and user_id=%L',
        userId);

    client.query(query, (err, res) => {
        if (err) {
            return cb(err, null)
        }
        if (res.rowCount == 0) {
            return cb('no ratings found by requested user', null);
        }

        var ratings = objectMapper(res.rows, mapping.ratingArrayMap);
        client.end;
        return cb(null, ratings);
    });
}

function getRatingsByResort(client, format, resortId, cb) {
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

function addRating(client, format, rating, cb) {
    if (!rating || !rating.userId || !rating.resort.id) {
        return ('no user or rating specified');
    }

    var query = format(
        'INSERT INTO rating(user_id, resort_id) VALUES(%L, %L) RETURNING *',
        rating.userId, rating.resort.id);

    client.query(query, (err, res) => {
        if (err) {
            return cb(err, null)
        }
        if (res.rowCount == 0) {
            return cb('not able to insert rating', null);
        }

        var newBaseRating = res.rows[0];
        newBaseRating.ratings = {};

        Object.keys(rating.ratings).forEach((key) => {
            let newRating = rating.ratings[key];
            query = format(
                'INSERT INTO rating_mapping(rating_id, rating_type_id, rating, rating_reason) VALUES(%L, %L, %L, %L)',
                newBaseRating.id, key, newRating.rating, newRating.ratingReason);

            client.query(query, (err, res) => {
                if (err) {
                    return cb(err, null)
                }

                newBaseRating.ratings[key] = newRating;

                if (+key === 6) {
                    client.end;
                    let rating = objectMapper(newBaseRating, mapping.ratingMap);
                    return cb(null, rating);
                }
            });
        });
    });
}

function updateRating(client, format, rating, cb) {
    //TODO CHANGE THIS TO RATING, SIMILAR TO ABOVE
    if (!post || !post.id || !post.userId || !post.resort.id || !post.title ||
        !post.text) {
        return ('no user or post specified');
    }

    var query = format(
        'UPDATE blog_post SET user_id = %L, resort_id = %L, text = %L, title = %L, time_stamp = CURRENT_TIMESTAMP WHERE id=%L RETURNING *',
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

function removeRating(client, format, ratingId, cb) {
    if (!ratingId) {
        return ('no post specified');
    }

    var query = format('DELETE FROM rating WHERE id=%L RETURNING id', ratingId);

    client.query(query, (err, res) => {
        if (err) {
            return cb(err, null)
        }
        if (res.rowCount == 0) {
            return cb('specified rating not found', null);
        }

        var deletedRating = res.rows[0];
        client.end;
        return cb(null, deletedRating);
    });
}

module.exports = {
    getAllRatings: getAllRatings,
    getRatingsByResort: getRatingsByResort,
    getRatingsByUser: getRatingsByUser,
    addRating: addRating,
    updateRating: updateRating,
    removeRating: removeRating,
}