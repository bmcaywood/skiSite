var resortCtrl = require('../controllers/resortsController');

function sendCommonItems(socket, client, format) {
    resortCtrl.getResorts(client, format, (err, resorts) => {
        if (err) {
            socket.emit('resorts', { error: err });
        } else {
            socket.emit('resorts', resorts);
        }
    });
}

module.exports = {
    sendCommonItems: sendCommonItems,
}