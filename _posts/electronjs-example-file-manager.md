---
title: File Manager Electronjs application example
date: 2022-11-25 09:28:00
tags: [electronjs]
layout: post
categories: electronjs
id: 1015
updated: 2022-11-26 15:01:08
version: 1.15
---

There are a lot of ideas that come to mind when it comes to making an [electronjs](https://www.electronjs.org/) project example, one of which would be to make a [file manager](https://en.wikipedia.org/wiki/File_manager). This is one of many project ideas where getting the core set of features working might not take to long, but in the long run can turn into a major project that can take months, or even years to refine if doing so is justified. The starting point I had in mind was to just have a way to navigate around a file system, and be able to start a terminal window at the current working folder. Just that alone is simple enough for sure, but then there is working on the additional basic features that one would expect of any file manager, and how to go about doing just that. There is working out javaScript solutions for everything, but then there is also the idea of using the child process module to make use of binaries that there are to work with in the underlaying OS and being done with it.

This will then be a post on the current state of an electionjs project where the aim is to start making something that is at least starting to look like a file manager program. Like many of these examples thus far I will want to keep the bar low for now unless I do start to use this all the time, or people take interest or so forth. The main goal then is to just be able to navigate around folders, and then start a terminal window or alternate file manager at the current path. On top of that there is also getting this to work on the operating system that I use most of the time which for now are windows 10 and Raspberry Pi OS.

<!-- more -->

## The election.js File manager project example and what to knwo first

This is a post on an electionjs project example where the aim is to make a file manager using electionjs. This is not then any kind of getting started type post with the [basics of electionjs](/2022/02/07/electronjs-hello-world/), as well as any additional skills that are required that have to do with nodejs, as well as client side javaScript. However in these sections I do often like to wrote about at least a few things that you might want to read up more on before continuing to read the rest if this content.

### Source Code is up on Gihub also

I have the source code for this project [also up on Github](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-example-file-manager).

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

In the preload file I will want to define a number of methods that I can use in my client system to get the contents of a current working folder. The idea here is that I will bee storing what the current working path is in the client system, but will need a number of methods here to make use of nodejs features that will allow me to get the contents of a current working folder. So then for this preload file I am once again using the [context bride module](/2022/02/21/electronjs-context-bridge/) to go about defining what the public API should be in terms of a fm global that I can use from the client system.

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

This is then the current state of the main javaScript file in which I am doing everything that I want to do in the main html file. this is where I have a current state object that contains values like the current working path, as well as many other state values. I am also attaching any and all event handers that i want to have for things like the tool bar as well as all the item dive elements for the contents of the current working path.

```js
//-------- ----------
// HELPERS
//-------- ----------
// item update loop
const itemLoop = function(state){
    state.loop.i = 0;
    state.loop.pwd = state.pwd;
    const len = state.files.length;
    const el_progress = state.el_progress;
    el_progress.style.width = '100%';
    const loop = function(){
        (function(itemData, i, loopPwd ){
           // using new Actions object
           Actions.run(state, 'get_mime_type', itemData)
           .then( ( result ) => {
               itemData[4].mime = result.trim();
               const per = i / (len - 1);
               el_progress.style.width = Math.round(per * 100 ) + '%';
               // check that it is still the same object before calling setDivStyle
               if(state.files[i] === itemData){
                   setDivStyle(state, itemData, false);
               }
               // keep looping or stop, using i >= len - 1 over per === 1,
               // because of 0 / 0 bug when state.files.length is 1 ( empty folder )
               if(i >= len - 1){
                   el_progress.style.width = '0%';
               }else{
                   // if the loop folder is still the current folder keep looping
                   if(loopPwd === state.pwd){
                       loop();
                   }
               }
            })
           .catch((e) => {
               console.log('ERROR while getting mime types');
               console.log(e)
           })
        }(state.files[ state.loop.i ], state.loop.i, state.loop.pwd));
        state.loop.i += 1;
    };
    loop();
};
// preform an action for the given item based on its mime type
const perfromMimeAction = (state, itemData) => {
    const mime = itemData[4].mime;
    const ext = itemData[4].ext;
    // FOR FOLDERS
    if(mime === 'inode/directory' || mime ===  'inode/symlink'){
        setPWD(state, itemData[2] );
    }
    // mime types
    if(mime === 'text/plain'){
        console.log('we have a plain text file!');
        Actions.run(state, 'text_edit', itemData);
        return;
    }
    if(mime === 'text/html'){
        console.log('we have an html file!');
        Actions.run(state, 'text_edit', itemData);
        return;
    }
    if(mime === 'text/x-shellscript'){
        console.log('We have a shellscript');
        Actions.run(state, 'exec_file', itemData);
        return;
    }
    if(mime === 'application/javascript'){
        console.log('We have a js file!');
        Actions.run(state, 'exec_file', itemData);
        return;
    }
    // ext if there is nothing for the mime
    if(ext === 'md' || ext === 'txt' || ext === 'sh' || ext === "html" || ext === 'js'){
        Actions.run(state, 'text_edit', itemData);
    }
};
// set style of a single div
const setDivStyle = (state, itemData, selectedState, div) => {
    // get div and update style
    div = div || document.getElementById('item_' + itemData[3]);
    let r = 0.5, g = 0.5, b = 0.5;
    const mime = itemData[4].mime;
    // folder color
    if(mime === 'inode/directory' || mime ===  'inode/symlink'){
        r = 1; g = 0.7; b = 0;
    }
    if(mime === 'text/plain'){
        r = 1; g = 1; b = 1;
    }
    // some of my *.md files show up as this such as linux-gcc.md
    if(mime === 'text/x-c'){
        r = 0.9; g = 0.9; b = 0.9;
    }
    // some of my *.md files show up as this such as python-class.md
    if(mime === 'text/x-python'){
        r = 0.9; g = 0.9; b = 0.9;
    }
    if(mime === 'text/html'){
        r = 0; g = 0.8; b = 1;
    }
    if(mime === 'text/x-shellscript' || mime === 'application/javascript'){
        r = 0; g = 1; b = 0;
    }
    // set the style
    const st = selectedState ? 0.5 : 1;
    const rc = (r * st) * 255;
    const gc = (g * st) * 255;
    const bc = (b * st) * 255;
    const bgColor = 'rgb( ' + rc + ', ' + gc + ', ' + bc +')';
    if(div){
        div.style.backgroundColor = bgColor;
    }
};
// set style for all selected divs
const setSelectedDivStyle = (state, selectedState ) => {
    state.selected.forEach( ( itemIndex ) => {
        const itemData = state.files[itemIndex];
        setDivStyle(state, itemData, selectedState);
    });
};
// event hander for items
const createItemClickHandler = (state, itemData) => {
    return (e) => {
        //!!! WEIRD BUG found that thus far I do not know how to reproduce
        // so I am doing a try cath here for now
        try{
        const i = itemData[3];
        // if NOT CTRL, AND state.selcted.length is one, AND current item is selected item
        if(!state.CTRL && state.selected.length === 1 && state.files[ state.selected[0] ][3] === i ){
            perfromMimeAction(state, itemData);
            setSelectedDivStyle(state, false);
            state.selected = [];
            return;
        }
        // if NOT CTRL, result selected array at this point
        if(!state.CTRL){
            setSelectedDivStyle(state, false);
            state.selected = [];
        }
        // push index to selcted array
        state.selected.push(i);
        setDivStyle(state, itemData, true);
        }catch(e){
            console.log('**********');
            console.log('Error while clicking item');
            console.log('itemData: ', itemData);
            console.log('state: ', state);
            console.log('error', e);
            console.log('**********');
        }
    };
};
// create a single div element for an itemData object
const createListItem = (state, itemData) => {
    const div = document.createElement('div');
    div.className = 'contents_item';
    div.id = 'item_' + itemData[3];
    div.addEventListener('pointerup', createItemClickHandler(state, itemData ) );
    div.innerText = itemData[0];
    div.title = itemData[0];
    // set the div style
    setDivStyle(state, itemData, false, div);
    return div;
};
// update contents with given files array
const createListContents = (state, files) => {
    const el = state.el_contents_pwd;
    state.selected = [];
    state.el_contents_pwd.innerHTML = '';
    files.forEach( (itemData) => {
        const div = createListItem(state, itemData);
        state.el_contents_pwd.appendChild(div);
    });
};
// set the current pwd
const setPWD = (state, pwd) => {
    // using parseURI each time for any given pwd string
    state.pwd = Actions[state.actionMod].parseURI(pwd);
    state.selected = [];
    // read the current state.pwd path
    return fm.readdir(state.pwd)
    // get files array from fm api and update state.files
   .then((files)=>{
       // format of files as as follows
       //[ fileName, isDir, uri_item, i, fStat, mimeObj ]
        state.files = files;
        // SORT FOLDERS ABOVE FILES
        state.files.sort(function(itemA, itemB){
            if(itemA[1] && !itemB[1]){
                return -1;
            }
            return 1;
        });
        // UPDATE INDEX VALUES AS THEY HAVE BEEN SORTED
        state.files = state.files.map((item, i)=>{
             item[3] = i;
             return item;
        });
        // update value of input pwd
        state.el_input_pwd.value = state.pwd;
        // create the list contents
        createListContents(state, state.files);
        // start the infoLoop
        itemLoop(state);
    })
    .catch((e) => {
        console.log('Error While calling setPWD for : ' + state.pwd);
        console.log(e);
    });
};
//------ ----------
// STATE OBJECT
//-------- ----------
const state = {
    // set action mod string by using os.platform nodejs method
    actionMod: fm.get_platform(),
    pwd: '~/',
    files: [],
    CTRL: false,
    loop: {
       i: 0,   // item loop index
       pwd: '' // compare to state.pwd to find out if looping should continue
    },
    selected: [], // an array of currentlt selected index values of items in state.files
    copy: [],     // to store copy urls
    el_contents_pwd : document.getElementById('contents_pwd'),
    el_input_pwd : document.getElementById('input_pwd'),
    el_runterm : document.getElementById('input_runterm'),
    el_runalt : document.getElementById('input_runalt'),
    el_runup : document.getElementById('input_runup'),
    el_run_new_folder : document.getElementById('input_newfolder'),
    el_run_new_file : document.getElementById('input_newfile'),
    el_progress : document.getElementById('progressbar')
};
//-------- ----------
// SETUP
//-------- ----------
setPWD(state, state.pwd);
//-------- ----------
// INPUT_PWD
//-------- ----------
state.el_input_pwd.addEventListener('change', (e)=> {
    setPWD(state, e.target.value);
});
//-------- ----------
// BUTTONS
//-------- ----------
state.el_run_new_folder.addEventListener('click', (e)=> {
    console.log('new folder');
    Actions.run(state, 'new_folder')
    .then((result)=>{
        console.log('made the new folder okay');
        setPWD(state, state.pwd);
    })
    .catch((e)=>{
        console.log('there was an error making new new folder');
        console.log(e);
    });
});
state.el_run_new_file.addEventListener('click', (e)=> {
    console.log('new file');
    //fm.run('echo -n \"Hello World\" > ' + state.pwd + '/new.txt')
    Actions.run(state, 'new_file')
    .then((result)=>{
        setPWD(state, state.pwd);
    });
});
state.el_runterm.addEventListener('click', (e)=> {
    //fm.run('lxterminal --working-directory=\"'+ state.pwd +'\"');
    Actions.run(state, 'terminal');
});
state.el_runalt.addEventListener('click', (e)=> {
    //fm.run('pcmanfm \"'+ state.pwd +'\"');
    Actions.run(state, 'alt_fm');
});
state.el_runup.addEventListener('click', (e)=> {
    setPWD(state, fm.getUpOne(state.pwd));
});
//-------- ----------
// GLOBAL CLICK OF WINDOW
//-------- ----------
window.addEventListener('pointerup', (e) => {
    const tar = e.target;
    // if not an item, clear selected and create list contents again
    if( !(tar.className.trim() === 'contents_item') ){
        // clear selected if wrap main clicked
        if(tar.id === 'wrap_main' || tar.id === 'contents_pwd'){
            state.selected = [];
            createListContents(state, state.files);
        }
    }
});
//-------- ----------
// MENU BAR EVENTS
//-------- ----------
// delete the current slected item
fm.on_edit_delete( (evnt) => {
    if(state.selected.length >= 1){
        const itemData = state.files[state.selected[0]];
        fm.run('rm -frd ' + itemData[2])
        .then(()=>{
            console.log('Delete of file done');
            state.selected = [];
            setPWD(state, state.pwd);
        });
    }else{
        console.log('nothing selected to delete');
    }
});
// copy edit event
fm.on_edit_copy( (evnt) => {
    console.log('COPY!');
    state.copy = state.selected.map( (i) => {
        return state.files[i];
    });
    console.log(state.copy);
});
// paste edit event
fm.on_edit_paste( (evnt) => {
    console.log('PASTE!');
    if(state.copy.length >= 1){
        const itemData = state.copy[0];
        Actions.run(state, 'copy_item', itemData)
        .then(()=>{
            console.log('copy done');
            state.copy = [];
            setPWD(state, state.pwd);
        });
    }
});
```

### 3.1 - style CSS file

When it comes to the CSS for this project I have worked out a few things using a [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout), which is a new thing for me. I am sure that there is a great deal more to write about when it comes to GRIDS and CSS, but for now I just have a basic something working okay when it comes to the div elements that I use to display a folder or file.

```css
body{
  background: #afafaf;
  color: #2a2a2a;
  font-family: arial;
  margin: 0px;
  padding: 0px;
}
#wrap_main{
  position: absolute;
  top:0px;
  background: rgba(32, 32, 32, 1);
  margin: 0px;
  padding: 0px;
  min-height:100%;
  width: 100%;
}
#toolbar{
  position: fixed;
  left:0px;
  top: 0px;
  width:100%;
  background: rgba(200, 200, 200, 0.8);
  padding:20px;
}
#wrap_progressbar{
  position: absolute;
  left:0px;
  bottom: 0px;
  width:100%;
  height:10px;
  background: rgba(128, 128, 128, 0.8);
  padding:0px;
}
#progressbar{
  /*position: fixed;*/
  position: absolute;
  left:0px;
  bottom: 0px;
  height:10px;
  background: rgba(0, 200, 0, 0.8);
  padding:0px;
}
/* CONTENTS PWD MAIN DIV */
#contents_pwd{
    margin: 40px 20px 20px 20px;
    padding: 10px;
    background:rgba(100, 100, 100, 0.8);
    display: grid;
    gap: 5px;
}
/* CONTENTS ITEM CLASS FOR ALL ITEM DIVS */
.contents_item {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  max-width: 250px;
  user-select: none;
  min-height:50px;
  padding: 10px;
}
/* MEDIA CALLS FOR CONTENTS DIV AND ITEMS CLASS */
@media (max-width: 399px) {
  #contents_pwd{ grid-template-columns: repeat(1, 1fr); }
  .contents_item { max-width: 320px; }
}
@media (min-width: 400px) and (max-width: 799px) {
  #contents_pwd{ grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 800px){
  #contents_pwd{ grid-template-columns: repeat(6, 1fr); }
}
```

## Conclusion

When it comes to the very basic idea of what I wanted to start with making this I all ready have that working well. All I wanted was a way to navigate around a file system and then start a terminal window, or start another file manager and that is it. I also wanted to work out some platform specific things while I was at it such as starting a Linux bash prompt window in a Linux system, and a command prompt window in a windows system. So with that aid because I set the bar so low I was able to get what I wanted working fast which is great. However when it comes to turning this into a major project that other people might like to use I of course would have a lot more work ahead of me with this. That seams to be the case with every electronjs example project that I have started thus far though. The most basic form of the project is easy enough to get up and running, but work will never truly be done with it if I choose to continue to support it.


