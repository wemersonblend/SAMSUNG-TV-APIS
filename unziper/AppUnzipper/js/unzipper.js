(function(_global) {

    /**
     * Class to unzip files
     *
     * @class Unzipper
     * @param {Object}   options  [description]
     * @param {Function} callback [description]
     * @constructor
     */

    function Unzipper(options, callback) {
        this.FILE_SYSTEM_PLUGIN = options.fileSystemPlugin;
        this.SEF_PLUGIN = options.sefPlugin;
    }

    /**
     * Start method for unzip file
     * @param  {Object}   options  {from : 'String', to:'String'}
     * @param  {Function} callback [description]
     */
    Unzipper.prototype.start = function init(options, callback) {
        var zipped;
        this.FROM_PATH = options.from;
        this.TO_PATH = options.to;

        _log(this.FROM_PATH, this.TO_PATH);

        if(!this.FILE_SYSTEM_PLUGIN)
           return callback({message: 'Download require sefPlugin'});

        if(!this.FROM_PATH || !this.TO_PATH)
            return callback({message: 'invalid arguments. Required {from:"", to: ""}'});

        try {
            zipped = this.FILE_SYSTEM_PLUGIN.Unzip(this.FROM_PATH, this.TO_PATH);
            return callback(null, zipped);
        } catch(error) {
            return callback({
                error: error,
                message: 'Internal error'
            }, null);
        }
    }

    _global.Unzipper = Unzipper;
})(this);


/**
 *
 *    var unzipper =  new Unzipper({
 *        fileSystemPlugin : document.querySelector('#FileSystemPlugin')
 *    });
 *
 *    unzipper.start({
 *        from: '/mtd_down/common/test/file.zip',
 *        to: '/mtd_down/common/test',
 *    }, function(error, data){
 *        console.log('complete', error, data)
 *    });
 *
 **/
