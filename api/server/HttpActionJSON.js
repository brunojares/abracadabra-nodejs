var struct = require('../util/Struct');
var HttpActionBase = require('./HttpActionBase');

module.exports = function(object, on_error){
	HttpActionBase.call(this);
	var _this = this;
	
	this.name = 'JSON Object';
		
	this.execute = function(){
		_this.session.debug(function(obj){
			obj.json = {
				object: object
			};
			return obj;
		});			
		var _strJson = struct
			.Object(object)
			.json(function(exception){
				_this.session.debug(function(obj){
					obj.json.error = exception
					return obj;
				});
				on_error(exception);
				return null;
			})
		;
		if(_strJson != null){
			_this.session.response.mime = 'application/json; charset=utf-8';
		
			_this.session.response.sendText(_strJson);
			_this.config.server.success(_this.logAction());
			_this.logDebug();			
		};
	}	
}