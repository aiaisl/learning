/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/libs.d.ts" />
/// <reference path="../typings/github-electron/github-electron-main.d.ts" />


import app = require('app');  // Module to control application life.
import BrowserWindow = require('browser-window');  // Module to create native browser window.

import chokidar = require("chokidar");

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow:GitHubElectron.BrowserWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1050,
    height: 680,
    //frame: false
    });
    
  var watcher = chokidar.watch("./layout.html, ", {
    ignored: /[\/\\]\./,
    persistent: true
  })
  watcher.add("app.js");
  watcher.on("change", ()=>{
      mainWindow.reload();
  })

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/layout.html');

  // Open the devtools.
  mainWindow.openDevTools({
    detach:false
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
