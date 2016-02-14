var struct = require('../util/Struct');
var HttpActionBase = require('./HttpActionBase');

module.exports = function(kind, value){
	HttpActionBase.call(this);
	
	this.execute: function(){
		this.session.response.status = 404;
		var _path404 = this.config.server.templates + 'Error404.html';
		file
			.Text(_path404)
			.load(
				function(dataFile){
					this.session.debug(functon(debug){
						debug.template404 = dataFile;
					});			
					var _html = formatHtml(dataFile.content);
					this.session.response.sendText(_html);
					logDebug();
				},
				function(dataFile){
					this.session.debug(functon(debug){
						debug.template404 = dataFile;
					});							
					_html = formatHtml('<h1>Resource #kind# not found</h1><h2>#value#</h2>');
					this.session.response.sendText(_html);
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