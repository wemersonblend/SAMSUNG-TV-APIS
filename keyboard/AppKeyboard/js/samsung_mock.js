(function( global ) {

	//	CLASS CONSTRUCTOR
	var Common = {
		API: {
			Widget:function(){return {sendReadyEvent:function(){}}},
			Plugin:function(){return {registIMEKey:function(){}}},
			TVKeyValue: function(){}
		}
	}

	var _g_ime = {
		init: function(){}
	}

	var IMEShell = function(){

	}

	if(!global.Common)
		global.Common = Common;

	if(!global._g_ime)
		global._g_ime = _g_ime;

	if(!global.IMEShell)
		global.IMEShell = IMEShell;

	if(!global.FileSystem)
		global.FileSystem = function(){};

})( this )



window.onerror = function (error) {
	_log(error)
}