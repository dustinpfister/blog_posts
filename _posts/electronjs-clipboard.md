---
title: Getting started with the clipboard class in Election.js
date: 2022-03-15 11:34:00
tags: [electronjs]
layout: post
categories: electronjs
id: 968
updated: 2022-03-17 15:35:57
version: 1.15
---

I still want to write at least a few more posts on electronjs, before moving on to focusing on other topics as that just strokes me as the thing to do if I am going to start a new collection of content on something. Anyway when it comes to making an electron application one of many things that comes to mind is how to go about copying something that might be in the clipboard of an operating system into my electronjs application as well as the inversion of doing so. In other words there must be a way in electron to handle the whole copy and paste thing with text, images, and data in general so that I can move content easily to and from my electron application and other applications. 

So with that said of course there is a class for this sort of thing which is the [clipboard class](https://www.electronjs.org/docs/latest/api/clipboard/) that can be used as a means to both read and write to the clipboard of the house OS which allows for making use of this common OS feature to transfer some kind of content from one application to another. In this post then I will be going over a simple example of this class, and while I am in the process of doing so I will of course also touch base on a wide range of other electronjs features.

<!-- more -->

## The clipboard class and what to know first

This is then a post on a simple hello world example of the clipboard class in electron.js, that also serves as a basic getting started type example of electron js application in general. Still this is not a [getting started with electron](/2022/02/07/electronjs-hello-world/) type post as I have all ready wrote that one a little while back. I also assume that you know a thing or two when it comes to [client side javaScript](/2018/11/27/js-getting-started/) as well as how to go about working in a [nodejs environment](/2017/04/05/nodejs-helloworld/), if not the basics of these things are outside the scope of this post.

### The full source code and additional notes are up on github.

Like I have done with each of my posts on electronjs so far I have a folder in [my examples electronjs repository](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-clipboard) in which I have the source code examples that I am writing about here. When it comes to reproducing this on your end the besy way to do so might be th clone down that repository and do an npm install in the root folder of this example then an npm start.

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

In the menu file I am using the clipboard class to read the contents of the clipboard for a paste option in the edit menu. To read the state of the clipboard I just call the read text method and then I just need to pass that text as a argument for an action paste event that I attach for in my front end code. So then the rest of this mainly has to do with the preload file in which I define an api to attach for this event in the front end code, and then the front end code in the html file of the client system.

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

## 3 - The preload  file and the action paste event

Here I have the preload file that I am using to define the API to use in the front end code. For this example I just want to define a on method that I can use to attach for the action paste event in my front end code.

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
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>ClipBoard class example</title>
  </head>
  <body>
      <div>
      </div>
      <script>
 
// attach and event for 'actionPaste event'
cbDemoAPI.on('actionPaste', (a, b) => {
    console.log('yeah');
    console.log(a);
    console.log(b);
});
      </script>
  </body>
</html>
```

## 5 - Conclusion

That will be it for now when it comes to the clipboard class in electron, I just wanted to make a quick getting started type example when it comes to using it and I would say that is what I have together here all ready. Like all my other posts on this site I might come around to do a little editing at one point or another, but there is still only so much that I would change with this example. The aim was just a simple demo of the clipboard class, not some kind of full application of some kind in which this is just one little element of an over all final product. When it cokes to an actual product of some kind I have a basic text editor application in the works, but the project that I have put the most time into thus far is my [video application](/2022/03/10/electronjs-example-videoground/) that I have made that uses threejs and vuejs as part of the front end code.

If you enjoyed this post and think you got something out of reading it, you might want to check out [one of my growing list of other posts on electronjs](/categories/electronjs).

