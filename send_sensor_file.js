var JSFtp = require("jsftp");

module.exports = function (params, callback) {

    var ftp = new JSFtp(params.connection);

    ftp.put('./' + params.filename, params.connection.directory + params.filename, function(hadError) {
        if (!hadError)
        {
            ftp.raw.quit(function(error, data) {
                if (error) {
                    callback(error);
                }
            });
        }
    });
};