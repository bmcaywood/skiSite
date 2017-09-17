var usrCtrl = require('../controllers/userController');

module.exports = function(pubnub, client, format) {

    var publishConfig = {
        channel: "anotherTest",
        message: { name: "george", id: 'test' }
    }

    pubnub.publish(publishConfig, function(status, response) {
        console.log(status, response);
    });

    pubnub.addListener({
        message: (m) => {
            switch (m.channel) {
                case 'login':
                    console.log('Getting user ' + m.message);
                    usrCtrl.login(client, format, m.message.username, m.message.pass, (err, user) => {
                            if (err) {
                                pubnub.publish({ channel: 'userLogin', message: { error: err } }, (st, res) => {
                                    console.log(st, res);
                                });
                            } else {
                                pubnub.publish({ channel: 'userLogin', message: user },
                                    (st, res) => {
                                        console.log(st, res);
                                    });
                            }
                        })
                        // passport.authenticate('local-login', (err, user, info) => {
                        //     if (err) {
                        //         pubnub.publish({ channel: 'userLogin', message: { error: err } });
                        //     }

                    //     if (!user) {
                    //         pubnub.publish({ channel: 'userLogin', message: { error: 'No user error: ' + info.error } });
                    //     } else {
                    //         pubnub.publish({ channel: 'userLogin', message: { name: 'test', id: 123456, uuid: 5525315, priv: 7 } },
                    //             function(st, res) {
                    //                 console.log(st, res);
                    //             });
                    //     }
                    // });
                    break;
                case 'userRegister':
                    console.log('Creating user ' + m.message);
                    //TODO ADD IN UUID TO CREATE CHANNEL BETWEEN CLIENT AND SERVER
                    usrCtrl.createUser(client, format, m.message.name, m.message.pass, m.message.email, m.message.username, (err, user) => {
                        if (err) {
                            pubnub.publish({ channel: 'userRegistered', message: { error: err } }, (st, res) => {
                                console.log(st, res);
                            });
                        } else {
                            pubnub.publish({ channel: 'userRegistered', message: user },
                                (st, res) => {
                                    console.log(st, res);
                                });
                        }
                    });
                case 'response':
                    console.log('response ' + m.message);
                    break;
            }
            console.log(m);
        }
    });

    pubnub.subscribe({
        channels: ['response', 'login', 'userRegister']
    });
}