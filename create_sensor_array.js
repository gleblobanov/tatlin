module.exports = function (params, value, write_sensor_file, send_sensor_file,callback) {
        var array = [];
        for (i=0; i < params['length']; i++){
            array.push(value + Math.random() * 10 - 5);
        }
        write_sensor_file(params, array, send_sensor_file);
}