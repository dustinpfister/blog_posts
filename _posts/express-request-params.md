---
title: Params in express
date: 2021-03-26 13:41:00
tags: [express,node.js]
layout: post
categories: express
id: 832
updated: 2021-03-26 14:35:06
version: 1.11
---

When working out what a [path should be for some expressj middleware](https://expressjs.com/en/guide/routing.html) it is possible to make use of some parameters for paths. These parameters are a way to make it so that a part of a path is a kind of parameter, the value of which can then in turn be obtained in a request object property called req.params. 

For example say that you have a folder that contains a whole collection of project folders. With that said lets say you want to create an express script where there will be an examples path, and then there can be a folder name that will correspond with s folder name in this examples folder. In each example folder there is a file that I would like to send for the project folder when that path is requested. One way to go about doing so would be to make use of these path parameters.

So then in todays express post I will be going over just a few quick, simple, examples of path parameters.

<!-- more -->

## 1 - Basic params path example

To start out with how about a simple copy and past example that will just be a single app.js file. When it comes to this example I start out by just requiring in express and creating an app object just like any other express.js project. I then use the app.set method to set a port value to listen on like I do with many of my other simple express examples.

I will then also want a middleware for the root path of the example. For this example I will be just sending a single link to an examples path, with a value for what will be an example folder name. I then have middleware set up for a path in whiich I am making use of the path parameters feature. For now it is something in which I will just be sending the name of the parameter back to the client, and that is it.

```js
let express = require('express'),
app = express();
 
// getting port this way
app.set('port', process.env.PORT || process.argv[2] || 8080 );
 
app.get('/', (req, res) => {
   let exampleName = 'the_foo_project';
   res.send('<a href=\"/examples/' + exampleName + '\">' + exampleName + '</a>');
});
 
// a single path for /
app.get('/examples/:exampleName', (req, res) => {
    res.send('example Name: ' + req.params.exampleName);
});
 
// listen on the port app setting
app.listen(app.get('port'), () => {
    console.log('app is up on port: ' + app.get('port') );
});
```

This might not be the most compelling example, but thats okay basic examples are often like that. The basic idea here though is that part of a path can end up being some kind of value, that value can then be used as a way to help create whatever the content should be for that path.

## 2 - Having an examples folder

So now for a more advanced example where I am actually doing something with a parameter value.

In this example I am making use of the [nodejs util promisify](/2019/06/22/nodejs-util-promisify/) method to create functions that will return a promise that would otherwise be functions where I have to use the old callback syntax. At least that out be the case for older versions of node that are often still in use when it comes to using the nodejs built in file system module. In late versions of nidejs this might no longer be needed and the file system module can just be used directly like I am suing it here.

```js
let express = require('express'),
path = require('path'),
fs = require('fs'),
promisify = require('util').promisify,
readdir = promisify(fs.readdir),
readFile = promisify(fs.readFile),
app = express();
 
// getting port this way
app.set('port', process.env.PORT || process.argv[2] || 8080 );
 
app.get('/', (req, res) => {
    readdir(path.resolve(__dirname, 'examples'))
    .then((folders) => {
        let html = '';
        folders.forEach((folderName)=>{
            html += '<a href=\"/examples/' + folderName + '\">' + folderName + '</a><br>';
        });
        res.send(html);
    })
    .catch((e) => {
        res.send(e.message);
    });
});
 
// a single path for /
app.get('/examples/:exampleName', (req, res) => {
    readFile(path.resolve(__dirname, 'examples', req.params.exampleName, 'outline.txt'))
    .then((text)=>{
        res.send('<pre>' + text + '</pre>');
    })
    .catch((e)=>{
        res.send(e.message);
    });
});
 
// listen on the port app setting
app.listen(app.get('port'), () => {
    console.log('app is up on port: ' + app.get('port') );
});
```

## 3 - Conclusion

Well that is all I have to say for now at least when it comes to the basics of user parameters when working out some middleware for an express.js project. 

There are many more use case examples that come to mind that I might come around to making for this post at some point in the future if I put more time into this, or make some more examples that make use of this feature. For example say I am making some kind of express.js project that involves allowing for visitors to create and manage a user account. When it comes to such a project chances are there will need to be a user path that starts with user, but then the user name, and when going to the root of such a path you end up with a user profile.

Another use case example might be some kind of javaScript folder where the path starts with js, then a package name, then a version number, and finally I can give a package.js, or package_dev.js file name at the end of such a path for a minified or development form of a javaScript package of the given name and version. Once again path parameters could help create such a path, but often I prefer to just have a simple static path for those kinds of situations.


