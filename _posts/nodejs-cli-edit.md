---
title: A node cli tools text editor project
date: 2019-10-28 19:09:00
tags: [node.js]
layout: post
categories: node.js
id: 551
updated: 2019-10-29 14:29:31
version: 1.6
---

So when it comes to [developing a node cli tool](/2019/10/23/node-cli/) that is a text editor of sorts there are two general ideas that come to mind. One idea is a text editor that is terminal based in which I am using [ansi escape codes](/2019/09/19/nodejs-ansi-escpe-codes) to make a text editor like that of nano or vim. The other idea is a text editor that works in a browser window, and I am using nodejs as a way to serve a client system that is that editor, and also have some back end code that is used to save the file I am working on.

<!-- more -->

## 1 - This is not a getting started post on node cli tools

This post is on a text editor i made for my [node_cli_tools project](https://github.com/dustinpfister/node_cli_tools). The editor that I am writing about here makes use of many resources that are part of the core repository of the project. So it might be a good idea to start with [my post on the node_cli_tools project in general](/2019/10/23/node-cli). If not you might have a hard time trying to reproduce what I am writing about here.

## 2 - The edit/index and edit/command/default script of the nc-edit node cli tool

So in the main root directory of my node_cli_tools project I have a bin folder, and in this bin folder I have the edit folder that composes everything that is my nc-edit command. At the root of the edit folder is an index.js file that is what will be called within the project when i call the nc-edit command in the command line interface. One of the resources that I am uses is called [yargs](/2018/07/24/nodejs-yargs) which is an option parser which is used in the main index.js file, to which I then load one or more commands for the nc-edit command in the commands folder that is also in the edit folder. In this section I will be quickly going over the index.js file and the default.js file in the commands folder.


### 2.1 - edit/index.js and package.json of node_cli_tools

The index.js file is where I am using yargs for option parsing, and I am just loading in one default command for the nc-edit command as of this writing. The logic for the default command is in the default.js file in the command folder, a common folder for all commands in this project.

```js
#!/usr/bin/env node
// main index.js for nc-edit
// using yargs for option parsing sub commands in a ./commands folder
require('yargs')
.command(require('./commands/default.js'))
.argv;
```

This file of course makes use of the nodejs shebang becuase it is the script that will first be called when calling the nc-edit command, and this is for course the entry point that I have defined in the bin key of the package.json file in the root of the node_cli_tools project folder.

```js
  "bin": {
    "nc-init": "bin/init/index.js",
    "nc-walk": "bin/walk/index.js",
    "nc-ssg": "bin/ssg/index.js",
    "nc-edit": "bin/edit/index.js"
  }
```

### 2.2 - /edit/commands/default.js

```js
// default command for nc-edit
let server = require('./server.js'),
path = require('path');
 
exports.command = '*';
exports.aliases = ['d'];
exports.describe = 'default command';
 
exports.builder = {
    // target project folder
    t: {
        default: process.cwd()
    },
    // port to host
    p: {
        default: 8080
    }
};
exports.handler = function (argv) {
    console.log('nc-edit default command:');
    
    server({
        target: argv.t,
        port: argv.p,
        dir_public: path.join(__dirname, 'public'),
        dir_shared_public: path.join(__dirname, '../../../shared/public')
    })
    
};

```


## 3 - the /edit/commands/middleware files

### 3.1 - file-open

```js
// open a file
let express = require('express'),
fs = require('fs'),
path = require('path');
module.exports = (conf) => {
    let router = express.Router();
    router.use(require('body-parser').json());
    router.post('/', (req, res) => {
        fs.readFile(path.join(conf.target, req.body.fileName), 'utf8', (e, text) => {
            if (text) {
                res.json({
                    mess: 'looks like we have some text',
                    text: text,
                    fileName: req.body.fileName
                });
            } else 
                res.json({
                    mess: e.message,
                    text: '',
                    fileName: req.body.fileName
                });
            }
        });
    });
    return router;
};

```

### 3.2 - file-save

```js
// save a file
let express = require('express'),
fs = require('fs'),
path = require('path');
module.exports = (conf) => {
    let router = express.Router();
    router.use(require('body-parser').json());
    router.post('/', (req, res) => {
        fs.writeFile(path.join(conf.target, req.body.fileName), req.body.text, 'utf8', (e) => {
            if (e) {
                res.json({
                    mess: e.message,
                    fail: true,
                    fileName: req.body.fileName
                });
            } else {
                res.json({
                    mess: 'save is good',
                    fail: false,
                    fileName: req.body.fileName
                });
            }
        });
    });
    return router;
};

```

## 4 - the edit/commands/public folder

### 4.1 - index.html

```html
<html>
  <head>
    <title>nc-edit</title>
 
    <style>
    </style>
  </head>
  <body>
    
    <h1>nc-edit</h1>
    <br>
 
    <div id="editor">
    </div>
    
    <script src="/shared/js/vuejs/2.6.10/vue.min.js"></script>
    <script src="/shared/js/vue-resource/1.5.1/vue-resource.min.js"></script>
    <script src="/js/client.js"></script>
  </body>
</html>
```

### 4.2 - client.js

```js
var vue = new Vue({
        // attaching to editor hard coded html element
        el: '#editor',
        // temaple for the vue
        template: '<div>' +
        '<input type=\"text\" v-model=\"fileName\"> ' +
        '<input type=\"button\" value=\"open\" v-on:click=\"open\"> ' +
        '<input type=\"button\" value=\"save\" v-on:click=\"save\"> <br><br>' +
        '<textarea cols=\"80\" rows=\"20\" v-model=\"text\"></textarea>' +
        '</div>',
        // state
        data: {
            fileName: 'untitled.md',
            text: ''
        },
        // methods
        methods: {
            // save a file from text area to target folder
            save: function () {
                console.log('save' + this.$data.fileName);
                this.$http.post('/file-save', {
                    fileName: this.$data.fileName,
                    text: this.$data.text
                })
                .then(function (res) {
                    console.log(res);
                });
            },
            // open a file from target folder of the current fileName
            open: function () {
                console.log('open: ' + this.$data.fileName);
                this.$http.post('/file-open', {
                    fileName: this.$data.fileName
                })
                .then(function (res) {
                    console.log(res);
                    if (res.body.text) {
                        this.$data.text = res.body.text;
                    }
                })
            }
        }
    });

```