/* ============ Text =============== */
function TextManager(phrase){
	this.replaceAll = function(search, change){
		if(this.has())	
			return phrase.replace(new RegExp(search, 'g'), change);
		else
			return '';	
	}
	this.lower = function(){
		if(this.has())
			return phrase.toLowerCase();
		else
			return '';		
	}
	this.upper = function(){
		if(this.has())
			return phrase.toUpperCase();		
		else
			return '';		
	}
	this.starts = function(word){
		if(this.has() && word)
			return phrase.slice(0, word.length) == word;
		else
			return false;		
	}
	this.ends = function(word){
		if(this.has() && word)
			return phrase.slice(-word.length) == word;
		else
			return false;			
	}
	this.has = function(word){		
		if(phrase && word)
			return phrase.indexOf(word) > -1;
		else if(phrase)
			return (phrase != null) && (phrase.trim() != '');
		else
			return false;
	}
	this.equal = function(value){
		return this.lower(phrase).trim() == this.lower(value).trim();
	}
}

exports.Text = function(value){
	return new TextManager(value);
}
/* ============ List =============== */
function ListManager(list){
	this.scalar = function(calculate){
		var _returnValue;
		for (var i = 0; i < list.length; i++){
			 var _partial = calculate(list[i], _returnValue, i);
			 if(!_partial)
			 	return _returnValue;
		 	_returnValue = _partial;
		};
		return _returnValue;		
	}
	this.parse = function(convertion){
		var _returnValue = [ ];
		for (var i = 0; i < list.length; i++) {
			var _item = convertion(list[i], i);
			_returnValue.push(_item);
		}
		return _returnValue;		
	}
	this.first = function(selection){
		for (var i = 0; i < list.length; i++) {
			if( selection(list[i], i)){
				return list[i];
				break;					
			}
		};		
	}
	this.remove = function(selection){
		var _returnValue = [ ];
		for (var i = 0; i < list.length; i++)
			if(!selection(list[i], i))
				_returnValue.push(list[i]);
		return _returnValue;		
	}
}
exports.List = function(list){
	return new ListManager(list);
}
/* ============ Object =============== */
function ObjectManager(obj){
	this.init = function(defaultObj){
		if(obj){
			for(var key in defaultObj)
			    obj[key] = obj[key] || defaultObj[key];
			return obj;
		}else
			return defaultObj;		
	}
	this.json = function(on_error){
		try{
			if(obj)
				return JSON.stringify(obj);
			else
				return null;
		}catch(ex){
			if(on_error){
				var _parameters = {
					message: 'JSON serialization error',
					error: ex,
					obj: obj					
				}
				return on_error(_parameters);				
			}else
				throw ex;
		}
	}
}
exports.Object = function(obj){
	return new ObjectManager(obj);
}


