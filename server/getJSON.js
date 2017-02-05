var http = require("http");

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
exports.getJSON = function(options, onResult)
{
    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            try {
                var obj = JSON.parse(output);
                onResult(obj);
            } catch (err) {
                console.log(err);
                onResult({
                    state: "error",
                    value: err.message
                });
            }
        });
    });

    req.on('error', function(err) {
        onResult({
            state: "error",
            value: err.message
        });
    });

    req.end();
};