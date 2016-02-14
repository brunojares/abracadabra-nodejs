var struct = require('../util/Struct');
var HttpActionBase = require('./HttpActionBase');


module.exports = function(error){
	HttpActionBase.call(this);

	this.execute: function(){
		this.session.response.status = 500;
		var _path404 = this.config.server.templates + 'Error500.html';
		file
			.Text(_path404)
			.load(
				function(dataFile){
					this.session.debug(functon(debug){
						debug.template500 = dataFile;
					});			
					var _html = formatHtml(dataFile.content);
					this.session.response.sendText(_html);
					logDebug();
				},
				function(dataFile){
					this.session.debug(functon(debug){
						debug.template500 = dataFile;
					});							
					_html = formatHtml('<h1>Internal error</h1><h2>#error#</h2>');
					this.session.response.sendText(_html);
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
			var _returnValue = struct.List(error).scalar(function(item, partial){
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