---
title: Hello World example of Election.js
date: 2022-02-07 14:55:00
tags: [electronjs]
layout: post
categories: electronjs
id: 958
updated: 2022-02-15 10:17:24
version: 1.27
---

I have been putting getting started with [election.js](https://en.wikipedia.org/wiki/Electron_%28software_framework%29) long enough, so this year will be the year that I write at least a few posts on the subject while I am learning how to make election.ks apps. Whenever I learn something new I have to start somewhere, so as one would expect this will be a hello world example of an election app. For this hello world election app I started out with an example that I found at the [quick start guild of the election js website](https://www.electronjs.org/docs/v14-x-y/tutorial/quick-start). I then just made just a few chances from the example in a effort to make it even a little more reduced, but also addressed some things that I think should be address right away even for a hello world app. 

One thing that I wanted to figure out right away was how to go about having a [custom native menu](https://www.electronjs.org/docs/latest/api/menu) for the app. Sense this is a hello world app the default for this is a little more advanced than what is needed. So Right away i looked into how to go about having a custom template for the native menu, even for a hello world app.


<!-- more -->

## What to know first before getting started with election js

It should go without saying but I will make sure to at least briefly mention this here in this section, but yes first and foremost you are going to want to have some experience with javaScript first. That is when it comes to [getting started with javaScript](/2018/11/27/js-getting-started/) it might be best to start out with client side javaScript, and or [nodejs alone](/2017/04/05/nodejs-helloworld/) first before getting into election. Having a string foundational understanding of client side and sever side javaScript first will help a whole lot when it comes to starting to move forward with election.

Nodejs should also be installed, and also when installing nodejs it is a good idea to be mindful of what version of Nodejs you are installing while you are at it. Also on top of that it is also a good idea to me mindful of what version of election you are going with also. So it might be a good idea to look into [how to go about having more than one node binary](/2021/09/24/linux-raspberry-pi-os-nodejs-setup/) at the ready on you computer, and know how to go about switching between them. If you just want to go with one version then it would be best to go with whatever the latest LTS is.

### Why, or Why not electron.js?

There are a lot of good things to say about electron.js, the first and for most thing about it is that it is just one of the best projects to go with if the aim is to create some kind of desktop application with javaScript, html, and css. It will make life a lot easier compared to trying to make such an application from the ground up, also there are a lot of concerns when it comes to packaging binaries to run the javaScript as when it comes to deployment one can not always be certain that a user will have chrome and nodejs installed on there system. So then what it comes to just working out some kind of [nodejs project without election](/2020/10/27/nodejs-example-chrome-app-mode/) there are ways of starting chrome from a nodejs script with the [child process](/2018/02/04/nodejs-child-process/) module, but I am making some assumptions about what there is to work with on the computer when doing something like that.

### Setting up the app folder

You should have some experience creating nodejs app by themselves first, if so then you should know that you want to have a package.json file in the root of the application folder. So the basic process of starting a new app would be to create a new folder, then make that folder the current working directory. Then in that folder there is doing an npm init and then installing election and saving it as a dev dependency.

```
$ mkdir electronjs-hello-world
$ cd electronjs-hello-world
$ npm init
$ npm install electron@10.4.7 --save-dev
```

The key things to look at with the package.js file is the scripts key making sure that the start nom script is calling the election binary in the node modules folder, and also the main script is important also. For this example I am calling my main javaScript file simply main.js and that will be located in the root of the project folder.

```
{
  "name": "hello-world",
  "version": "0.0.0",
  "description": "hello world",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "author": "Dustin Pfister",
  "license": "GPL-3.0",
  "devDependencies": {
    "electron": "^10.4.7"
  }
}
```

## 1 - The main javaScript file

In the main script I am going to want to require in a few things from electron, mainly the [main app constructor](https://www.electronjs.org/docs/latest/api/app), as well as [Browser Window](https://www.electronjs.org/docs/latest/api/browser-window) if I want to have a window for this app which I do. On top of those two constructors I am also going to want Menu as I want to have a custom menu for this app rather than the default one that has to many options for such a simple application.

The next thing that I am doing in this example is creating the custom menu for this hello world example in which I just want to have a file menu, and a view menu. The file menu will just have a quit option, and the view menu will toggle full screen, and that is it. So the Basic idea for this is to create an object that will be the template for thee menu, and then pass this template object to the [Menu.buildFromTemplate](https://www.electronjs.org/docs/latest/api/menu#menubuildfromtemplatetemplate) method the returned object will then be a menu to which I can pass to the [Menu.setApplactionMenu](https://www.electronjs.org/docs/latest/api/menu#menusetapplicationmenumenu) method that then so far seems to work just fine to create a custom menu for an application. I am sure there is a great deal more to write about when it comes to Menus, but for now this is very much a hello world application so at this time I think I should move on.

The next step involves having a create window function in which I call the main BrowserWindow constructor function. When calling this constructor I am all ready aware of a few note worth options that are worth at least mentioning here. As one would expect there are very much width and height properties to set the starting size of the window, however maybe one option that I should mention right away is the [webPrefernces object](https://www.electronjs.org/docs/latest/api/window-open) which comes into play when doing things such as node integration or not. For this example though, the main goal here is to just simply display hello world though, so for now moving on once again.

After creating the instance of the BrowserWindow in the createWindow function I can not call various method off of the instance of BrowserWindow such as the loadFile method of the BrowserWindow class. The first argument to this loadFile method should be a relative URI path to an html file that is relative to the root name space of the application folder. So in other words if the index.html file is at the top level along with the package.json file and main.js file here, then I just pass the name of the file, which this case in just simple index.html.

```js
// load app and BrowserWindow
const { app, Menu, BrowserWindow } = require('electron')
 
// Custom Menu
const isMac = process.platform === 'darwin'
const MenuTemplate = [
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { type: 'separator' },
      { role: 'togglefullscreen' }
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
    webPreferences: {}
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // Open the DevTools for debugging
  //mainWindow.webContents.openDevTools()
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

Another thing that I think that I should write about here with this hello world example is the webContents property of the instance of the BrowserWindow class, mainly the openDevTools method of this property. The first thing that I am going to want to do when making these kinds of application is to have a way to debug what I am working on as I start to make some kind of real application with electron, and calling this method is one way to go about getting that open in the browser window.

I then just need to attach two events to the app object for this, one for the ready event, and another for the when all closed event. The situation with this will change a little depending on how much you case about MacOS. It would seem that so far it is mainly that operating system the requires some special treatment here and there. Again this might be all a matter for another future blog post on electron, for now I just want hello world on the screen and thats it.

## 2 - The index.html file

In the main javaScript file I am loading an index.html file in the create window function. So there here is the html of that very file. This of course contains the desired hello world text, and while I was at it I also wanted to see if I can get external css files working out of the gate, and it would seem that I can.

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="wrap_main">
        <h1>Hello World</h1>
    </div>
  </body>
</html>
```

## 3 - A style css file

Here then is the extremal css file that I am using to just adjust the look of the app a little, and also for the sake of just starting work with something more than just a single index html file for the client system.

```js
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
  position: absolute;
  left: 25%;
  top: 25%;
  width: 50%;
  height: 50%;
  text-align: center; 
  display: table;
}
 
#wrap_main h1 {
  display:table-cell;
  vertical-align:middle
}
```

## 4 - Concision

That will be if for now then when it comes to getting started with electron.js at least with this basic hello world example in which I have not covered a great deal of what one should know about when it comes to making a real application of some kind. However I guess that is not such a bad thing when it comes to hello world apps, as the whole idea of them is to just start out with just showing the text hello world on the screen and that is it. 

Still there is the question of what to do next, with that said maybe the next step is to just start making at least a few simple applications now such as maybe a text editor, or art program of some kind. In other words any kind of project in which I am opening, editing and saving some kind of file such as a simple text file, png, or something to that effect. However to even get to the point in which I can make those kinds of applications I still need to learn and write about many other basic features of electron.js. With that said maybe a good next step first would be to just learn more about the [Browser window class](/2022/02/14/electronjs-browser-window/).

There are a lot of options for the BrowserWindow class that I think might be a good next thing to look into more closely, and when doing so that quickly ends up branching off into a whole lot of other classes. For example when making use of the preload.js file by way of the preload path of the webProperries object of the BrowserWindow constructor options there is also the contextIsolation property that should be used with it. The [contextBridge class](https://www.electronjs.org/docs/latest/api/context-bridge) should then be used in the preload.js file to sync things up with certain things between the renderer and the main process of the electron application.

With that said I will be coming out with a few [more posts on electron](/categories/electronjs/) in the coming weeks, at least that is part of the plan for new content as of late anyway.
