---
title: Express example of serve index middleware
date: 2021-03-22 13:54:00
tags: [express,node.js]
layout: post
categories: express
id: 828
updated: 2021-03-22 14:39:51
version: 1.6
---

When working out a nodejs project it would be nice to have a way to just quickly create something that will just serve an index of a public html folder and that is it. I could take the time to work out my own solution when it comes to that, but even simple things like this can often prove to be a little time consuming. If I am willing to make [expressjs](https://expressjs.com/) part of the stack, and often that is one npm package that I do not mide using, then there is a middleware for express called [serve index](https://www.npmjs.com/package/serve-index) that can make quick work of this kind of task.

The serve index middleware can be combined with the built in [express static function](https://expressjs.com/en/starter/static-files.html) as a way to serve an index for a path, while serving up files when a full path with file name is given. So then bu just using express and one additional package I can qucikly have a system that will work well as a way to serve up and index of files for a path of files some of which might be html files. In addition when a user clicks an html file all the assets will load thanks to the built in express static function.

So then in this post I will be going over a quick simple [expressjs example](/2019/04/30/express-example) that will involve using nodejs, express, and serve-index to create a simple static server that will host a public folder.

<!-- more -->

## 1 - A Basic serve-index express example

In this section I will be going over a quick, simple, example of serve index that I put togetaher in a flash. When I made this I was using nodejs 10.24, with express 4.17.1, and serve-index 1.9.1. If for some reason the code example heer breaks, be sure to check the version numbers of the various assets that you are using.

### 1.1 - Setting up the project folder

To set up a project folder I just create a main project folder and then make that the current working dir. Inside the main project folder I then do the ushual npm init to create a new npm folder with a package.json file. Once that is done I then make express and serve-index the two depednces of the project and that is all. After I have the node modules installed for this there is then just creating a public folder, and then a nested folder for javaScript files.

```
$ mkdir serve-index-example
$ cd serve-index-example
$ npm init
$ npm install express
$ npm intsall serve-index
$ mkdir public
$ cd public
$ mkdir js
```

### 1.2 - The public folder

In the public folder I just have a single index.html file that looks like this.

```html
<html>
  <head>
    <title>Foo html file</title>
  </head>
  <body>
    <h1>Foo Page</h1>
    <script src="/js/foo.js"></script>
  </body>
</html>
```

I am then also using a single javaScript file in the js folder also that looks like this.

```js
var container = document.body;
 
var foo = document.createElement('p');
 
foo.innerText = 'javaScript works';
 
container.appendChild(foo);
```

### 1.3 - The main static.js file

```js
// just a way to serve the html folder
let express = require('express'),
serveIndex = require('serve-index'),
path = require('path'),
app = express(),
PORT = process.env.PORT || process.argv[2] || 8080,
PUBLIC_HTML = path.resolve(__dirname, 'public');
 
// use serve index to nav public folder
app.use('/', serveIndex( path.resolve(PUBLIC_HTML) ));
 
// use express static to serve public folder assets
app.use('/', express.static( path.join(PUBLIC_HTML) ));
 
// listen on PORT
app.listen(PORT, function () {
    console.log('static server up');
    console.log('serving PUBLIC HTML folder at: ' + PUBLIC_HTML);
    console.log('on port: ' + PORT);
});
```

```
$ node static 8000
```
