---
title: Particles js is a fun little javaScript project
date: 2017-12-04 16:42:00
tags: [js,node.js]
layout: post
categories: js
id: 107
updated: 2019-09-19 08:36:53
version: 1.7
---

These days I have been playing around with all kinds of javaScript projects just to get a better feel of all that there is out there that is helpful, or just interesting. In my travels of researching what to write about I have come across something called [particles.js](https://github.com/VincentGarreau/particles.js) on github which is also available via [npmjs also](https://www.npmjs.com/package/particles.js). There are many other similar projects with similar names, but in this post I am working with this older project.

Particles js is a fun little toy to play with for a short while if you are looking for something alone those lines. I can not think of any piratical use for particles.js really it is just a fun artful thing to do with javaScript just for the sake of fun, which is the main reason why I got into javaScript to begin with.

<!-- more -->

## 1 - particles js basics

The particles js project is a client side javaScript project, but it can still be installed via npm. It is an older project that as of this writing appears to no longer be supported. However just because an older project is not longer supported that does not mean that it no longer works. It also does not mean that there might even be anything wrong with it.

In this post I will not just be giving a simple particles js example, but will also be going over a simple static server script that will work with nodejs also in the process. You do not need to bother with this script assuming that you have another means to host particles js, and the additional code via http.

## 2 - Starting up a node project because of issues with file protocol.

I went with using npm as the way to go about getting started with this project. You do not need to realy bother with node at al if you do not want to, as particals.js is a front end javaScript project. However if you do so you will still want to host what you are making via the http protocol.

```
$ mkdir test_particles
$ cd test_particles
$ npm install particles.js
```

I will also need a means to setup a static server to serve up the index.html as this is one of those projects that will not work well with the file:// protocol. So with that said I put together this simple sever.js example that worked for me.

### 2.1 - The server.js file at the root of the project folder

```js
var http = require('http'),
fs = require('fs'),
path = require('path'),
port = process.argv[2] || 8888, // port 8888
root = path.join(process.cwd(), 'demos'); // assume current working path is root
// create and start the server
http.createServer(function (req, res) {
    // get the path to the request file
    var p = path.join(root, req.url);
    // get stats of that path
    fs.stat(p, function (e, stat) {
        // if error end request
        if (e) {
            res.writeHead(500);
            res.write(e.message);
            res.end();
        }
        // if stats check it out
        if (stat) {
            // if it is not a file append index.html to path, and try that
            if (!stat.isFile()) {
                p = path.join(p, 'index.html')
            }
            // try to read the path
            fs.readFile(p, 'binary', function (e, file) {
                // if error end request
                if (e) {
                    res.writeHead(500);
                    res.write(e.message);
                    res.end();
                }
                // if file, send it out
                if (file) {
                    res.writeHead(200);
                    res.write(file, 'binary');
                    res.end();
                }
            });
        }
    });
}).listen(port, function () {
    console.log('particles.js project is up on port: ' + port);
    console.log('hosting root path at : ' + root);
});
```

If you have something better in mind go with that, as long as you have a way to sever up the index.html via http.

## The index.html file

Now that I have everything installed, and I have my sever.js file ready to go it's time to throw together a simple index.html file for the project.

```html
<div id="the-container"></div>
 
<script src="node_modules/particles.js/particles.js"></script>
 
<script>
 
particlesJS.load('the-container','basic.json', function(){
 
console.log('we be good man.');
 
});
 
</script>
```

This html file just needs to grab the particles.js file, and also a json file that will be used to set up the particles.

## Basic example with basic.json

As you may have gathered the load method will use what is in the given json file to setup particles which will be used in the given container element. as such also in the root path of the project I places my basic.json file that looks like this:

```js
{
 
    "particles": {
 
        "number": {
 
            "value": 10
        },
 
        "color": {
 
            "value": "#00ffff"
        },
 
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 5,
                "color": "#000000"
            }
        },
 
        "opacity": {
 
            "value": 0.3
        }
 
    },
 
    "interactivity": {
 
        "events": {
 
            "onclick": {
 
                "enable": false
 
            }
 
        }
    }
 
}
```

This allows me to define some values for the particles that are going to be displayed. Also for my basic example I decided to disable interactivity.