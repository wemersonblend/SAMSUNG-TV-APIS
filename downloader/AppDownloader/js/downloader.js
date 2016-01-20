(function(_global) {

    /**
     * Classe para gerenciar Downloads
     *
     * @class Downloader
     * @constructor
     * @param {String} projPath Caminho do projeto
     */
    function Downloader(options, callback) {
        this.DOWNLOADER_PLUGIN = options.downloaderPlugin;
        this.SEF_PLUGIN = options.sefPlugin;
    }

    Downloader.prototype.start = function start(options, callback) {

        var filename;

        this.TO_PATH = normalizePath(options.path);
        this.FROM_URL = options.url;

        filename = extractFileFromPath(this.TO_PATH);
        if(!filename) {
            filename = extractFileFromPath(this.FROM_URL);
            this.TO_PATH = this.TO_PATH + '/' + filename;
        }

        this.onComplete = options.onComplete || function(){};
        if(!this.DOWNLOADER_PLUGIN)
           return callback({message: 'Download require sefPlugin'});

        if(!this.FROM_URL || !this.TO_PATH)
            return callback({message: 'invalid arguments. Required {url:"", path: ""}'});

        try {
            this.DOWNLOADER_PLUGIN.OnComplete = '__onDownloadEvent';
            var downloaded = this.DOWNLOADER_PLUGIN.StartDownFile(this.FROM_URL, this.TO_PATH);
        } catch(error) {
            return callback({
                error: error,
                message: 'Internal error'
            });
        }

        _global.__onDownloadEvent = function (param) {
            var strList = param.split('?');


            if (strList[0] == '1000' && strList[1] == '1')
                return callback(null, true);

            return callback({message: 'Download Failed!'}, false);
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
    }

    _global.Downloader = Downloader;
})(this);


/**
 *
 *    var downloader =  new Downloader({
 *        downloaderPlugin : document.querySelector('#DownloaderPlugin')
 *    });
 *
 *    downloader.start({
 *        url: 'http://example.com/file.zip',
 *        path: '/mtd_down/common/test',
 *    }, function(error, data){
 *        console.log('complete', error, data)
 *    });
 *
 **/
