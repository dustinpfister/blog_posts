---
title: A todo app example using express, lowdb, and much more.
date: 2018-06-23 19:52:00
tags: [js,express,node.js]
layout: post
categories: express
id: 215
updated: 2018-06-25 22:35:27
version: 1.9
---

So I have been working with [express.js](https://expressjs.com/) for a while now when it comes to making simple demos, but now I think it is time to start making something that is a full working project of some kind. Often people start with a simple todo list project of some kind, so maybe that will do for now. I do not have to make this the kind of project that I will devote a few years of my life to, it can just be a good start. In this post I will be writing about this first express.js project, and if all goes well maybe this will not be the last post like this, as I progress into something else that is more interesting.

<!-- more -->

## 1 - What to know before continuing

This is a post on an example of a full stack web application built using node.js, express.js, and a whole bunch of other modules. This is not at all a getting started post on express.js, javaScript, html, css, and so forth. If you are new to this sort of thing it might be best to start at my [main post on express.js](/2018/06/12/express/), as this is a more advanced post on full stack web development using express.js.

### 1.1 - This is the first release I am writing about

This is the first release that I am writing about in this post express_todo 0.0.125. There might be a 1.x in the future as there is a lot about this project that I am not satisfied with. However I am interested in progressing into more interesting projects as well, so that might not come to pass. So in other words, this project is not at all production ready, and if you are going to use it I would only do so locally.

## 2 - install, or setup

Because this has turned out to be a complex project I have made a repo on my github page. So If for some reason you want to install this locally you can by cloning it down, and doing an npm install to install all the dependencies for it.

### 2.1 - install by cloning the repo

So one way to quickly reproduce what I am wrting about here is to just clone down what I have made with git clone, make sure you are using the version that I am writing about (0.0.125), and then install the dependencies with an npm install.

```
$ git clone https://github.com/dustinpfister/express_todo
$ cd express_todo
$ git checkout tags/0.0.125 -b foobar
$ npm install
$ node app
```

Once everything is installed you would just need to call node app to start the main app.js file, and if all goes well you will be able to use the app when you navigate to localhost:8080 in a web browser.

### 2.2 - Reproducing from scratch

If you want to reproduce from scratch there are a few things to install, and study if you are not familiar with them.

However you might start out like this.
```
$ mkdir express_todo
$ cd express_todo
$ npm init
$ npm install ejs@2.6.1 --save
$ npm install express@4.16.3 --save
$ npm install fs-extra@6.0.1 --save
$ npm install js-yaml@3.12.0 --save
$ npm install lodash@4.17.10 --save
$ npm install lowdb@1.0.0 --save
$ npm install shortid@2.2.8 --save
```

## 3 - At the root

### 3.2 - The main app.js file

### 3.1 - config.yaml

## 4 - The /lib folder

### 4.1 - conf.js

### 4.2 - db_lists.js

## 5 - The /public folder

### 5.1 /public/js/list_client.js

## 6 - The routes folder

### 6.1 - /routes/edit.js

### 6.2 - /routes/list.js

### 6.3 - The middleware at the /routes/mw folder

#### 6.3.1 - edit_get.js
#### 6.3.2 - setobj_rend.js
#### 6.3.3 - setobj_postres.js
#### 6.3.4 - check_body.js
#### 6.3.5 - check_fail.js
#### 6.3.6 - item_add.js
#### 6.3.7 - item_delete.js
#### 6.3.8 - item_edit.js
#### 6.3.9 - item_get.js
#### 6.3.10 - list_create.js
#### 6.3.11 - list_delete.js
#### 6.3.12 - list_get.js

## 7 - The /themes folder

### 7.1 - The Landscape theme

#### 7.1.2 - css

#### 7.1.3 - js

#### 7.1.4 - layouts

#### 7.1.5 - index.ejs

#### 7.1.6 - nav.ejs

## 8 - the /db folder

## 9 - conclusion