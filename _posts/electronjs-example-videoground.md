---
title: Electronjs application example that I am using to make videos
date: 2022-03-10 07:07:00
tags: [electronjs]
layout: post
categories: electronjs
id: 966
updated: 2022-03-11 07:15:29
version: 1.7
---

This year I wanted to start looking into how to go about using electronjs, and so far I have a small collection of tech demos, and hello world type programs that make use of various features of electronjs to make desktop applications with html and javaScript. Over the long term though I am going to want to make at least one or two actual programs that I use to make some kind of content. With that said I have a simple text editor program in the works, but for todays post I am going to be writing about the current state of something that I have been putting a whole lot more time into to make videos that I am calling VideoGround.

Over the years I have wrote a whole [lot of posts on threejs](/categories/three-js/) which is a popular javaScript library that has to do with 3d modeling. I have learned, and continue to learn, a whole lot about threejs, and also while I am at it 3d modeling in general inside and outside of threejs. I also like vuejs when it comes to using a front end framework, and I have also log a fair amount of time working with nodejs as well when it comes to working in a javaScript environment outside of a web browser. So then working on a project like this allows me to use, refresh, and refine knowledge of a wide range of skills that I developed over many years. However the main motivation with this is to also make something that is fun.

<!-- more -->

## 1 - The root electronjs files

The core of the electron application that is video ground as of revision 3 consists of three files, a main javaScript file, a Menu file, and a preload file. There are of course a lot of additional files that have to do with the client system, and then even more files when it comes to making video projects. However in this first section I will be sticking to just the typical root level files of the electronjs application.

### 1.1 - The main javaScript file

```js
// load app and BrowserWindow
const { app, Menu, BrowserWindow, dialog } = require('electron');
const path = require('path');
// Create the Main browser window.
function createMainWindow() {
    const mainWindow = new BrowserWindow({
            width: 900,
            height: 700,
            backgroundColor: '#008888',
            webPreferences: {
                // I tried to disable webSecurity to see if that would fix the isshue with CSP and vuejs (did not work)
                webSecurity: true,
                contextIsolation: true,
                preload: path.resolve( __dirname, 'preload.js')
            }
        });
    // load the html file for the main window
    mainWindow.loadFile('html/window_main.html');
    // Open the DevTools for debugging
    mainWindow.webContents.openDevTools();
    const menu = Menu.buildFromTemplate( require( path.join(__dirname, 'menu.js') ) );
    mainWindow.setMenu(menu);
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

### 1.2 - The Menu

```js
// load app and BrowserWindow
const { app, Menu, BrowserWindow, dialog } = require('electron');
const path = require('path');
// Custom Menus
const isMac = process.platform === 'darwin';
const pkg = require( path.join(__dirname, 'package.json') );
// The main menu for the main window
const MainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' }: { role: 'quit' },
            {
                label: 'Open',
                click: function(){
                    const mainWindow = BrowserWindow.fromId(1);
                    dialog.showOpenDialog(mainWindow, {
                        properties: ['openFile']
                    }).then((result) => {
                        if(result.canceled){
                            mainWindow.webContents.send('menuCanceled', result);
                        }else{
                            mainWindow.webContents.send('menuOpenFile', result);
                        }
                    }).catch((err) => {
                        // error getting file path
                        mainWindow.webContents.send('menuError', err);
                    });
                }
            },
            // SAVE A FILE
            {
                label: 'Save As',
                click: () => {
                    const mainWindow = BrowserWindow.fromId(1);
                    dialog.showSaveDialog(mainWindow, {
                        properties: ['showHiddenFiles']
                    }).then((result) => {
                        if(result.canceled){
                            mainWindow.webContents.send('menuCanceled', result);
                        }else{
                            mainWindow.webContents.send('menuSaveFile', result);
                        }
                    }).catch((err) => {
                        mainWindow.webContents.send('menuError', err);
                    });
                }
            },
            // EXPORT TO IMAGES
            {
                label: 'Export to Images',
                click: function(){
                    const mainWindow = BrowserWindow.fromId(1);
                    // dialog will need to be used to select a folder
                    dialog.showOpenDialog(mainWindow, {
                        properties: ['openDirectory']
                    }).then((result) => {
                        if(result.canceled){
                            mainWindow.webContents.send('menuCanceled', result);
                        }else{
                            mainWindow.webContents.send('menuExport', result, 'images');
                        }
                    }).catch((err) => {
                        // error getting file path
                        mainWindow.webContents.send('menuError', err);
                    });
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {role: 'togglefullscreen'},
            { role: 'toggleDevTools' }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'About',
                click: function(){
                    const mainWindow = BrowserWindow.fromId(1);
                    const r = pkg.version.split('.')[1];
                    dialog.showMessageBox(mainWindow, {
                        message: 'Video Ground version: r' + r
                    });
                }
            }
        ]
    }
];
module.exports = MainMenuTemplate;
```

### 1.3 - The preload file

```js
// preload with contextIsolation enabled
const { contextBridge, ipcRenderer} = require('electron');
const path = require('path');
const fs = require('fs')
// the api that will be window.videoAPI in the client side code
let videoAPI = {};
videoAPI.dir_root = __dirname;
videoAPI.pathJoin = path.join;
videoAPI.pathBasename = path.basename;
videoAPI.pathDirname = path.dirname;
// the events object
const EVENT = {};
// export to images
EVENT.menuExport = function(callback){
    ipcRenderer.on('menuExport', function(evnt, result, mode) {
        let imageFolder = result.filePaths[0];
        callback(evnt, result, imageFolder, mode);
    });
};
// when a file is opened with file > open
EVENT.menuOpenFile = function(callback){
    ipcRenderer.on('menuOpenFile', function(evnt, result) {
        let filePath = result.filePaths[0];
        videoAPI.loadFile(filePath, callback, evnt, result);
    });
};
EVENT.menuSaveFile = function(callback){
    ipcRenderer.on('menuSaveFile', callback);
};
// when an error happens with a menu option
EVENT.menuError = function(callback){
    ipcRenderer.on('menuError', function(evnt, err) {
        callback(evnt, err);
    });
};
// The main on method to attach events
videoAPI.on = function(eventType, callback){
   EVENT[eventType](callback);
};
// write a frame file to the given image folder, and frame index
videoAPI.writeFrame = (imageFolder, frameIndex, dataURL, callback) => {
    let data = dataURL.split(',')[1];
    let buf = Buffer.from(data, 'base64');
    //let filePath = path.join(imageFolder, 'frame-' + frameIndex + '.png'); 
    let filePath = path.join(imageFolder, 'frame-' + String(frameIndex).padStart(4, 0) + '.png'); 
    fs.writeFile(filePath, buf, (e) => {
        callback(e);
    });
};
// write js file text
videoAPI.writeJSFile = (filePath, text, callback) => {
    fs.writeFile(filePath, text, 'utf8', (e) => {
        callback(e);
    });
};
videoAPI.loadFile = (filePath, callback) => {
    if(filePath){
        // if path is not absolute
        if(!path.isAbsolute(filePath)){
            filePath = path.join(__dirname, filePath);
        }
        // read the file and set it to the client
        fs.readFile(filePath, 'utf8', (e, text) => {
            if(e){
                ipcRenderer.send('menuError', e);
            }else{
                callback(text, e, filePath);
            }
        });
    }else{
        ipcRenderer.send('menuError', new Error('no file path in the result object.') );
    }
};
// create an api for window objects in web pages
contextBridge.exposeInMainWorld('videoAPI', videoAPI);
```

## 2 - The client System

### 2.1 -

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
<!-- !!! - #0 - Looks like I jave to do away with CSP to get vuejs to work -->
<!--
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
-->
    <title>VideoGround</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="wrap_main">
        <div id="wrap_canvas"></div>
        <div id="wrap_playpack"></div>
        <div id="wrap_video_code"></div>
    </div>
    <script src="js/vue/2.6.14/vue.min.js"></script>
    <script src="js/threejs/0.135.0/three.min.js"></script>
    <script src="js/threejs/0.135.0/loaders/ColladaLoader.js"></script>
    <script src="js/utils.js"></script>
    <script src="js/video-setup.js"></script>
    <!--<script src="js/video-start.js"></script>-->
    <script src="js/client.js"></script>
    <script src="js/ui-playback.js"></script>
    <script src="js/ui-video-code.js"></script>
    <!-- Video Scripts -->
    <div id="wrap_video_scripts"></div>
  </body>
</html>
```

### 2.2 - utils.js and video setup.js

```js
var utils = {};
// DAE tools
utils.DAE = {};
// get the first Mesh or Group type object to be found
// in the given result object
utils.DAE.getMesh = function(result){
    var objects = result.scene.children,
    i = objects.length, obj;
    while(i--){
        obj = objects[i];
        if(obj.type === 'Mesh' || obj.type === 'Group'){
            return obj;
        }
    }
    return null;
};
// remove all child nodes
// https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
utils.removeAllChildNodes = function(fromNode){
  while (fromNode.firstChild) {
    fromNode.removeChild(fromNode.lastChild);
  }
};
```

```js
// create main VIDEO OBJECT
let VIDEO = {};
// init method for the video
VIDEO.init = function(scene, camera){
};
// update method for the video
VIDEO.update = function(state, scene, camera, secs, per, bias){
};
```

### 2.3 - client.js

```js
(function () {
    // ********** **********
    // HARD CODED SETTINGS
    // ********** **********
    const WRAP_CANVAS = document.querySelector('#wrap_canvas');
    // Sticking with 'youtube friendly' options when it comes to resolution
    // https://support.google.com/youtube/answer/6375112?hl=en&co=GENIE.Platform%3DDesktop
    const RESOLUTIONS = [
        {w: 426, h: 240},
        {w: 640, h: 360},
        {w: 854, h: 480},
        {w: 1280, h: 720},
        {w: 1920, h: 1080}
    ];
    const DEFAULT_RESOLUTION = 2; // going with 480p as a default for this
    // ********** **********
    // HELPER FUNCTIONS
    // ********** **********
    // get bias value helper
    let getBias = (per) => {
        return 1 - Math.abs(per - 0.5) / 0.5;
    };
    // get an object like {w: 1, h: 0.75} from an object like { w: 640, h: 480}
    let getRatio = (res) => {
       let m = Math.max(res.w, res.h);
       return {
           w : res.w / m,
           h : res.h / m
       };
    };
    // ********** **********
    // SCENE, CAMERA, and RENDERER
    // ********** **********
    let res = RESOLUTIONS[DEFAULT_RESOLUTION];
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(40, res.w / res.h, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    let renderer = new THREE.WebGLRenderer(),
    canvas = renderer.domElement;
    // append to wrap canvas
    WRAP_CANVAS.appendChild(canvas);
    renderer.setSize(res.w, res.h);
    // set scaled size of canvas
    let ratio = getRatio(res);
    canvas.style.width = Math.floor(ratio.w * 420) + 'px';
    canvas.style.height = Math.floor(ratio.h * 420) + 'px';
    // ********** **********
    // THE STATE MACHINE (sm) object
    // ********** **********
    let sm = window.sm = {
        canvas: canvas,
        frame: 0,
        frameFrac: 0,
        frameMax: 600,
        per: 0,
        bias: 0,
        scene: scene,
        camera: camera,
        loopActive: false
    };
    let secs = 0,
    fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
    fps_movement = 60, // fps rate to move camera
    frame = 0,
    frameMax = 600,
    loopActive = false,
    lt = new Date();
    // update
    let update = function(){
        sm.per = Math.round(sm.frame) / sm.frameMax;
        sm.bias = getBias(sm.per);
        VIDEO.update(sm, scene, camera, sm.per, sm.bias);
    };
    // app loop
    let loop = function () {
        let now = new Date(),
        secs = (now - lt) / 1000;
        if(sm.loopActive){
            requestAnimationFrame(loop);
            if(secs > 1 / fps_update){
                sm.setFrame();
                sm.frameFrac += fps_movement * secs;
                sm.frameFrac %= sm.frameMax;
                sm.frame = Math.floor(sm.frameFrac)
                lt = now;
            }
        }
    };
    // setup
    sm.setup = function(){
        sm.frame = 0;
        sm.frameFrac = 0;
        sm.loopActive = false;
        scene.children = [];
        scene.background = new THREE.Color('black');
        VIDEO.init(sm, scene, camera);
        sm.setFrame();
    };
    // set frame
    sm.setFrame = function(){
        // call update method
        update(secs);
        // render
        renderer.render(scene, camera);
    };
    // start loop
    sm.play = function(){
        sm.loopActive = !sm.loopActive;
        if(sm.loopActive){
            lt = new Date();
            loop();
        }
    };
    sm.setup();
}
    ());
```

### 2.4 - ui playback

```js
(function () {
    var vm = new Vue({
        el: '#wrap_playpack',
        template: '<div class="wrap_ui">' +
            '<input type="button" value="play/pause" v-on:click="play"><br>' +
            '<input type="button" value="frame+" v-on:click="stepFrame(1)">  ' +
            '<input type="button" value="frame-" v-on:click="stepFrame(-1)"><br>' +
            '<input type="text" size="5" v-model="targetFrame"><input type="button" value="set frame" v-on:click="setFrame"><br>' +
            '<input type="text" size="5" v-model="sm.frameMax"><input type="button" value="set max frame" v-on:click="setFrame"><br>' +
             '<span> {{ sm.frame }} / {{ sm.frameMax}} </span>' + 
        '</div>',
        data: {
           sm: sm,
           targetFrame: 0
        },
        methods: {
            stepFrame: function(delta){
                sm.frameFrac += parseInt(delta);
                sm.frameFrac = sm.frameFrac > sm.frameMax ? 0 : sm.frameFrac;
                sm.frameFrac = sm.frameFrac < 0 ? sm.frameMax : sm.frameFrac;
                sm.frame = Math.floor(sm.frameFrac);
                sm.setFrame();
            },
            // set a frame
            setFrame: function(){
                var sm = this.$data.sm;
                sm.frameMax = parseInt(sm.frameMax);
                sm.frameFrac = parseFloat(this.$data.targetFrame);
                sm.frame = Math.floor(sm.frameFrac);
                sm.setFrame();
            },
            // play or pause
            play: function(){
                var sm = this.$data.sm;
                sm.play();
            }
        }
    });
    var writeFrame = (imageFolder, frameIndex) => {
        var data = vm.$data,
        sm = data.sm;
        data.targetFrame = frameIndex;
        vm.setFrame();
        // write the current frame
        videoAPI.writeFrame(imageFolder, sm.frame, sm.canvas.toDataURL(), (e) => {
            console.log('wrote frame: ' + frameIndex);
            var nextFrameIndex = frameIndex + 1;
            if(nextFrameIndex < sm.frameMax){
                writeFrame(imageFolder, nextFrameIndex);
            }
        });
    };
    videoAPI.on('menuExport', function(evnt, result, imageFolder, mode){
        writeFrame(imageFolder, 0); 
    });
}
    ());
```

### 2.5 - ui video code

```js
(function () {
    // template and vm instance for video code ui
    var vm = new Vue({
        el: '#wrap_video_code',
        template: '<div class="wrap_ui">' +
            '<span>{{ fileName }}</span><br><br>' +
            //'<span>{{ filePath }}</span><br>' +
            '<textarea v-model="videoJS" cols="60" rows="10" v-on:input="updateVideo"></textarea>'+
        '</div>',
        data: {
           sm: sm,
           fileName: null,
           filePath: null, // the current path for the video.js file
           videoJS: '\/\/ Video JavaScript goes here'
        },
        methods: {
            updateVideo : function(e){
                loadText(e.target.value);
            }
        }
    });
    // load dae
    var loadDAE = function(callback){
        // if there are dea paths then I will want to load them	
    if(VIDEO.daePaths){
            var manager = new THREE.LoadingManager(function (result) {
                callback();
            });
            var loader = new THREE.ColladaLoader(manager);
            VIDEO.daePaths.forEach(function(daeRelUrl){
            var url = videoAPI.pathJoin(vm.$data.filePath, daeRelUrl);
                loader.load(url, function (result) {
                    VIDEO.daeResults.push(result);
                });
            });
        }else{
       // just call setup if there are no *.dae files	
           callback();
        }
    };
    // set filePath helper
    var setFilePath = (filePath) => {
        vm.$data.filePath = videoAPI.pathDirname(filePath);
        vm.$data.fileName = videoAPI.pathBasename(filePath);
        document.title = 'VideoGround - ' + vm.$data.fileName;    
    };
    // load text
    var loadText = (text) => {
        try{
            // by default no dae files are used
            VIDEO.daePaths = null;
            VIDEO.daeResults = [];
            VIDEO.scripts = undefined;
            // !!! - #1 - USING EVAL FOR NOW UNTIL I FIGURE OUT SOMTHING BETTER
            eval(text);
            vm.$data.videoJS = text;
            // load any and all dae files first
            loadDAE( () => {
                // load scripts
                if(VIDEO.scripts){
                    var loaded = 0,
                    total = VIDEO.scripts.length,
                    scriptDiv = document.getElementById('wrap_video_scripts');
                    // remove all child nodes of scriptDiv
                    utils.removeAllChildNodes(scriptDiv);
                    // for each relative URL
                    VIDEO.scripts.forEach( (scriptRelURL, i) => {
                        var url = videoAPI.pathJoin(vm.$data.filePath, scriptRelURL);
                        var script = document.createElement('script');
                        script.addEventListener('load', (e) => {
                            loaded += 1;
                            // run setip when all scripts are loaded
                            if(loaded === total){
                                sm.setup();
                            }
                        });
                        script.src = url;
                        scriptDiv.appendChild(script);
                    });
                }else{
                    // no scripts? then just run setup
                    sm.setup();
                }
            });
        }catch(e){
            console.warn(e.message);
        }
    };
    // ********** **********
    // LOAD STARTING VIDEO FILE
    // ********** **********
    var startFilePath = videoAPI.pathJoin( videoAPI.dir_root, 'start-videos/video9.js' );
    videoAPI.loadFile(startFilePath, (text, e, filePath) => {
        setFilePath(filePath);
        if(e){
            console.warn(e.message);
        }else{
            loadText(text);
        }
    });
    // ********** **********
    // LOAD VIDEO FILE FROM MENU
    // ********** **********
    videoAPI.on('menuOpenFile', function(text, e, filePath){
        console.log('Menu open event handler in ui-video-code.js');
        setFilePath(filePath);
        loadText(text);
    });
    // on save file
    videoAPI.on('menuSaveFile', function(evnt, result){
        if(!result.canceled){
            videoAPI.writeJSFile(result.filePath, vm.$data.videoJS, (e) => {
                if(e){
                    console.warn(e.message);
                }else{
                    console.log('wrote file: ' + result.filePath);
                }
            });
        }
    });
    // on menu error
    videoAPI.on('menuError', function(evnt, err){
        console.log(err);
    });
}
    ());
```

## 3 - Conclusion

This might prove to be a project that I might very well continue to work on, that should go without saying if I do end up using this every day to make videos. Future plains with it will involve not just adding every feature that I can think of, but rather be a little more reserved about making the program more complex. At this point I am a little more interested in making the application as it currently stands more solid as there are a fair number of bugs that I would like to work out with it, and I am just not complicate happy with the over all structurer as it currently stands as revision 3.

That is not to say that I do not have ideas for additional features, I do, many of them have to do with automating things that I am currently doing manually. For example making use of the child process module to call ffmpeg to create a final video from exported frame images rather than doing so mainly from the command line. I am currently using some bash aliases, but I should just be able to do that from within VideoGround.

