var HttpActionManager = require('./HttpActionManager');

module.exports = function(config){
	var _this = this;
	
	this.config = config;
	this.on = function(selection){
		return new HttpActionManager(selection, _this.session, config);
	}
}