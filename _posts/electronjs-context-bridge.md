---
title: The Context Bridge class in electronjs
date: 2022-02-21 12:28:00
tags: [electronjs]
layout: post
categories: electronjs
id: 962
updated: 2022-02-21 12:42:09
version: 1.1
---

The [Context Bridge](https://www.electronjs.org/docs/latest/api/context-bridge) class in [electron.js](https://en.wikipedia.org/wiki/Electron_%28software_framework%29) is what I need to use in late versions of electron.js to create a shared API with my client side javaScript code in such a way that I only expose what is needed in the front end. There are alternatives to this such as disabling context isolation and enabling node integration when creating a browser window, but still there are good reasons why this is the default.

<!-- more -->

## What to know first before reading more on the context Bridge

### The full source code for this example is on Github

The full source code of this example can be fount in my [examples electronjs repository](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-context-bridge) on Github


## 1 - First off the preload.js file in which I am using the contextBride class

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

```js
// load app and BrowserWindow
const { app, dialog, Menu, BrowserWindow, ipcMain} = require('electron');
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

### 3.1 - client.js file

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

### 3.3 - window main html file

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

