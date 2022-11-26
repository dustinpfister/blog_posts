---
title: File Manager Electronjs application example
date: 2022-11-25 09:28:00
tags: [electronjs]
layout: post
categories: electronjs
id: 1015
updated: 2022-11-26 14:03:28
version: 1.8
---

There are a lot of ideas that come to mind when it comes to making an [electronjs](https://www.electronjs.org/) project example, one of which would be to make a [file manager](https://en.wikipedia.org/wiki/File_manager). This is one of many project ideas where getting the core set of features working might not take to long, but in the long run can turn into a major project that can take months, or even years to refine if doing so is justified. The starting point I had in mind was to just have a way to navigate around a file system, and be able to start a terminal window at the current working folder. Just that alone is simple enough for sure, but then there is working on the additional basic features that one would expect of any file manager, and how to go about doing just that. There is working out javaScript solutions for everything, but then there is also the idea of using the child process module to make use of binaries that there are to work with in the underlaying OS and being done with it.

This will then be a post on the current state of an electionjs project where the aim is to start making something that is at least starting to look like a file manager program. Like many of these examples thus far I will want to keep the bar low for now unless I do start to use this all the time, or people take interest or so forth. The main goal then is to just be able to navigate around folders, and then start a terminal window or alternate file manager at the current path. On top of that there is also getting this to work on the operating system that I use most of the time which for now are windows 10 and Raspberry Pi OS.

<!-- more -->


## 1 - The main javaScript file

Nothing out of the usual when it comes to the main javaScript file for this electron project thus far. I just have a create window method that will create the first, and also any additional windows for a current file system location to view the contents of. So the create window method will be called for the first time when the app starts, and also whenever I use the application menu to create a new window from the file menu. Speaking of the file menu I am using a custom menu template for this project of course that I also define here in this main javaScrit file as well.

```js
// load app and BrowserWindow
const { app, Menu, BrowserWindow} = require('electron');
const path = require('path');
// Create the Main browser window.
const createWindow = () => {
    const window = new BrowserWindow({
            width: 800,
            height: 600,
            backgroundColor: '#008888',
            webPreferences: {
                contextIsolation: true,
                preload: path.resolve( __dirname, 'preload.js')
            }
        });
    // load the html file for the main window
    window.loadFile('html/window_main.html');
    // Open the DevTools for debugging
    //window.webContents.openDevTools();
    const menu = Menu.buildFromTemplate(MainMenuTemplate);
    window.setMenu(menu);
    return window;
};
// Custom Menus
const isMac = process.platform === 'darwin';
// The main menu for the main window
const MainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            // Open a new window
            {
                label: 'New Window',
                click: () => {
                    createWindow();
                }
            },
            isMac ? { label: 'Close', role: 'close' }: { label: 'Close', role: 'quit' },
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { 
                label: 'Copy',
                click: (evnt, window) => {
                    window.webContents.send('edit_copy');
                }
            },
            { 
                label: 'Paste',
                click: (evnt, window) => {
                    window.webContents.send('edit_paste');
                }
            },
            { 
                label: 'Delete',
                click: (evnt, window) => {
                    window.webContents.send('edit_delete');
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    }
];
// the 'ready' event
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0){
            createWindow()
        }
    })
});
// the 'window-all-closed' is also a kind of on quit event
app.on('window-all-closed',  () => {
    if (process.platform !== 'darwin')
        app.quit()
});
```

## 2 - The preload javascript file

In the preload file I will want to define a number of methods that I can use in my client system to get the contents of a current working folder. The idea here is that I will bee storing what the current working path is in the client system, but will need a number of methods here to make use of nodejs features that will allow me to get the contents of a current working folder. So then for this preload file I am once again using the [context bride module](/2022/02/21/electronjs-content-bridge/) to go about defining what the public API should be in terms of a fm global that I can use from the client system.

So then I am making use of a whole lot of nodejs built in module for this preload file then such as the [os module](/2019/11/19/nodejs-os/) to have a way to find out what platform this is running on, as well as having a way to quickly fine out where the home folder is for the system. I am also going to want to use many of the methods in the [path module](/2017/12/27/nodejs-paths/) for this one as well of course as this is very much a project in which I will be dealing with that a whole lot. To help me read the contents of the current working folder I will of course need to use the read dir method of the [file system module](/2018/02/08/nodejs-filesystem/), and I will also want to use the file system module to get [stat objects](/2018/02/15/nodejs-filesystem-stat/) as well for sure. Also on top of all of this I will also want to have a way to run commands from my client system that will differ from one platform to another, so I will want to have the exec and spawn methods of the [child process module](/2018/02/04/nodejs-child-process/) at the ready as well for thous kinds of methods.

```js
// preload with contextIsolation enabled
const { contextBridge, ipcRenderer } = require('electron');
// os and path modules
const os = require('os');
const path = require('path');
// file system module
const fs = require('fs');
const promisify = require('util').promisify;
const readdir = promisify(fs.readdir);
const lstat = promisify(fs.lstat);
// child process
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
// main file manager api
const fm = {};
fm.path_basename = path.basename;
fm.path_join = path.join;
fm.path_resolve = path.resolve;
// get up one uri
fm.getUpOne = (uri) => {
    return path.join(uri, '..');
};
// get the home path
fm.get_home_dir = () => {
    return os.homedir();
};
// get platform
fm.get_platform = () => {
    return os.platform();
};
// run a command
fm.run = ( bin ) => {
    const com = exec(bin);
    // out
    return new Promise( (resolve, reject) => {
        let text = '';
        com.stdout.on('data', (data) => {
            text += `${data}`;
        });
        com.stderr.on('data', (data) => {
            reject(`${data}`);
        });
        com.on('close', (code) => {
            resolve(text);
        });
    });
};
// run a file
fm.runFile = ( cwd, uri_sh, argu ) => {
    argu = argu || [];
    const child = spawn(uri_sh, argu, {
        cwd: cwd,
        shell: '/bin/bash',
        detached: true,
        stdio: 'ignore'
    });
    child.on('close', (code) => {
        console.log(`detached script ${uri_sh} exited with code ${code}`);
    });
    child.unref();
};
// clean read folder method that DOES NOT also use stat
fm.read_folder = (uri) => {
    return readdir(uri);
};
// read a dir and get itemData objects
fm.readdir = ( uri ) => {
    // read files array
    return readdir(uri)
    // create an array of arrays such as [ [folder, true], [file, false] ]
    .then( (files) => {
        // unshift in '..' for non root folders
        if(uri != '/'){
            files.unshift('..');
        }
        // return a promise, using Promise.all for all items in uri to do so
        return Promise.all( files.map( (fileName, i) => {
            let uri_item = path.join(uri, fileName);
            // get stat for each item
            return lstat( uri_item )
            .then((fStat)=>{
                 // when we have the stat object return an array of values
                 // for the item
                 const fileInfo = Object.assign({}, fStat, {
                     ext: path.extname(fileName).replace('.', ''),
                     mime: '',
                     isLink: fStat.isSymbolicLink()
                 });
                 return [fileName, fStat.isDirectory(), uri_item, i, fileInfo];
             })
        }) );
    });
};
// edit copy ect
fm.on_edit_copy = (cb) => {
    ipcRenderer.on('edit_copy', (evnt) => {
        cb(evnt);
    });
};
fm.on_edit_paste = (cb) => {
    ipcRenderer.on('edit_paste', (evnt) => {
        cb(evnt);
    });
};
fm.on_edit_delete = (cb) => {
    ipcRenderer.on('edit_delete', (evnt) => {
        cb(evnt);
    });
};
// create an api for window objects in web pages
contextBridge.exposeInMainWorld('fm', fm);
```

## 3 - The Client System

### 3.1 - The main window HTML file

```html
```

### 3.1 - Actions javaScript file

```js
```

### 3.1 - Main window javaScript file

```js
```

### 3.1 - style CSS file

```css
```

## Conclusion




