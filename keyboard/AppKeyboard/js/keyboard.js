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

    Keyboard.prototype.set = function(inputIds) {
        inputs = inputIds || [];
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

        var strKeySet = imeobj.getKeySet();
    }

    _global.Keyboard = Keyboard;
})(this);