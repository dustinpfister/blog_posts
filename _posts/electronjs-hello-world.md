---
title: Hello World example of Election.js
date: 2022-02-07 14:55:00
tags: [electronjs]
layout: post
categories: electronjs
id: 958
updated: 2022-02-07 15:54:47
version: 1.2
---

I have been putting getting started with [election.js](https://en.wikipedia.org/wiki/Electron_%28software_framework%29) long enough, so this year will be the year that I write at least a few posts on the subject while I am learning how to make election.ks apps. Whenever I learn something new I have to start somewhere, so as one would expect this will be a hello world example of an election app. For this hello world election app I started out with an example that I found at the [quick start guild of the election js website](https://www.electronjs.org/docs/v14-x-y/tutorial/quick-start). I then just made just a few chances from the example in a effort to make it even a little more reduced, but also addressed some things that I think should be address right away even for a hello world app. 

One thing that I wanted to figure out right away was how to go about having a [custom native menu](https://www.electronjs.org/docs/latest/api/menu) for the app. Sense this is a hello world app the default for this is a little more advanced than what is needed. So Right away i looked into how to go about having a custom template for the native menu, even for a hello world app.


<!-- more -->


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