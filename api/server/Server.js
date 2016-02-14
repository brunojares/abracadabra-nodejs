var coolors = require('coolors');

var HttpApplication = require('./HttpApplication');
var HttpSession = require('./HttpSession');
var HttpServer = require('./HttpServer');
var struct = require('../util/Struct');

module.exports = function(config){
	config.server = struct
		.Object(config.server)
		.init({
			success: function(value){ 
				console.log(coolors(value, 'green')); 
			},
			error: function(value){
				console.log(coolors(value, 'red')); 
			},
			warning: function(value){
				console.log(coolors(value, 'yellow'));  
			},
			info: function(value){
				console.log(coolors(value, 'blue'));
			},
			debug: function(value){
				console.log(coolors(value, 'white'));
			}
		})
	;
	//... Http
	var _http;
	this.http = function(on_init){
		var _application = new HttpApplication(config);
		var _core = on_init(_application);
		_http = {
			application: _application,
			core: _core
		};
	}
	//... General
	this.start = function(){
		if(_http){
			_httpServer = new HttpServer(_http);
			_httpServer.start();
		}
	}
}