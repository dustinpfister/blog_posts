---
title: The Browser Window class in Election
date: 2022-02-14 15:53:00
tags: [electronjs]
layout: post
categories: electronjs
id: 960
updated: 2022-02-22 11:55:14
version: 1.28
---

The [Browser Window class](https://www.electronjs.org/docs/latest/api/browser-window) is one of the first Classes in [Electron.js](https://en.wikipedia.org/wiki/Electron_%28software_framework%29) that one will want to work with. It is possible to have an electron app without using it, but chances are I am going to want to have at least one if not more windows to work with, and to do so I will want to use this class. 

There is also one other class that I think that a developer should be aware of right alway also, which is the [Menu class](https://www.electronjs.org/docs/latest/api/menu). This Menu class as the name suggests is how to go about creating a custom menu for one or more windows in the application. So in todays example I am just going to be taking a few more steps forward from my [hello wold example that I started with](/2022/02/07/electronjs-hello-world/) with Menus also while looking more into what can be done with the browser window class, starting with maybe the set menu method of the browser window class. I have found thus far that this is the method that I am going to want to use when it comes to having more than one kind of menu for more than one kind of window.

<!-- more -->

## What to know first before reading more on Browser Window

The example that I am writing about in this post is a little more advanced then the hello world example that I made first. This is very much the second post on electronjs that I have wrote thus far, so much of what I am writing about here has to do with what the next steps are after getting stared with a very basic example that just displays a message in a browser window. So I am taking some liberties here and assuming that you have at least a little experience thus far working with electron. I am also assuming that you know a thing or two about how to [program in general with javaScript](/2018/11/27/js-getting-started/), with both client side javaScript as well as how to work in a back end environment with javaScript also [when it comes to using nodejs](/2017/04/05/nodejs-helloworld/). If not getting into some basic examples of how to get started in those environments is outside the scope of this post.

### The full source code for this example is on Github

I have set up a electronjs examples repository in my Github account that I will be using to park all the source code examples that I make while learning  and writing about electronjs. The source code examples for this post alone can be [found here](https://github.com/dustinpfister/examples-electronjs/tree/master/for_post/electronjs-browser-window/) in the for post folder of the repository. This might in some cases be the best way to go about reproducing what I am working with here on your end.

## 1 - The main javaScript file

For the main javaScript file of this electron example I am then going to want to require in the app, Menu, and BrowserWindow class from electron. I will then want to have two functions for creating a window, one of which will be used to create the main window, and the other will be used to create a child window. 

In the hello world example that I started out with I all ready made use of one browser window class method that is the load file method that will load an html file that is relative to the root folder of the application folder. I am once again using the method to load html files, now one of each kind of window in this example that are in an html folder.

One new Browser Window class method that I am using now in this example is the [set menu method](https://www.electronjs.org/docs/latest/api/browser-window#winsetmenumenu-linux-windows) of the browser window class that I think I will now be using for every situation in which I will want a custom menu from now on. The reason why I say that is that in the hello world example I made use of the [set Application Menu](https://www.electronjs.org/docs/latest/api/menu#menusetapplicationmenumenu) of the Menu class, which seems to make it so that any calls to change the Menu after that will be ignored. It would seem thus far that if I want to change what the menu is on the fly, I will not want to use the menu class method to set what the custom menu is, but rather use this set Menu method of the Browser Window class. However this alone might still not be a done deal, as I am still not sure if the set menu method is what I want to use when making an application that will work on a wider range of operating systems.

Another major point to make with this example is with the additional options used when calling the Browser Window class constructor, such as the backgroundColor, parent, and webPrefernecs properties. The background color prop is a way to set what the background color should be for a window before the content loads. When it comes to getting into the long list of webPrefernces options I think that the context isolation property and the preload properties are good starting points over other options such as the node integration property. In oder to define a public api for the client side system I will need to use additional classes an features in the preload javaScript file, more on that later in the section on that file.

When creating a child window I have found that I do want to make use of the parent property to set what the parent window is for the child window. There is one main thing to keep in mind with this parent property and that is that when I close the main parent window, that should also close any and all child windows as well on top of that in such a case. Well at least that is the kind of behavior that I would want in mode cases, if not for some reason then maybe the parent property is not all that important it would seem. The value of the parent property should be a reference to the instance of browaerWindow that is the parent for this child window, and one way to go about getting such a reference if one is not all the ready would be to use the [BrowserWindow.fromId](https://www.electronjs.org/docs/latest/api/browser-window#browserwindowfromidid) static method. This way of getting a reference to a browser window instance involves giving a integer that is the id of the window, the way that i have things set up here the window of an id of 1, should always be the main window.

```js
// load app and BrowserWindow
const { app, Menu, BrowserWindow } = require('electron');
const path = require('path');
// Create A Child Window
function createChildWindow() {
    const childWindow = new BrowserWindow({
            width: 320,
            height: 240,
            // the parent propery should be used with the main window so that when
            // the main window is closed, all child windows will also close
            parent: BrowserWindow.fromId(1),
            backgroundColor: '#008888',
            webPreferences: {
                contextIsolation: true,
                preload: path.resolve( __dirname, 'preload.js')
            }
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
            webPreferences: {
                contextIsolation: true,
                preload: path.resolve( __dirname, 'preload.js')
            }
        });
    // load the html file for the main window
    mainWindow.loadFile('html/window_main.html');
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
                    // window of id 1 should always be the parent window
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

So then I also have two menu templates in this example, one of which I have for the main window, and another for the child window. One key difference between the two is that I will want to be able to open a child window from the main window of course. To do so I just need to create an object for a sub menu of the file menu and in this object I will want to have a label with a value like new window. I then will want to have a click property for the object and for this click property I can then have a function where I define the javaScript that I want to run when this option is click. In this case I will want to call the create child window function to create yet another child window.

Another key difference between the menu for the parent window and the child window is that I do not want a file menu at all for that menu. That is that I do not want to be able to quit the whole application from the child window, so I just did away with that menu all together. 

## 2 - The preload javaScript file

For this browser window class example I started working out a preload javaScript file that is used when creating a window in the main javaScript file by way of the preload option of the WebProperties object of the Browser window class options. This preload file is used as a way to create additional api methods that can in turn be used in the front end javaScript of a project to preform certain actions that can only be done from the nodejs side of things. When it comes to not using context isolation I will then not need to bother with the contextBride class to create a public api for the window object. However so far I have found that this might be one of the best options to go with when it comes to starting to learn how to make electron apps in a way that are somewhat professional. When it comes to simple getting to learn how to use something time examples such as this one, maybe caring about security is not a high priority, but if the aim is to make some kind of real project at some point in the future, maybe it is best to learn these things sooner rather than later.

```js
// preload with contextIsolation enabled
const { contextBridge } = require('electron');
// create an api for window objects in web pages
contextBridge.exposeInMainWorld('api', {
  func: function(){
      return 'hello world';
  }
});
console.log('preload');
```

## 3 - The HTML Folder

I then also have a html folder that I will be using to store the html files for both a main window as well as a child window, as well as any and all additional files that will compose the client side system of the application. As of revision 1 of the example this includes two html files, a css file, and a single client.js file that is used to work with the public api that is being used by way of the preload.js file.

### 3.1 - The window main html file

The main html file for a main window of this example just has some text the says that this is the main window of the application. In the head of the html file I also also linking to a css file that is shared with the other html file that composes the html for a child window.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Browser Window Demo - Main Window</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="wrap_main">
        <h1>Main Window</h1>
        <textarea id="text_console" rows="10" cols="60"></textarea>
        <script src="client.js"></script>
    </div>
  </body>
</html>
```

### 3.2 - The Window child html file

I then have a whole other html file for a child window of this example.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Browser Window Demo - Child Window</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="wrap_main">
        <h1>Child Window</h1>
    </div>
  </body>
</html>
```

### 3.3 - The client javaScript file

For this example I then also have a little client side javaScript that is loaded from the html files.

```js
var con = document.querySelector('#text_console');
con.value = api.func();
```

### 3.4 - Style CSS

I then have some shared css between the two html files.

```css
body{
  background: #afafaf;
  color: #2a2a2a;
  margin: 0px;
  padding: 0px;
  font-family: arial;
}
#wrap_main{
  position: absolute;
}
```

## 4 - Conclusion

There is a great deal more to write about when it comes to the browser window class, this single post alone does not even make a dent in the surface. I will likely make future revisions to this post at some point in the future as a log more hours working with electron.js, but for now this will be it. As of this writing I am still fairly new to electron js, and I can see that this is the kind of framework that is going to take a while to learn as there is a whole lot of ground to cover.

In any case I think that the main goal of any future revisions of this example will still to just create a simple tech demo type application that just helps to demonstrate how to make use of certain critical features of the Browser Window class. However in order to really cover a great deal of what there is to work with in the browser window class I also need to at least work out some basics of many other classes while I am at it. Event with revision 1 of this example I think I have all ready covered certain basics of what I should be aware of, but in time I will want to make at least one, if not more additional revisions beyond this.
The next post that I wrote after this post was my [post on the context bridge class](/2022/02/21/electronjs-context-bridge/) which might very well be a good next step after learning at least a few basic things about the browser window. In that post I learned a great deal more about the browser window class along with many other features of electron.js, and have all ready made a simple text editor application. In that post there is using the web properties object of a browser window to emit events that I can then define in the preload.js file of a custom api that can be used in the client side code of a project. In any case I [all ready have a few posts on electron.js](/categories/electronjs/), and I am sure that I will be writing at least a few more when it comes to this project for sure as this is clearly a great way to make desktop like applications with html css and javaScript.
