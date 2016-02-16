var Server = require('../api/server/Server');

var _server = new Server({
	server:{
		templates: __dirname + '/templates/'				
		//success: function(value){ },
		//error: function(value){ },
		//warning: function(value){ },
		//info: function(value){ },
		//debug: debug: function(value){ } //undefined
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
				application.on(session.request.isHome()).TextFile('Index.html'),
				application.on(session.request.is('error500')).Error500({ code: 500, message: 'Error detail'})
				//application.on(session.request.is('person')).controller('PersonController')
			];
		}
	};
});

_server.start();