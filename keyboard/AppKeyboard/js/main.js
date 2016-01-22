var keyboard, remoteControlNavigator;


window.onload = function () {
	window.tvKey = new Common.API.TVKeyValue();
	window.widgetAPI = new Common.API.Widget();
    window.widgetAPI.sendReadyEvent();

    keyboard =  new Keyboard({
        selectors: ['.tabindex']
    });
    // keyboard.set(['input1', 'input3']);

    remoteControlNavigator =  new RemoteControlNavigator({
        selectors : '.tabindex',
        cssClass: 'setfield',
        onKeyReturn: function(){
            keyboard.close();
        },

        onSetInput: function(element){

            if(element.type == 'number')
                _g_ime.keySet = '12key';
            else
                _g_ime.keySet = 'qwerty';
        }
    });


    setTimeout(function(){
    	remoteControlNavigator.setActive('#input1');
    }, 500)
}

