---
title: Send data from main.js of electronjs app to the client system with the send method of webContents
date: 2022-03-21 14:55:00
tags: [electronjs]
layout: post
categories: electronjs
id: 970
updated: 2022-03-21 15:09:19
version: 1.2
---

For todays post on electronjs I will be going over a quick example of the [send method of the webContents object](https://www.electronjs.org/docs/latest/api/web-contents#contentssendchannel-args) of a [browser window object](/2022/02/14/electronjs-browser-window/) instance. The reason why I am writing a post on this is because even though I have only wrote a [few example of electronjs thus far](/categories/electronjs/) I can all ready see that this will be a feature that I will be using with a lot of future projects.

The general idea here is that the send method is a way to go about emitting an event for a render process, and so my attaching an event hander for a method that I define in my preload script, it can be used as a way to replay to a custom menu option in the browser window. Speaking of preload scripts, and custom menus, this example will also be a good starting point for these things, however this is still not a [getting started with electron type post](/2022/02/07/electronjs-hello-world/) as I have wrote that one all ready.

<!-- more -->

## 1 - The main javaScript file

```js
// load app and BrowserWindow
const { app, Menu, BrowserWindow } = require('electron');
const path = require('path');
 
// Custom Menu
const isMac = process.platform === 'darwin'
const MenuTemplate = [
    {
        label: 'Info',
        submenu: [
            {
                label: 'Package Info',
                click: () => {
                    // get ref to browser window one way or another
                    const mainWindow = BrowserWindow.fromId(1);
                    
                    // send for event
                    mainWindow.webContents.send('infoPkg');
                    
                }
            },
            {
                label: 'OS Info',
                click: () => {
                    // get ref to browser window one way or another
                    const mainWindow = BrowserWindow.fromId(1);
                    
                    // send for event
                    mainWindow.webContents.send('infoOS');
                    
                }
            }
        ]
    }
]
const menu = Menu.buildFromTemplate(MenuTemplate)
Menu.setApplicationMenu(menu)
 
// Create the browser window.
function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        contextIsolation: true,
        preload: path.resolve( __dirname, 'preload.js')
    }
  });
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // Open the DevTools for debugging
  mainWindow.webContents.openDevTools()
 
  const menu = Menu.buildFromTemplate(MainMenuTemplate);
  mainWindow.setMenu(menu)
}
 
// the 'ready' event
app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});
 
// the 'window-all-closed' is also a kind of on quit event
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});
```

## 2 - The preload javaScript file

```js
const { contextBridge, ipcRenderer} = require('electron');
const path = require('path');
const os = require('os');
const API = {};
const EVENT = {};
 
EVENT.infoPkg = function(callback){
    ipcRenderer.on('infoPkg', function(evnt) {
        let pkgObj = require(path.join(__dirname, 'package.json'));
        callback(evnt, pkgObj);
    });
};
 
EVENT.infoOS = function(callback){
    ipcRenderer.on('infoOS', function(evnt) {
        let osInfo = {
            platform: process.platform,
            dir_home: os.homedir(),
            dir_app_root: __dirname
        };
        callback(evnt, osInfo);
    });
};
 
API.on = function(eventType, callback){
   EVENT[eventType](callback);
};
 
// create an api for window objects in web pages
contextBridge.exposeInMainWorld('API', API);
```

## 3 - The index html file

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>WebContents send method example</title>
    <style>
body{
  background: #afafaf;
  color: #2a2a2a;
  margin: 0px;
  padding: 0px;
}
h1{
   font-size: 40pt;
   font-family: arial;
}
#wrap_main{
}
#wrap_main h1 {
}
    </style>
  </head>
  <body>
    <div id="wrap_main">
        <h1>Send Demo</h1>
        <p>use info menu wot get info using send method of webContents</p>
        <textarea cols="65" rows="20"></textarea>
    </div>
    <script>
let textArea = document.querySelector('textarea')
API.on('infoPkg', (event, pkgObj) => {
    textArea.value = JSON.stringify(pkgObj, null, 2)
});
API.on('infoOS', (event, osObj) => {
    textArea.value = JSON.stringify(osObj, null, 2)
});
    </script>
  </body>
</html>
```

## 4 - Conclusion

