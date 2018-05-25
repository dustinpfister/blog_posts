---
title: Serving static files with express.js
date: 2018-05-24 15:26:00
tags: [js,express,node.js]
layout: post
categories: express
id: 193
updated: 2018-05-25 09:49:02
version: 1.1
---

In this post I will be writing about serving static files in a node.js environment using [express.js](https://expressjs.com/). The process is pretty straight forward using an express.js built in middleware for doing so ([express.static](https://expressjs.com/en/4x/api.html#express.static)). There are some additional options of interest as well thought so lets take a look.

<!-- more -->


## A Basic static server example with express.js

For a basic example of using express.js to make a static server I made a public folder with some simple hand coded assets. In a more advanced real word example you might use some kind of static site generator such as hexo.

### The public folder

### index.html

```html
<!doctype html>
<html lang="en">
<head>
    <title>express static page</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="wrap_main">
        <div class="warp_header">
            <h1>Hello I am a static Page.</h1>
        </div>
        <div class="warp_content">
            <img src="/img/happy_kitty.png">
        </div>
    </div>
    <script src="/js/foo.js"></script>
</body>
```

## style.css

```css
body{
 
    background: #000000;
 
}
 
.wrap_main{
 
    background: #2a2a2a;
    color: #ffffff;
    margin-left:auto;
    margin-right:auto;
    width:90%;
 
}
 
.warp_header{
 
    text-align:center;
    min-height:150px;
    background:#5a5a5a;
 
}
```

### /img/happy_kitty, and /js/foo.js

## The app.js file
 
```js
let express = require('express'),
path = require('path'),
app = express(),
 
// getting port this way
port = process.env.PORT || process.argv[2] || 8080;
 
app.use('/', express.static('public'));
 
app.listen(port, function () {
 
    console.log('app up on port: ' + port);
 
});
```