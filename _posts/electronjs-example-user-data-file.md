---
title: User Data File Electronjs application example
date: 2022-08-19 07:59:00
tags: [electronjs]
layout: post
categories: electronjs
id: 1001
updated: 2022-08-19 08:42:18
version: 1.5
---

While working on my [electronjs](https://www.electronjs.org/) application that I use to make videos for my you tube channel, and thus also video embeds for my blog posts on threejs I ran into a situation in which I needed to share state data between the renderer and main process. The way of typically doing this is a little convoluted as it requires [IPC](https://en.wikipedia.org/wiki/Inter-process_communication) messaging between the render and main process my way of using the send methods and defining event handers with the on methods of the [IPC Main](https://www.electronjs.org/docs/latest/api/ipc-main) and [IPC Renderer](https://www.electronjs.org/docs/latest/api/ipc-renderer) classes.

So then for the most part the way that this needs to happen is just my way of IPC and for many situations that might be the best way to go about doing this. However for some things I might want to create a user data folder in the proper standard location and use that as a means to store user data that I can access from the main or render process.

<!-- more -->

## The user data file elecronjs example and what to know first

This is a post on an electronjs application in which I am just creating and viewing a simple user data file that is to be found in the current user folder of the operating system in which the application is running. In Windows and macOS systems this would be the Users folder and on Linux systems there is the home folder. Although I will be keeping this example fairly simple this is still not really any kind of [hello world or getting started type example with electronjs](/2022/02/07/electronjs-hello-world/). There is also a lot to know about [nodejs](/2017/04/05/nodejs-helloworld/), and client side [javaScipt](/2018/11/27/js-getting-started/) as well in order to get into making applications with electron that I will not be getting into detail here. However I do often open these posts with a few things that you might want to read up on that are related to the over all content of this post.

### The homedir method of the os module in nodejs, and native nodejs features

In this example I am using the [home dir method of the os module](/2020/05/20/nodejs-os-homedir/) in nodejs as a way to know where the starting point should be to park user data and any and all application data on a user by user basis. I am also using a lot of other native nodejs modules and features with the [path module](/2017/12/27/nodejs-paths/), as well as the [file system module](/2018/02/08/nodejs-filesystem/) and so forth.

### Full Source code on Github

The full source code for this election example, as well as many others can be found in my [electronjs example Github repository](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-user-data-file).

## 1- The main javaScript file

```js
// load app and BrowserWindow
const { app, dialog, Menu, BrowserWindow} = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
//******** **********
// CREATE USER DATA FOLDER AND FILE HELPERS
//******** **********
// dirs
const dir_home = os.homedir();
const dir_userdata = path.join(dir_home, '.userDataApp');
const uri_data = path.join(dir_userdata, 'data.json');
// create the user data folder if it is not there
const createUserDataFolder = function(){
    return new Promise((resolve, reject) => {
        fs.mkdir(dir_userdata, { recursive: true }, (err) => {
            if (err){
                reject(err);
            }else{
                console.log('user data folder check went well');
                resolve();
            }
        });
    });
};
// hard coded default data file state
const data_default = {
    dir_open_start: dir_home // dir to look for files when doing an open for the first time
};
// create the data file if it is not there
const createUserDataFile = function(){
    console.log(uri_data);
    return readFile(uri_data, 'utf8')
    .then(()=>{
        console.log('looks like we have a user data file, so no need to create a new one');
        return Promise.resolve();
    })
    // error reading file
    .catch((e)=>{
        console.log('error reading user data file, maybe it is not there...');
        if(e.code === 'ENOENT'){
            console.log('error code is ENOENT, so wrting a new one from hard coded data.');
            return writeFile(uri_data, JSON.stringify(data_default), 'utf8' )
        }
        // some other error happened that has not been handled here
        return Promise.reject(e);
    });
};
//******** **********
// CREATE MAIN WINDOW FUNCTION
//******** **********
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
    // menu
    const menu = Menu.buildFromTemplate(MainMenuTemplate);
    mainWindow.setMenu(menu)
    return mainWindow;
};
//******** **********
// MENU
//******** **********
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
//******** **********
// APP EVENTS
//******** **********
// the 'ready' event
app.whenReady().then(() => {
    // create the user data folder if it is not there to begin with
    createUserDataFolder()
    // create the user data file if it is not there
    createUserDataFile()
    // if all goes well with user data folder
    .then(()=>{
        console.log('ready to create the main window now, and start the rest of the app.');
        createMainWindow();
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0){
                createMainWindow()
            }
        });
    })
    // something weird happened creating user data folder in home folder
    .catch((e)=>{
        // not sure what to handle, can do the usual log to standard error at least though
        console.warn(e.message);
    });
});
// the 'window-all-closed' is also a kind of on quit event
app.on('window-all-closed',  () => {
    if (process.platform !== 'darwin')
        app.quit()
});
```

## 2 - The preload file

```js
// preload with contextIsolation enabled
const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
 
// dirs
const dir_home = os.homedir();
const dir_userdata = path.join(dir_home, '.userDataApp');
const uri_data = path.join(dir_userdata, 'data.json');
 
var UserDataApp = {};
 
UserDataApp.getUserData = () => {
    return readFile(uri_data, 'utf8')
    .then((jText)=>{
        try{
            return JSON.parse(jText);
        }catch(e){
            return Promise.reject(e);
        }
    });
};
 
UserDataApp.setUserData = () => {
    
    
};
 
//******** **********
// EXPOSE API
//******** **********
// create an api for window objects in web pages
contextBridge.exposeInMainWorld('UserDataApp', UserDataApp);
```

## 3 - The client system

### 3.1 - client.js

```js
var con = document.querySelector('#text_console');
 
con.value += 'App Start \n';
 
UserDataApp.getUserData()
.then((dataObj) => {
    console.log(dataObj);
    con.value += 'dir_open_start: ' + dataObj.dir_open_start + '\n';
})
.catch((e) => {
    console.warn(e.message);
    con.value += 'err: ' + e.message + '\n';
})
```

### 3.2 Te window\_main.html file

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Electronjs Example</title>
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

## Conclusion



