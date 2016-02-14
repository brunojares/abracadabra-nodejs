var struct = require('../util/Struct');
var HttpActionBase = require('./HttpActionBase');

module.exports = function(config ,selection, session, kind, value){
	HttpActionBase.call(this, config, selection);
	
	this.execute: function(){
		session.response.status = 404;
		var _path404 = config.server.templates + 'Error404.html';
		file
			.Text(_path404)
			.load(
				function(dataFile){
					session.debug(functon(debug){
						debug.template404 = dataFile;
					});			
					var _html = formatHtml(dataFile.content);
					session.response.sendText(_html);
					logDebug();
				},
				function(dataFile){
					session.debug(functon(debug){
						debug.template404 = dataFile;
					});							
					_html = formatHtml('<h1>Resource #kind# not found</h1><h2>#value#</h2>');
					session.response.sendText(_html);
					logDebug();
				}
			)
		;
	}

	function formatHtml(content){
		content = struct.Text(content).replaceAll('#kind#', kind || '');
		return struct.Text(content).replaceAll('#value#', value || '');		
	}	
}