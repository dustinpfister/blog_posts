---
title: vue start with setup and some basic examples
date: 2019-05-05 11:24:00
tags: [vuejs]
layout: post
categories: vuejs
id: 435
updated: 2021-02-22 05:57:29
version: 1.21
---

So this week I think I will be starting a new collection of posts on [vuejs](https://vuejs.org/) and as such when I learn something new I like to start writing some posts on the topic while I am at it. As such whenever I start a new collection of content I often start out with a getting started post on that collection because that is just what needs to happen first naturally. Doing so might not always be the best idea when one has next to no experience with something, but often I do come back and edit older content including this post as I get more experience. 

So this will be a quick post on [getting started with vuejs](https://vuejs.org/v2/guide/), and just a few basic hello world type examples of things. However I will also in this post be outlining how to set up a quick project that involves using node.js and express to serve up the first of what should be at least a few examples on vuejs. This might not always be necessary, but one way or another what you are working on should be served up via the http protocol rather than that of the file protocol, in some examples you will run into errors that can happen relating to that. You do not have to do this the way that I am doing it here, but it is still a good idea to learn how to lost something you are working on locally anyway.

<!-- more -->

## 1 - vue start

There is more than one way to get started with vue.js, some ways might be easier, others maybe not so easy. When I started experimenting with vue.js I made it into a bit of a project involving some back end code with express. After all what is a front end javaScript framework without at least some back end code as well? 

So in this section I will be going over how I set up my test vuejs project folder, and also a very basic static server script for the sake of quickly browsering each example that I come up with. In order to really get into this sort of thing you will want to learn more about getting started with nodejs, and express.js, that is if you want to go with those options when it comes to a back end system.

### 1.1 - vuejs test folder setup

So I started out by making a new folder called test\_vuejs and made it the current working directory. Once the folder is the current working directory I did a git init to make it a git folder, and I also did the usual npm init for any project folder that is going to contain a few least npm packages such as express. Doing this will generate a package.json file for the project folder.

I then installed express and added it to my package.json folder as a dependency by using the save option. I am also using serve-index as a way to create an index for all the examples that I will have in a public folder for each post.

There is then using the mkdir command to create the public folder that will contain vuejs and all other front end assets that will be hosted by express.static when it comes to working out back end scripts. 


```
$ mkdir test_vuejs
$ cd test_vuejs
$ git init
$ npm init
$ npm install express --save
$ npm install serve-index --save
$ mkdir public
```

### 1.2 - Addiitonal folders in the for post folder

In the public folder I also made a for post folder that will contain folders for each post I write for vue.js including this one, as well as the js folder as well to hold vue.js and any other front end javaScript that I might use across examples.

```
$ cd public
$ mkdir forpost
$ mkdir js
```

For starters I have downloaded vue 2.6.10 from the [installation](https://vuejs.org/v2/guide/installation.html) page at the vue.js website and placed it in a vuejs\/2.6.10 path in the js folder of my public folder. This way as my collection of examples grow I can potentially place other versions in the vuejs folder, and also have both development and production files for each version as well. This is also a pattern that I like to follow with any other additional frameworks that I might add into the mix at a later point.

```
$ cd js
$ mkdir vuejs
$ cd vuejs
$ mkdir 2.6.10
```

### 1.3 - A very basic example of an express.js powered static server

So now that I have the very basics worked out when it comes to setting up a new nodejs project it is now time to just work out a very quick simple static server using express. I do so by requiring in express, and then create a new instance of an express app my calling the main expression function that is exported by express.

In this simple server I am also using the nodejs the path.resolve method in the nodejs built in path module with the \_\_dirname variable that should be the dir where this static.js file is located. If I have this static.js file located at the root level of the project folder then I just need to resolve a new absolute path with the path value in the \_\_dirname variable with the public folder name to get the absolute path that I will want to use with express.static.

```js
// just a way to serve the html folder
let express = require('express'),
serveIndex = require('serve-index'),
path = require('path'),
app = express(),
PORT = process.env.PORT || process.argv[2] || 8080,
PUBLIC_HTML = path.resolve(__dirname, 'public');
 
// use serve index to nav public folder
app.use('/', serveIndex( path.resolve(PUBLIC_HTML) ))
// use express static to serve public folder assets
app.use('/', express.static( path.join(PUBLIC_HTML) ));
 
// listen on PORT
app.listen(PORT, function () {
    console.log('static server up');
    console.log('serving PUBLIC HTML folder at: ' + PUBLIC_HTML);
    console.log('on port: ' + PORT);
});
```

## 2 - vuejs Hello world

So for my first vuejs example folder is the same as the file name as this post vuejs-getting-started. I have got into the habit of started to do that when it comes to these kinds of projects.

```
$ cd forpost
$ mkdir vuejs-getting-started
```

### 2.2 - The vuejs hello-world example

So here I have a single html file that contains both the html code as well as a script tag that links to the development version of vuejs that I am using so far. In addition I also have a script tag with some javaScript that constitutes the hello world example.

```html
<html>
  <head>
    <title>First vue.js example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <p id="mess">{{message}}</p>
  <script>
  
  new Vue({
    el:'#mess',
    data: {
      message:'hello world'
    }
  })
  
  </script>
  </body>
</html>
```

So vuejs involves the use of a Vue constructor that is called with the new keyword just like any other constructor function in javaScript. I then use the [vue el](/2019/05/06/vuejs-el/) option to set the mount point of the example to a paragraph element with an id of mess. I then used the interpolation or mustache syntax to place the message in the data object into the paragraph element 