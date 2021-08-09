---
title: Particles js is a fun little javaScript project
date: 2017-12-04 16:42:00
tags: [js,node.js]
layout: post
categories: js
id: 107
updated: 2021-08-09 16:14:51
version: 1.18
---

These days I have been playing around with all kinds of javaScript projects just to get a better feel of all that there is out there to work with in the javaScript and nodejs world. There is much that is helpful when it comes to making quick work of something like parsing mark down to html for example, however there are many projects that are just interesting for one reason or another. 

In my travels of researching what to write about I have come across something called [particles.js](https://github.com/VincentGarreau/particles.js) on github which is also available via [npmjs also](https://www.npmjs.com/package/particles.js) like many such projects. There are many other similar projects with similar names, but in this post I am working with this older project that has to do with a collection of objects that are often called particles.

Particles js is a fun little toy to play with for a short while if you are looking for something along those lines. I can not think of any piratical use for particles.js really it is just a fun artful thing to do with javaScript just for the sake of fun, which is the main reason why I got into javaScript to begin with. It is also not so hard to make ones own particles.js module also, and when it comes that that I have my canvas example post on an [object pool example](/2020/07/20/canvas-example-object-pool/) that is something similar to this module. However in this post I will be focusing mostly on using this particles module.

<!-- more -->

## 1 - particles js basics

The particles js project is a client side javaScript project, but it can still be installed via npm. It is an older project that as of this writing appears to no longer be supported. However just because an older project is not longer supported that does not mean that it no longer works. It also does not mean that there might even be anything wrong with it.

In this post I will not just be giving a simple particles js example, but will also be going over a simple static server script that will work with nodejs also in the process. You do not need to bother with this script assuming that you have another means to host particles js, and the additional code via http.

## 2 - Starting up a node project because of issues with file protocol.

So even though particles js is a client side javaScipt project it can still be installed via npm. I ended up creating a demo folder in the root of the project folder and that is where I places particles.js though. So I coped and pasted it from the node_modules folder in other words. If you want you can grab a copy of particles js from the github folder, or check out my [test_particles](https://github.com/dustinpfister/test_particles) github folder that goes with this post.

```
$ mkdir test_particles
$ cd test_particles
$ npm install particles.js
```

I will also need a means to setup a static server to serve up the index.html as this is one of those projects that will not work well with the file:// protocol. So with that said I put together this simple sever.js example that worked for me.

### 2.1 - The server.js file at the root of the project folder

here is the server.js file that I worked out for this project. A file like this is something that I keep reinventing now and then when it comes to some of these projects when it comes to just using nodejs by itself. If interested a better alternative might be to just use [express static](/2018/05/24/express-static/). This will make things a little more complicated as I am now depending on more than just node, but once express is part of the project it is very easy to just set up a static web sever to host files via http.

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

## 3 - The demos folder


So in the root of the project folder I have made a demos folder that will be the folder that will be hosted. In this folder I have an index.html file that will load particles.js that I have in a js folder of this demos folder. I also have a basic.json file that contains the basic stats that are to be used with paricles js.

### 3.1 - The index.html file

Now that I have everything set up with demos folder, and I have my sever.js file ready to go it's time to throw together a simple index.html file for the project.

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

### 3.2 - Basic example with basic.json

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

## 4 - Conclusion

So particles js is a fun little project to play around with, but there is not much to it really just a way to have a bunch of particles floating around. However it is not to hard to just go about writing my own module when it comes to doing this sort of thing, and often I find myself doing just that. It seems like making modules that are ways of just creating arrays of objects that move around my one way or another is just one of those artful things to do with code that just comes up naturally.

With that being said I have made several [canvas example](/2020/03/23/canvas-example/) that have to do with what I have also come to call particles. One example has to do with a kind of [binary particle](/2020/03/18/canvas-example-particles-binary/) thing where there are two kinds of particles and when they come together they end up causing an explosion. Another [canvas particles example has to do with one type of particle that attacks and destroys other particles](/2020/04/13/canvas-example-particles-search-destroy-and-spawn/) in the area. In time I am sure that I will make even more canvas examples like this, so I will see about expanding this post farther as I make even more of them.

I am not sure that this sort if thing should always be done by just using someone else's code, there is getting started by looking at what al other peoples code examples of course. However in the log run making your own particles.js module might be called for, and also it is something that should maybe me made on a per project basis, or have some kind of plug in system. They reason why I say that is because it is not just a question of using a particles.js module, but what it is that you can add to a module such as this to make something interesting.