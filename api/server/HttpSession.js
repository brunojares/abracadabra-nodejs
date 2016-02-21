var struct = require('../util/Struct');
var uri = require('../util/Uri');

module.exports = function(config ,request, response){
	var _this = this;
	
	//... Request
	var _urlFormated = uri.Url(request.url).format();	
	request.title = '{' + request.method + '}' + request.url;	

	request.is = function(expression, method){
		return function(){
			expression = uri.Url(expression).format();
			//...
			var _isUrl = struct.Text(_urlFormated).starts(expression);
			if(method)
				return _isUrl && struct.Text(request.method).equal(method);
			else
				return _isUrl;
		}
	}
	request.isHome = function(method){
		return function(){
			if(method)
				return (_urlFormated == '/') && struct.Text(request.method).equal(method);
			else
				return _urlFormated == '/';			
		}
	}
	this.request = request;	
	//... Response
	response.sendText = function(text){	
		if(!response.mime)
			response.mime = 'text/html; charset=utf-8';
		if(!response.status)
			response.status = 200;
		response.writeHead(
			response.status, 
			{
				"Content-Type": response.mime,
				"Server": "Abracadabra NodeJS",
				"Content-Length": struct.Text(text).byteLength()
			}
		);
		if(text)
			response.write(text);
		response.end();		
	}
	response.sendStream = function(stream, filename){
		response.status = 200;
		response.setHeader('Content-disposition', 'attachment; filename=' + filename);
		response.setHeader('Content-type', response.mime);	
		stream.pipe(response);
	}	
	this.response = response;
	//... Debug
	var _debug;
	this.debug = function(on_set){
		if(config.server.debug){
			if(!_debug)
				_debug = { };
			if(on_set){
				var _obj = on_set(_debug);
				if(_obj)
					_debug = _obj;
			}
		}		
		return _debug;
	}	
}