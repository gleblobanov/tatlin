var Koubachi = require('koubachi');
var async = require('underscore');

var write_sensor_file = require('./write_sensor_file.js');
var get_sensor_value = require('./get_sensor_value.js');
var create_sensor_array = require('./create_sensor_array.js');
var send_sensor_file = require('./send_sensor_file.js');


const ARR_LEN = 3600;


var koubachi = new Koubachi.Koubachi();

koubachi.on('error', function(err) {
    console.log('koubachi error'); console.error (err);
});

koubachi.setConfig('KLABVB8ZULIQZGJIKO964EEA', 'OOS2Sh7SWWHgUhOOBko');

koubachi.getDevices(function(err, results) {

    if (err) return console.log('getDevices: ' + err.message);

    JSON.stringify(results);
    devices = JSON.parse(JSON.stringify(results));

    var params = [
        {
            data: devices[0].device.recent_soilmoisture_reading_value,
            length: ARR_LEN,
            filename: 'soil_file.txt',
            connection: CONNECTION
        },
        {
            data: devices[0].device.recent_temperature_reading_value,
            length : ARR_LEN,
            filename : 'temp_file.txt',
            connection: CONNECTION
        },
        {
            data: devices[0].device.recent_light_reading_value,
            length : ARR_LEN,
            filename : 'light_file.txt',
            connection: CONNECTION
        }
    ];

    async.each(params, function (item) {
        get_sensor_value(item, create_sensor_array, write_sensor_file, send_sensor_file, function(error) {
            console.log(error);
        });
    });





    //var fs = require('fs') , gm = require('./gm');
    //gm('water1.png')
    //    .colorize(soil,temp,light)
    //    .colorize(15,25,35)
    //    .write("colorized152535.png", function(err){
    //        if (err) return console.dir(arguments)
    //        console.log(this.outname + ' created  :: ' + arguments[3])
    //    }
    //)
    //
    //
    //var ftp_colorized = new JSFtp({
    //    host: "77.222.40.208",
    //    port: 21, // defaults to 21
    //    user: "sandonatru", // defaults to "anonymous"
    //    pass: "alexsandonat77" // defaults to "@anonymous"
    //});
    //
    //ftp_colorized.put('./colorized.jpg', 'public_html/181282/colorized.jpg', function(hadError) {
    //    if (!hadError)
    //    {
    //        console.log("colorized.jpg transferred successfully!");
    //        ftp_colorized.raw.quit(function(err, data) {
    //            if (err) return console.error(err);
    //            console.log("Bye!");
    //        });
    //    }
    //});


});
