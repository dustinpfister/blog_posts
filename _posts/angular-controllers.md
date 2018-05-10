---
title: Controllers in angular
date: 2017-12-14 09:21:00
tags: [js,node.js,hapi,angular]
layout: post
categories: angular
id: 113
updated: 2017-12-14 10:16:24
version: 1.2
---

[Controllers](https://docs.angularjs.org/api/ng/directive/ngController) are a very important part of [Angular.js](https://angularjs.org/) development. They are a way of presenting data to an HTML view via a $scope, and creating a single bind between view and model.

In This post I will be covering my [controller-basic](https://github.com/dustinpfister/test_angular/tree/master/ejs/demos/controller-basic) demo of my [test_angular](https://github.com/dustinpfister/test_angular) project

<!-- more -->

## Whats first

This is not my getting started post [I got that out of the way](/2017/12/13/angular-getting-started/). I also assume you have at least a basic understanding of html, javascript, node, ect.

## The ng-controller directive

The other directive that I am using in this demo is the ng-controller directive, which attaches a controller class to the element. This is a key feature of the MVC design of angular, which will become clearer in additional future posts. 

For now just know that the string 'Hello World' in my javaScript is independent from my html, and any change to the string will effect the view of it. That is I do not have to make a change, then go to update my html.


## Basic Angular Controller example

For my basic controller example I am just going to to have a single static value assigned to $scope.mess in a controller called basic-control.

But First the html.

```html
<div ng-app="app" ng-controller="basic-control" >
 
    <p>{{mess}}</p>
 
</div>
```

The value that I set in $scope.mess will be set to what is placed in {{mess}}

The javaScipt will look like this:

```js
var app = angular.module('app', []);
 
app.controller('basic-control', function ($scope) {
 
    $scope.mess = 'Hello World';
 
});
```

Because this is very simple example It should be easy to understand the basic idea of a controller. You have a model defined with angular.module which has a name 'app'. I used the ng-app directive to tell angular to bootstrap the div element with the 'app' module. I also tell angular I want to use the 'basic-control' controller with the element as well. The controller then sets what I place in {{mess}} to the value defined in $scope.mess within the controller.

I guess even the basic idea of this is a little involved, but not to bad right?