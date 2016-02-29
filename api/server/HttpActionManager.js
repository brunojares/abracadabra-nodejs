var file = require('../util/File');
var struct = require('../util/Struct');

module.exports = function(selection, session, config){
	var _this = this;
	
	this.Error404 = function(kind, value){
		var HttpAction404 = require('./HttpAction404');
		var _action = new HttpAction404(kind, value);
		return _this.initAction(_action);
	}
	this.Error500 = function(error){
		var HttpAction500 = require('./HttpAction500');
		var _action = new HttpAction500(error);
		return _this.initAction(_action);
	}
	this.TextFile = function(path, mime){
		var HttpActionTextFile = require('./HttpActionTextFile');
		var _action = new HttpActionTextFile(
			path, 
			mime, 
			function(error){
				return _this.Error500(error).execute();
			}	
		);
		return _this.initAction(_action);
	}
	this.StreamFile = function(path, mime){
		var HttpActionStreamFile = require('./HttpActionStreamFile');
		var _action = new HttpActionStreamFile(
			path, 
			mime, 
			function(error){
				return _this.Error500(error).execute();
			}
		);
		return _this.initAction(_action);
	}
	this.JSON = function(object){
		var HttpActionJSON = require('./HttpActionJSON');
		var _action = new HttpActionJSON(
			object,
			function(error){
				return _this.Error500(error).execute();
			}
		);
		return _this.initAction(_action);
	}	

	this.initAction = function(action){
		action.isSelected = selection;
		action.session = session;
		action.config = config.application;
		action.server = config.server;
		return action;
	}
}