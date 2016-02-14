var http = require('http');

var HttpSession = require('HttpSession');

module.exports = function(httpServer){
	var _config = httpServer.application.config;	
	var _core = httpServer.core;

	this.start = function(){
		var 
		http
			.createServer(function(request, response) {
				var _session = new HttpSession(request, response);
				httpServer.application.session = _session;
				var _route = selectRoute(_session);
				execute(_route, session);
			})
			.listen(_core.port, function() {
				_config.server.success('Http started on ' + _core.port + ' port');
				if(_config.server.debug)
				{
					var _debugObj = _config.application | { };
					_debugObj.http ={
						port: _core.port,
						controllers: _core.controllers
					};
					_config.server.debug(_debugObj);
				}
			})
		;
	}

	function selectRoute(session){
		var _selectedRoute = struct
			.List(_rotas)
			.Firts(function(item, index){
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