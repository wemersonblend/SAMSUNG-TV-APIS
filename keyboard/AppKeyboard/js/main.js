var keyboard, remoteControlNavigator;


window.onload = function () {
	window.tvKey = new Common.API.TVKeyValue();
	window.widgetAPI = new Common.API.Widget();
    window.widgetAPI.sendReadyEvent();

    keyboard =  new Keyboard();
    keyboard.set(['input1', 'input3']);

    remoteControlNavigator =  new RemoteControlNavigator({
        selectors : '.tabindex',
        cssClass: 'setfield',
        onKeyReturn: function(){
            keyboard.close();
        }
    });


    setTimeout(function(){
    	remoteControlNavigator.setActive('#input1');
    }, 500)

        var properties = []

        for(i in IMEShell) {
            properties.push(i);
        }
        _log(properties);

    // setInterval(function(){
    //     _log(_g_ime.IMEOpen());
    //     _log(_g_ime.KeyboardOpen());
    // }, 3000)

    return;

    _log("======================URL>", decodeURI(window.location.search));
    var pluginAPI = new Common.API.Plugin();
    pluginAPI.registIMEKey();

    _g_ime.init("en","2_35_259_12","USA","","us");    //2_35_259_0 USA


	ime = new IMEShell("input1", function(imeobj){
		var inputobj = imeobj.getInputObj();

        _log("start initializing 123456 : "+inputobj.id);

	    imeobj.setEnterFunc(sampleEnter);
        imeobj.setKeypadPos(imeobj.ABkeypad_xyz[0], imeobj.ABkeypad_xyz[1]); //540p
        imeobj.setQWERTYPos(imeobj.ABqwerty_xyz[0], imeobj.ABqwerty_xyz[1]);     //IME XT9, new function
        // imeobj.setAnyKeyFunc(testf2);
        // imeobj.setOnCompleteFunc(onC);
        // imeobj.setMaxLengthFunc(sampleMaxLength);
        // imeobj.setKeyFunc(keyc.KEY_UP, textobjKeyFunc);
        // imeobj.setKeyFunc(keyc.KEY_DOWN, textobjKeyFunc);
        imeobj.setBlockSpace(true);
        // imeobj.setKeypadChangeFunc('12key',move12KeyPosition);
        // imeobj.setKeypadChangeFunc('qwerty',moveqwertyPosition);
        // imeobj.setInputHighlightFunc(inputHighlight);
        imeobj.setAuto(false); //set flag for user autocomplete use or not use
        _log("[IME] ============================================ imeobj.IsSupportXT9:"+imeobj.IsSupportXT9);

        var strKeySet = imeobj.getKeySet();
        _log("[IME] ============================================ strKeySet:"+strKeySet);
        document.getElementById('input1').focus();
        return;
	    var str_temp;
	    if(_g_ime.pluginMouse_use_YN){
	        imeobj._focus();
	        document.getElementById('input1').focus();
	    }
	    else{
	        document.getElementById('input1').focus();
	    }
	    if(imeobj.bRTLLang == true){
	    }


	    _log("ime_init end...");
	});

    if(!ime){
        _log("object for IMEShell create failed", 3);
    }

}

