
module.exports = function(config ,selection, session){
	this.isSelected = selection;

	function logDebug(){
		if(config.server.debug){
			var _objDebug = session.debug();
			if(_objDebug)			
				config.server.debug(_objDebug);
		}
	}	
}