
module.exports = function(){
	function logAction(){
		return '[' + this.session.response.status + ']: ' + this.session.request.title + ' -> ' + '{' + this.session.response.mime +'} ' this.name;
	}
	function logDebug(){
		if(this.config.server.debug){
			var _objDebug = this.session.debug();
			if(_objDebug)			
				this.config.server.debug(_objDebug);
		}
	}	
}