---
title: The Browser Window class in Election
date: 2022-02-14 15:53:00
tags: [electronjs]
layout: post
categories: electronjs
id: 960
updated: 2022-02-14 16:21:08
version: 1.7
---

The [Browser Window class](https://www.electronjs.org/docs/latest/api/browser-window) is one of the first Classes in [Electron.js](https://en.wikipedia.org/wiki/Electron_%28software_framework%29) that one will want to work with. It is possible to have an electron app without using it, but chances are I am going to want to have at least one if not more windows to work with, and to do so I will want to use this class. 

There is also one other class that I think that a developer should be aware of right alway also, which is the [Menu class](https://www.electronjs.org/docs/latest/api/menu). This Menu class as the name suggests is how to go about creating a custom menu for one or more windows in the application. So in todays example I am just going to be taking a few more steps forward from my [hello wold example that I started with](/2022/02/07/electronjs-hello-world/) with Menus also while looking more into what can be done with the browser window class, starting with maybe the set menu method of the browser window class. I have found thus far that this is the method that I am going to want to use when it comes to having more than one kind of menu for more than one kind of window.

<!-- more -->

## 1 - The main javaScript file

For the main javaScript file of this electron example I am then going to want to require in the app, Menu, and BrowserWindow class from electron. I will then want to have two functions for creating a window, one of which will be used to create the main window, and the other will be used to create a child window.

```js
// load app and BrowserWindow
const { app, Menu, BrowserWindow } = require('electron');
// Create A Child Window
function createChildWindow() {
    const childWindow = new BrowserWindow({
            width: 320,
            height: 240,
            backgroundColor: '#008888'
        });
    const menu = Menu.buildFromTemplate(ChildMenuTemplate);
    childWindow.setMenu(menu);
    childWindow.loadFile('html/window_child.html');
    return childWindow;
};
// Create the Main browser window.
function createMainWindow() {
    const mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            backgroundColor: '#008888',
            webPreferences: {}
        });
    // load the html file for the main window
    mainWindow.loadFile('html/window_main.html')
    // Open the DevTools for debugging
    //mainWindow.webContents.openDevTools()
    // creating a starting child window
    createChildWindow();
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
            {
                label: 'New Window',
                click: function(){
                    createChildWindow();
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    }
];
// child window
const ChildMenuTemplate = [{
    label: 'View',
    submenu: [{
            type: 'separator'
        }, {
            role: 'togglefullscreen'
        }
    ]
}];
// the 'ready' event
app.whenReady().then(() => {
    createMainWindow();
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

## 2 - The HTML Folder

I then also have a html folder that I will be using to store the html files for both a main window as well as a child window. This will then also be used as a place to store any additional files that compose the client system for this electron js example.

### 2.1 - The window main html file

The main html file for a main window of this example just has some text the says that this is the main window of the application. In the head of the html file I also also linking to a css file that is shared with the other html file that composes the html for a child window.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Browser Window Demo</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="wrap_main">
        <h1>Browser Window demo</h1>
    </div>
  </body>
</html>
```

### 2.2 - The Window child html file

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Child Window</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="wrap_main">
        <h4>Child Window</h4>
    </div>
  </body>
</html>
```

### 2.3 - Style CSS

```css
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

## 3 - Conclusion

There is a great deal more to write about when it comes to the browser window class, this single post alone does not even make a dent in the surface. I will likely make future revisions to this post at some point in the future as a log more hours working with electron.js, but for now this will be it.
