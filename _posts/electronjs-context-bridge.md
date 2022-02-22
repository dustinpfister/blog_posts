---
title: The Context Bridge class in electronjs
date: 2022-02-21 12:28:00
tags: [electronjs]
layout: post
categories: electronjs
id: 962
updated: 2022-02-22 11:04:27
version: 1.15
---

The [Context Bridge](https://www.electronjs.org/docs/latest/api/context-bridge) class in [electron.js](https://en.wikipedia.org/wiki/Electron_%28software_framework%29) is what I need to use in late versions of electron.js to create a shared API with my client side javaScript code in such a way that I only expose what is needed in the front end. There are alternatives to this such as disabling context isolation and enabling node integration when creating a browser window, but still there are good reasons why this is the default. The main concern here has to do with security and that it is not generally such a good idea to expose all that nodejs has to work with to the client system.

So then for this example the basic project idea is just a simple text editor project. The general idea here is to have a text area element in the html file that will be used for the main [Browser Window](/2022/02/14/electronjs-browser-window/), and I will then be using some additional JavaScript code in a client side javaScript file to make use of the API defined in the preload.js file in which I am using the context bridge class. This api will contain methods that I can use to attach event handers for when an open and save as option are selected in the file Menu of the main browser window.

In order to create some kind of example that exercises the use of the context bridge as well as the various other classes in electron.js that are closely related to the use of the context bridge class I will need to have some kind of basic project idea. The main class that I have come to find that I need to use with the contextBride class is to also use the ipcRenderer class, this is what I will want to use to define what to do when I make calls of the send method of the webContext object in main.js. Speaking of the main.js file there are also a wide range of other classes that I am going to want to use there also such as the [dialog class](https://www.electronjs.org/docs/latest/api/dialog) which is what I need to use in order to create native dialog windows for opening and saving a file.

<!-- more -->

## What to know first before reading more on the context Bridge

This is a javaScript project example that has to do with using the context bride class in electron.js to create an API that will be used from the client side javaScript code of the electron.js application. So then there is a whole lot of things that should be known before hand that I am not going to get into detail here. I assume that you have at least a little experience when it comes to working with javaScript in general, if not you might want to take a step back and start out with a [getting started with javaScript type post](/2018/11/27/js-getting-started/). 

I am also assuming that you have at least a little experience when it comes to not just client side javaScript but also sever side javaScript when it comes to using nodejs, if not you might want to start with some [hello world type examples with nodejs](/2017/04/05/nodejs-helloworld/) alone. There are a whole lot of features to work with when it comes to just nodejs by itself, and using those features as well as user space libraries on top of nodejs other than that of electron is part of making some kind of real project with electron.js. Although I will be trying to keep this electronjs example fairly simple this is not a [getting started with electron.js type post, I have wrote that one before hand](/2022/02/07/electronjs-hello-world/).

### The full source code for this example is on Github

The full source code of this example can be found in my [examples electronjs repository](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-context-bridge) on Github. This is also where I am going to be parking the source code for all [my other electronjs examples](/categories/electronjs/) that I will be writing about in many of not all of these posts moving forward.


## 1 - The contextBridge class, and the preload.js file

The content bridge class is what I am going to want to use when making a preload.js file for an over all electron application. Depending on what I am doing when it comes to an over all project, in some cases I might just need to require in the context bridge class and that is it, however typically I am going to want to also require in the [ipcRenderer class](https://www.electronjs.org/docs/latest/api/ipc-renderer) also.


```js
// preload with contextIsolation enabled
const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
 
// create an api for window objects in web pages
contextBridge.exposeInMainWorld('myAPI', {
    func: function(){
        return 'hello world';
    },
    // CLIENT EVENT for open file option in menu
    onMenuOpenFile: function(callback){
        // should get a result object from main.js
        ipcRenderer.on('menu-open-file', function(evnt, result) {
            const filePath = result.filePaths[0];
            fs.readFile(filePath, 'utf8', (err, text) => {
                if(err){
                    // error reading file
                    console.log(e.message);
                }else{
                    callback(evnt, text, result);
                }
            });
        });
    },
    // CLIENT EVENT for save file option in menu
    onMenuSaveFile: function(callback){
        ipcRenderer.on('menu-save-file', callback);
    },
    // save the given text to the given file path
    saveText: function(text, filePath){
        fs.writeFile(filePath, text, 'utf8', (e) => {
            if(e){
                // if error writing file
                console.log(e.message);
            }
        })
    }
});
 
console.log('preload');
```

## 2 - The main.js file

In the main javaScript file at the root name space of the project folder I am using the typical app and BrowserWIndow classes. On top of that I am also using a custom Menu, and I am also using the dialog class to create native open file and save file dialog menus.

```js
// load app and BrowserWindow
const { app, dialog, Menu, BrowserWindow} = require('electron');
const path = require('path');
// Create the Main browser window.
const createMainWindow = () => {
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
    mainWindow.loadFile('html/window_main.html');
    // Open the DevTools for debugging
    mainWindow.webContents.openDevTools()
    const menu = Menu.buildFromTemplate(MainMenuTemplate);
    mainWindow.setMenu(menu)
    return mainWindow;
};
// Custom Menus
const isMac = process.platform === 'darwin';
// The main menu for the main window
const MainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' }: { role: 'quit' },
            // OPEN A FILE
            {
                label: 'Open',
                click: () => {
                    const mainWindow = BrowserWindow.fromId(1);
                    dialog.showOpenDialog(BrowserWindow.fromId(1), {
                        properties: ['openFile']
                    }).then((result) => {
                        mainWindow.webContents.send('menu-open-file', result);
                    }).catch((err) => {
                        // error getting file path
                    })
                }
            },
            // SAVE A FILE
            {
                label: 'Save As',
                click: () => {
                    const mainWindow = BrowserWindow.fromId(1);
                    dialog.showSaveDialog(BrowserWindow.fromId(1), {
                        properties: ['showHiddenFiles']
                    }).then((result) => {
                        mainWindow.webContents.send('menu-save-file', result);
                    }).catch((err) => {
                        // error getting file path
                    });
                }
            }
        ]
    }
];
// the 'ready' event
app.whenReady().then(() => {
    createMainWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0){
            createMainWindow()
        }
    })
});
// the 'window-all-closed' is also a kind of on quit event
app.on('window-all-closed',  () => {
    if (process.platform !== 'darwin')
        app.quit()
});
```

## 3 - Now the client system

Now that I have a custom API to use in a client side system that is created using the contextBride class, and my main.js file that calls the send method for various events for opening and saving a file, I will now want to have a client system that works with all of this. For this simple contextBride example I wanted to keep the client system fairly simple, so it just consists of a single client.js file, a single html file, and I have went with an external css file as well.

### 3.1 - client.js file

For the client javaScript file I am just getting a reference to a text area element that I have in the html file, and I am of course making use of the methods of the API that I defined in preload.js using the contextBride class.

```js
var con = document.querySelector('#text_console');
 
myAPI.onMenuOpenFile(function(evnt, text, result){
    con.value = text;
});
 
myAPI.onMenuSaveFile(function(evnt, result){
    myAPI.saveText(con.value, result.filePath)
});
```

### 3.2 - style.css

I have just a little external css for this example, nothing fancy with this I just wanted to pull it out of the html file.

```css
body{
  background: #afafaf;
  color: #2a2a2a;
  margin: 0px;
  padding: 0px;
  font-family: arial;
}
#wrap_main{
  position: relative;
}
```

### 3.3 - The main window html file

This is then the html file that I am loading in main.js when creating the main browserWindow in the main.js javaScript file that I covered above. In this html file I am just using a typical set of values for the Content Security Policy that do not seem to interfere with anything that I am doing with this example thus far. In the head of the html I have the standard title tag, and then I am also linking to an extremal css file while I am at it so that I do not have to bother with style elements here.

In the body of the html file I have a single main wrap div, and then the text area element that will contain the loaded text of a file, or can be used to create and save a new text file. I then have just one script tag in which I am linking to my front end code that makes use of the API that I defined in peload.js

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Context Bridge Example</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="wrap_main">
        <textarea id="text_console" rows="20" cols="60"></textarea>
        <script src="client.js"></script>
    </div>
  </body>
</html>
```

## 4 - Conclusion

The general idea that I had in mind when making this example is set and done all ready at this point. All I wanted to do is have a basic example of the contextBride class and how to use it to create a custom API in which I am not exposing everything to the front end system which is often the case with alternatives to that of the contextBride class when.
