---
title: Using the angular.js ng-show directive to toggle the display of an element
date: 2017-12-21 11:10:00
tags: [js,node.js,hapi,angular,canvas]
layout: post
categories: angular
id: 120
updated: 2017-12-21 11:16:19
version: 1.0
---

When working with [angular.js](https://angularjs.org/) there may come a time to have a way to toggle the display of a given element. There are many ways of doing this, but if you wish to stick to some kind of angular.js built in way of pulling it off there is [ng-show](https://docs.angularjs.org/api/ng/directive/ngShow).

The ng-show directive will show or hide the element that it is used in depending on the expression provided to it with the ng-show attribute. This can be a useful way to toggle the display of something on and off, such as a UI component of some kind that is part of a custom directive.

<!-- more -->

## ng-show basic use example

```html
<div ng-app="app" ng-controller="toggle">
 
    <div ng-show="showOn" class="ng-hide" >
        <p>Okay it is visable</p>
    </div>
    <input type="button" value="toggle show" ng-click="showToggle()">
 
</div>
```

```js
var app = angular.module('app', []);
 
app.controller('toggle', function ($scope) {
 
    $scope.showOn = true;
    $scope.showToggle = function () {
 
        $scope.showOn = !$scope.showOn;
 
    }
 
});
```
