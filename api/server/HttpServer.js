var http = require('http');
var struct = require('../util/Struct');

var HttpSession = require('./HttpSession');

module.exports = function(httpServer){
	var _config = httpServer.application.config;	
	var _core = httpServer.core;

	this.start = function(){
		http
			.createServer(function(request, response) {
				var _session = new HttpSession(_config, request, response);
				httpServer.application.session = _session;
				var _route = selectRoute(_session);
				execute(_route, _session);
			})
			.listen(_core.port, function() {
				_config.server.success('Http started on ' + _core.port + ' port');
				if(_config.server.debug)
				{
					var _objDebug = struct.Object({
						port: _core.port,
						controllers: _core.controllers,
						application: _config.application
					}).json();
					_config.server.debug(_objDebug);
				}
			})
		;
	}

	function selectRoute(session){
		var _routes = _core.routes(session);
		var _selectedRoute = struct
			.List(_routes)
			.first(function(item, index){
				if(item.isSelected())
					return true;
			})
		;
		return _selectedRoute;
	}
	function execute(route, session){
		if(route)
			route.execute();
		else
			httpServer.application.on().Error404('Route', session.request.title).execute();
	}
}