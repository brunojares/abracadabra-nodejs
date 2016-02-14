var HttpActionBase = require('./HttpActionBase');

module.exports = function(config ,selection, session, error){
	HttpActionBase.call(this, config, selection);

	this.execute: function(){
		session.response.status = 500;
		var _path404 = config.server.templates + 'Error500.html';
		file
			.Text(_path404)
			.load(
				function(dataFile){
					session.debug(functon(debug){
						debug.template500 = dataFile;
					});			
					var _html = formatHtml(dataFile.content);
					session.response.sendText(_html);
					logDebug();
				},
				function(dataFile){
					session.debug(functon(debug){
						debug.template500 = dataFile;
					});							
					_html = formatHtml('<h1>Internal error</h1><h2>#error#</h2>');
					session.response.sendText(_html);
					logDebug();
				}
			)
		;
	}

	function formatHtml(content){
		var value = formatError();
		return struct.Text(content).replaceAll('#error#', value || '');		
	}	
	function formatError(){
		if(error && (error.length > 0)){
			var _returnValue = util.Lista(error).Scalar(function(item, parcial){
				return item ? '<li>' + item + '</li>' : '';
			});
			_returnValue = 
				_returnValue.trim() != '' ?
				'<ul>' + _returnValue + '</ul>' :
				''
			;
			return  _returnValue;
		}else
			return error;		
	}
}