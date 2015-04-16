module.exports = function(params, create_sensor_array, write_sensor_file, send_sensor_file, callback) {
    var array = params.data.split(" ");
    create_sensor_array(params, parseFloat(array[0]), write_sensor_file, send_sensor_file, callback);
}