var struct = require('../util/Struct');
var file = require('../util/File');
var HttpActionBase = require('./HttpActionBase');

module.exports = function(path, mime, on_error){
	HttpActionBase.call(this);
	this.session.response.mime = mime;
	this.execute: function(){
		file
			.Text(path)
			.load(
				function(dataFile){
					this.session.debug(functon(debug){
						debug.file = dataFile;
					});			
					var _html = formatHtml(dataFile.content);
					this.session.response.sendText(_html);
					logDebug();
				},
				function(dataFile){
					this.session.debug(functon(debug){
						debug.file = dataFile;
					});
					on_error(dataFile.error);									
				}
			)
		;
	}	
}