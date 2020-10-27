---
title: Chrome app mode to create a window for a nodejs project
date: 2020-10-27 12:21:00
tags: [node.js]
layout: post
categories: node.js
id: 730
updated: 2020-10-27 15:59:23
version: 1.2
---

For this nodejs example I will be using the child process module to lanuch a new instance of chrome that wull be placed in app mode. This will result in a chrome window being opened, but it will not have a navagation bar, or any of the other features of a web browser. It will just be a window with a single page opened up in it.

<!-- more -->

## 1 - setup of this nodejs chrome app mode example

### 1.1 - Just clone it down and run it

```
$ git clone --depth 1 https://github.com/dustinpfister/nodejs-example-chrome-app-mode/tree/0.0.0
$ cd nodejs-example-chrome-app-mode
$ npm install
$ nohup node index 8080 &
```

### 1.2 - reproduce from scratch

```
$ mkdir node-example-chrome-app-mode
$ cd node-example-chrome-app-mode
$ npm init
$ npm install express --save
$ npm install ejs --save
$ mkdir views
$ mkdir public
$ cd public
$ mkdir js
```

## 2 - The main index.js file

```js
#!/usr/bin/env node
// using exec
let exec = require('child_process').exec,
path = require('path');
// getting a post and appURL string
let port = process.argv[2] || 8000,
appURL = 'http://localhost:' + port;
// start express app
let express = require('express'),
app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// public js folder
app.use('/js', express.static('public/js'));
// root / GET requests
app.get('/', (req, res) => {
    res.render('index',{});
});
// root / POST requests
app.use(require('body-parser').json());
app.post('/', (req, res) => {
    console.log('post request');
    console.log(req.body);
    // kill process if action === 'kill'
    if(req.body){
       if(req.body.action === 'kill'){
           process.exit(0);
       }
    }
    res.json({
        mess: 'okay'
    });
});
// start express app on port and start chrome child process
app.listen(port, function () {
    console.log('nodejs express app is up on port: ' + port);
    // start chrome in app mode
    let com = 'chromium-browser --app=' + appURL + ' --new-window --incognito';
    console.log('starting chrome in app mode');
    console.log(com);
    // the chrome child
    let chromeChild = exec(com, {
        cwd: process.cwd()
    });
    chromeChild.stdout.on('data', (data) => {
        console.log(data);
    });
    chromeChild.on('message', (data) => {
        console.log('message');
    });
    // on exit of chrome child kill this process
    chromeChild.on('exit', () => {
        console.log('cromeChild exit');
        //process.exit();
    })
});
```
