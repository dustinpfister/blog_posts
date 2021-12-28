---
title: Express static serving static files with express.js
date: 2018-05-24 15:26:00
tags: [js,express,node.js]
layout: post
categories: express
id: 193
updated: 2021-12-28 09:30:41
version: 1.12
---

In this post I will be writing about serving static files in a node.js environment using [express.js](https://expressjs.com/). The process is pretty straight forward using an express.js built in middleware for doing so ([express.static](https://expressjs.com/en/4x/api.html#express.static)). The express static middleware can be used in conjunction with or as a replacement for a [view engine](/2019/04/25/express-view). There are some additional options of interest as well thought so lets take a look.

<!-- more -->

## - 1 Express static, and what to know before you begin

This is a post on setting up a static server in express.js. It is not a getting started post on express.js I have another post on that [here](/2018/05/21/express-getting-started). It is also not a getting started post on javaScript in general, as well as setting up a node.js environment. I assume that you have a basic working knowledge of what is required to progress with serving static files in an express.js project, and are here to resolve some more specific issue.

I try to make it a habit to always mention what version of a framework, library, ect I am using especially if it is something advanced like express.js, as such in this post I am using express 4.16.3

## 1.1 - Getting started with a static file server with just nodejs alone

This is a post on express, but if you want to work out a pure node static javaScript only solution using just the nodejs build in modules like http and path then I have [wrote a post on using the node http module to set up a static server](/2017/12/04/nodejs-simple-static-sever-file/). The process of doing so is a lot more involve I find, and it opens up all kinds of cans of worms. There is a lot to say about express and why it is a great choice for a server side frame work though, setting up a static server with express is a breeze and then there is getting into middleware design that will take much longer with just native javaScript.

## 2 - A Basic express static server example

For a basic example of using the express static middleware to make a static server I made a project folder, and inside that project folder I will want a public folder with some simple hand coded assets in it. In a more advanced real word example you might use some kind of static site generator such as hexo to generate this structure.

```
$ mkdir express_static
$ cd express_static
$ npm init
$ npm install express@4.16.3 --save
$ mkdir public
```

For this demo I only need express installed. In this demo I am using 4.16.3, but if no major code breaking changes happen in the future, you should be able to use the latest version by dropping the @4.16.3

### 2.1 - The public folder

The public folder is something that will be needed of course in order to use the express static middleware as there needs to be sttaic assets to serve. In this subsection I will be going over the public folder that is used in this example that will serve an index.html file along with some additional assets.

#### 2.1.1 - index.html

So one of the most important assets to have in a public folder is the index.html file that is placed at public/index.html. It can be called something else using the index property when giving an options object to express.static, but for this basic demo I will just follow the norm. Also if nor some reason I do not want a static index a value of false can be set to the index property.

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

#### 2.1.2 - style.css

One of the assets that will also compose my public folder is an external css file, just to have another asset in there other than just an index.html file, and haveing any style coded in page.

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

##### 2.1.3 - /img/happy_kitty, and /js/foo.js

I also placed some additional assets that I then used in my index.html, and also to showcase that different file types can quickly and easy be used when using express.js. The foo.js file just logs foo to the console, and the happy_kitty.png file can be any image you might like when making your own demo.

### 2.2 - The app.js file

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

## 3 - Options

So I think I should cover some of the options that can be passed to express.static

### 3.1 - file name extensions

The extensions array can be used to set some filename extensions in the event that a file is not found.

```js
app.use('/', express.static('public',{extensions: ['htm', 'html']}));
```

When I do this going to localhost:8080/index is the same as localhost:8080/index.html

### 3.2 - Custom index

By default it is expected that a file called index.html will exist at the root of the public name space. If for some reason you want a file to be called something else, or have the behavior of the root path change to something different, then the index property is what you want.

```js
app.use('/', express.static('public',{index:'other.html'}));
```

This will use a page called other.html in place of the usual index.html which is the default that is often used. in addition to setting a single string it is possible to also give an array of strings.

```
app.use('/', express.static('public',{index:['home.html', 'index.html','other.html']}));
```

When this is done a file called home.html will be looked for first, in the event that is not found index.html will be used, and if for some reason that is not there other.html will be used. So in other words the index value of the array will set priority for that files superseded others when looking for a file to serve as an index.

Also if for some reason you want to disable this, and maybe do something else to generate an index server side for example it can be disabled by setting it to false.

```js
app.use('/', express.static('public',{index:false}));
app.get('/', function(req,res){
 
    res.send('foo');
 
});
```

When this is done I will not get any static file but the generated message 'foo' when going to localhost:8080/ in the browser, however I can still get to the static index I just have go directly to localhost:8080/index.html.

## 4 - Conclusion

I did not cover everything when it comes to the options that can be given to express.static, in part that it because some of the options look like they might warrant a whole separate post apart from this one. So far I think that I like just working with express.js when it comes to making some kind of full stack application, although I have a [similar post on this using hapi](/2017/10/01/hapi-static-file-server/), and also there is doing this vanilla js style, by just working with the built in node.js [http module](/2018/02/06/nodejs-http/). 

If you enjoyed this post you might want to check out my [main post on express](/2018/06/12/express/) in general..