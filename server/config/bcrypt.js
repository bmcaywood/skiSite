var bcrypt = require('../node_modules/bcrypt');

/**
 * Code inspired from http://stackoverflow.com/questions/14015677/node-js-encryption-of-passwords
 */

/**
 * Encrypt the password
 * @param {string} pass the password to encrypt
 * @param {function} cb callback funciton(err, hash)
 */
function cryptPassword(pass, cb) {
    bcrypt.genSalt(10,
        function(err, salt) {
            if (err) {
                return cb(err, null);
            }
            bcrypt.hash(pass, salt,
                function(err, hash) {
                    if (err) {
                        returncb(err, null);
                    }
                    return cb(null, hash);
                });
        });
}

/**
 * Compare passwords to check if they are the same
 * @param {string} pass encrypted stored password
 * @param {string} usrPass encrypted user password
 * @param {function} cb callback function(error, passwordMatches)
 */
function comparePass(pass, usrPass, cb) {
    bcrypt.compare(pass, usrPass,
        function(err, passMatch) {
            if (err) {
                return cb(err, null);
            }
            return cb(null, passMatch);
        });
}

module.exports = {
    cryptPassword: cryptPassword,
    comparePass: comparePass
};