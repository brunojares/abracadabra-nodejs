var path = require('path');
var mime = require('mime');
var url = require('url');
var struct = require('Struct');

/* ============ Path SO =============== */
exports.Local = function(value){
    value = value.replace("/\/g", "/");
    //... Pastas
    var tree = value.substring(0, value.lastIndexOf('/'));
    //... Arquivo
    var file = value.substring(value.lastIndexOf('/') + 1);
    //... Extencao
    var idx = (~-value.lastIndexOf(".") >>> 0) + 2;
    var extension = value.substr((value.lastIndexOf("/") - idx > -3 ? -1 >>> 0 : idx));
    //...
    var extensionLenght = value.length - idx;
    var fileLenfht = file.length - (extension.length ? extension.length + 1 : 0);
    //======
	return {
		exists: fs.existsSync(value),
        tree: tree,        
        extension: extension,
        fullPath: value,
        fullName: Arquivo.substring(0, fileLenfht),
        baseName: .basename(value),
        mime: mime.lookup(value)
    };
}

/* ============ URL =============== */
/*  /Pessoa/Lista?filtro=jares

    slices: { protocol: null,
         slashes: null,
         auth: null,
         host: null,
         port: null,
         hostname: null,
         hash: null,
         search: '?filtro=jares',
         query: { filtro: 'jares' },
         pathname: '/Pessoa/Lista',
         path: '/Pessoa/Lista?filtro=jares',
         href: '/Pessoa/Lista?filtro=jares' 
    },
    fullValue: '/Pessoa/Lista?filtro=jares'
*/
function UrlManager(value){
    this.slices = url.parse(value, true);
    this.fullValue = value;
    //this.caminho = this.slices.pathname;    
    //this.complemento = this.slices.path;    
    //this.parametros = this.slices.query || { };
    if(!this.slices.query)
        this.slices.query = { };

    this.format = function(){
        if(struct.Text(value).has()){
            var _returnValue = this.slices.pathname;
            _returnValue = struct.Text(_returnValue).lower();

            if(!struct.Text(_returnValue).ends('/'))
                _returnValue += '/';
            if(!struct.Text(_returnValue).starts('/'))
                _returnValue = '/' + _returnValue;
            return _returnValue.trim();         
        }else
            return '/';     
    }
}

exports.Url = function(value){
    return new UrlManager(value);
}