var struct = require('../util/Struct');
var file = require('../util/File');
var HttpActionBase = require('./HttpActionBase');

module.exports = function(kind, value){
	HttpActionBase.call(this);
	_this = this;
	this.name = '404 Error';
	
	this.execute = function(){
		_this.session.response.status = 404;
		var _path404 = _this.server.templates + 'Error404.html';
		file
			.Text(_path404)
			.load(
				function(dataFile){
					_this.session.debug(function(obj){
						obj.template404 = dataFile;
						return obj;
					});			
					var _html = formatHtml(dataFile.content);
					_this.session.response.sendText(_html);
					_this.server.error(_this.logAction());
					_this.logDebug();
				},
				function(dataFile){
					_this.session.debug(function(obj){
						obj.template404 = dataFile;
						return obj;
					});								
					_html = formatHtml('<h1>Resource #kind# not found</h1><h2>#value#</h2>');
					_this.session.response.sendText(_html);
					_this.server.error(_this.logAction());
					_this.logDebug();
				}
			)
		;
	}

	function formatHtml(content){
		content = struct.Text(content).replaceAll('#kind#', kind || '');
		return struct.Text(content).replaceAll('#value#', value || '');		
	}	
}