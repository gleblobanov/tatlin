var fs = require('fs');

module.exports = function (params, array, send_sensor_file, callback) {
    var file = fs.createWriteStream(params.filename);
    array.forEach(function(item) {
        file.write(item + ' ', callback);
    });
    file.end();

    send_sensor_file(params);
};