var struct = require('../util/Struct');
var file = require('../util/File');
var uri = require('../util/Uri');
var HttpActionBase = require('./HttpActionBase');

module.exports = function(path, mime, on_error){
	HttpActionBase.call(this);
	var _this = this;
	
	this.name = 'Stream File';
		
	this.execute = function(){
		var _metadataFile = uri.Local(path);		
		file
			.Stream(path)
			.load(
				function(dataFile){
					//...
					if(mime)
						_this.session.response.mime = mime;
					else
						_this.session.response.mime = _metadataFile.mime;
					_this.session.debug(function(obj){
						obj.file = {
							metadata: _metadataFile,
							data: dataFile
						};
						return obj;
					});
					//...			
					_this.session.response.sendStream(
						dataFile.content,
						_metadataFile.fullName
					);
					_this.server.success(_this.logAction());
					_this.logDebug();
				},
				function(dataFile){					
					_this.session.debug(function(obj){
						obj.file = {
							metadata: _metadataFile,
							data: dataFile
						}
						return obj;
					});			
					on_error(dataFile.error);									
				}
			)
		;
	}	
}