---
title: Using express-session for session data, and primitive authentication in express.js
date: 2018-06-01 10:00:00
tags: [js,express,node.js]
layout: post
categories: express
id: 200
updated: 2018-06-01 11:45:59
version: 1.2
---

As of late I have been writing some content on [express.js](https://expressjs.com/), and as such it was only a matter of time until I came to a point where it is time to look into how to handle session data, and user authentication. If I want to implement user authentication in a way that I perceive as the right way, I will want to use [passport](/2018/05/31/express-passport/). However so far I often find myself making simple hobby apps, as such I can take a more informal route to handling authentication involving some system that is just assignment of a unique id to each client by way of a cookie file for example. In any case this post is about [express-session](https://www.npmjs.com/package/express-session), a great project for working with session data in an express.js project

<!-- more -->

## Authentication With express-session only?

With authentication in express.js it may be best to go with [passport](/2018/05/31/express-passport/), this is defiantly a professional and versatile way of making quick work of setting up some kind of system that involves user registration and authentication (aka logging in). However if you are just making some simple little hobby app there might be a desire to have some kind of primitive yet effective way of doing this.

Express session involves the use of cookies, and it is possible to have the cookies not expire resulting in a persistent way of setting a unique id to each visitor to the app. The id set in the cookie could be used as a replacement for a user login, and password. Yes there are many draw backs to this, but I see simple games, and projects using this kind of system, and it works for what it is worth.

## Basic example of express-session

For a basic example of express session I made a demo that is just a single app.js file that makes use of just express, and express-session modules. The options that I give to express-session are the minimal set of options that I would want to give to any use case of express-session regardless of how simple it might be.

So for this demo I just need express-and express-session:

```
$ mkdir express-session-demo
$ cd express-session-demo
$ npm int
$ npm install express@4.16.3 --save
$ npm install express-session@1.15.6 --save
```

Once I have my demo folder set up with the package.json, and the dependences installed in the node_modules folder I just need a single app.js file at root.

```js
let express = require('express'),
port = process.env.PORT || process.argv[2] || 8080,
app = express();
 
// using express-session
app.use(require('express-session')({
 
        name: '_es_demo', // The name of the cookie
        secret: '1234', // The secret is required, and is used for signing cookies
        resave: false, // Force save of session for each request.
        saveUninitialized: false // Save a session that is new, but has not been modified
 
    }));
 
// single path for root
app.get('/', function (req, res) {
 
    // simple count for the session
    if (!req.session.count) {
        req.session.count = 0;
    }
    req.session.count += 1;
 
    // respond with the session object
    res.json(req.session);
 
});
 
// start the server
app.listen(port, function () {
 
    console.log('express-session demo is up on port: ' + port);
 
});
```

I can then start the app, and go to localhost:8080 in the browser by calling app.js with node.

```
node app.js
```

When I do so I should see what is in the session data object including my simple count value that will go up each time I refresh the page.

For a basic example the simple count should work at helping to show the value of express-session. It can be used to create, and update session data server side. Although The count is set back to the client via res.json, it does not have to be sent. When it comes to something that should stay server side it can, the cookie session id is the only thing that really needs to be shared.