---
title: Chrome app mode to create a window for a nodejs project
date: 2020-10-27 12:21:00
tags: [node.js]
layout: post
categories: node.js
id: 730
updated: 2021-03-16 15:51:08
version: 1.17
---

For this [nodejs example](/2021/03/16/nodejs-example/) I will be using the child process module to launch a new instance of chrome that will be [started in app mode](https://superuser.com/a/1421401). This will result in a chrome window being opened, but it will not have a navigation bar, or any of the other features of a web browser. It will just be a window with a single page opened up in it.

This example will be kept fairly simple and sever as a possible starting point for other projects that might actually do something. This example when up and running will just result in a browser window starting in app mode, and once that browser window is close the [window onload event](/2020/06/02/js-onunload/) will fire sending a post request back to the server that started it causes the process to exit. Nothing much, but I just wanted to get together a basic starting point for this kind of nodejs application, and with that said I guess that is what this is.

<!-- more -->

## 1 - setup of this nodejs chrome app mode example

There are two general ways of getting started with this node example. One would be to just clone it down, install the packages that it uses, and then just run the index.js file with node. This would be the best way to go about just getting up and ruining with this, and start hacking over the code to make it into an actually project of some kind. The other way would be to create a new node project from scratch, and copy and past the files in making edits as you go.

### 1.1 - Just clone it down and run it

To get this up and running right away with this, just [clone down the repo on my github](https://github.com/dustinpfister/nodejs-example-chrome-app-mode/tree/0.0.0), and do an npm install to get the node modules for the example installed. Once that is all set and down then the main index.html file is what will need to be started in order to get the example up and running.

```
$ git clone --depth 1 https://github.com/dustinpfister/nodejs-example-chrome-app-mode/tree/0.0.0
$ cd nodejs-example-chrome-app-mode
$ npm install
$ nohup node index 8080 &
```

### 1.2 - reproduce from scratch

The other alternative is to start a new nodejs project from the ground up, and just start to copy things over. This just might only be a good idea if you do not yet know how to go about making a new node project from the beginning.

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

In any case this example is just a starting point for this kind of nodejs project. When things are up and running you will just get a browser window pop up. Once you close the browser window the nodejs process will be closed also. The only thing about this that is of interest really is that the browser window will be started in app mode.

## 2 - The main index.js file

In this section I will be going over the main index.js file in detail. The main thing of interest here is that I am using express to set up a basic server that will respond to get and post requests. Once the sever is up and running the script will also use the child process module in nodejs to start chromium in app mode making the url to the root path of the server the single page that will open in the browser window.

So at the very top off the file I am using the [nodejs shebang](https://dustinpfister.github.io/2017/03/26/linux_shebang/) to make this index file executable. I often just run the script by calling node and then passing the name of this script, however this allows for me to just run the script directly in a Linux system. Simply put the shebang is to just simply let bash know what binary it needs to use in order to run this script which is of course nodejs.

I am the requiring in the [node exec method](/2020/10/21/nodejs-child-process-exec) that will be used to call chrome. This will be used later in the index.js file once the sever is started up using express. Speaking of express in this example I am making use of the [ejs rendering engine for creating a view sever side in express](/2018/05/25/express-rendering-with-ejs/), I am using [express static](/2018/05/24/express-static/) to sever up a static path for front end javaScript files, and I am also using the [body parser](/2018/05/27/express-body-parser/) to help with incoming post requests.


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

## 3 - The public folder

There is a public folder that is intended to be used for any and all static assets that are to be used as part of the client system for this example. For now as of this writing at least there is just a http client, and a script that will cause the sever to stop when the onload event happens. In the event that I fork this the number of assets in this folder will of course likely expand beyond this.

In the main index.js file I am using the express static method to make the js folder in this public folder work as the js path for the client system. Any front end javaScript that should be part of the client system for an project that is made from this point should be placed there.

### 3.1 - /public/js/axios/0.21.0/axios.min.js

For the simple yet function client system of this nodejs example I am using [axios](/2018/01/10/nodejs-axios/) for the http client. I will not be getting into axios in detail here, but if you want the source code for axios it can be found in the [axios repo on github](https://github.com/axios/axios/tree/v0.21.0/dist) just like many other usful projects.

### 3.2 - /public/js/kill-process.js

Here I have the script that is made part of the main index of the client system. It has just once function and that is to send a post request that will cause the sever to exit when the window onload event fires.

```js
// kill process when window is closed
window.addEventListener('unload', function(){
   axios.post('/', {
    action: 'kill'
  });
});
```

## 4 - The views folder

As I have mentioned I am using ejs for sever side rendering, so there is a views folder. Here for this example I just have a single index.ejs file that will render the view for this nodejs example.

```
<html>
<head>
  <title>Chrome App</title>
</head>
<body>
  <h1>Basic Chrome App with nodejs and express</h1>
  <script src="/js/axios/0.21.0/axios.min.js"></script>
  <script src="/js/kill-process.js"></script>
</body>
</html>
```

## 5 - Conclusion

So this is just a basic example of a nodejs project that make use of chrome in app mode. There might be a little more work to do with this project in order to make it a little cleaner, and stable, but the basic idea that I had in might is working okay for me at least.

All I wanted is to find out if I can use chrome as a way to start making projects that look and work just like traditional desktop software, and it would seem that there are indeed some options that can be used to do just that.