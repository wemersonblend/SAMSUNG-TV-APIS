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
        this.TO_PATH = normalizePath(options.to);

        _log('paths', this.FROM_PATH, this.TO_PATH);

        if(!this.FILE_SYSTEM_PLUGIN)
           return callback({message: 'Download require sefPlugin'});

        if(!this.FROM_PATH || !this.TO_PATH)
            return callback({message: 'invalid arguments. Required {from:"", to: ""}'});

        try {
            zipped = this.FILE_SYSTEM_PLUGIN.Unzip(this.FROM_PATH, this.TO_PATH + '/test');
            _log('1 zipped', zipped);
            return callback(null, zipped);
        } catch(error) {
            _log('error zipped', error);
            return callback({
                error: error,
                message: 'Internal error'
            }, null);
        }
    }

     /**
     * Convert path string to correct format
     * @param  {String} pathString [description]
     * @example            normalizePath('/mtd_down')          /mtd_down
     * @example            normalizePath('/mtd_down/common')   /mtd_down/common
     * @example            normalizePath('/mtd_down/anyone')   /mtd_down/anyone
     * @example            normalizePath('/test')              /mtd_down/common/test
     * @return {String}
     */
    function normalizePath (pathString) {

        pathString = (pathString[0] == '/')    ?    pathString    :    '/' + pathString;
        pathString = (pathString[pathString.length -1] == '/')    ?    pathString.substring(0, pathString.length-1)    :    pathString;

        if(!pathString.match('/mtd_down'))
            pathString = pathString.match('/mtd_down/common') ? pathString : '/mtd_down/common' + pathString;


        return pathString;
    }
    /**
     * Extract file from path or URL
     * @return {String} file.txt
     */
    function extractFileFromPath(pathString) {
        var file;

        if(typeof pathString != 'string')
            return '';

        pathString = pathString.split('/');
        file = pathString[pathString.length-1];

        if(file.indexOf('.') > -1)
            return file;
        else
            return '';
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
