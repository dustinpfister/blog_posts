---
title: Expressjs mega post a good starting point for all this expressjs related
date: 2018-06-12 11:18:00
tags: [js,express,node.js]
layout: post
categories: express
id: 205
updated: 2019-04-26 15:12:51
version: 1.40
---

For my posts on [expressjs](https://expressjs.com/) I want to try something different, have a post that acts as an index for all my content on expressjs. This will serve as a central guide for all things with expressjs, at least much of the must know stuff that one should be aware of. This post will also branch off into many other posts on expressjs, and will likely grow over time as I keep adding, and updating content on express. Getting solid with expressjs is not something that will happen over night, and it branches off into other subjects like database management, deployment, front end frameworks, and security. So this seems like it might be a good idea to help keep things more organized.

<!-- more -->

## 1 - Expressjs, and What to know

This is my main post on the node.js powered, server side web application framework known as expressjs  this is not a getting stared post on node.js, javaScript, html, css, git, cli tools, and many other subjects of interest that have to do with full stack web application development. I assume that you have at least some background in these subjects, and are here to because you are seeking a guide on learning the ropes when it comes to expressjs.

### 1.1 - This is an index of a collection of posts on express.

Like many other subjects on by github pages site here, this is a [collection of posts on expressjs](/categories/express/). This post aims to be a main index of all content relevant to express on this site. If this works out well I may start to do this with all other categories on the site, as it seems like a good idea. Please note that this is also a relatively new collection as well, and as such this post will likely be updated a great deal as I continue working with express.

### 1.2 - The version number matters with expressjs

Yes expressjs is a project where the version number matters a whole lot. As of this writing I am using [express 4.16.3](https://github.com/expressjs/express/tree/4.16.3) with many of the posts that I have written so far, so assume that unless noted otherwise. If you run into issues with the content in my posts, aways remember to check the simplest things first like spelling mistakes, and yes the version number relative to what I am using in the content.

## 2 - Getting started with expressjs

Read my [full post on getting started with expressjs](/2018/05/21/express-getting-started/)

To get started with expressjs you will need node.js installed, which should come with the package manager known as npm as well. There is other software of interest as well such as mongoDB, and having a recent web browser, but at a minimum you will need node.js installed.

### 2.1 - Manual install of expressjs

Once node is installed, and hopefully npm as well. Getting started with any expressjs project manually is just a matter of creating a new project folder, using npm to set up a new package.json file, and installing expressjs with npm adding it to the package.json file with the save option.

```
$ mkdir express-demo
$ cd express-demo
$ npm init
$ npm install express --save
```

### 2.2 - Simple expressjs hello word

Once I have a demo folder I will want an app.js file at root that wil be the main javaScript file that is called to start the project. For a simle hello world example that app.js file might look something like this.

```js
let express = require('express'),
app = express();
app.get('/', function(req,res){
    res.send('hello world')
});
app.listen(8080);
```
All express projects will involve calling the main method that is given to create an instance of the app object. The app object will then contain methods that I can use to define what to do for certain http methods, and paths.

Here I am responding to get requests to the root path with the string hello word by making use of the send method in the response object. 


## 3 - The main express function, and additional static methods.

Read [the full post](/2018/06/13/express-top-level-function/) on the top level function, and static methods.

So the main express function can be used to create an instance of an app object when called. This app object contains useful methods that can be used to define paths, and get the app to start listening on a given port. However there are also some static methods attached to the function as well that can be used for things like setting up a static path.

```js
let express = require('express'), // get the main express function
app = express(); // call it to create an app object
 
// additional methods are attached to the function
// like express.static that can be used to create 
// a static path.
app.use('/', express.static('public'));
 
// and start the app 
app.listen(8080);
```

### 3.1 - Setting up a static server with the express.staic method

Read [more on express.static here](/2018/05/24/express-static/)

No additional module is needed to set up a static server with expressjs, it can quickly and easily be set up using the expressjs method with app.use.

```js
app.use('/',express.static('public'));
```

Where public is the name of a folder called public in the root name space of the expressjs project. The express.static method can be used to quickly set up one or more static paths, in the event that you want to do something involving the use of a rendering engine for some paths, bust just simply serve static files with other paths.

```js
// static paths
app.use('/js', express.static('public/js'));
app.use('/css', express.static('public/css'));
app.use('/img', express.static('public/img'));
 
app.get('/', function(req,res){
    res.render('index');
});
```

### 3.2 - Using routers to help break things down, keep things neat and clean.

Read [more on routers here](/2018/05/22/express-routers/)

Routers are a great way of keeping things well organized. When making an expressjs app I find myself setting up many paths. Some just serve up static assets, some render output using a template, others respond to post requests. If you find yourself having a really long main app.js file in your project you might want to check out routers. They can be used to create separate javaScript files that can then be used in the main app.js file with app.use.

For example I could have a file at \/routes\/main.js like this:

```js
let express = require('express'),
 
router = module.exports = express.Router();
 
router.get('/', function (req, res) {
 
    res.render('index', {});
 
});
```

and then use it in my main app.js file like this:

```js
let express = require('express'),
app = express();
 
app.use('/',require('./routes/main'));
 
app.listen(8080);
```

Routers are like little express apps that can be used to help break down routing tasks like this.

There is a great deal more to know about the top level function that is exported. The main thing to know is that it returns a method that is called to create instances of an app object. However there are also some additional useful methods attached to it as well.

## 4 - The app object

Read more on [the app object](/2018/06/15/express-app-object/) in express

When calling the main top level express function that is exported when importing express into a project, and instance of app is returned. This is one of the most important objects when working with express, as it contains methods for setting paths, and handing http requests.

### 4.1 - The app.use method for using middeware

Click [here](/2018/06/18/express-app-use/) to read more about app.use is is a must know.

The app.use method is your friend when starting to put something complex together. As a project grows there will start to be many middeware modules added into the mix, there will also be a desire to break the code of your project into smaller components that will then be used with the main app.js file. This is where the app.use method comes into play.

```js
app.use(require('./lib/my-middeware.js')());
```

### 4.2 - The app.get method

be sure to read more on [the get method](/2018/06/20/express-get/).

The first app object method that most people will use when starting with expressjs might be app.get. This is a method that is used to define how to work with incoming http GET requests for a given path or pattern. In addition to working with get requests, this method can also be used to get app settings as well.

```js
// for all incoming get requests
app.get('*', function(req,res,next){
    console.log('a get request');
    console.log('for path: ' + get.path);
    next();
});
 
// if the get request is for root
app.get('/', function(req,res){
    res.send('the index.');
});
 
// if we get here it looks like we do not have it
app.get('*', function(req,res){
    res.send('sorry');
});
```

The order in which I call app.get is important, as the first use of the method is what will be used first for all incoming get requests. The next use of app.get will only fire for the root path, and the last one will fire for all get request that are not satisfied above.

### 4.3 - The app.all method for responding to any kind of request.

Read more on [app.all](/2018/06/05/express-app-all/)

So where that methods that I give to app.get will only fire for GET requests, app.all will fire for any kind of request that is received.

```js
app.all('/', function(req,res,next){
    console.log('looks like a ' + req.method + ' request');
    next();
});
```

When using app.all the method property of the request object is of interest, as it will tell me what kind of method has been used.

### 4.4 - Using req.app, or res.app, and having more than one app in a project.

For more on using req.app, or res.app to get at an app object [read this](/2018/06/22/express-app-request-response/).

When I start to make a project that is a little complicated, I end up in a situation in which I am dealing with many instances of an express app. Other times I am interested in grabbing at my main app object without having to export it and then bring it into my other file with require.

Thankfully in both the request, and response objects there is a reference to the app that is using the middeware. Sometimes that can be used as a way to use whatever it is that I need to use from the main app object without having to make a new instance of app.

```js
module.exports = function (req,res) {
    res.json({
        appID : res.app.get('id')
    });
};
```

## 5 - The Request Object

read my full post on [request objects](/2018/05/26/express-request-objects/).

The request object is an object that contains all kinds of useful information about an incoming http request.

### 5.1 - Request headers at req.headers and the req.get method.

Read more on [request headers in expressjs](/2018/05/29/express-request-headers/)

When working with requests it is often desired to look at the incoming request headers. For exmaple if I want to know the user agent string. For this there is the req.headers array that will contain all the headers that are present in the request, and the req.get method that can be used to get a certain header from that array.

```js
// add body path
router.get('/', function (req, res) {
 
    res.json({
 
        headers: req.headers,
        userAgent: req.get('user-agent')
 
    });
 
});
```

## 6 - The Response Object

As the name suggests the response object contains methods and properties relevant to the act of responding to an incoming http request. Here I will be taking a moment to cover relevant topics on the response object, and some of the most important aspects to know about.

### 6.1 - The render method for rending templates

For more on [using ejs with expressjs](/2018/05/25/express-rendering-with-ejs/) I have a post on that.

The render method is for rendering a view set via app.set. There are many rendering engines to choose from, but so far I have been sticking to [ejs](/2017/12/07/nodejs-ejs-javascript-templates/).

```js
let express = require('express'),
path = require('path'),
app = express(),
 
// getting port this way
port = process.env.PORT || process.argv[2] || 8080;
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.get('/', function (req, res) {
 
    res.render('index',{});
 
});
 
app.listen(port, function () {
 
    console.log('app is up on port: ' + port);
 
});
```

### 6.2 - Sending a file to be displayed in the browser as a response with res.sendFile

I have a [full post on the sendFile method here](/2018/06/13/express-response-send-file/) if you want to know more.

If for some reason I want to send just a single file as a response I can do that with the send file method. This will work in a similar fashion as setting up a static file path, but can be used to just serve up a single file, and not a whole folder.

```js
res.sendFile('face.png',{
   root: './img'
})
```

This will serve up a file called face.png in a folder called img at the root of a project. I need to use the root option if I want to use relative paths like this.

### 6.3 - Responding to a request with a file download with res.download

To find out more about this I have a post on the [response download method](/2018/06/11/express-response-download/).

If I want to have a path that will result in a file being download to the client that can be done very easily with the download method.

```js
res.download(path.join(__dirname, 'docs/doc1.pdf'));
```

## 7 - Some important modules to use with expressjs

There are many modules for expressjs that are closely tied to expressjs, some of which come with express such as body-parser, Others need to be installed with npm first. In this section I will be briefly covering some of the must know modules for express.

### 7.1 - The body parser for parsing incoming data payloads with post requests.

Read more about body parser [here](/2018/05/27/express-body-parser/), there is much to know about it.

The body parser module comes in handy whenever I want to do something involving post requests. This module makes the process of parsing an incoming payload into something I can work with a snap. There are methods for parsing the usual json data, as well as others for plain text, and even binary data as well.

```js
// parse a body as json
app.use(require('body-parser').json());
 
app.post('/foo', function(req,res){
 
    console.log(req.body); // the json parsed into an object
 
    res.json({
       mess: 'the body',
       body: req.body
    });
 
});
```

### 7.2 - The cookie parser middleware

Read more on cookie parser [here](/2018/05/30/express-cookie-parser/).

The cookie-parser middeware is an offical expressjs middeware that is used to parse a cookie header, and populate req.cookies.


### 7.3 - The express-session middleware

Check out my full post on [express session](/2018/06/01/express-session/)

If you are looking into how to get started with session management with express there is of course express-session, it is a decent solution to help with session management.

## 8 - User authentication with expressjs

User authentication, or in other words loggin in, is  a complicated subject. This is where things get a little hairy for most people, but luckily there are great solutions to help simplify this process. If you are thinking about coming up with your own solution for this, don't, unless you can really think of some way to rationalize it.

### 8.1 - Authentication with passport.js

Read my post on getting started with [passport](/2018/05/31/express-passport/)

So passport may be the best known, and also best supported solution for authentication with expressjs. There are many strategies for authorization with passport, including simple local solutions, as well as others that involve [oAuth](https://en.wikipedia.org/wiki/OAuth).

## 9 - Making micro services with express.

check out my [getting started with micro servies](/2018/06/08/express-microservices-getting-started/) post.

If you are thinking about the creation of an app being this thing where everything works as just one big chunk of code that is deployed to just a single node at a hosting company and thats all there is to it, then maybe you should start looking into micro services. This is a way of breaking things down into not just one app, but a whole bunch of apps that all work together. This helps make things more manageable, and it can also reduce the work load of an app, by making some things the responsibility of a whole different app, on a whole different node, that may even be at a whole separate hosting company.

## 10 - Security, and privacy.

I do not have much content on this for the moment, so far I have just started playing with something called [helmet](https://www.npmjs.com/package/helmet). If I get to it I should make one or more projects that help show some do, and do nots for this.

### 10.1 - DNS prefetch control with helmet.

Read more on [dns prefect control with helmet](/2018/06/19/express-helmet-dns-prefetch-control/).

The Subject of DNS prefetching is something that can be considered a bit of a privacy concern. The thing about it is that it seems many browsers do it by default, for the purpose of speeding things up a bit. However if someone where to observe my traffic with something like wrireshark it would look like I am going to all kinds of sites, but in reality there are just links to those sites on the page.

the express middeware helmet can be used to set headers that keep this from happening as well as do a whole bunch of other things that might help improve security, and provacy for an expressjs app.

## 11 - Conclusion

I wanted to try something new when writing my content on express. I think having a main post like this that links to everything else on express is very useful. If This post does well, I might start having posts like this for all of my content categories.

### 11.1 - The future of this post.

There is much more to test out, and write about with express. Also I might like to get around to building, and deploying some real projects at some point in the future. I have a lot of content on this site thought, and from the perspective of someone that wants to create a successful blog on javaScript, that might not happen if these posts do not preform well.

If I do get to it, I will eventually build one or more real projects using express. This will mean more posts on security, scaling, and deployment, as well as improved quality, and quantity of posts in general.

### 11.2 - Bye for now

I hope this post has done a decent job of giving a general overview of expressjs, if not from here you should be able to navigate to more specific posts on various topics on express.