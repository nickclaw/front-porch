var app = require('app'),
    BrowserWindow = require('browser-window');

var window = null;

app.commandLine.appendSwitch('js-flags', '--harmony');
app
    .on('window-all-closed', function() {
        app.quit();
    })
    .on('ready', function() {
        window = new BrowserWindow({
            width: 1000,
            height: 700,
            center: true,
            title: 'Front Porch',

        });

        window.loadUrl('file://' + __dirname + '/build/index.html');
        window.on('closed', function() {
            window = null;
        });
    });
