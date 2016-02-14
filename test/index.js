var Server = require('../api/server/Server');

var _server = new Server({
	server:{
		debug: true		
		//success: function(value){ }
		//error: function(value){ }
		//warning: function(value){ }
		//info: function(value){ }
	},
	application: {
		appPath: __dirname,
		value: 123
	}
});

_server.http(function(application){
	return {
		port: 8080,
		controllers: __dirname + '/server/controller',
		started: function() { },
		auntenticate: function(session){
			if(session.request.isHome)
				return true;
			else if(session.credential.login == 'jares')
				return true;
			else
				return { code: 0, message: 'User/Password incorrect' };
		},
		routes: function(session){
			return [
				application.on(session.request.is('client')).directory('./client'),
				application.on(session.request.is('person')).controller('PersonController')
			];
		}
	};
});

_server.start();