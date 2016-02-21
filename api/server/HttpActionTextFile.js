var struct = require('../util/Struct');
var file = require('../util/File');
var HttpActionBase = require('./HttpActionBase');

module.exports = function(path, mime, on_error){
	HttpActionBase.call(this);
	var _this = this;
	
	this.name = 'Text File';
		
	this.execute = function(){
		file
			.Text(path)
			.load(
				function(dataFile){
					_this.session.response.mime = mime;
					_this.session.debug(function(obj){
						obj.file = dataFile;
						return obj;
					});			
					_this.session.response.sendText(dataFile.content);
					_this.server.success(_this.logAction());
					_this.logDebug();
				},
				function(dataFile){					
					_this.session.debug(function(obj){
						obj.file = dataFile;
						return obj;
					});			
					on_error(dataFile.error);									
				}
			)
		;
	}	
}