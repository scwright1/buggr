/**
 * Expose version
 */

var util = require('util'),
	colors = {
      	'cyan'      : ['\x1B[36m', '\x1B[39m'],
      	'green'     : ['\x1B[32m', '\x1B[39m'],
      	'red'       : ['\x1B[31m', '\x1B[39m'],
      	'yellow'    : ['\x1B[33m', '\x1B[39m'],
      	'white'     : ['\x1B[37m', '\x1B[39m'],
      	'redBG'     : ['\x1B[41m', '\x1B[49m']
	};

exports.version = '0.1.4';


function extendLog(args, color) {
	var log = util.format.apply(this, args);
	if(color) {
		var col = colors[color];
		console.log(format(), col[0]+log+col[1]);
	} else {
		console.log(format(), log);
	}
}

function format() {
	var d, t;
	d = new Date();
	var tz = d.getTimezoneOffset() / 60;
	if(tz >= 0) {tz = "+"+tz;} else {tz = "-"+tz;}
	t = ("0" + d.getHours()).slice(-2)+':'+("0" + d.getMinutes()).slice(-2)+':'+("0" + d.getSeconds()).slice(-2)+' UTC'+tz;
	fd = d.getFullYear()+'/'+("0" + (d.getMonth() + 1)).slice(-2)+'/'+("0" + d.getDate()).slice(-2);
	return '['+fd+' - '+t+'] | '+__file+':'+__line;

}

Object.defineProperty(global, '__stack', {
	get: function(){
		var orig = Error.prepareStackTrace;
		Error.prepareStackTrace = function(_, stack){ return stack; };
		var err = new Error();
		Error.captureStackTrace(err, arguments.callee);
		var stack = err.stack;
		Error.prepareStackTrace = orig;
		return stack;
	}
});

Object.defineProperty(global, '__line', {
	get: function(){
		return __stack[4].getLineNumber();
	}
});

Object.defineProperty(global, '__file', {
	get: function(){
		var file =  __stack[4].getFileName();
		var root = process.env.PWD;
		return file.substr((file.indexOf(root) + root.length));
	}
});

function throwError(args) {
	var redBG = colors['redBG'];
	console.log(format(), redBG[0]+"==================================="+redBG[1]);
	if(args.length === 1) {
		//there's only a single argument, work out whether it's a string or an assert
		var arg = args[0];
		if(typeof arg === "string") {
			//error is a string, not a stack
			console.log(format(), redBG[0]+arg+redBG[1]);
		} else {
			//error is a stack by itself
			console.log(format(), redBG[0]+arg.message+redBG[1]);
			console.log(format(), redBG[0]+arg.stack+redBG[1]);
		}
	} else {
		for(var i = 0; i < args.length; i++) {
			if(typeof args[i] === "object") {
				console.log(format(), redBG[0]+args[i].message+redBG[1]);
				console.log(format(), redBG[0]+args[i].stack+redBG[1]);
			} else {
				console.log(format(), redBG[0]+args[i]+redBG[1]);
			}
		}
	}
	console.log(format(), redBG[0]+"==================================="+redBG[1]);
}


//export all variants of console
module.exports = exports = {
	log: function() {
		extendLog(arguments);
	},
	warn: function() {
		extendLog(arguments, 'yellow');
	},
	error: function() {
		extendLog(arguments, 'red');
	},
	info: function() {
		extendLog(arguments, 'cyan');
	},
	success: function() {
		extendLog(arguments, 'green');
	},
	assert: function() {
		//handle assert as if we're handling any other assert (i.e. throw and exit)
		throwError(arguments);
		process.exit(0);
	},
	emphasis: function() {
		extendLog(arguments, 'white');
	}
};