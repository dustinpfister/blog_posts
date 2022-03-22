---
title: Send data from main.js of electronjs app to the client system with the send method of webContents
date: 2022-03-21 14:55:00
tags: [electronjs]
layout: post
categories: electronjs
id: 970
updated: 2022-03-22 11:49:18
version: 1.12
---

For todays post on electronjs I will be going over a quick example of the [send method of the webContents object](https://www.electronjs.org/docs/latest/api/web-contents#contentssendchannel-args) of a [browser window object](/2022/02/14/electronjs-browser-window/) instance. The reason why I am writing a post on this is because even though I have only wrote a [few example of electronjs thus far](/categories/electronjs/) I can all ready see that this will be a feature that I will be using with a lot of future projects.

The general idea here is that the send method is a way to go about emitting an event for a render process, and so my attaching an event hander for a method that I define in my preload script, it can be used as a way to replay to a custom menu option in the browser window. Speaking of preload scripts, and custom menus, this example will also be a good starting point for these things, however this is still not a [getting started with electron type post](/2022/02/07/electronjs-hello-world/) as I have wrote that one all ready.

<!-- more -->

## The send method of the webContents object and what to know first

In this post I am going over the source code of a simple electronjs application in which I am using the send method of a webContents object to emit and event that is fired when a custom option is selected in a custom menu. I intend to keep the example in this post fairly simple, but I am still operating under the assumption that you have at least some basic working knowledge of javaScript, both client side and ever side along with various other skills that are required before hand.

If you are still fairly new to javaScript you might want to take a step back and read a [getting started with javaScript in general](/2018/11/27/js-getting-started/) post. There is also learning how to work with [nodejs by itself](/2017/04/05/nodejs-helloworld/) also outside of electronjs which is also something that should be done at least a little to gain a better understand of what there is to work with in nodejs alone.

### The source code example here is on Github

The [source code example that I am writing about here is on Github](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-webcontents-send) along with any additional assets that I might be using for this example. I also have all the source code examples for my various other posts on electronjs thus far located in the same repository.

## 1 - The main javaScript file

So then in the root location of the project folder I have a main.js file, as with just about any other electronjs project. It is in this main javaScript file that I will be calling the send method of the webContents object of the main browser window object. With that said I am doing so with two events one of which is a infoPkg event that will be an event that involve setting info from the package.json file of this example, and the other is a infoOS event that will send some very basic info about the hose os that this example is running on.

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

Here I then have the preload script in which I am defining what to do when the infoPkg or infoOS events are emitted in the main javaScript file. If you are still somewhat new to electronjs this preload file is a way to go about defining some methods to use in the client side javaScript code of the over all application. So for this example I am creating an API called just simply API that you will see me using later on in the index html file later in this post.

When it comes to just having a simple demo of the send method I just want to have an API.on method to give myself a way to attach some event handers that will fire for when the user selects one of the options from the custom menu that I defined in the main javaScript file. When writing my front end code I just need to call this API.on method and give a event type string, in this case infroPKG, and infoOS, and then also pass a [callback function](/2019/03/25/js-javascript-callback/) that will be called when this even happens.

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

Now for that main index html file that I am loading in the main javaScript file when creating the main browser window instance of the application example. For this example I am doing everything in a single html file, I am doing this for the sake of trying to keep things more easy to follow, but in a real project you might and to break things down more, and also not use inline scripting.

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

I just wanted to make a quick example of the send method of the web contents object, for the sake of my own reference for the most part. When it comes to some actually project examples I have a few ideas on the drawing board at least, but I still think that I need to work out a few more basic examples like this just for the sake of learning the basics of electronjs thus far.
