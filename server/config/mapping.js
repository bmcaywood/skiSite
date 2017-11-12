var objectMapper = require('object-mapper');
var _ = require('lodash');

let ratingArrayMap = { '[]': { key: 'ratings', transform: (val) => transformRatings(val) } }

function transformRatings(val) {
    var ratings = [];

    val.forEach((el) => {
        let rating = objectMapper(el, ratingMapFromArray);
        let index = _.findIndex(ratings, (r) => { return r.id == rating.id });
        if (index > -1) {
            ratings[index].ratings[rating.type] = {
                rating: +rating.rating,
                reason: rating.reason
            };
        } else {
            ratings.push({
                id: rating.id,
                resortId: rating.resortId,
                userId: rating.userId,
                ratings: {}
            });
            index = _.findIndex(ratings, (r) => {
                return +r.id === +rating.id;
            });
            if (index > -1) {
                ratings[index].ratings[rating.type] = {
                    rating: +rating.rating,
                    reason: rating.reason
                };
            }
        }
    });

    return ratings;
}

let ratingMapFromArray = {
    rating_type_id: 'type',
    rating: 'rating',
    rating_reason: 'reason',
    rating_id: 'id',
    resort_id: 'resortId',
    user_id: 'userId',
    ratings: 'ratings'
}

let ratingMap = {
    rating_type_id: 'type',
    rating: 'rating',
    rating_reason: 'reason',
    id: 'id',
    resort_id: 'resortId',
    user_id: 'userId',
    ratings: 'ratings'
}


module.exports = { ratingArrayMap, ratingMap }