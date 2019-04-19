---
title: Express.get app method to get app settings, and handle get requests.
date: 2018-06-20 12:54:00
tags: [js,express,node.js]
layout: post
categories: express
id: 212
updated: 2019-04-18 21:14:34
version: 1.6
---

The app.get method in [express.js](https://expressjs.com/) has two uses, one is for getting the value of a local app setting, and the other is to define what to do with http GET requests. So in other words it's behavior is very different depending on the number of arguments that are given to it. If I just want to get the value of a certain app setting I only need to give the key of that setting to receive the corresponding key value. However if I want to do something with get requests I will want to not just give the path or pattern, but one or more functions that will do something with that incoming http get request. So this dual use of app.get works out okay, and as such I do not find it that confusing. So this will be a quick post on the ins and outs of app.get.

<!-- more -->

### 1 - Express get method basics

This is a post on the app.get method in express.js, I will noe be getting into detail with eveything else about express, and node.js in this post. If interested you might want to check out my [main post on express.js](/2018/06/12/express/), if you are new to express.

### 2 - Using app.get to get app settings values

When only giving one value to app.get that value is treated as a key in an object of key value pairs that are various settings for the app. There are many settings there to begin with, and it is also possible to set values with [app.set](/2019/04/18/express-set) to be used in various places in the body of an express.js app.

### 2.1 - Getting the environment value

One value that should be there to begin with is the env setting. This is a setting that is used to find out if the app is in development or production mode.

```js
console.log(app.get('env')); // development
```

### 2.2 - Setting the full list of settings

If you want to know the full list of setting that currently exist in an app, the object of interest is at app.locals.

```js
console.log(app.locals.settings);
```

It would be a good idea to take a look at this to be aware of what is there to begin with, so that you do not write over any values with app.set when setting your own values this way.

### 3 - Using app.set with app.get, to both get and set values.

The app.set method is used with app.get to both set, and get values. This may be preferable than the alternative which would be to have my own conf object, or lengthly list of global variables.

```js
app.set('foo','bar');
console.log( app.get('foo') ); // bar
```

## 4 - Full app.js example of app.get

So for a full working demo of app.get I just quickly put togetaher this simple demo that uses app.get to set a value for a port to listen on when starting the app, and also use app.get to respond to get requests.

### 4.1 - Setup

So for this demo I will just need to create a new folder, and the only dependency I am using is express itself.

```
$ mkdir app-get-demo
$ cd app-get-demo
$ npm init
$ npm install express --save
```

### 4.2 - The app.js file

Once I have my basic demo folder the next step is to have my single app.js file that I will be starting from the command line using node.js. I used app.set to set a value for port, that I then use to start the app listening on that port. I also used app.get to set up a single path for root that will respond to get requests to that path.

```js
let express = require('express'),
 
app = express();
 
// set the port to listen on with app.set
app.set('port', process.argv[2] || process.env.PORT || 8080);
 
// use app.get to get the value of port
console.log(app.get('port'));
 
// the full list of settings is at app.locals
console.log(app.locals.settings.port);
 
// get the value of port with app.get, and also
// set what to do with get requests with app.get
app.get('/', function (req, res) {
 
    res.send('The value of port is: ' + app.get('port'));
 
});
 
// listen on the port set with app.set
app.listen(app.get('port'), function () {
 
    console.log('demo is up on port: ' + app.get('port'));
 
});
```

### 4.3 - Starting the demo

So now when I start the app.js file with node in the command line it will default to a hard coded port value of 8080 by default if there is no environment variable, or argument given.

So If I just start the app like this.

```
$ node app 3000
```

If I want I can then go to localhost:3000 in my browser I will get the intended message.