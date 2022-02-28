---
title: The App Module in electronjs
date: 2022-02-28 12:38:00
tags: [electronjs]
layout: post
categories: electronjs
id: 964
updated: 2022-02-28 13:55:04
version: 1.2
---

This month I [started learning electronjs](/2022/02/07/electronjs-hello-world/), and although I all ready have some prototypes together for actual projects, I still think I have a lot to learn about the various modules in electron. So for todays post on electron I thought I would create a quick example centered around the [app module of electron](https://www.electronjs.org/docs/latest/api/app), and the various features that I should be aware of in that specific module.

<!-- more -->


## 1 - The main javaScript file and the app module

```js
// load app and BrowserWindow
const { app, BrowserWindow, ipcMain } = require('electron'),
os = require('os'),
path = require('path');
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
    mainWindow.loadFile('index.html');
    // Open the DevTools for debugging
    //mainWindow.webContents.openDevTools();
    // for an 'info-request' event
    ipcMain.on('info-request', () => {
        mainWindow.webContents.send('info-ready', {
           dir_docs: app.getPath('documents'),
           dir_app: __dirname,
           platform: os.platform()
        });
    });
};
// the 'ready' event
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});
// the 'window-all-closed' is also a kind of on quit event
app.on('window-all-closed',  () => {
  if (process.platform !== 'darwin') app.quit()
});
```

## 2 - preload.js

```js
// preload with contextIsolation enabled
const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile);
// start the demo api
const demoAPI = {};
// demoAPI.on method - what to do for an event such as 'info-request'
//  demoAPI.on('info-ready', function(e, b){
//      console.log('info is ready: ', b);
//  });
demoAPI.on = (type, callback) => {
    ipcRenderer.on(type, callback);
};
// demoAPI.getInfo method - start a request for info from the main process
demoAPI.getInfo = () => {
    ipcRenderer.send('info-request');
};
// create an api for window objects in web pages
contextBridge.exposeInMainWorld('demoAPI', demoAPI);
```

## 3 - The index.html file

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>App Module Features</title>
    <style>
body{}
#wrap_main{}
    </style>
  </head>
  <body>
    <div id="wrap_main">
        <textarea id="out" cols="60" rows="10"></textarea>
        <script>
let out = document.querySelector('#out');
// what to do for an 'info-ready' event
demoAPI.on('info-ready', function(e, b){
    console.log('info is ready on client side');
    console.log(b);
    out.value = JSON.stringify(b);
});
demoAPI.getInfo();
        </script>
    </div>
  </body>
</html>
```