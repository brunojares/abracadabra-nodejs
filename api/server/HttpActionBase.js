
module.exports = function(){
	var _this = this;
	
	function logAction(){
		return '[' + _this.session.response.status + ']: ' + _this.session.request.title + ' -> ' + '{' + _this.session.response.mime +'} ' + _this.name;
	}
	function logDebug(){
		if(_this.config.server.debug){
			var _objDebug = _this.session.debug();
			if(_objDebug)			
				_this.config.server.debug(_objDebug);
		}
	}	
}