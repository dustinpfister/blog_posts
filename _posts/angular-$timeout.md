---
title: Having a loop in angular with $timeout
date: 2017-12-18 10:29:00
tags: [js,node.js,hapi,angular]
layout: post
categories: angular
id: 117
updated: 2017-12-18 10:42:55
version: 1.1
---

When first starting out with angular I found myself having logic in my controllers which is not really what a controller id for. Loops, and app login in general, is best placed inside services made with module.factory, or one of the other options for doing so.

In this post I will be covering how I go about making a loop in a service, and using a controller to update the view with the latest data from that service.

<!-- more -->

## $timeout example made with module.factory.

For my example I will be making a service with module.factory called _loop_ and use that in a controller.

```js
var app = angular.module('app', []);
 
app.factory('loop', function ($timeout) {
 
    // a state
    var state = {
 
        start: new Date(),
        time: 0,
        count: 0,
        ms: 250
 
    },
 
    // loop
    loop = function () {
 
        var now = new Date();
 
        state.time = now - state.start;
 
        state.count += 1;
 
        $timeout(loop, state.ms);
 
    };
 
    // start loop
    loop();
 
    // api
    return {
 
        // grab the current state
        grab: function (func) {
 
            return state;
 
        }
 
    };
 
});
 
app.controller('fact-control', function ($scope, loop) {
 
        // reference the state object
        var state = loop.grab();
        $scope.state = state;
 
});
```

The grab method returns a reference to the internal state object. Because it's a reference I do not have to do anything weird in my controller. All I have to do is just simply set it to a property in $scope, and use it in my view.

```html
<div ng-app="app" ng-controller="fact-control" >
 
    <p>start time {{state.start}}</p>
    <p>time {{state.time}}</p>
    <p>count every {{state.ms}} ms</p>
    <p>count: {{state.count}}</p>
 
</div>
```

