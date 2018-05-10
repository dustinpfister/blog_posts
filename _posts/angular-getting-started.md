---
title: Getting started with angular.js
date: 2017-12-13 13:32:00
tags: [js,node.js,hapi,angular]
layout: post
categories: angular
id: 112
updated: 2017-12-14 09:43:19
version: 1.4
---

When I started this blog I knew that sooner or later I would have to get started with [angular.js](https://angularjs.org/), as a javaScirpt dev I feel as though I have to regardless if I want to or not. Because angular is a pretty complex project this will be the first of many posts, so I made a repo called [test_angular](https://github.com/dustinpfister/test_angular) that will contain all of the demos for angular.

<!-- more -->

## Angular.js and HAPI

For my collection of angular demos I wanted to do something novel when it comes to the backend instead of just having a vanilla static html structure. Angular is often combined with [express](https://expressjs.com/), and [mongodb](https://www.mongodb.com/) to make what is often called the [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)), however I have chosen to go in a new direction and use [hapi](https://hapijs.com/) as my backend framework. Nothing against express, just felt like it. 

## Running my demos locally

You might want to play around with the demos locally. If so it is just a matter of cloning them down, installing depedacies, and running the server.js file. 

```
$ git clone https://github.com/dustinpfister/test_angular
$ cd test_angular
$ npm install
$ npm start
```

Doing so will give you and index of all of my demos when you do to localhost:3000 in the browser. The demo I will be covering in this post is 'first'.

## My First Angular App

I did fiddle around with angular a little before once, but for now it is official, and I intend to really get into it this time.

So for my [first](https://github.com/dustinpfister/test_angular/tree/master/ejs/demos/first) angular demo my ejs templates render out something like this:

```html
<!doctype html>
<html>
    <head>
        <title>Angular demo - first</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <h1>Angular Demo - first</h1>
 
        <div ng-app="first">
        <div>
            <h1>{{'Hello' + ' World'}}</h1>
        </div>

 
    </div>
 
    <!-- get angular-->
    <script src="/lib/angular/angular.js"></script>
    <script src="/demos/first/js/first.js" ></script>
 
    </body>
</html>
```

and the javaScript looks like this:

```js
var app = angular.module('first', []);
```

## Angular directives

Directives are an important part of angular development they tell angular to attach a certain kind of behavior to a given html element. In my first demo I am just usning the ng-app directive.

## The ng-app directive

In the html of the angular demo the ng-app directive tells angular where the root element of the project is, this is a very important part of the bootstrap phase. The bootstrap phase is when angular loads, and then takes a look at my module defined with angular.module before moving on to a compilation, and runtime phase.
