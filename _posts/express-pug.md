---
title: Express pug view engine basics
date: 2019-04-16 10:05:00
tags: [express,node.js]
layout: post
categories: express
id: 416
updated: 2019-04-16 10:57:02
version: 1.5
---

In [express.js](https://expressjs.com/) there are a number of options for view engines, or template languages. I am somewhat partial to ejs, but another popular option is [pug](https://pugjs.org/api/getting-started.html). I have all ready wrote a post on using the [pug node.js npm package](/2017/12/05/nodejs-pug-getting-started/) by itself, but in this post I will be writing on setting up pug in express.js so it can be used with the render response method.

<!-- more -->

## 1 - express pug view engine basic example

To create a basic example of using pug with express.js and pug I would start out by creating a new folder, and doing and initialize a new npm package in the folder. After that I would install express and pug and save them to the package.json file. I will also want a view folder in which to place the \*.pug files that I will be using with the express render method.

```
$ mkdir express-pug
$ cd express-pug
$ npm init
$ npm install express --save
$ npm install pug --save
$ mkdir views
```


### 1.1 - Creating an index.pug file to use with the express res.render method

For this express pug example I will want to create a \*.pug file to render in my views folder. So in the views folder I placed an index.pug file that looks like this:

```
html
  head
    title express pug
  body
    p this is an express pug example
```

The name of this file is what I will be passing to the res.render method in my express project when defining the logic for a given path.

### 1.2 - The basic .js file

back at the root name space of the project folder I created a basic.js file. In here I will be using express and setting pug as the voew engine that is to be used.

```js
// get express and create an
// express app object
let express = require('express'),
app = express();
 
// set pug as the view engine
app.set('view engine', 'pug');
 
// use the render method to render
// a pug template
app.get('/', (req, res) => {
    res.render('index');
});
 
// use listen or createServer to
// listen on a port
app.listen(8080);
```

## 2 - Using local variables for the express pug project

It is also possible to pass local variables to a view with the render method. This is useful if the back end strip has some data that I want to have rendered into the html that will be sent back to the client. To do so I just need to pass an Object with the names of the variables as the key names and then they values as the properties. Inside the pug file I can then use those values in the rendering process.

```
html
  head
    title express pug locals
  body
    p= foo
    p= n
```

```js
let express = require('express'),
app = express();
app.set('view engine', 'pug');
 
app.get('/', (req, res) => {
    // an object can be passed to the render
    // method that will pass local variables
    // than can then be used in the pug file
    res.render('locals', {
        foo: 'bar',
        n: 42
    });
});
 
app.listen(8080);
```