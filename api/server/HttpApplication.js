var file = require('../util/File');
var struct = require('../util/Struct');

function ActionManager(selection, session, config){
	var _this = this;
	
	this.Error404 = function(kind, value){
		var HttpAction404 = require('./HttpAction404');
		var _action = new HttpAction404(kind, value);
		return initAction(_action);
	}
	this.Error500 = function(error){
		var HttpAction500 = require('./HttpAction500');
		var _action = new HttpAction500(error);
		return initAction(_action);
	}
	this.TextFile = function(path, mime){
		var HttpActionTextFile = require('./HttpActionTextFile');
		var _action = new HttpActionTextFile(path, mime, onError500);
		return initAction(_action);
	}
	this.StreamFile = function(path, mime){
		var HttpActionStreamFile = require('./HttpActionStreamFile');
		var _action = new HttpActionStreamFile(path, mime, onError500);
		return initAction(_action);
	}
	this.JSON = function(object){
		var HttpActionJSON = require('./HttpActionJSON');
		var _action = new HttpActionJSON(object, onError500);
		return initAction(_action);
	}	

	function initAction(action){
		action.isSelected = selection;
		action.session = session;
		action.config = config.application;
		action.server = config.server;
		return action;
	}
	function onError500(error){
		return _this.Error500(error).execute();
	}	
}

module.exports = function(config){
	var _this = this;
	
	this.config = config;
	this.on = function(selection){
		return new ActionManager(selection, _this.session, config);
	}
}