---
title: vue start with setup and some basic examples
date: 2019-05-05 11:24:00
tags: [vuejs]
layout: post
categories: vuejs
id: 435
updated: 2019-05-05 21:06:18
version: 1.2
---

So this week I think I will be starting a new collection of posts on [vuejs](https://vuejs.org/). When I start a new collection of content I often start out with a getting started post on that collection. So this will be a quick post on [vue starting](https://vuejs.org/v2/guide/) out topics. In this post I will be outlining how to set up a quick project that involves using node.js and express to serve up the first of what should be at least a few examples on vuejs.

<!-- more -->

## 1 - vue start

### 1.1 - setup

```
$ mkdir test_vuejs
$ cd test_vuejs
$ npm init
$ npm install express --save
$ mkdir public
$ mkdir middleware
```

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