/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/github-electron/github-electron-main.d.ts" />
var app = require('app');
var BrowserWindow = require('browser-window');
require('crash-reporter').start();
var mainWindow = null;
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 1050,
        height: 680,
    });
    mainWindow.loadUrl('file://' + __dirname + '/layout.html');
    mainWindow.openDevTools({
        detach: false
    });
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});
