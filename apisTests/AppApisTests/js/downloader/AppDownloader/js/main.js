var downloader;
var defaultDir = '/mtd_down/common/testeDir';

urlfileTxt.value = 'http://www.samsungdforum.com/B2B/Guide/_downloads/mixPlaylistApp.zip';
pathfileTxt.value = defaultDir;

window.onload = function () {
	_log('onload')
	window.widgetAPI = new Common.API.Widget();
    window.widgetAPI.sendReadyEvent();

	downloader =  new Downloader({
		sefPlugin : document.querySelector('#SefPlugin'),
		downloaderPlugin : document.querySelector('#DownloaderPlugin')
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
		return start();

});

function init(){
	_log('init');
	downloader.start({
		url: urlfileTxt.value,
		path: pathfileTxt.value,
	}, function(error, data){
		_log('complete', error, data)
	});
}