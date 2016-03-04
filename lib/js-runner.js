"use strict"

var vm = require("vm");

function JsRunner() {
}

JsRunner.prototype.execute = function(source, input, timeoutSeconds, cb) {
	var runtime = { 
		callback: function (err, output) { 
			cb(err, output);
		},
		input: input,
		require: require
	};
	var context = vm.createContext(runtime);
	var wrapped = wrapScript(source, "main");
	var script = vm.createScript(wrapped);
	try {
		script.runInNewContext(context, { timeout: timeoutSeconds * 1000 });
	}
	catch(err) {
		// script timeout
        console.log("timeout");
		cb(err);
	}
}

function wrapScript(source, methodName) {
	return "var exports = Object.create(null);\n" + source + "\nexports." + methodName + "(input, callback);";
}

module.exports = new JsRunner();