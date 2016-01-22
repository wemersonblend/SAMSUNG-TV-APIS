
# SAMSUNG-TV-APIS

Generic Apis implemented to Samsung LFD applications


[Filesystem API](#filesystem-api)
[Download API](#download-api)
[Unzip API](#unzip-api)
[Keyboard API](#keyboard-api)
[Remote Control API](#remote-control-api)

<a href="#" name="filesystem-api"></a>
## Filesystem API

Class to handle filesystem

**HTML Code**
```html
<!-- HEAD -->
<script type="text/javascript" language="javascript" src="$MANAGER_WIDGET/Common/API/Widget.js"></script>
<script type="text/javascript" language="javascript" src="$MANAGER_WIDGET/Common/API/TVKeyValue.js"></script>

<object id="FileSystemPlugin" classid="clsid:SAMSUNG-INFOLINK-FILESYSTEM"></object>
<object id="SefPlugin" classid="clsid:SAMSUNG-INFOLINK-SEF"></object>

```

**Javascript Code**
```javascript
var fs =  new Filesystem({
    sefPlugin : document.querySelector('#SefPlugin'),
    fileSystemPlugin : document.querySelector('#FileSystemPlugin')
});

fs.mkdir('/mypath', {}, function(error, data){
    console.log('complete', error, data);
});

fs.rmdir('/mypath', {}, function(error, data){
    console.log('complete', error, data);
});

fs.rm('/mypath/file.txt', {}, function(error, data){
    console.log('complete', error, data);
});

fs.writeFile(path, text, function(error, data){
    console.log('complete', error, data);
});

fs.readFile(path, text, function(error, data){
    console.log('complete', error, data);
});

fs.ls(path, function(error, data){
    console.log('complete', error, data);
});

```

<a href="#" name="download-api"></a>
## Download API

Class to manage downloads

**HTML Code**
```html
<!-- HEAD -->
<script type="text/javascript" language="javascript" src="$MANAGER_WIDGET/Common/API/Widget.js"></script>
<script type="text/javascript" language="javascript" src="$MANAGER_WIDGET/Common/API/TVKeyValue.js"></script>

<object id="FileSystemPlugin" classid="clsid:SAMSUNG-INFOLINK-DOWNLOAD"></object>
<object id="SefPlugin" classid="clsid:SAMSUNG-INFOLINK-SEF"></object>

```

**Javascript Code**
```javascript
var downloader =  new Downloader({
    sefPlugin : document.querySelector('#SefPlugin'),
    downloaderPlugin : document.querySelector('#DownloaderPlugin')
});

downloader.start({
    url: 'http://www.example.com/myfile.zip',
    path: '/mypath/myfile.zip',
}, function(error, data){
    console.log('complete', error, data)
});
```

<a href="#" name="unzip-api"></a>
## Unzip API

Class to unzip files

**HTML Code**
```html
<!-- HEAD -->
<script type="text/javascript" language="javascript" src="$MANAGER_WIDGET/Common/API/Widget.js"></script>
<script type="text/javascript" language="javascript" src="$MANAGER_WIDGET/Common/API/TVKeyValue.js"></script>

<object id="FileSystemPlugin" classid="clsid:SAMSUNG-INFOLINK-FILESYSTEM"></object>
<object id="SefPlugin" classid="clsid:SAMSUNG-INFOLINK-SEF"></object>

```

**Javascript Code**
```javascript
var unzipper =  new Unzipper({
    sefPlugin : document.querySelector('#SefPlugin'),
    fileSystemPlugin : document.querySelector('#FileSystemPlugin')
});

unzipper.start({
    from: '/mypath/myfile.zip',
    to: '/mypath',
}, function(error, data){
    console.log('complete', error, data)
});

```
<a href="#" name="keyboard-api"></a>
## Keyboard API

Class enable keyboard in input fields

**HTML Code**
```html
<!-- top of HEAD -->

<script type="text/javascript" src="$MANAGER_WIDGET/Common/API/TVKeyValue.js"></script>
<script type="text/javascript" src="$MANAGER_WIDGET/Common/API/Widget.js"></script>
<script type="text/javascript" src="$MANAGER_WIDGET/Common/API/Plugin.js"></script>
<script type="text/javascript" src="$MANAGER_WIDGET/Common/Plugin/Define.js"></script>

<!-- End of BODY -->
<script type="text/javascript" src="$MANAGER_WIDGET/Common/IME_XT9/ime.js"></script>
```

**Javascript Code**
```javascript
var keyboard =  new Keyboard({
    selectors: ['.keyboard']
});

document.getElementById('input1').focus(); // open keyboard to type

keyboard.close(); //Close Keyboard

```

<a href="#" name="remote-control-api"></a>
## Remote Control API

Class to control input navigation with enter keys and arrow keys on remote control.

**HTML Code**
```html
<!-- top of HEAD -->

<script type="text/javascript" src="$MANAGER_WIDGET/Common/API/TVKeyValue.js"></script>
<script type="text/javascript" src="$MANAGER_WIDGET/Common/API/Widget.js"></script>
<script type="text/javascript" src="$MANAGER_WIDGET/Common/API/Plugin.js"></script>
<script type="text/javascript" src="$MANAGER_WIDGET/Common/Plugin/Define.js"></script>
```

**Javascript Code**
```javascript
var remoteControlNavigator =  RemoteControlNavigator({
    selectors : '.keyboard',
    cssClass: 'highlight',
    onKeyReturn: function(){
        keyboard.close();
    },

    onSetInput: function(element){

        if(element.type == 'number')
            _g_ime.keySet = '12key';
        else
            _g_ime.keySet = 'qwerty';
    }
});

remoteControlNavigator.setActive('#input1');

```
