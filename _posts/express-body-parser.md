---
title: The express.js body parser module, and basic full stack development.
date: 2018-05-27 08:51:00
tags: [js,express,node.js]
layout: post
categories: express
id: 196
updated: 2018-11-26 17:34:13
version: 1.26
---

Being able to parse a payload given to a node.js back end typically via a post request is a very common task when doing something with [express.js](https://expressjs.com/). As such there is a built in way to quickly do this thanks to the [body-parser](https://www.npmjs.com/package/body-parser) module that is included with every express.js install. In order to get into body parsing it is necessary to put together at least a basic full stack application. So in this post I will be giving a an example that will include both front and back end code. However this is a post mainly on req.body, and how to parse that using the body parser module so I will be mostly covering that.

<!-- more -->

## Before you continue reading

This is a post on the use of the body-parser module that is used in express.js to parse incoming payloads from requests made from a front end system in a full stack node.js web application. In this post I am also using routers, and ejs for rendering templates. You will want to have at least a basic working knowledge of javaScript, and node.js. Full stack development is a little complicated, even when you are trying to simplify it.

## A word about version numbers

I have been trying to make it a habit to mention what version of a javaScript project I am using clear in my posts on such things. There are many reasons why this is a good idea beyond just the usual date published, and date last updated. In this post I am using express 4.16.3, and ejs 2.6.1.

## A Simple Body parser example

First off how about a very simple example of using body-parser. In this example I will just be serving up a very simple client system using res.send to send a string that is just a single script tag. In this script tag I am using xmlHttpRequest to send a post request back to the sever that is just a single object serialized with JSON.stringify. I then use the json body parser to parse this json that was sent from the client into a workable object. I can then do something with that object, and send it back.

```js
let express = require('express'),
path = require('path'),
app = express(),
 
// getting port this way
port = process.env.PORT || process.argv[2] || 8080;
 
// using the JSON body parser
app.use(require('body-parser').json());
 
// what to do for get requests to root
app.get('/', function (req, res) {
 
    // sending a crude yet effective client system
    res.send('<script>' +
        'var xhr = new XMLHttpRequest();' +
        'xhr.open(\'POST\', \'/\', true);' +
        'xhr.onreadystatechange = function(){console.log(this.response)};' +
        'xhr.setRequestHeader(\'Content-type\', \'application/json\');' +
        'xhr.send(JSON.stringify({foo:\'bar\',n:40}));</script>');
 
});
 
// what to do for post requests to root
app.post('/', function (req, res) {
 
    // body parser works, I have the object sent
    //from the client system
    console.log(req.body); // {foo:'bar',n:40}
 
    // I can do something with it and send a response
    req.body.n += 2;
    res.json(req.body);
 
})
 
app.listen(port, function () {
    console.log('body-parser demo is up on port: ' + port);
});
```

## An express.js Body Parser example

In this example I will of course be using express.js as a node.js back end framework, but I will also be installing ejs as a rendering engine, in terms of npm packages that is all that I installed in my demo folder. Everything else I used in this demo is just my own vanilla code. In a more advanced project I might be using additional javaScript projects like angular, and mongoose, but I do not want to take the focus away from express.js, and body-parser at least not in this post.


```
$ mkdir body-parser
$ cd body-parser
$ npm init
$ npm install express@4.16.3
$ npm install ejs@2.6.1
$ mkdir public
$ mkdir routes
$ mkdir views
```

## The routes folder

It has become standard practice to always have a routes folder in which I am using routers to help better manage paths when making an express application. In this demo I am using a separate javaScript file for both json and text paths that will serve as two separate examples of using the body parser to parse json, and plain old text given from the client system. 

In addition to this I also have a staic.js file in which I define my static paths for the sake of hosting certain static assets. In this demo it is just a js folder that holds the javaScript files that compose my front end code.

If you want to learn more about using routers in express.js you might want to [check out my post on express.js routers](/2018/05/22/express-routers/). It is a great way of keeping things more organized when it comes to defining the paths that compose your application.

### Hosting my front end javaScript files with /routes/static.js

The static routes file is where I define my plain old static paths, with this demo I am just adding a static js folder in the public folder at the root of the project file system. Inside this js folder is where I will place javaScript files that will compose my simple crude client system for the sake of this demo. More on the front end code later.

```js
let express = require('express');
 
// the router
router = module.exports = express.Router();
 
// a static js path in public
router.use('/js', express.static('public/js'));
```

If you wish to lean more about setting up static paths used express.js, I have [a post on express.static](/2018/05/24/express-static/) that you might want to check out.


### The body-parser json demo at /routes/json.js

In the routes folder I have a json.js file that will serve as an example of using the body parser to parse json given from a client system via a post request. This file will be used in my main app.js file at the root of the project folder to create a json path by mounting what I am doing inside this file to a json path there in app.js.

```js
let express = require('express'),
bodyParser = require('body-parser'),
 
// the router
router = module.exports = express.Router();
 
// using body parser for req.body
router.use(bodyParser.json());
 
router.get('/', function (req, res) {
 
    res.render('index', {
 
        layout: 'json'
 
    });
 
});
 
// post request
router.post('/', function (req, res) {
 
    var data = {
        mess: 'yes this is dog.',
        body: req.body
    };
 
    if (req.body.action) {
 
        if (req.body.action === 'foo') {
 
            data.mess = 'bar';
 
        }
 
    }
 
    res.json(data);
 
});
```

### The plain text demo of body-parser at /routes/text.js

This is what will be used to define my text path in the main app.js. It is very similar to my json.js file only I am using the body-parser to parse incoming posts that are just plain text, rather than json.

```js
let express = require('express'),
bodyParser = require('body-parser'),
 
// the router
router = module.exports = express.Router();
 
// using body parser for req.body
router.use(bodyParser.text());
 
router.get('/', function (req, res) {
 
    res.render('index', {
 
        layout: 'text'
 
    });
 
});
 
// post request
router.post('/', function (req, res) {
 
    var data = {
        mess: 'yes this is dog.',
        body: req.body
    };
 
    res.send('The parsed body is: '+req.body);
 
});
```

## The main app.js of this demo at /app.js

Here in the main app.js file that I can start with node in the command line is where I will add in what I am doing in the routes folders. I am assigning the paths that I have defined in each javaScript file to a path off from root using app.use. So in other words the "/" path in the json.js javaScript file becomes "/json" when using it with app.use in app.js.

```js
let express = require('express'),
path = require('path'),
app = express(),

// getting port this way
port = process.env.PORT || process.argv[2] || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// using what is in the routes folder
app.use('/', require('./routes/static'));
app.use('/json', require('./routes/json'));
app.use('/text', require('./routes/text'));
 
app.get('/', function (req, res) {
 
    res.render('index', {});
 
});
 
app.listen(port, function () {
 
    console.log('request object demo is up on port: ' + port);
 
});
```

## The public folder

The public folder is the standard name that I give for a folder in the root name space of an express project where static assets are to be stored, and served up one way or another with express.static. In this demo I just had a js folder that is used to store all my front end javaScript files, in a more advanced project this folder would contain additional folders and assets for things like css, and image files.

### My vanilla js http client at /public/js/http.js

In my http.js file I have my own http client that I use as my own vanilla js solution for scripting http. In a more advanced project where the focus is not just on body parsing in express.js I might choose to use [axios](/2018/01/10/nodejs-axios/), or $http in angular.js if making a [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle) application.

```js
// my http method
var http = function (argu, done, fail) {
 
    var xhr = new XMLHttpRequest();
 
    // if first argument is a string, assume it is a url for a get request
    if (typeof argu === 'string') {
 
        argu = {
            url: argu
        }
 
    }
 
    // use given argu object or default to an empty object
    argu = argu || {};
 
    // default method is GET, payload is null, and URL is location.href
    argu.method = argu.method || 'GET';
    argu.playload = argu.payload === undefined ? null : argu.payload;
    argu.url = argu.url || location.href;
 
    // default done and fail callbacks
    argu.done = done || argu.done || function (res) { console.log(res);};
    argu.fail = fail || argu.fail || function () {};
 
    // given, or default beforeSend method
    argu.beforeSend = argu.beforeSend || function (xhr, next) {
 
        // if POST request, assume JSON
        if (argu.method.toUpperCase() === 'POST') {
 
            xhr.setRequestHeader('Content-type', 'application/json');
 
            // custom send that uses JSON
            argu.send = function (xhr,argu) {
 
                xhr.send(JSON.stringify(argu.payload));
 
            };
 
        }
 
        next();
    };
 
    // given or default send method
    argu.send = argu.send || function (xhr,argu) {
 
        // just send
        xhr.send(argu.payload);
 
    };
 
    // open the request
    xhr.open(argu.method, argu.url, true);
 
    // setup on ready state method to call done or fail methods
    xhr.onreadystatechange = function () {
 
        if (this.readyState === 4) {
 
            if (this.status === 200) {
 
                argu.done.call(this, this.response);
 
            } else {
 
                argu.fail.call(this);
 
            }
 
        }
 
    };
 
    // call before send, and send request
    argu.beforeSend(xhr, function () {
 
        argu.send(xhr,argu);
 
    });
 
};
```

This solution is what I ended up with when just directly working with the tired yet true XMLHttpRequest for scripting http. This is not something that I would use in production code, for that it may be best to stick to something more professional. I have writing posts on [XMLHttpRequest](/2018/03/28/js-xmlhttprequest/), [axios](/2018/01/10/nodejs-axios/), and [fetch](/2018/03/27/js-fetch/). In angular.js there is also of course the $http service as well, choose your solutions for scripting http accordingly depending on the project.

### Wraping document.getElementById at /public/js/getid.js

I also parked a simple function that wraps document.getElementById in a file called getid.js. It has been a practice that I have been doing for ages when doing anything vanilla js style. It may be more appropriate to place it elsewhere, but I decided to just park it there. In a more advanced project I might use some other means of gaining references to DOM elements, with many font end frameworks there are many ways of keeping these calls more concise compared to typing document.getElementById over and over again.

```js
// just wrapping document.getElementById
var getId = function (id) {
 
    return document.getElementById(id);
 
};
```

This is a total coding style thing thats about it.

### The client code that will send json at /public/js/body-json.js

This is the client script that I use in conjunction with my /json path defined in my json.js file that I am using in my routes folder. I am using my getId method which is just a method that wraps document.getElementById to gain a reference to an input element in my ejs templates, and add an event hadler to it that uses my http method to make a post request to the json path.

```js
getId('app_send').addEventListener('click', function (e) {
 
    http({
        url: '/json',
        method: 'POST',
        payload: {
 
            action: 'foo'
 
        }
    }, function (res) {
 
        getId('app_out').value += res + '\n\n';
 
    });
 
});
```

This post is about express.js body parser so I want to keep this simple. So just having a front end that makes a simple post request to a path will work for the sake of the scope of this post.

### The client code that will send plain text at /public/js/body-text.js

Another script that makes a post request to one of my express.js powered back end scripts. This one just makes a plain text post rather than a json post. If you look at my http method you will see that by default the built in beforeSend method will convert what I give via the payload property to json. If for some reason I want to do something different than that I can do so by overwriting the beforeSend method with a method that sets the proper headers for what I want to send.

```js
getId('app_send').addEventListener('click', function (e) {
 
    http({
        url: '/text',
        method: 'POST',
        payload: 'foo',
        beforeSend: function (xhr, next) {
 
            xhr.setRequestHeader('Content-type', 'text/plain');
            next();
 
        }
    }, function (res) {
 
        getId('app_out').value += res + '\n\n';
 
    });
 
});
```

In most cases JSON will work just fine, I just wanted to have some additional front end code that exercises other aspects of the express body parser.

## The views folder

In this demo I am using a views folder for ejs templates. I often prefer to use ejs in place of just simple static html in the public folder.

With ejs it is possible to define partials that define reusable parts of html that can be used in more than one page. Rather than repeating navigation markup for each page, I can just define it once, and then inject that part into any additional page that is to use that markup. This helps to keep my html examples concise in these demos.

### Navigation ejs part at /views/_parts/nav.ejs

This is the only ejs partial I have made for this demo which is the navigation page.

```
<div class="wrap_nav">
 
   <span>
   
       <a href="/">HOME</a>
       <a href="/json">JSON</a>
       <a href="/text">TEXT</a>
   
   </span>
 
</div>
```

### layout files at /views/_layouts/home.ejs, json.ejs, and text.ejs

These are the layouts for home, as well as the json, and text demos. The json and text layouts are almost the same aside from the fact that they grab different front end code in the static js folder mentioned before hand.

/views/_layouts/home.ejs:
```
<h2>Home</h2>
<p>These are some express.js body parser demos.</p>
```

/views/_layouts/json.ejs:
```
<h2>JSON</h2>
 
<input id="app_send" type="button" value="post"><br>
<textarea id="app_out" rows="20" cols="60"></textarea>
 
<script src="/js/body-json.js"></script>
```

/views/_layouts/text.ejs:
```
<h2>text</h2>
 
<input id="app_send" type="button" value="post"><br>
<textarea id="app_out" rows="20" cols="60"></textarea>
 
<script src="/js/body-text.js"></script>
```

These layouts are used inside my index.ejs file, and which one that is used depends on which path I navigate to. If you look at my routes files mentioned above I also define what is to be done with get requests in the route files on top of just using body parser with post requests. In these get request handlers I am using res.render to render index.ejs, and am passing a layout property that is used to render the proper layout.

### The main index ejs file at /views/index.ejs

This is my main index.ejs file that is always used when rendering a page when responding to a get request. The layout of the page changes depending on the path because of the different get request handers passing different layout properties.

```
<%
 
   if(!this.layout){
   
       this.layout = 'home';
   
   }
 
%>
 
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Request Objects</title>
        <meta charset="utf-8">
    </head>
    <body>
 
        <%= layout %>
        <%- include('_parts/nav') %>
 
        <script src="/js/getid.js"></script>
        <script src="/js/http.js"></script>
 
        <%- include('_layouts/' + layout) %>
 
    </body>
</html>
```

## Conclusion

In this post I gave some simple examples of using the express.js body parser to parse incoming data from front end javaScript code. In order to have a working example of body parser I need to have at least some kind of front end system in order to send a payload to a backed to to parsed into reg.body. As such in this post I briefly touched base on many other areas that have to do with full stack development.

In the future if I update this post it will be to expand on the content that has to do with the body parser module itself, and maybe try to provide a more basic example of using body parser if possible, maybe with a simple static view.

This post covers the basics of what can become a serious full stack web application using node.js and express.js as a server side framework. In a serious project I would lose my vanilla js code, and use additional popular, well supported alternatives in place of it.

If you enjoyed this post you might want to check out some of my other posts on [express.js](/categories/express/)