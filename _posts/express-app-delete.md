---
title: Using app.get in express to get app settings, and handle get requests.
date: 2018-06-21 12:10:00
tags: [js,express,node.js]
layout: post
categories: express
id: 213
updated: 2018-06-21 12:29:47
version: 1.4
---

Today for my quick morning post on [express.js](https://expressjs.com/) I wanted to start taking a look at some of the other http request methods other than get, and post. So for today I put together a quick demo that makes use of the app.delete method.

<!-- more -->

## 1 - what to know before hand

This is a post on the app.delete method of the app object in express.js. This is a method that is used to define logic that is used to handle http 1.1 delete requests. This is not a getting started post on express.js, or any additional skills that are required before hand to get something of value from this. If you are new to express you might want to check out my [main post on express](/2018/06/12/express/).

## 2 - Setup

The setup process was not all that different from many of my other examples on express. I just created a new folder, made it the current working folder. I also made a public folder to house a simple static client with express.static. Also I set up a routes folder as a way to keep things a little more organized compared to having everything in the main app.js file.

```
$ mkdir app-delete
$ cd app-delete
$ mkdir public
$ mkdir routes
$ npm init
$ npm install express --save
```

## 3 - The public folder

The public folder will hold the crude yet effective client system for this example. It consists of just an index.html file, and a single client.js file that will house my front end javaScript code.

### 3.1 - The /public/index.html

Just a simple html file that will have a textarea message that can be used to define some text that will then be posed to the back end when clicking a post button element. It will also have another button that will make a delete request as well. The javaScript that will power all of this on the front end will be in a client.js file that will be used in the index via a script tag.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>express demo</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1>app.delete</h1>
 
    <!-- text input and post button -->
    <textarea id="text" rows="10" cols="80"></textarea><br>
    <input id="post" type="button" value="post">
    <input id="delete" type="button" value="delete">
 
    <script src="client.js"></script>
  </body>
</html>
```

### 3.2 - The /public/client.js

## 4- The routes folder

### 4.1 - The /routes/post.js file
### 4.2 - The /routes/file.js file
### 4.3 - The /routes/delete.js file

## 5 The app.js file

## 6 - Starting the app.

## 7 - Conclusion