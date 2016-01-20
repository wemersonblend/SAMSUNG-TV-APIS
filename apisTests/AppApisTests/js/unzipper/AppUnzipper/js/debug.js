(function( _global ) {
    this.debugMode = true;

    function log(str) {
        this.logger = document.querySelector('#debug');

        if(!this.logger)
            return this.logger = createTextarea(str, this);

        this.logger.style.display = '';

        for(i in arguments) {
            str = arguments[i];

            if(typeof str == 'object' || typeof str == 'array')
                str = JSON.stringify(str);

            this.logger.value = this.logger.value + '\n' + str;
            sendLog(str);
        }
        this.logger.value = this.logger.value + '\n --------------------';
        this.logger.scrollTop = logger.scrollHeight;
    }

    function createTextarea(str, callback) {
        var textarea = document.createElement('textarea');

        textarea['id']                      = "debug";
        textarea.style['display']           = 'none';
        textarea.style['position']          = 'absolute';
        textarea.style['height']            = '300px';
        textarea.style['width']             = '50%';
        textarea.style['top']               = '20px';
        textarea.style['right']                 = '20px';
        textarea.style['top']               = '20px';
        textarea.style['z-index']           = '999999999';
        textarea.style['background-color']  = 'rgba(255, 255, 255, 0.9)';
        textarea.onclick = function() {
            textarea.style.display = 'none';
        }

        _global.txt = textarea;

        window.onload = function() {
            document.body.appendChild(textarea);
        }

        textarea.onload = function() {
            callback(str);
        }

        return textarea;
    }

    function sendLog(strLog) {
        // var xmlhttp = new XMLHttpRequest();
        // var url = "http://requestb.in/087a6sda";
        // xmlhttp.open("POST", url, true);
        // xmlhttp.send(strLog);
    }

    log.prototype.clear = function (){
        if(this.logger)
            this.logger.value = '';
    }

    log.prototype.close = function (){
        if(this.logger)
            this.logger.value = '';
    }

    _global._log = log;
    if(!_global.console) {
        _global.console = {log: _log}
    }

})( this );
