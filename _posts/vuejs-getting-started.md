---
title: vue start with setup and some basic examples
date: 2019-05-05 11:24:00
tags: [vuejs]
layout: post
categories: vuejs
id: 435
updated: 2019-11-16 12:14:34
version: 1.11
---

So this week I think I will be starting a new collection of posts on [vuejs](https://vuejs.org/). When I start a new collection of content I often start out with a getting started post on that collection. So this will be a quick post on [vuejs starting](https://vuejs.org/v2/guide/) out topics. In this post I will be outlining how to set up a quick project that involves using node.js and express to serve up the first of what should be at least a few examples on vuejs.

<!-- more -->

## 1 - vue start

There is more than one way to get started with vue.js, some ways might be easier, others maybe not so easy. When I started experimenting with vue.js I made it into a bit of a project involving some back end code with express. After all what is a front end javaScript framework without at least some back end code as well? 

### 1.1 - vuejs test folder setup

So I started out by making a new folder called test_vuejs and made it the current working directory. I then did the usual npm init for any project folder that is going to contain at least some node.js code. In then installed express and added it to my package.json folder. I then also added a public folder that will contain vuejs and all other front end assets that will be hosted by express.static. I also made a middleware folder that will contain express middleware that will work with vue.js examples, as well as help with the automation of the creating of an index.

```
$ mkdir test_vuejs
$ cd test_vuejs
$ npm init
$ npm install express --save
$ mkdir public
$ mkdir middleware
```

In the public folder I also made an forpost folder that will contain folders for each post I write for vue.js including this one, as well as the js folder as well to hold vue.js and any other front end javaScript that I might use across examples.

```
$ cd public
$ mkdir forpost
$ mkdir js
```

For starters I have downloaded vue 2.6.10 from the [installation](https://vuejs.org/v2/guide/installation.html) page at the vue.js website and placed it in a vuejs\/2.6.10 path in the js folder of my public folder. This way as my collection of examples grow I can potentially place other versions in the vuejs folder, and also have both development and production files for each version as well.

```
$ cd js
$ mkdir vuejs
$ cd vuejs
$ mkdir 2.6.10
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