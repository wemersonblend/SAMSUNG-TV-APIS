(function(_global) {

    /**
     * Classe para manipular arquivos em disco no chrome
     *
     * @class Filesystem
     * @constructor
     * @param {String} projPath Caminho do projeto
     */
    function Filesystem(options, callback) {
        _log(options);
        this.FILE_SYSTEM_PLUGIN = options.fileSystemPlugin;
        this.SEF_PLUGIN = options.sefPlugin;
        this.SEF_PLUGIN.Open('FileSystem', '1.000', 'FileSystem');
        this.FILE_SYSTEM = new FileSystem();
    }

    Filesystem.prototype.init = function init(callback) {
        _log('FileSystem Init');
        _log(this.FILE_SYSTEM_PLUGIN);
        _log('FileSystem__');
        _log(this.FILE_SYSTEM, typeof this.FILE_SYSTEM.openCommonFile);

        // if(!this.FileSystemPlugin)
        //     this.FileSystemPlugin = document.querySelector('#FileSystemPlugin');

        // _log(FileSystemPlugin);
    }

    /**
     * Creates a directory.
     *
     * @method mkdir
     * @param {string} path
     * @param {function} callback
     */
    Filesystem.prototype.mkdir = function (path, options, callback) {
        if(!this.FILE_SYSTEM)
           return console.warn('Filesystem API not initialized');

        if(!path)
           return callback({message: 'Invalid dir path'}, null);

        var createdDir = this.FILE_SYSTEM.createCommonDir(path);
        callback( null, createdDir);
    }

    /**
     * Remove a directory.
     *
     * @method rmdir
     * @param {string} path
     * @param {object} options
     * @param {function} callback
     */
    Filesystem.prototype.rmdir = function (path, options, callback) {
        if(!this.FILE_SYSTEM)
           return console.warn('Filesystem API not initialized');

        if(!path)
           return callback({message: 'Invalid dir path'}, null);

        var removedDir = this.FILE_SYSTEM.deleteCommonDir(path);
        callback(null, removedDir);
    }

    /**
     * Remove a file.
     *
     * @method rm
     * @param {string} filePath
     * @param {object} options
     * @param {function} callback
     */
    Filesystem.prototype.rm = function (filePath, options, callback) {
        if(!this.FILE_SYSTEM)
           return console.warn('Filesystem API not initialized');

        if(!filePath)
           return callback({message: 'Invalid file filePath'}, null);

       if(typeof options == 'function')
            callback = options;

        var removedFile = this.FILE_SYSTEM.deleteCommonFile(filePath);

        if(!removedFile)
            return callback(removedFile, null);

        callback(null, removedFile);

    }

    /**
     * Read a file like text.
     *
     * @method readFile
     * @param {string} filePath
     * @param {function} callback
     */
    Filesystem.prototype.readFile = function (filePath, callback) {

        if(!filePath)
            return callback({message: 'Invalid file filePath'}, null);

        var fileObj = this.FILE_SYSTEM.openCommonFile(filePath, 'r');
        var strResult = fileObj.readAll();

        if(!strResult)
            return callback(strResult, null);

        callback(null, strResult);
    }

    /**
     * Write a file.
     *
     * @method writeFile
     * @param {string} path
     * @param {string} data
     * @param {string} fileType
     * @param {object} options
     * @param {function} callback
     */
    Filesystem.prototype.writeFile = function(filePath, data, fileType, options, callback){
        if(!filePath)
            return callback({message: 'Invalid file filePath'}, null);

        if(typeof fileType == 'function')
            callback = fileType;

        if(typeof options == 'function')
            callback = options;

        var fileObj = this.FILE_SYSTEM.openCommonFile( filePath , 'w' );
        fileObj.writeAll(data);
        this.FILE_SYSTEM.closeCommonFile(fileObj);

        callback(null, fileObj);
    }

   /**
     * Rename file.
     *
     * @method renameFile
     * @param {string} filePath
     * @param {string} newName
     * @param {function} callback
     */
    Filesystem.prototype.renameFile = function(filePath, newFilePath, callback) {

        if(!this.FILE_SYSTEM)
           return console.warn('Filesystem API not initialized');

        if(!filePath)
           return callback({message: 'Invalid dir filePath'}, null);

        var movedFile = this.FILE_SYSTEM_PLUGIN.Move(filePath, newFilePath);
        callback(null, movedFile);
    }

    /**
     * List all files that exists in the specified path.
     *
     * @param  {string}   path     path to list
     * @param  {Function} callback Callback function
     * @return {array}             Outputs an array of objects
     */
    Filesystem.prototype.ls = function ls(path, callback) {
        if(!this.FILE_SYSTEM_PLUGIN)
            return console.warn('Filesystem API not initialized');

        if(!path)
           return callback({message: 'Invalid file path'}, null);

        var list = this.SEF_PLUGIN.Execute("GetListFiles", path + '/');

        if(typeof(callback))
            callback(null, list);
    }

    _global.Filesystem = Filesystem;
})(this);


/**
 *
 *  var fs = new Filesystem();
 *      fs.init(function(){
 *          fs.ls('/', function(){});
 *       });
 *
 **/
