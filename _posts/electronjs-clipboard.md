---
title: Getting started with the clipboard class in Election.js
date: 2022-03-15 11:34:00
tags: [electronjs]
layout: post
categories: electronjs
id: 968
updated: 2022-03-17 15:06:43
version: 1.5
---

I still want to write at least a few more posts on electronjs, before moving on to focusing on other topics as that just strokes me as the thing to do if I am going to start a new collection of content on something. Anyway when it comes to making an electron application one of many things that comes to mind is how to go about copying something that might be in the clipboard of an operating system into my electronjs application as well as the inversion of doing so. In other ways there must be a way in electron to handle the whole copy and paste thing. With that said there is a clipboard class that can be used as a means to both read and write to the clipboard of the house OS which allows for making use of this common OS feature to transfer some kind of content from one application to another.

<!-- more -->

## The clipboard class and what to know first

This is then a post on a simple hello world example of the clipboard class in electron.js, that also serves as a basic getting started type example of electron js application in general also when it comes to things like a preload file that I am suing to create a public API that is used in the front end javaScript code.

## 1 - The main javaScript file

In the main javaScript file I have some events for what to do when the application first starts, and for this I am create creating the main browser window for this. When doing so I create a custom menu for the application and to do so I require in an object that is exported by another file in the root name space of the application called menu.js. This can also just be done in the main javaScript file, but the menu can often become a little lengthly as I continue to work on and expand an application so sooner or later this is one thing that I do to break down a project into smaller pieces.

```js
// load app and BrowserWindow
const { app, Menu, BrowserWindow, dialog } = require('electron');
const path = require('path');
// Create the Main browser window.
function createMainWindow() {
    const mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            backgroundColor: '#008888',
            webPreferences: {
                contextIsolation: true,
                preload: path.resolve( __dirname, 'preload.js')
            }
        });
    // load the html file for the main window
    mainWindow.loadFile('html/index.html');
    // Open the DevTools for debugging
    mainWindow.webContents.openDevTools();
    // menu
    const menu = Menu.buildFromTemplate( require( path.join(__dirname, 'menu.js') ) );
    mainWindow.setMenu(menu);
    // return window
    return mainWindow;
};
// the 'ready' event
app.whenReady().then(() => {
    var mainWindow = createMainWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0){
            createMainWindow()
        }
    })
});
// the 'window-all-closed' is also a kind of on quit event
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        app.quit()
});
```

## 2 - The menu file

In the menu file I am using the clipboard class to read the contents of the clipboard for a paste option in the edit menu.

```js
// load app and BrowserWindow
const { app, Menu, BrowserWindow, clipboard} = require('electron');
const path = require('path');
 
// Custom Menus
const isMac = process.platform === 'darwin';
const pkg = require( path.join(__dirname, 'package.json') );
// The main menu for the main window
const MainMenuTemplate = [
    {
        label: 'Edit',
        submenu: [
            isMac ? { role: 'close' }: { role: 'quit' },
            {
                label: 'Paste',
                click: function(){
                    // ref to window
                    const mainWindow = BrowserWindow.fromId(1);
                    // send text
                    const text = clipboard.readText();
                    mainWindow.webContents.send('actionPaste', text);
                }
            }
        ]
    }
];
 
module.exports = MainMenuTemplate;
```

## 3 - preload

Here I have the preload file that I am using to define the API to use in the front end code.

```js
// preload with contextIsolation enabled
const { contextBridge, ipcRenderer} = require('electron');
const path = require('path');
const fs = require('fs')
 
const cbDemoAPI = {};
 
const EVENT = {};
 
EVENT.actionPaste = function(callback){
    ipcRenderer.on('actionPaste', function(evnt, text) {
        callback(evnt, text);
    });
};
cbDemoAPI.on = function(eventType, callback){
   EVENT[eventType](callback);
};
// create an api for window objects in web pages
contextBridge.exposeInMainWorld('cbDemoAPI', cbDemoAPI);
```

## 4 - The index html file

Now for the front end code where I am attaching an event hander for the action paste event of the API that I am defining in preload.js

```html
```

## 5 - Conclusion

That will be it for now when it comes to the clipboard class in electron, I just wanted to make a quick getting started type example when it comes to using it and I would say that is what I have together here all ready.

