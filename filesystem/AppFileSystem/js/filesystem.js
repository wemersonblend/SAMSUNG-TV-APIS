(function(_global) {

    /**
     * Classe to manipulate filesystem
     *
     * @class Filesystem
     * @constructor
     * @param {String} projPath Caminho do projeto
     */
    function Filesystem(options, callback) {
        this.FILE_SYSTEM_PLUGIN = options.fileSystemPlugin;
        this.SEF_PLUGIN = options.sefPlugin;
        this.FILE_SYSTEM = new FileSystem();
    }

    Filesystem.prototype.init = function init(options, callback) {
        if(!this.FILE_SYSTEM_PLUGIN)
            this.FILE_SYSTEM_PLUGIN = options.fileSystemPlugin;
        if(!this.SEF_PLUGIN)
            this.SEF_PLUGIN = options.sefPlugin;
        if(!this.FILE_SYSTEM)
            this.FILE_SYSTEM = new FileSystem();

        callback({success: true});
    }

    /**
     * Creates a directory.
     *
     * @method mkdir
     * @param {string} path
     * @param {object} options || callback
     * @param {function} callback
     */
    Filesystem.prototype.mkdir = function (path, options, callback) {
        if(!this.FILE_SYSTEM)
           return callback({message: 'Filesystem API not initialized'}, null);

        if(!path)
           return callback({message: 'Invalid dir path'}, null);

        if(typeof options == 'function')
            callback = options;

        try {
            var createdDir = this.FILE_SYSTEM.createCommonDir(path);
            callback( null, createdDir);
        } catch (err) {
            callback({message: err}, null);
        }
    }

    /**
     * Remove a directory.
     *
     * @method rmdir
     * @param {string} path
     * @param {object} options || callback
     * @param {function} callback
     */
    Filesystem.prototype.rmdir = function (path, options, callback) {
        var that = this;

        if(!this.FILE_SYSTEM)
           return callback({message: 'Filesystem API not initialized'}, null);

        if(!path)
           return callback({message: 'Invalid dir path'}, null);

        if(typeof options == 'function') {
            callback = options;
            options = {recursive : false};
        }

        if(typeof callback != 'function')
            callback = function(){return;};

        options = options || {recursive: false};
        options.recursive = options.recursive || false;

        that.ls(path, function(error, fileList){
            var file, hasDirectory = false;

            for (var i = 0; i < fileList.length; i++) {
                file = fileList[i];

                if(file.isDirectory) {
                    that.rmdir(path + '/' + file.name, {recursive: true});
                } else {
                    that.rm(path + '/' + file.name);
                }
            }

        });

        try {
            removedDir = this.FILE_SYSTEM.deleteCommonDir(path);
        } catch (err) {
            return callback({
                error: err,
                message: 'Internal Error'
            }, null);
        }
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
           return callback({message: 'Filesystem API not initialized'}, null);

        if(!filePath)
           return callback({message: 'File not Found'}, null);

        if(typeof options == 'function')
            callback = options;

        if(typeof callback != 'function')
            callback = function(){};

        var removedFile = this.FILE_SYSTEM.deleteCommonFile(filePath);

        if(!removedFile)
            return callback(removedFile, false);

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
        var isValidPath;

        isValidPath = this.FILE_SYSTEM.isValidCommonPath(filePath);
        if(!filePath || !isValidPath)
            return callback({message: 'Invalid filePath'}, null);

        try{
            var fileObj = this.FILE_SYSTEM.openCommonFile(filePath, 'r');
            var strResult = fileObj.readAll();
        }catch (err) {
            return callback({
                error: err,
                data: strResult,
                message: 'Internal Error'
            }, null);
        }

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

        if(!this.FILE_SYSTEM_PLUGIN)
           return callback({message: 'Filesystem Plugin not initialized'}, null);

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
        var list;

        if(!path)
           return callback({message: 'Invalid file path'}, null);

        if (path[0] !== '/') {
            path = '/' + path;
        }

        path = '/mtd_down/common' + path;

        if(!this.FILE_SYSTEM_PLUGIN)
           return callback({message: 'Filesystem API not initialized'}, null);

        try {

            this.SEF_PLUGIN.Open('FileSystem', '1.000', 'FileSystem');
            this.SEF_PLUGIN.Execute('SetWidgetInfo', 2, path);
            list = this.SEF_PLUGIN.Execute("GetListFiles", path);

        } catch(err) {
            return callback({
                error: err,
                message: 'Internal Error'
            }, null);
        }

        // @todo: verificar se é isso mesmo. List vazio ou com erro

        if(!list || list.length == 0)
            return callback({message: 'Invalid Path'}, null);

        if(callback)
            callback(null, listToObject(list));

        function listToObject (list){
            var item, newlist = [];

            if(!list)
                return [];

            try{
                if(typeof list != 'object')
                    list = JSON.parse(list);

                list.pop(); // remove the 0 element from array
            } catch (err) {
                list = [];
            }

            for (var i = 0; i < list.length; i++) {
                newlist.push({
                    name : list[i],
                    isDirectory: (list[i].indexOf('.') > 0) ? false : true,
                    isFile: (list[i].indexOf('.') > 0) ? true : false
                });
            }

            return newlist;
        }
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
