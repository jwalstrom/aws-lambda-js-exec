var request = require("request");
var jsRunner = require("./lib/js-runner");

exports.handler = function (event, context) {
    request(event.scriptUrl, null, function (err, response, body) {
        if (err) {
            context.fail(err);
        }
        else {
            jsRunner.execute(body, event.input, 30, function (err, data) {
                if(err) {
                    context.fail(err);
                }
                else {
                     context.succeed(data);
                }
            });
        }
    });
}