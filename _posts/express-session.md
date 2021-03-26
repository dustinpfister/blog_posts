---
title: Using express-session for session data in express.js
date: 2018-06-01 10:00:00
tags: [js,express,node.js]
layout: post
categories: express
id: 200
updated: 2021-03-26 15:30:26
version: 1.12
---

As of late I have been writing some content on [express.js](https://expressjs.com/), and as such it was only a matter of time until I came to a point where it is time to look into how to handle session data, and user authentication. If I want to implement user authentication in a way that I perceive as the right way, I will want to use [passport](/2018/05/31/express-passport/). However so far I often find myself making simple hobby apps, as such I can take a more informal route to handling authentication involving some system that is just assignment of a unique id to each client by way of a cookie file for example. In any case this post is about [express-session](https://www.npmjs.com/package/express-session), a great project for working with session data in an express.js project

<!-- more -->

## 1 - What to know

This is a post on using the express-session middeware for express to quickly get up and running with session data. This is not a getting started post on express.js, node.js, or javaScript in general. Also It is worth mentioning that in this post I am using express 4.x, and version 1.15.6 of express-session.

## 2 - Basic example of express-session

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

## 3 - Options used in the basic example

There are at least some basic options that should always be used in most projects regardless of how simple they might be. In addition there are many other options of interest that should be set in different ways depending on the nature of the project.

### 3.1 - name

This property is used to set the name of the cookie that will be sent in the response, and also read from in requests. This property can be omitted, and result in a default value of "connect.sid" Even Though it is not required, it is good practice to always give a short, concise name that is relevant to the project. Also I set a name per demo to help resolve an issue where the same cookie ends up being used for many different demos. So it is a good idea to always set unique names to eliminate cookie name collisions.

### 3.2 - secret

This is a required option that is used to sign cookies that are used for the sessions. The value can be a string, or an array of strings. When an array of strings is given, the string of index 0 will be used when signing session cookies, and the other strings will be considered when verifying the signature in requests.

You might be wondering if this is something that should be kept...well...secret, and the answer is of course yes. In my basic example I am just using a string literal, which is fine for a simple hello world style example, but not so great for production code.

### 3.3 - resave

This is another must have option that has to do with weather the session is saved to the store on every request even if it was not changed. The way I think about this I would assume that this value should be set to false with most use case examples, but it can depend on the store used. The biggest concern that comes to mind is older sates writing over newer ones because of a time race between parallel requests. Still with some stores it may be necessary to set this to true.

### 3.4 - saveUninitialized

This is another required option that has to do with saving uninitialized sessions. When a session is new, but has not yet been modified that is an uninitialized session. My reasoning is that this should be set to false by default.

## 4 - Using the FileStore for storage of session data

Out of the box express-session uses a mem store to store session data. This might work okay for quick demo apps, but if I do want to start going in the direction of making a production app I will want to use another storage option such as [session-file-store](https://www.npmjs.com/package/session-file-store)

```
$ npm install session-file-store@1.2.0 --save
```

I can then use the file store by calling an instance of it, and setting that to the store property of the instance of express-session

```js
let express = require('express'),
session = require('express-session'),
FileStore = require('session-file-store')(session),
 
secret = 'notThatSecretSecret',
port = process.env.PORT || process.argv[2] || 8080,
app = express();
 
//use express-session
app.use(session({
 
        // using FileStore with express-session
        // as the sore method, replacing the default memory store
        store: new FileStore({
 
            path: './session-store'
 
        }),
        name: '_fs_demo', // cookie will show up as foo site
        secret: secret,
        resave: false,
        saveUninitialized: false,
        cookie: {

            // five year cookie
            maxAge: 1000 * 60 * 60 * 24 * 365 * 5

        }
    }));
 
app.get('/', function (req, res) {
 
    // simple count for the session
    if (!req.session.count) {
        req.session.count = 0;
    }
    req.session.count += 1;
 
    // send info as json
    res.json(req.session);
 
});
 
app.listen(port, function () {
 
    console.log('session-filestore demo is up on port: ' + port);
 
});
```

To confirm that this is working I can start the app, go to localhost:8080, hit refresh a few times and then restart the app. When I go back I should continue where I left off. Also I can check out the contents of the session folder, and look at the json file that should be there, this will store the state of the session.

There are many more options for this session store, and of course there are many more options for modules that do this in a different way. For the scope of this post at least I thought that I should cover at least one of theme.

## 5 - Authentication with express-session only?

With authentication in express.js it may be best to go with [passport](/2018/05/31/express-passport/), this is defiantly a professional and versatile way of making quick work of setting up some kind of system that involves user registration and authentication \(aka logging in\). However if you are just making some simple little hobby app there might be a desire to have some kind of primitive yet effective way of doing this.

Express session involves the use of cookies, and it is possible to have the cookies not expire \(at least in a short time\) resulting in a persistent way of setting a unique id to each visitor to the app. The id set in the cookie could be used as a replacement for a user login, and password in a way I guess. Yes there are many draw backs to this, but I see simple games, and projects using this kind of system, and it works for what it is worth when it comes to basic little examples that are just going to be used on a local network.

## 6 - Using cookie-parser to parse req.cookies

If for some reason I want to parse the cookies so I can see the id values in re.cookies I can use [cookie-parser](https://www.npmjs.com/package/cookie-parser) module to make quick work of that.

add in cookie parser
```
npm install cookie-parser@1.4.3 --save
```

When I use cookie parser with app.use cookie parser will populate a req.cookies array.

```js
app.use(require('cookie-parser')());
app.get('*', function(req,res,next){
 
    console.log(req.cookies);
 
    next();
 
});
```

When doing so it might be best to make use that the secret value will match up with what is being use in express session when it comes to using signed cookies.

## 7 - Conclusion

This module is great for getting session management out of the way quickly, I can not say that this is the kind of thing that I want to implement on my own. I did not cover all options that can be used with this module, but maybe that is a job for future posts on express. There is much more to write about with this module, as well as all the other projects that are used with it. So much to write about, and so little time.