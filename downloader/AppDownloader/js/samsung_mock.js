(function( global ) {

	//	CLASS CONSTRUCTOR
	var Common = {
		API: {Widget:function(){return {sendReadyEvent:function(){}}},
		Plugin:function(){}}
	}

	if(!global.Common)
		global.Common = Common;

	if(!global.FileSystem)
		global.FileSystem = function(){};

})( this )

