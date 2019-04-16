---
title: Express pug view engine basics
date: 2019-04-16 10:05:00
tags: [express,node.js]
layout: post
categories: express
id: 416
updated: 2019-04-16 10:29:59
version: 1.2
---

In [express.js](https://expressjs.com/) there are a number of options for view engines, or template languages. I am somewhat partial to ejs, but another popular option is [pug](https://pugjs.org/api/getting-started.html). I have all ready wrote a post on using the [pug node.js npm package](/2017/12/05/nodejs-pug-getting-started/) by itself, but in this post I will be writing on setting up pug in express.js so it can be used with the render response method.

<!-- more -->

## 1 - express pug view engine basic example


```
html
  head
    title express pug
  body
    p this is an express pug example
```

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