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
        this.FROM_URL = options.url;
        this.TO_PATH = options.path;
        this.onComplete = options.onComplete || function(){};

        if(!this.DOWNLOADER_PLUGIN)
           return callback({message: 'Download require sefPlugin'});

        if(!this.FROM_URL || !this.TO_PATH)
            return callback({message: 'invalid arguments. Required {url:"", path: ""}'});

        try {
            this.DOWNLOADER_PLUGIN.OnComplete = '__onDownloadEvent';
            this.DOWNLOADER_PLUGIN.StartDownFile(this.FROM_URL, this.TO_PATH);
        } catch(error) {
            return callback({
                error: error,
                message: 'Internal error'
            });
        }

        _global.__onDownloadEvent = function (param) {
            var strList = param.split('?');

            _log('5 start');

            if (strList[0] == '1000') {
                if (strList[1] == '1')
                    return callback(null, {success: true});

                return callback({error: 'Download Failed!'});
            }
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
