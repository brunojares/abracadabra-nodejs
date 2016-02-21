var struct = require('../util/Struct');

module.exports = function(){
	var _this = this;
	
	this.logAction = function(){
		return '[' + _this.session.response.status + ']: ' + _this.session.request.title + ' -> ' + '{' + _this.session.response.mime +'} ' + _this.name;
	}
	this.logDebug = function(){
		if(_this.server.debug){
			var _objDebug = _this.session.debug();
			if(_objDebug){
				_this.server.debug(_objDebug);
			}
		}
	}	
}