---
title: Using more than one app in express, with req.app, res.app, and require
date: 2018-06-22 11:36:00
tags: [js,express,node.js]
layout: post
categories: express
id: 214
updated: 2018-06-25 20:35:28
version: 1.1
---

In [express.js](https://expressjs.com/) I get into situations in which I am dealing with more than one instnace of an express app object. This is helpful, and to some extent necessary as it helps break things down into more manageable smaller components that are each responsible for a certain task, such as rendering, or grabbing settings from a yaml or json file. In this post I will be writing about req.app, res.app which are both just reference the instance of app that is using the middleware. This can be used as a way to not use require to get a reference to my main app instance from another file, but that is another way of pulling it off. In other words this post is about instances of the app object in express, and how to manage a bunch of theme when starting to make something a little complicated.

<!-- more -->

## 1 - what to know before hand

[main post on express](/2018/06/12/express/).

### 2 - The req.app demo

### 2.1 - Setup

```
$ mkdir response-app
$ cd response-app
$ npm init
$ npm install express --save
```

### 2.1 - The main /app.js file

### 2.2 - The /otherapp.js file

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