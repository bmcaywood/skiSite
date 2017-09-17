var bcrypt = require('../config/bcrypt');

function getUser(client, format, username, cb) {
    if (!username || !username.trim()) {
        var errMsg = 'Error: Attempted to find username without specifying which user';
        console.log(errMsg);
        return cb(errMsg, null);
    }

    var query = format('SELECT id, name, email, username, uuid, priv FROM users WHERE username=%L', username);

    client.query(query, (err, res) => {
        if (err) {
            return cb(err, null)
        }
        if (res.rowCount == 0) {
            return cb('no user found', null);
        }

        if (res.rowCount > 1) {
            return cb('duplicate username, please contact admin', null);
        }

        var user = res.rows[0];
        client.end;
        return cb(null, user);
    });
}

function login(client, format, username, pass, cb) {
    if (!username || !pass || !username.trim() || !pass.trim()) {
        var errMsg = 'Error: attempted to login without a username or password';
        console.log(errMsg);
        return cb(errMsg, null);
    }

    this.getUser(client, format, username, (err, user) => {
        if (err) {
            return cb(err, null);
        }

        // if the user is found verify the password
        bcrypt.comparePass(pass, user.pass,
            function(err, passMatch) {
                if (err) {
                    return cb(null, false, { error: 'Invalid Password.' });
                }

                // all is well, return successful user
                return cb(null, user);
            });
    });
}

function createUser(client, format, name, pass, email, username, cb) {
    if (!name || !name.trim() || !email || !email.trim() || !username || !pass || !username.trim() || !pass.trim()) {
        var errMsg = 'Error: attempted to register without all the needed parameters';
        console.log(errMsg);
        return cb(errMsg, null);
    }

    this.getUser(client, format, username, (err, user) => {
        if (!(err === 'no user found') || user) {
            if (user) {
                return cb('username already taken', null);
            } else {
                return cb(err, null);
            }
        }

        bcrypt.cryptPassword(pass,
            (err, hash) => {
                if (err) {
                    return cb("Unable to create hash of password: " + err, null);
                }
                // create the user
                var query = format('INSERT INTO users(name, pass, email, username, priv) VALUES(%L, %L, %L, %L, %L)', name, hash, email, username, 7); //TODO UUID NEED TO GENERATE, PRIV NEED TO DETERMINE
                client.query(query, (err, res) => {
                    if (err) {
                        return cb(err, null);
                    }

                    this.getUser(client, format, username, (err, user) => {
                        if (err) {
                            return cb(err, null);
                        }
                        return cb(null, user);
                    });

                })
            });
    });
}

module.exports = {
    getUser: getUser,
    login: login,
    createUser: createUser,
}