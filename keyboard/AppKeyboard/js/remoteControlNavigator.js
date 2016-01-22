(function(_global) {

    /**
     * HTML Input elements
     * @type {String}
     */
    var elements = [];

    /**
     * Index of active element
     * @type {Number}
     */
    var tabindex = 0;

    /**
     * Css Class Name
     * @type {String}
     */
    var cssClass = '';

    /**
     * Keyboard code
     * @type {Number}
     */
    var keycode;


    /**
     * Samsung Keyboard callback
     * @type {Number}
     */
    var onKeyReturn;
    var onKeyEnter;

    /**
     * Class to implements remote control navigation
     *
     * @class RemoteControlNavigator
     * @constructor
     * @param {String | Array}
     */
    function RemoteControlNavigator(options) {

        selectors = options.selectors || [];
        cssClass = options.cssClass;
        onKeyReturn = options.onKeyReturn || function(){};
        onKeyEnter = options.onKeyEnter || function(){};
        onSetFocus = options.onSetFocus || function(){};
        onSetInput = options.onSetInput || function(){};

        if(typeof selectors == 'string')
            selectors = [selectors];

        var similarElements;
        for (var i = 0; i < selectors.length; i++) {
            if(isElement(selectors[i])) {
                elements.push(selectors[i]);
            }

            similarElements = document.querySelectorAll(selectors[i]);
            for (var j = 0; j < similarElements.length; j++) {
                elements.push(similarElements[j]);
            }
        }

        // for (var i = 0; i < elements.length; i++) {
        //     elements[i].onfocus = function(evt){
        //         setInput(evt.target);
        //     }
        // };
    }

    RemoteControlNavigator.prototype.setActive = function(selector) {
        if(!selector)
            return false;

        var element;
        element = isElement(selector) ? selector : document.querySelector(selector);

        setInput(element);
        setFocus(element);
    }

    document.addEventListener("keydown", function(inEvent){
        if(window.event) {
            keycode = inEvent.keyCode;
        } else if(e.which) {
            keycode = inEvent.which;
        }

        // console.log(keycode, inEvent);

        // KEY Return
        if(keycode == 88) {
           onKeyReturn();
        }

        // If Keyboard is Open Return
        if(_global._g_ime.curFocusObj)
            return;

        // KEY Control bottom && KEY Control right
        if(keycode == 29461 || keycode == 5 || keycode == 40) {
            nextElement();
        }

        // KEY Control Up && KEY Control left
        if(keycode == 29460 || keycode == 5 || keycode == 38) {
            prevElement();
        }

        // KEY Control Enter && KEY End
        if(keycode == 29443 || keycode == 13) {
            setFocus();
            onKeyEnter();
        }

    });

    /**
     * Increment tab index
     */
    function nextElement(){
        tabindex ++;

        if(tabindex == elements.length) {
            tabindex = 0;
        }

        setInput();
    }

    /**
     * Decrement tabindex
     */
    function prevElement(){
        tabindex --;

        if(tabindex < 0) {
            tabindex = elements.length -1;
        }

        setInput();
    }

    /**
     * Set active Element.
     * @param {Object} element [description]
     */
    function setInput(element) {

        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove(cssClass);
        };

        if(isElement(element)) {
            onSetInput(element);
            return element.classList.add(cssClass);
        }

        onSetInput(elements[tabindex]);
        elements[tabindex].classList.add(cssClass);

    }

    /**
     * Set focus on press enter key
     */
    function setFocus(element) {
        if(!isElement(element))
            element = elements[tabindex];

        element.click();
        element.focus();
        onSetFocus(element);
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

    _global.RemoteControlNavigator = RemoteControlNavigator;
})(this);