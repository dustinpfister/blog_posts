---
title: Get all windows in electronjs
date: 2022-03-28 13:34:00
tags: [electronjs]
layout: post
categories: electronjs
id: 973
updated: 2022-03-28 14:02:06
version: 1.2
---

There are a number of static methods in the browserWindow class in electronjs, one of which is a method that will create and return a collection of all browser windows currently open. This post will then be a quick example of the use of this static method of the browserWindow class. While I am at it I will of course be touching base on a bunch of additional features in electronjs in general, such as the preload script, and various events for the browser window class. Mainly the close and ready to show events of the Browser window class that I will be using to update a simple message in each browser window when a new window is opened or closed. So if you are still fairly new to electronjs as well this might prove to be a good exercise in order to gain some insight to various features that have to do with a collection of browser windows.

<!-- more -->


## 1 - The main javaScript file

```js
// load app, Menu, and BrowserWindow
const { app, Menu, BrowserWindow } = require('electron');
const path = require('path');
// custom menu
const isMac = process.platform === 'darwin'
const template = [
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' },
      {
          label: 'New Window',
          click: function(){
  createWindow();
          }
       }
    ]
  }
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
 
function createWindowsEventHandler (eventType, forWindow) {
    return function() {
      // get a collection of all windows
      var windows = BrowserWindow.getAllWindows();
  
    if(eventType === 'windowClose'){
        windows = windows.filter((win) => {
            return win.id != forWindow.id;
        });
    }
  
      // create custom object with relevant info for each window such as id
      var windowObjects = windows.map((win)=>{
          return {
              id: win.id
          };
      });
      // for each window object
      windows.forEach((win, i) => {
          let fwObj = {
              id: forWindow.id
          };
          win.webContents.send(eventType, fwObj, windowObjects[i], windowObjects);
      });
  };
};
 
// Create the browser window.
function createWindow () {
  const newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        contextIsolation: true,
        preload: path.resolve( __dirname, 'preload.js')
    }
  });
  // and load the index.html of the app.
  newWindow.loadFile('index.html');
  
  // Open the DevTools for debugging
  newWindow.webContents.openDevTools();
  
  // on ready to show event call windowCreate method for all windows
  newWindow.on('ready-to-show', createWindowsEventHandler('windowCreate', newWindow) );
  newWindow.on('close', createWindowsEventHandler('windowClose', newWindow) );
  
};
 
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

## 2 - The preload file

```js
const { contextBridge, ipcRenderer} = require('electron');
 
// the API to be used in client side code
let API = {};
 
// the events object
const EVENT = {};
 
EVENT.windowCreate = function(callback){
    ipcRenderer.on('windowCreate', function(evnt, newWindow, thisWindow, windows) {
        callback(evnt, newWindow, thisWindow, windows);
    });
};
 
EVENT.windowClose = function(callback){
    ipcRenderer.on('windowClose', function(evnt, closedWindow, thisWindow, windows) {
        callback(evnt, closedWindow, thisWindow, windows);
    });
};
 
// The main on method to attach events
API.on = function(eventType, callback){
   EVENT[eventType](callback);
};
 
// create an API for window objects in web pages
contextBridge.exposeInMainWorld('API', API);
```

## 3 - The index html file

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>All Browser Windows example</title>
  </head>
  <body>
    <div id="wrap_main">
        <h1>This is a Window.</h1>
        <p id="out"></p>
    </div>
    <script>
let out = document.getElementById('out');
API.on('windowCreate', (evnt, newWindow, thisWindow, windows) => {
  let len = windows.length;
  out.innerText = 'this is window #' + thisWindow.id + ', and there are ' + len + ' windows';
});
API.on('windowClose', (evnt, closedWindow, thisWindow, windows) => {
  let len = windows.length;
  console.log(windows)
  out.innerText = 'this is window #' + thisWindow.id + ', and there are ' + len + ' windows';
});
    </script>
  </body>
</html>
```

## 4 - Conclusion

