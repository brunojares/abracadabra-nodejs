var fs = require('fs');

/* ========== Text File ========== */
function TextFileManager(path){
	this.load = function(on_success, on_fail){
		var _parameters ={ path: path };
		fs.exists(path,function(fileExists){
			_parameters.fileExists = fileExists;
			if(fileExists){
				fs.readFile(path, {encoding: 'utf-8'}, function(fileError, dataFile){
					if(fileError){
						_parameters.error = fileError;
						on_fail(_parameters);
					}
					else{
						_parameters.content = dataFile.toString();
						on_success(_parameters);
					}
				});
			}else{
				_parameters.error = 'File "' + path + '" not found';
				on_fail(_parameters);
			}
		});		
	}
}
exports.Text = function(path){
	return new TextFileManager(path);
}
/* ========== Stream File ========== */
function StreamFileManager(path){
	this.load = function(on_success, on_fail){
		 var _parameters ={ path: path };
		 fs.exists(path,function(fileExists){
		 	 _parameters.fileExists = fileExists;
		 	 if(fileExists){
				 try{		 			 
			  		  _parameters.content = fs.createReadStream(path);
		  		  	  on_success(_parameters);		
		  		}catch(error){
	  				_parameters.error = error;
	  				on_fail(_parameters);
		  		}		  		
		 	 }else{
				_parameters.error = 'File "' + path + '" not found';
				on_fail(_parameters);
			}
  		});
	}	
}
exports.Stream = function(path){
	return new StreamFileManager(path);
}