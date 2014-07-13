var app = require('app'),
    BrowserWindow = require('browser-window');

var mainWindow = null;

app.commandLine.appendSwitch('js-flags', '--harmony');
app
    .on('window-all-closed', function() {
        app.quit();
    })
    .on('ready', function() {
        mainWindow = new BrowserWindow({
            width: 1000,
            height: 700
        });

        mainWindow.loadUrl('file://' + __dirname + '/build/index.html');
        mainWindow.on('closed', function() {
            mainWindow = null;
        });
    });
