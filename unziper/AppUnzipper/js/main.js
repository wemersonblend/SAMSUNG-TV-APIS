var unzipper;
var defaultDir = '/mtd_down/common/testeDir';

fromTxt.value = '/mtd_down/common/testeDir/mixPlaylistApp.zip';
toTxt.value = defaultDir;

window.onload = function () {
	_log('onload')
	window.widgetAPI = new Common.API.Widget();
    window.widgetAPI.sendReadyEvent();

	unzipper =  new Unzipper({
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

	_log('_keydown');
	// key 1
	if(keycode == 49 || keycode == 101)
		return init();

});

function init(){
	_log('init');
	unzipper.start({
		from: fromTxt.value,
		to: toTxt.value,
	}, function(error, data){
		_log('complete', error, data)
	});
}