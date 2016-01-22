(function(_global) {

    /**
     * HTML Inputs elements
     * @type {String}
     */
    var inputs = [];

    /**
     * Classe to implements keyboard
     *
     * @class Keyboard
     * @constructor
     * @param {String} projPath Caminho do projeto
     */
    function Keyboard(options, callback) {

        if(!_global._g_ime)
            return callback({error: 'Invalid _g_ime object instaled.'});

        if(!_global.IMEShell)
            return callback({error: 'Invalid IMEShell object instaled.'});

        if(!_global.Common || !_global.Common.API || !_global.Common.API.TVKeyValue)
            return callback({error: 'Widget TVKeyValue not instaled.'});

        if(!_global.Common || !_global.Common.API || !_global.Common.API.Plugin)
            return callback({error: 'Widget Plugin not instaled.'});

        selectors = options.selectors || [];
        if(typeof selectors == 'string')
            selectors = [selectors];

        this.imesObj = [];
        var similarElements;

        for (var i = 0; i < selectors.length; i++) {
            if(isElement(selectors[i])) {
                if(!selectors[i].id)
                    selectors[i].id = "ime_" + new Date().getTime();

                if(isValidInputKeyboard(selectors[i]))
                    inputs.push(selectors[i].id);
            }

            // get all elements with similar selectors in html
            similarElements = document.querySelectorAll(selectors[i]);
            for (var j = 0; j < similarElements.length; j++) {
                if(!similarElements[j].id)
                    similarElements[j].id = "ime_" + new Date().getTime();

                if(isValidInputKeyboard(similarElements[j]))
                    inputs.push(similarElements[j].id);
            }
        }

        this.set(inputs);

        if(!_global.tvKey)
            _global.tvKey = new _global.Common.API.TVKeyValue();

        if(!_global.pluginAPI) {
            _global.pluginAPI = new _global.Common.API.Plugin();
            _global.pluginAPI.registIMEKey();
            _global._g_ime.init("en","2_35_259_12","USA","","us");    //2_35_259_0 USA
            // _global._g_ime.pluginMouse_use_YN = true;
            // _global._g_ime.keySet = 'qwerty';
        }

    }

    Keyboard.prototype.set = function(inputIds) {
        inputs = inputIds || [];
        if(typeof inputs == 'string')
            inputs = [inputs];
        var ime;

        for (var i = 0; i < inputs.length; i++) {
            ime = new _global.IMEShell(inputs[i], initIME);
            this.imesObj.push(ime);
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

    /**
     * Verify if is dom element
     * @param  {Object}  el [description]
     * @return {Boolean}    [description]
     */
    function isElement(el) {
        var tagName = '';
        if(typeof el != 'object')
            return false;

        if(!('tagName' in el))
            return false;

        el.tagName = tagName;

        if(el.tagName != tagName)
            return true;

        return false;
    }

    function isValidInputKeyboard (element){
        var validElements = ['INPUT', 'TEXTAREA', 'SELECT'];

        if(!element || typeof element != 'object' || !('tagName' in element))
            return false;

        for (var i = 0; i < validElements.length; i++) {
            if(element.tagName == validElements[i]) {
                return true;
            };
        };

        return false;
    }

    _global.Keyboard = Keyboard;
})(this);