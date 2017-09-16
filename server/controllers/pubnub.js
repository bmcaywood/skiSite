module.exports = function(pubnub) {

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
                    pubnub.publish({ channel: 'userLogin', message: { name: 'test', id: 123456, uuid: 5525315, priv: 7 } },
                        function(st, res) {
                            console.log(st, res);
                        });
                    break;
                case 'response':
                    console.log('response ' + m.message);
                    break;
            }
            console.log(m);
        }
    });

    pubnub.subscribe({
        channels: ['response', 'login']
    });
}