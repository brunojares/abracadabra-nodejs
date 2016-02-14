
module.exports = function(){
	function logDebug(){
		if(this.config.server.debug){
			var _objDebug = this.session.debug();
			if(_objDebug)			
				this.config.server.debug(_objDebug);
		}
	}	
}