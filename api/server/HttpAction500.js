var struct = require('../util/Struct');
var HttpActionBase = require('./HttpActionBase');


module.exports = function(error){
	HttpActionBase.call(this);
	_this = this;

	this.name = '500 Error';

	this.execute = function(){
		_this.session.response.status = 500;
		var _path404 = _this.config.server.templates + 'Error500.html';
		file
			.Text(_path404)
			.load(
				function(dataFile){
					_this.session.debug(function(obj){
						obj.template500 = dataFile;
						return obj;
					});			
					var _html = formatHtml(dataFile.content);
					_this.session.response.sendText(_html);
					_this.config.server.error(_this.logAction());
					_this.logDebug();
				},
				function(dataFile){
					_this.session.debug(function(obj){
						obj.template500 = dataFile;
						return obj;
					});							
					_html = formatHtml('<h1>Internal error</h1><h2>#error#</h2>');
					_this.session.response.sendText(_html);
					_this.config.server.error(_this.logAction());
					_this.logDebug();
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