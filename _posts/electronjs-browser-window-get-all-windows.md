---
title: Get all windows in electronjs
date: 2022-03-28 13:34:00
tags: [electronjs]
layout: post
categories: electronjs
id: 973
updated: 2022-03-29 09:59:28
version: 1.14
---

There are a number of static methods in the browserWindow class in electronjs, one of which is a [static method that will create and return a collection of all browser windows currently open](https://www.electronjs.org/docs/latest/api/browser-window#browserwindowgetallwindows). This post will then be a quick example of the use of this static method of the browserWindow class. While I am at it I will of course be touching base on a bunch of additional features in electronjs in general, such as the preload script, and various events for the browser window class. Mainly the close and ready to show events of the Browser window class that I will be using to update a simple message in each browser window when a new window is opened or closed. So if you are still fairly new to electronjs as well this might prove to be a good exercise in order to gain some insight to various features that have to do with a collection of browser windows.

<!-- more -->

## The get all windows static method in the Browser Window class, and what to know first.

This is a post on an electronjs example of the get all browser windows method, which is one of several static methods of the Browser Window class. With that said this is not a getting started post with [the Browser Window class](/2022/02/14/electronjs-browser-window/), or [electronjs in general](/2022/02/07/electronjs-hello-world/) for that matter. I also assume that you have at least some background when it comes to working with [client side javaScript](/2018/11/27/js-getting-started/), and [nodejs in general](/2017/04/05/nodejs-helloworld/) as well. If not getting started with those topics is outside the scope of this post.

If you do have at least some experience with electronjs and all additional skills that are required before hand, you might get something of value from reading this. With many projects that are made with electron there might be a need to have more than one window open, and when that is the case one might need to loop over all open windows to update things that have to do with the state of each window. This example aims to be a basic starting point for this sort of thing.

### The full source is on Github

The full source code for this example is on my [examples electronjs repository](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-browser-window-get-all-windows). I might end up making some chances to the source, but not get around to editing this content just yet, or in any case I will have at least some notes as to what the plain is for any changes. This is also where I have the source code examples for all my other posts on electronjs so it might be worth checking out.

## 1 - The main javaScript file

In every electronjs application there will typically be at least one main javaScript file at the root of the project folder that will serve as the entry point for the over all application. IT is in the body of this code that I will be using this get all windows method of the browser window class. So then with that said I am of course requiring in the Browser Window class, along with the usual app class, and I am also making use of the Menu class as well in this example.

I want to require in the Menu class because the general idea that I have for this example is to just have a simple file menu that can be used to just quit the whole application, or create a new window. Each time a new window is created, or closed, this will trigger one of two events that can then be used as a way to update the state of the content in any and all reaming windows. With that said I will need a custom Menu for this example, so if you still have not got into hot to go about dong that this example might prove to be a good starting point for that sort of thing as well.

After setting up the custom menu for this example I have a helper function that I am using to create event handers for the two events that will fire when a window starts and when it closes. These two events will provide arguments that contain the relevant data that I want for each window when calling the client side [callback function](/2019/03/25/js-javascript-callback/) that I will be getting to in my preload script, and index html file later in this post. One of the arguments will be a collection of objects for each window that is currently open, and for this example this will just be the id for each window, and then the length of the array is what I can use to know how many windows are open.

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

I will want to have a preload javaScript file to define at least one method that I can then use to attach some event handers that will fire when a browser window is closed, or when a new one is created. So then I am defining just one public method for the API in this example which is the on method that I can then use in my front end code to attach events for the two events that I have.

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

In the main javaScript file on top of using a preload script, I am also loading an index html file when it comes to having a little front end code. In the html of this example I have have a single paragraph element that I will be updating the text content for each time one of the events fire. If things work the way that they should each window will display the id number for the window, along with a simple count of how many windows there are.

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

The goal that I had in mind was to just have a simple starting point example for this sort of thing when it comes to working on an electronjs application. With that said I would say that I have achieved what it was that I set out to do with this, and I can not thing of much of anything that I would add to this in terms of features at least. So I am thinking that any additional changes to this example in the future will just be code readability improvements and things that address various other simple changes like using [promises rather than callbacks](/2021/10/22/js-promise/) and things to that effect.

There is the question of expanding on this when it comes to making some kind of actual project with electronjs in which I would want to have more than one window open for one reason or another, but that would all be a [matter for a whole other post on electronjs](/categories/electronjs/).
