---
title: File Manager Electronjs application example
date: 2022-11-25 09:28:00
tags: [electronjs]
layout: post
categories: electronjs
id: 1015
updated: 2022-11-26 14:41:25
version: 1.11
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

When it comes to the client system for this project I have an html folder in which I will have all front end code and other assets. In this html folder I have a main window html file that make used of a few additional javaScript files, and an css file to have at least some basic staring style for this project. In this section then I will be going over the state of these various files that make use of my main and preload election js files.

### 3.1 - The main window HTML file

In the main html file I am making use of a [CSP policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), and am also linking to an external CSS file in the head of the file. In the body of the html I have a basic layout for the various parts of the user interface for this file manager program. At the bottom of the file I am linking to my actions javaScrit file first, then an additional javaScript file that will contain any main javaScript code for just this html file. In any future revisions of this example I might have additional html files, but for now I am just staring that kind of situation thus far.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>File Manager</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="wrap_main">
        <br><br>
        <div id="toolbar">
           <input id="input_pwd" type="text" size="60"><br><br>
           <input id="input_runup" type="button" value="Up One">
           <input id="input_runterm" type="button" value="Terminal">
           <input id="input_runalt" type="button" value="Alt FM">
           <input id="input_newfolder" type="button" value="New Folder">
           <input id="input_newfile" type="button" value="New File">
           <div id="wrap_progressbar">
             <div id="progressbar"></div>
           </div>
        </div>
        <br></br>
        <div id="contents_pwd">
        </div>
    </div>
    <script src="./actions.js"> </script>
    <script src="./window_main.js"> </script>
  </body>
</html>
```

### 3.1 - Actions javaScript file

If I do continue to work on this project I am going to want to get things working great on more than one platform. In time I might want to have some kind of system where I have a whole bunch of files where there are a custom set of functions for each target file system. So when I make a built I just need to swap in a single javaScript file for a target OS. Also I am sure that I will want to have a way to customize what I am working out here though some kind of settings dialog or something to that effect. However for now I have just this one file in which I have everything for the two target OS systems that I am supporting thus far. 

```js
(function(Actions){
    //-------- ----------
    // LINUX ACTIONS
    //-------- ----------
    Actions.linux = {};
    // parse a URI to a folder, file, link, ect
    Actions.linux.parseURI = (uri) => {
        // replace $ with \$
        let a = uri.replace(/\$/g, '\\$');
        // space
        let b = a;
        if(b[0] === '~'){
            // I want "Documents/foo" from "~/Documents/foo" and "" from "~"
            const from_home = b.replace(/~\//, '').replace(/~/, '');
            b = fm.path_join( fm.get_home_dir(), from_home );
        }
        return b;
    };
    // get mime type of the given itemData object
    Actions.linux.get_mime_type = (state, itemData) => {
        return fm.run('file -b --mime-type \"' + Actions.linux.parseURI(itemData[2]) + '\"' );
    };
    // exec file action
    Actions.linux.exec_file = (state, itemData) => {
       console.log('run an exec file action!');
        return fm.run('find ' + itemData[2] + ' -maxdepth 1 -type f -executable')
        .then((result) => {
            console.log( 'result of find command call for shell script' );
            console.log(result)
            if(result){
                fm.runFile( state.pwd , itemData[2] );
            }
        });
    };
    // text edit action
    Actions.linux.text_edit = (state, itemData) => {
        return fm.run('mousepad ' + itemData[2])
        .catch((e) => {
            console.log(e);
            return Promise.resolve('mousepad bin called but with errors');
        });
    };
    // open a terminal window at current pwd
    Actions.linux.terminal = (state) => {
        return fm.run('lxterminal --working-directory=\"'+ state.pwd +'\"');
    };
    // start the alternate file manager as pwd
    Actions.linux.alt_fm = (state) => {
        return fm.run('pcmanfm \"'+ state.pwd +'\"');
    };
    // new folder
    Actions.linux.new_folder = (state) => {
       return fm.run('mkdir ' + state.pwd + '/new_folder');
    };
    // new file
    Actions.linux.new_file = (state) => {
       return fm.run('echo -n \"Hello World\" > ' + state.pwd + '/new.txt');
    };
    // copy a single given item
    Actions.linux.copy_item = (state, itemData) => {
        const source = itemData[2];
        let dest = fm.path_join( state.pwd, itemData[0] );
        // update dist if same
        if(source === dest){
            const ext = '.' + itemData[4].ext;
            dest = fm.path_join(
                state.pwd,
                fm.path_basename(itemData[0], ext) + '_copy_1' + ext
            );
        }
        // run cp with source and dist
        return fm.run('cp -r ' + source + ' ' + dest)
    };
    //-------- ----------
    // WIN32 ACTIONS
    //-------- ----------
    Actions.win32 = {};
    // parse a URI
    Actions.win32.parseURI = (uri) => {
        // replace $ with \$
        let a = uri.replace(/\$/g, '\\$');
        // space
        let b = a;
        if(b[0] === '~'){
            // I want "Documents/foo" from "~/Documents/foo" and "" from "~"
            const from_home = b.replace(/~\//, '').replace(/~/, '');
            b = fm.path_join( fm.get_home_dir(), from_home );
        }
        return b;
    };
    // get mime type of the given itemData object
    Actions.win32.get_mime_type = (state, itemData) => {
        // if folder return 'inode/directory'
        // USE dir /a:h TO SEE WHAT THE DEAL IS WITH JUNCTIONS
        if(itemData[1]){ // <== NOT A GOOD WAY TO DO THIS BECUASE OF JUNCTIONS
            // for now I am using lstat in place of stat that seems to help with junctions
            // However a better way of figure out the mime type should be used
            return Promise.resolve('inode/directory');
        }
        // no native 'file' program in windows, but if there is an extension we can use that
        const info = itemData[4];
        if(info.ext === 'md'){
            Promise.resolve('text/html');
        }
        return Promise.resolve('unkown');
    };
    // exec file action
    Actions.win32.exec_file = (state, itemData) => {};
    // text edit action
    Actions.win32.text_edit = (state, itemData) => {};
    // open a terminal window at current pwd
    Actions.win32.terminal = (state) => {
        return fm.run('start cmd /k "pushd ' +  state.pwd + '"');
    };
    // start the alternate file manager as pwd
    Actions.win32.alt_fm = (state) => {
        return fm.run('Explorer \"'+ state.pwd +'\"');
    };
    // new folder
    Actions.win32.new_folder = (state) => {};
    // new file
    Actions.win32.new_file = (state) => {};
    // copy a single given item
    Actions.win32.copy_item = (state, itemData) => {};
    //-------- ----------
    // MAIN RUN ACTION METHOD
    //-------- ----------
    // Main run action method
    Actions.run = (state, action, itemData ) => {
        return Actions[state.actionMod][action](state, itemData);
    };
}( this['Actions'] = {} ) )
```

### 3.1 - Main window javaScript file

```js
```

### 3.1 - style CSS file

```css
```

## Conclusion




