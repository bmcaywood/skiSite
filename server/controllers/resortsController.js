function getResorts(client, format, cb) {
    var query = format('SELECT * FROM resorts');

    client.query(query, (err, res) => {
        if (err) {
            return cb(err, null)
        }
        if (res.rowCount == 0) {
            return cb('no resorts found', null);
        }

        var resorts = res.rows;
        client.end;
        return cb(null, resorts);
    });
}

function addResort(client, format, resort, cb) {
    if (!resort || !resort.name || !resort.name.trim() || !resort.elBase ||
        !resort.elPeak || !resort.numLifts || !resort.trams || !resort.avgSnow ||
        !resort.ticketPrice || !resort.seasonPrice || !resort.website ||
        !resort.trailMapLoc) {
        var errMsg = 'Mission information when adding resort';
        return cb(errMsg, null);
    }

    var query =
        format('INSERT INTO resorts(name) VALUES(%L) RETURNING *', resort.name);
    client.query(query, (err, res) => {
        if (err) {
            return cb(err, null);
        }

        var resortAdded = res.rows[0];

        query = format(
            'INSERT INTO resort_details(resort_id, el_base, el_peak, num_lifts, trams, avg_snow, ticket_price, season_price, website, trail_map_loc) VALUES(%L, %L, %L, %L, %L, %L, %L, %L, %L, %L) RETURNING *',
            resortAdded.id, resort.elBase, resort.elPeak, resort.numLifts,
            resort.trams, resort.avgSnow, resort.ticketPrice, resort.seasonPrice,
            resort.website, resort.trailMapLoc);
        client.query(query, (err, res) => {
            if (err) {
                return cb(err, null);
            }

            var resortDetails = res.rows[0];
            client.end;
            return (null, { resortShort: resortAdded, resortDetails: resortDetails });
        })
    });
}

module.exports = {
    getResorts: getResorts,
    addResort: addResort,
}