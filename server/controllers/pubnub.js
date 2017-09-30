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
                            const channel = 'userLogin_' + m.message.uuid;
                            pubnub.publish({ channel: channel, message: { error: err } }, (st, res) => {
                                console.log(st, res);
                            });
                        } else {
                            const channel = 'userLogin_' + m.message.uuid;
                            pubnub.publish({ channel: channel, message: user },
                                (st, res) => {
                                    console.log(st, res);
                                });
                        }
                    });
                    break;
                case 'userRegister':
                    console.log('Creating user ' + m.message);
                    //TODO ADD IN UUID TO CREATE CHANNEL BETWEEN CLIENT AND SERVER
                    usrCtrl.createUser(client, format, m.message.name, m.message.pass, m.message.email, m.message.username, m.message.username.uuid, (err, user) => {
                        if (err) {
                            pubnub.publish({ channel: ('userRegistered_' + m.message.uuid), message: { error: err } }, (st, res) => {
                                console.log(st, res);
                            });
                        } else {
                            pubnub.publish({ channel: ('userRegistered_' + m.message.uuid), message: user },
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