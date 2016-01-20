var fs;
var defaultDir = '/workdir';

mkdirTxt.value = defaultDir;
rmTxt.value = defaultDir;
rmfileTxt.value = defaultDir + '/teste.txt';
writefileTxt.value = defaultDir + '/teste.txt';
readfileTxt.value = defaultDir + '/teste.txt';
writefileDataTxt.value = 'vamos lá correr pra casa';
listDirTxt.value = defaultDir;

window.onload = function () {
	window.widgetAPI = new Common.API.Widget();
    window.widgetAPI.sendReadyEvent();

    defaultDir = window.widgetAPI.id;
    _log("defaultDir", defaultDir, window.widgetAPI);

	fs =  new Filesystem({
		sefPlugin : document.querySelector('#SefPlugin'),
		fileSystemPlugin : document.querySelector('#FileSystemPlugin')
	});

}


document.addEventListener("keydown", function(inEvent){

	if(window.event) {
		keycode = inEvent.keyCode;
	} else if(e.which) {
		keycode = inEvent.which;
	}

	// return _log(keycode)

	// key 1
	if(keycode == 49 || keycode == 101)
		return init();

	// key 2
	if(keycode == 50 || keycode == 98)
		return mkdir();

	// key 3
	if(keycode == 51 || keycode == 6)
		return rmdir();

	// key 4
	if(keycode == 52 || keycode == 8)
		return rmfile();

	// key 5
	if(keycode == 53 || keycode == 9)
		return writefile();

	// key 6
	if(keycode == 54 || keycode == 10)
		return readfile();

	// key 7
	if(keycode == 55 || keycode == 12)
		return listdir();
});

function init(){
	fs.init();
}

function mkdir(){
	var path = mkdirTxt.value;

	_log('mkdir path', path);
	fs.mkdir(path, {}, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);
	})
}

function rmdir(){
	var path = rmTxt.value;

	_log('rmdir path', path);
	fs.rmdir(path, {recursive: true}, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);
	})
}


function rmfile(){
	var path = rmfileTxt.value;

	_log('rmfile path', path);
	fs.rm(path, {recursive: true}, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);

	})
}

function writefile(){
	var path = writefileTxt.value;
	var text = writefileDataTxt.value;

	_log('writefile path', path);
	fs.writeFile(path, text, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);
	})
}

function readfile(){
	var path = readfileTxt.value;

	_log('readfile path', path);
	fs.readFile(path, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);
	})
}


function listdir(){
	var path = listDirTxt.value;

	_log('listdir path', path);
	fs.ls(path, function(error, data){
		if(error)
			return _log('error', error);

		_log('data', data);
	})
}
