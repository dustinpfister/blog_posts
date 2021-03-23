---
title: Using more than one app in express, with req.app, res.app, and require
date: 2018-06-22 11:36:00
tags: [js,express,node.js]
layout: post
categories: express
id: 214
updated: 2021-03-23 14:53:00
version: 1.6
---

In [express.js](https://expressjs.com/) I get into situations in which I am dealing with more than one instance of an express app object. This is helpful, and to some extent necessary as it helps break things down into more manageable smaller components that are each responsible for a certain task, such as rendering, or grabbing settings from a yaml or json file. 

In this post I will be writing about req.app, res.app which are both just reference the instance of app that is using the [express middleware](/2018/06/25/express-middleware/). This can be used as a way to not use require to get a reference to my main app instance from another file, but that is another way of pulling it off. In other words this post is about instances of the app object in express, and how to manage a bunch of theme when starting to make something a little complicated.

<!-- more -->

## 1 - Express req.app, res.app and what to know before hand

This is a post on working with app objects in express.js using [req.app](https://expressjs.com/en/api.html#req.app), and [res.app](https://expressjs.com/en/api.html#res.app) properies, it is not a getting started post on express.js, or any additional skills required before hand. If you are new to express, or you just want to check out my [main post on express](/2018/06/12/express/) that might be a good starting point.

### 2 - The req.app demo

The req.app, and res.app properties each hold the same reference to the app that is using a middleware method. For an example of how this can be useful, I made two javaScript files. One file is the usual main app.js file, and the other presents a single middleware method that renders a view. In the middleware I create a separate instance of an express app, but I want to set some settings from the main app.js file. One way to do this is to use res.app to set values in the middleware app to what is in the main app.

### 2.1 - Setup

For this demo I just need to install express.

```
$ mkdir response-app
$ cd response-app
$ npm init
$ npm install express --save
```

### 2.1 - The main /app.js file

Here in the main app.js file I create an instance of an app object, and set some app settings with app.set. I then just require a single middleware function called otherapp.js that will do the rendering, but it needs some values that I have set here. There are a few ways to do it, but in this demo I will be using res.app.

```js
let express = require('express'),
path = require('path'),
// the main app instance
app = express();
app.set('id','main');
app.set('port',8080);
 
// path and view engine
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
 
app.use(require('./otherapp.js'));
 
app.listen(app.get('port'), function () {
 
    console.log('express demo is up on port: ' + app.get('port'));
 
});
```

### 2.2 - The /otherapp.js file

This is the single middleware method that the main app is using with app.use. In here I am using res.app to gain a reference to the main app object instance in app.js. I am then setting the settings of another instance of the app object in the middleware to the settings in the main app.js file.

```js
let express = require('express'),
renderApp = express();
 
module.exports = function (req, res) {
 
    let app = res.app;
 
    // copy over settings from main app
    // including views path, and engine
    Object.keys(app.locals.settings).forEach(function (key) {
        renderApp.set(key, app.get(key));
    });
 
    // preserve id
    renderApp.set('id', 'render');
 
    res.render('index', {
 
        settings: {
 
            app: app.locals.settings,
            renderApp: renderApp.locals.settings
 
        }
 
    });
};
```

### 2.3 - The /view/index.ejs file

Finally I have a single index.ejs file in the view folder that will be rendered by the middleware method.

```
<h1>Express Project Settings</h1>
 
<h2>Main App:</h2>
<ul>
<% Object.keys(settings.app).forEach(function(key){ %>
 
    <li>key: <%= key %> : <%= settings.app[key] %></li>
 
<% }); %>
</ul>
 
<h2>Render App:</h2>
<ul>
<% Object.keys(settings.renderApp).forEach(function(key){ %>
 
    <li>key: <%= key %> : <%= settings.renderApp[key] %></li>
 
<% }); %>
</ul>
```

## 3 - Conclusion

There is no difference that I am aware of at least when it comes to req.app, and req.app they both should be references to the same express app  at least from my experience thus far that has been the case. The main thing about this here is that the property is a way to make use of value of a main express app. This is one of the reasons why I have got into the habit of using the app.get and app.set methods as a way to set values that I intend to use across the whole of a project.