---
title: The App Module in electronjs
date: 2022-02-28 12:38:00
tags: [electronjs]
layout: post
categories: electronjs
id: 964
updated: 2022-02-28 14:59:21
version: 1.11
---

This month I [started learning electronjs](/2022/02/07/electronjs-hello-world/), and although I all ready have some prototypes together for actual projects, I still think I have a lot to learn about the various modules in electron. So for todays post on electron I thought I would create a quick example centered around the [app module of electron](https://www.electronjs.org/docs/latest/api/app), and the various features that I should be aware of in that specific module. The main thing that the app module is used for would be to attach event handers for a wide range of events that happen when an application starts, is used, and closed. For example there is attaching an event handler for the ready event that should fire once Electron has finished initializing. Sense there is a ready event it goes without saying that there is also will-quit, and quit events that can be used to define some logic that should fire when an application is being closed.

This app module is one of the many [main process](https://www.electronjs.org/docs/latest/glossary#main-process) modules to work with that should not be confused with other modules that are used for a preload script, or render process as it often seems to be called.

In this post then I will be going over the source code of an electronjs example that just makes use of a few features of the app module in electronjs. This will not be a comprehensive example of course, as there are a whole lot of features for this one that will have to be coved in any and all future posts on electronjs. However when it comes to learning electron, or anything really, one must start somewhere, and this will then be a kind of hello world type example but with the app module specify. While doing so I will need to also write about at least a few other modules in electronjs such as the [BrowserWindow module](/2022/02/14/electronjs-browser-window/), ipcMain, and the ipcRender module sense I will want to have a front end for this example.

<!-- more -->

## The app module in electron and what to know first

This is a post on just one of many modules that are used in electronjs called the app module. This is not any kind of getting started post with electronjs, [nodejs](/2017/04/05/nodejs-helloworld/), or [javaScript in general](/2018/11/27/js-getting-started/). Although I will be keeping this example fairly basic, I hope that you have at least some experience with what is required before hand.

### This source code example is on Github

I also have the source code for this example, as well as the source code examples for [all my other posts on electronjs](/categories/electronjs/) thus far on Github in my [examples-electronjs repository](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-app)


## 1 - The main javaScript file and the app module

When making an electron.js project one of the first and for most files that I am going to need is a main.js file at the root of the project folder. It is in this file that I will be requiring in the app module along with BrowserWindow, and ipcMain. The browserWidnow Module is what I am going to be using to create a window in which to have a front end for this example, and the ipcMain module is what I am going to use to define at least one event that I will be using with a preload script that will be used to create a custom api for this front end.

For this example I am using the app.whenReady method to define what should happen when the application fir starts. For this example I just want to create the main browser window instance in the ready event, and inside the function that is used to do this I am using also use the app.getPath method. This get path method is then yet another app module feature to get what the path is to the documents folder for the current user in the os as well as a lot of other paths like that depending on the string value given as the first argument when calling it.

I am also using the app on method to attach an event hander for the 'window-all-closed' event, and if the platform is not darwin by [checking the process global in nodejs](/2018/02/11/nodejs-process/), I am calling the app quit method.

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

## 2 - The preload.js file and ipcRenderer

In the main process I am using a preload script that will be used to create a custom API that can then be used in my front end javaScript code. More on the front end code in the next section in which I will be going over the index html file that contains that code.

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

Now for the index html file that I am loading when creating the main browser window in the main javaScrit file. For this example I am doing away with all the security meta tags that should be used in real projects, but when it comes to a simple tech demo such as this I guess they might not really be needed. This allows for me to make use of inline [script tags](/2019/01/19/js-script-tag/) for this file, so I do not have to park my front end javaScript in yet another file.

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

## 4 - Conclusion

There is a great deal more to write about with the app module, and a whole world more to write about when it comes to electron as a whole as well of course. However what I wanted to do is just have a kind of central post on this module, not a post on just one specific feature of this module. I have a lot of topics that I like to write about on this site, but if I do work with electron more I am sure I will be writing more posts on this app module a well as the many other electronjs, nodejs, and client side features there are to work with when it comes to making some kind of desktop application this way.