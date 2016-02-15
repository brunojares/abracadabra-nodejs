var file = require('../util/File');
var struct = require('../util/Struct');

function ActionManager(selection){
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

	function initAction(action){
		action.isSelected = selection;
		action.session = this.session;
		action.config = this.config;
		return action;
	}
	function onError500(error){
		return this.Error500(error).execute();
	}	
}

module.exports = function(config){
	this.config = config;
	this.on = function(selection){
		var _actionManager = new ActionManager(selection);
		_actionManager.session = this.session;
		_actionManager.config = config;
		return _actionManager;
	}
}