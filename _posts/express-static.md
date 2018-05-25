---
title: Serving static files with express.js
date: 2018-05-24 15:26:00
tags: [js,express,node.js]
layout: post
categories: express
id: 193
updated: 2018-05-25 10:00:48
version: 1.2
---

In this post I will be writing about serving static files in a node.js environment using [express.js](https://expressjs.com/). The process is pretty straight forward using an express.js built in middleware for doing so ([express.static](https://expressjs.com/en/4x/api.html#express.static)). There are some additional options of interest as well thought so lets take a look.

<!-- more -->


## A Basic static server example with express.js

For a basic example of using express.js to make a static server I made a project folder, and inside that project folder I will want a public folder with some simple hand coded assets in it. In a more advanced real word example you might use some kind of static site generator such as hexo to generate this structure.

```
$ mkdir express_static
$ cd express_static
$ npm init
$ npm install express@4.16.3 --save
$ mkdir public
```

For this demo I only need express installed. In this demo I am using 4.16.3, but if no major code breaking changes happen in the future, you should be able to use the latest version by dropping the @4.16.3

### The public folder

#### index.html

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

#### style.css

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

##### /img/happy_kitty, and /js/foo.js

### The app.js file

At the root level I will of course want my app.js file that I will start with node directly or via one of the options in package.json that are started with npm. This will just create a new instance of express, and then use express.static to set the path in the project folder where static assets are.
 
```js
let express = require('express'),
path = require('path'),
app = express(),
 
// getting port this way
port = process.env.PORT || process.argv[2] || 8080;
 
// using app.use to use static files in my public 
// folder for the root level of the site
app.use('/', express.static('public'));
 
app.listen(port, function () {
 
    console.log('app up on port: ' + port);
 
});
```

Once this is done I can start the static server.

```
$ node app.js
```

This will result in the public folder being the root name space of the site. So when I go to http://localhost:8080/ in my browser index.html should be what shows up.