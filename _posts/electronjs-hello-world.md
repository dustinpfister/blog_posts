---
title: Hello World example of Election.js
date: 2022-02-07 14:55:00
tags: [electronjs]
layout: post
categories: electronjs
id: 958
updated: 2022-02-07 16:14:51
version: 1.6
---

I have been putting getting started with [election.js](https://en.wikipedia.org/wiki/Electron_%28software_framework%29) long enough, so this year will be the year that I write at least a few posts on the subject while I am learning how to make election.ks apps. Whenever I learn something new I have to start somewhere, so as one would expect this will be a hello world example of an election app. For this hello world election app I started out with an example that I found at the [quick start guild of the election js website](https://www.electronjs.org/docs/v14-x-y/tutorial/quick-start). I then just made just a few chances from the example in a effort to make it even a little more reduced, but also addressed some things that I think should be address right away even for a hello world app. 

One thing that I wanted to figure out right away was how to go about having a [custom native menu](https://www.electronjs.org/docs/latest/api/menu) for the app. Sense this is a hello world app the default for this is a little more advanced than what is needed. So Right away i looked into how to go about having a custom template for the native menu, even for a hello world app.


<!-- more -->

## What to know first before getting started with election js

It should go without saying but I will make sure to at least briefly mention this here in this section, but yes first and foremost you are going to want to have some experience with javaScript first. That is when it comes to [getting started with javaScript](/2018/11/27/js-getting-started/) it might be best to start out with client side javaScript, and or [nodejs alone](/2017/04/05/nodejs-helloworld/) first before getting into election. Having a string foundational understanding of client side and sever side javaScript first will help a whole lot when it comes to starting to move forward with election.

Nodejs should also be installed, and also when installing nodejs it is a good idea to be mindful of what version of Nodejs you are installing while you are at it. Also on top of that it is also a good idea to me mindful of what version of election you are going with also. So it might be a good idea to look into how to go about having more than one node binary at the ready on you computer, and know how to go about switching between them. If you just want to go with one version then it would be best to go with whatever the latest LTS is.

## Setting up the app folder

You should have some experience creating nodejs app by themselves first, if so then you should know that you want to have a package.json file in the root of the application folder.

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

## 2 - The index.html file

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