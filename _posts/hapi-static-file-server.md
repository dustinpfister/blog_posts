---
title: Setting up a static file server with hapi.
date: 2017-10-01 15:30:00
tags: [js,node.js,hapi]
layout: post
categories: hapi
id: 50
updated: 2017-12-13 13:38:19
version: 1.2
---

So now that I have got the [simple hello world project](/2017/09/28/hapi-getting-started/) down with hapi, it is time to find out how to make a simple static file server with hapi. This should not be to hard, so lets get it out of the way so I can move on to the real cool stuff.

<!-- more -->

## Getting started

So basically its the same setup process as the hello world project, but now I am going to be installing one plug-in for hapi called [inert](https://www.npmjs.com/package/inert)

So I would start by making a new project folder and do the usual deal when starting a new node project with npm init, to get a package.json file. Then install hapi, and the inert plugin-in.

```
$ npm init
$ npm install hapi --save
$ npm install inert --save
```

So then his will also be a quick intro on how to get stared with plug-ins in hapi also, although I will not get into detail with that here.


## The server.js file

I will want to write an index.js, or server.js file in the root of the project that is what will be called to start the server. I usually go with server.js, the code of the file looks like this:

```js
var Hapi = require('hapi');
 
// create a new instance of hapi server
var server = new Hapi.Server();
 
// port 3000, and I will be using localhost
// when running I will connect via http://localhost:3000
server.connection({
    port : 3000,
    host : 'localhost'
});
 
// register plug ins
server.register(
 
    // I could just have the one object, but yes
    // I can also pass an array of objects for each plugin I
    // am using
    [
 
        // inert plug in
        {
            register : require('inert')
 
        }
    ],
 
    // callback
    function (err) {
 
        if (err) {
            throw err;
        }
 
        // set a route
        server.route({
            method : 'GET',
            path : '/{param*}',
            handler : {
 
                directory : {
                    path : 'public'
                }
 
            }
        });
 
    }
 
);
 
// start the server
server.start(function () {
 
    console.log('hapi server up: ');
 
});
```

Server.register is what to use to go about doing something with a plugin in hapi, I could pass inert some options, but for now I just want to get going.

I could also set it up to serve just a single file rather than the whole public folder, but generally this is all I need it to do, and I can expand from here if needed.

So in this server.js file when I start it with node in will serve up a static collection of files that I have in the public folder.

## The public folder

The public folder can be any kind of static collection of html, css, images, and js files structured in whatever way works for me. Sense this is a post in which things are just about getting started rather than a certain front end technology to use, the public folder can just contain a simple index.html file that just looks like this:

```html
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>hapi!</title>

</head>

<body>
  <p>Static sites with hapi are fun!</p>
</body>
</html>
```

## Starting the server

Once everything is set up it is then just a questing of cding to the root name space of the project and starting the server.js file in the command line.

```
$ node server
```

Then just go to localhost:3000 in my browser, and I am ready to move forward with things.

## Conclusion

Setting up this kind of project is important when it comes to testing out new front end projects. For example I am starting with this kind of project to host a whole bunch of [phaser]() demos that I am working on.

When it comes to making an actual website I may or may not take this approach. When it comes to static site generators I am using hexo, and for full featured Content Management Systems I have my eyes in keystone.

Thats it for now, Happy coding.