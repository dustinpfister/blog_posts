---
title: Playing around with particles with particles.js
date: 2017-12-04 16:42:00
tags: [js,node.js]
layout: post
categories: js
id: 107
updated: 2017-12-04 17:34:31
version: 1.0
---

These days I have been playing around with all kinds of javaScript projects just to get a better feel of all that there is out there that is helpful, or just interesting. In my travels of researching what to write about I have come across something called [particles.js](https://github.com/VincentGarreau/particles.js) on github. This is a fun little toy to play with for a short while if you are looking for something such as that.

<!-- more -->

## Installing, and setting up.

I went with using npm as the way to go about getting started with this.

```
$ mkdir test_particles
$ cd test_particles
$ npm install particles.js
```

I will also need a means to setup a static server to serve up the index.html as this is one of those projects that will not work well fia the file:// protocol. I put togeather this simple sever.js example that worked for me.

```js
/*
 *  server.js
 *
 *   This just provides a simple static server for the project.
 *
 */

var http = require('http'),
fs = require('fs'),
path = require('path'),

port = 8888, // port 8888 for now
root = process.cwd(); // assume current working path is root

// create and start the server
http.createServer(function (req, res) {
 
    // get the path
    var p = path.join(root, req.url);
 
    // get stats of that path
    fs.lstat(p, function (e, stat) {
 
        // if error end
        if (e) {
 
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
 
                // if error end
                if (e) {
 
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
 
}).listen(port);
```

If you have something better in mind go with that, as long as you have a way to sever up the index.html via http.

## The index.html file

Now that I have everything installed, and I have my sever.js file ready to go it's time to throw togetaher a simple index.html file for the project.

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