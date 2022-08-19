---
title: User Data File Electronjs application example
date: 2022-08-19 07:59:00
tags: [electronjs]
layout: post
categories: electronjs
id: 1001
updated: 2022-08-19 11:41:59
version: 1.14
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

## 1 - The user data module

I will want to get and set values from the main process as well as from the renderer process as well. So then I thought it would be a good idea to make a stand alone javaScript module that I can then use from both the main and preload files to get and set data in the user file.

In this user data module then I have a number of helper functions that I am using to check if a user data folder is there to begin with, and of so create it. In other worlds I want to do something that is like the [mkdir -p command in Linux](/2021/06/30/linux-mkdir) to make sure that a folder in which I want to park data for the current user is there to begin with. 

In older versions of nodejs this was a little involved and required the use of an [npm package like that of mkdirp](/2017/11/14/nodejs-mkdirp/). However in newer versions of node it would seem that native support for recursive creation of folders works well with just the native fs.mkdir method of the file system module in nodejs.

On top of having a helper function to create the user data folder I have another function that will check if a user data file is in the folder or not. In the event that the file is not there it will create a new one using hard coded settings in the main javaScript file.

```js
// user-data.js - common user data methods to use in main.js and preload.js
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
 
// hard coded default data file state
const data_default = {
    dir_open_start: dir_home, // dir to look for files when doing an open for the first time
    file_name: null            // no file by default
};
 
// create user data folder
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
 
// public api
var api = module.exports = {};
 
// create any missinbg user data files and folders, shuld be called each time main.js starts
api.create = function(){
    return createUserDataFolder()
    .then(()=>{
    // create the user data file if it is not there
        return createUserDataFile();
    });
};
 
// get the user data
api.get = () => {
    return readFile(uri_data, 'utf8')
    .then((jText)=>{
        try{
            return JSON.parse(jText);
        }catch(e){
            return Promise.reject(e);
        }
    });
};
 
// set a user data key
api.set = (key, value) => {
    // first get curent set of data
    return api.get()
    .then((obj)=>{
        // update key and write new data
        obj[key] = value;
        return writeFile(uri_data, JSON.stringify(obj));
    });
};
 
// read file current file based on user data
api.readFile = () => {
    return api.get()
    .then((obj)=>{
       if(obj.file_name){
          return readFile( path.join(obj.dir_open_start, obj.file_name), 'utf8' );
       }else{
          return Promise.reject( new Error('file name is null') )
       }
    });
};
 
// save given text to file with current settings
api.saveFile = (text) => {
    text = text || '';
    return api.get()
    .then((obj)=>{
       if(obj.file_name){
          return writeFile( path.join(obj.dir_open_start, obj.file_name), text, 'utf8' );
       }else{
          return Promise.reject( new Error('file name is null') )
       }
    });
};
```

## 2 - The main javaScript file

In my main javaScript file then I use the create method of the user data module to make sure that the user data folder is there. If all goes well with that I start the application as usual by crating the main browser window.

When it comes to the menu that I am using for this I am using the get method of the user data module to get what the start folder value should be from the user data. Once I have that I can then use that for the default path property of the show open dialog and show save dialog of the [dialog module](https://www.electronjs.org/docs/latest/api/dialog).


```js
// load app and BrowserWindow
const { app, dialog, Menu, BrowserWindow} = require('electron');
const path = require('path');
// using user-data.js module for main.js and preload.js
const userData = require(path.join(__dirname, 'user-data.js'));
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
                    // get user data, and use current value for
                    // dir_open_start as defaultPath for showOpenDialog
                    userData.get()
                    .then((uDat)=>{
                        return dialog.showOpenDialog(BrowserWindow.fromId(1), {
                            defaultPath: uDat.dir_open_start,
                            properties: ['openFile']
                        })
                    })
                   .then((result) => {
                        // only fire fileOpen event for renderer if not canceled
                        if(!result.canceled){
                            mainWindow.webContents.send('fileOpen', result);
                        }
                    }).catch((err) => {
                        // error
                        console.warn(err.message);
                    });
                }
            },
            // SAVE A FILE
            {
                label: 'Save As',
                click: () => {
                    const mainWindow = BrowserWindow.fromId(1);
                    userData.get()
                    .then((uDat)=>{
                        return dialog.showSaveDialog(BrowserWindow.fromId(1), {
                            defaultPath: uDat.dir_open_start,
                            properties: ['showHiddenFiles']
                        })
                    })
                   .then((result) => {
                        // only fire fileSave event for renderer if not canceled
                        if(!result.canceled){
                            mainWindow.webContents.send('fileSave', result);
                        }
                    }).catch((err) => {
                        // error
                        console.warn(err.message);
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
    // do a create check of the user data folder
    userData.create()
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

## 3 - The preload file

I will want to have a way to get at the state of the user data file from my front end code, so in my preload javaScript file I have a get user data method that will read the current state of this file.

```js
// preload with contextIsolation enabled
const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
// using user-data.js module for main.js and preload.js
const userData = require(path.join(__dirname, 'user-data.js'));
 
var UserDataApp = {};
// get and set user data helpers
UserDataApp.getUserData = userData.get;
UserDataApp.setUserData = userData.set;
UserDataApp.readFile = userData.readFile;
UserDataApp.saveFile = userData.saveFile;
 
//******** **********
// EVENTS
//******** **********
 
var EVENTS = {};
 
EVENTS.fileOpen = function(callback){
    ipcRenderer.on('fileOpen', function(evnt, result) {
        const filePath = result.filePaths[0];
        // UPDATE STATE ON EACH FILE OPEN
        UserDataApp.setUserData('dir_open_start', path.dirname(filePath) )
        .then(()=>{
            return UserDataApp.setUserData('file_name', path.basename(filePath) )
         })
        .then(()=>{
            // call front end callback with result
            callback(evnt, result)
        });
    });
};
 
EVENTS.fileSave = function(callback){
    ipcRenderer.on('fileSave', function(evnt, result) {
        const filePath = result.filePath;
        // UPDATE STATE ON EACH FILE OPEN
        UserDataApp.setUserData('dir_open_start', path.dirname(filePath) )
        .then(()=>{
            return UserDataApp.setUserData('file_name', path.basename(filePath) )
         })
        .then(()=>{
            // call front end callback with result
            callback(evnt, result)
        });
    });
};
 
UserDataApp.on = function(eventName, callback){
   EVENTS[eventName](callback);
};
 
//******** **********
// EXPOSE API
//******** **********
// create an api for window objects in web pages
contextBridge.exposeInMainWorld('UserDataApp', UserDataApp);
```

## 4 - The client system

Now that I have my main and prealod files out of the way I will want to have a little front end code for this to make sure that my preload functions are working the way that they should be.

### 4.1 - The client.js javaScript file

When the Browser window is up and running it will call the get user data method to get the current state of the user data file.

```js
var con = document.querySelector('#text_console');
var con2 = document.querySelector('#text_content');
 
// logger
var logger = function(mess){
    con.value += mess + '\n';
};
 
logger('App Start: ');
// get user data
var getUserData = function(){
    return UserDataApp.getUserData()
    // log current state
    .then((dataObj) => {
        logger('Got User Data: ');
        logger('dir_open_start: ' + dataObj.dir_open_start);
        logger('file_name: ' + dataObj.file_name);
    })
    .then((uDat)=>{
        return UserDataApp.readFile();
    })
    .then((text)=>{
         logger('text read worked: ');
         con2.value = text;
    })
    .catch((e) => {
        logger('Err: ' + e.message);
    });
};
 
// get user data for the first time
getUserData();
 
// EVENTS
UserDataApp.on('fileOpen', function(evnt, result){
    logger('File open event:');
    getUserData();
});
 
UserDataApp.on('fileSave', function(evnt, result){
    logger('File Save event:');
    UserDataApp.saveFile(con2.value)
    .then(()=>{
        logger('looks like save worked.');
    })
    .catch((e) => {
        logger('Err: ' + e.message);
    });
});
```

### 4.2 - The window\_main.html file

Here I have the html that I am using for this example

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
        <h4>Content:</h4>
        <textarea id="text_content" rows="15" cols="80"></textarea>
        <h4>Console:</h4>
        <textarea id="text_console" rows="8" cols="80"></textarea>
        <script src="client.js"></script>
    </div>
  </body>
</html>
```

## Conclusion

I had a general idea of what I wanted to do with this example, I wanted to create and refine some things with this kind of user data file and folder before making major changes to my videoground application. What it is that I have worked out here might me worked into a future revision of the video ground project as there is a lot that I would like to do with a user data folder. With that application I could use the user data folder as a standard location to park frame images when I use my export to frames feature of that application. In future revisions in which I might also use [ffmpeg](/2022/03/04/linux-ffmpeg/) as a way to create final videos this can also be used to place such files by default. There are all kinds of things that I would also like to store as user data such as a default start location when opening files that I thing would improve my workflow a little such as what I have worked out for this example on the user data folder.

