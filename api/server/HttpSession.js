
module.exports = function(request, response){
	//... Request
	request.title = '{' + request.method + '}' + request.url;
	this.request = request;
	//... Response
	response.sendText = function(text){	
		if(!response.mime)
			response.mime = 'text/html; charset=utf-8';
		if(!response.status)
			response.status = 200;
		response.writeHead(response.status, {"Content-Type": response.mime});
		if(text)
			response.write(text);
		response.end();		
	}
	response.sendStream = function(stream, filename){
		response.setHeader('Content-disposition', 'attachment; filename=' + filename);
		response.setHeader('Content-type', response.mime);	
		stream.pipe(response);
	}	
	this.response = response;
	//... Debug
	var _debug;
	this.debug = function(metodo_debug){
		if(servidor.configuracoes.debug){
			if(!_debug)
				_debug = { };
			if(metodo_debug){
				var _incremento = metodo_debug(_debug);
				if(_incremento)
					_debug = _incremento;
			}
		}		
		return _debug;
	}	
}