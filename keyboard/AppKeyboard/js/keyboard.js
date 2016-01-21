(function(_global) {

    /**
     * HTML Inputs elements
     * @type {String}
     */
    var inputs;

    /**
     * Classe to implements keyboard
     *
     * @class Keyboard
     * @constructor
     * @param {String} projPath Caminho do projeto
     */
    function Keyboard(options, callback) {

        var tvKey = new Common.API.TVKeyValue();
        var pluginAPI = new Common.API.Plugin();
        pluginAPI.registIMEKey();

        _g_ime.init("en","2_35_259_12","USA","","us");    //2_35_259_0 USA
    }

    Keyboard.prototype.set = function(_inputs) {
        inputs = _inputs || [];
        if(typeof inputs == 'string')
            inputs = [inputs];

        for (var i = 0; i < inputs.length; i++) {
            ime = new IMEShell(inputs[i], initIME)
        };
    }

    Keyboard.prototype.close = function (){
        for (var i = 0; i < inputs.length; i++) {
            document.querySelector('#' + inputs[i]).blur();
        };
    }

    function initIME (imeobj) {
        imeobj.setKeypadPos(imeobj.ABkeypad_xyz[0], imeobj.ABkeypad_xyz[1]);    //540p
        imeobj.setQWERTYPos(imeobj.ABqwerty_xyz[0], imeobj.ABqwerty_xyz[1]);    //IME XT9, new function
        imeobj.setKeySetFunc('qwerty');
        imeobj.setBlockSpace(true);
        imeobj.setAuto(true); //set flag for user autocomplete use or not use
        imeobj.setEnterFunc(function(a, b){
            _log('setEnterFunc', a, b)
        });

        var strKeySet = imeobj.getKeySet();
    }


    // Manipulate keyboard actions
    var keycode;

    document.addEventListener("keydown", function(inEvent){

        if(window.event) {
            keycode = inEvent.keyCode;
        } else if(e.which) {
            keycode = inEvent.which;
        }

        // KEY Return
        if(keycode == 88) {
           keyboard.close();
        }

        // If Keyboard is Open Return
        if(_g_ime.curFocusObj)
            return;

        // KEY Control bottom && KEY Control right
        if(keycode == 29461 || keycode == 5) {
            nextElement();
        }

        // KEY Control Up && KEY Control left
        if(keycode == 29460 || keycode == 5) {
            prevElement();
        }

        // KEY Control Enter && KEY End
        if(keycode == 29443) {
            document.activeElement.click();
        }

    });

    function nextElement(){
        var tabindex = window.tabindex || 0;
        var totalElements = document.querySelectorAll('.tabindex').length;

        tabindex ++;

        if(tabindex == totalElements) {
            tabindex = 0;
        }

        _log(tabindex);
        setFocus(tabindex);
    }

    function prevElement(){
        var tabindex = window.tabindex || 0;
        var totalElements = document.querySelectorAll('.tabindex').length;

        tabindex --;

        if(tabindex < 0) {
            tabindex = totalElements -1;
        }

        _log(tabindex);
        setFocus(tabindex);
    }

    function setFocus(tabindex) {
        // _log( document.querySelectorAll('.tabindex'));
        var element = document.querySelectorAll('.tabindex')[tabindex];

        element.focus();
        window.tabindex = tabindex;
    }

    _global.Keyboard = Keyboard;
})(this);