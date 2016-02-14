var file = require('../util/File');
var struct = require('../util/Struct');

function ActionManager(config ,selection, session){
	this.Error404 = function(kind, value){
		var HttpAction404 = require('./HttpAction404');
		return new HttpAction404(config, selection, session, kind, value);
	}
	this.Error500 = function(error){
		var HttpAction404 = require('./HttpAction500');
		return new HttpAction500(config, selection, session, error);
	}	
}

module.exports = function(config){
	this.config = config;
	this.on = function(selection){
		return new ActionManager(config ,selection, this.session);
	}
}