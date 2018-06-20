---
title: Using app.get in express to get app settings, and handle get requests.
date: 2018-06-20 12:54:00
tags: [js,express,node.js]
layout: post
categories: express
id: 212
updated: 2018-06-20 13:12:00
version: 1.2
---

The app.get method in [express.js](https://expressjs.com/) has two uses, one is for getting the value of a local app setting, and the other is to define what to do with http GET requests. So in other words it's behavior is very different depending on the number of arguments that are given to it. If I just want to get the value of a certain app setting I only need to give the key of that setting to receive the corresponding key value. However if I want to do something with get requests I will want to not just give the path or pattern, but one or more functions that will do something with that incoming http get request. So this dual use of app.get works out okay, and as such I do not find it that confusing. So this will be a quick post on the ins and outs of app.get.

<!-- more -->

## 2 - Full app.js example of app.get

So for a full working demo of app.get I just quickly put togetaher this simple demo that uses app.get to set a value for a port to listen on when starting the app, and also use app.get to respond to get requests.

### 2.1 - Setup

So for this demo I will just need to create a new folder, and the only dependency I am using is express itself.

```
$ mkdir app-get-demo
$ cd app-get-demo
$ npm init
$ npm install express --save
```

### 2.2 - The app.js file

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

### 2.3 - Starting the demo

So now when I start the app.js file with node in the command line it will default to a hard coded port value of 8080 by default if there is no environment variable, or argument given.

So If I just start the app like this.

```
$ node app 3000
```

If I want I can then go to localhost:3000 in my browser I will get the intended message.