---
title: The Bootstraping phase in Angular, ng-app, and angular.bootstarp 
date: 2017-12-15 16:58:00
tags: [js,node.js,hapi,angular]
layout: post
categories: angular
id: 114
updated: 2017-12-15 17:12:17
version: 1.0
---

The bootstrap phase in [Angular.js](https://angularjs.org/) is the first phase before complication, and runtime. This happens once angular is done loading in the browser, at which point angular initializes it's own components, and then takes a look at any modules that may be defined.

<!-- more -->

## Using angular.angular.bootstrap to run more than one angular app in the same page.

Typically In most cases just using the ng-app directive will work with most projects, however what if you have two complete separate apps that you want to run in the same page? One way is to use angular.bootstrap(el,['appname'])

```html
<div id="one" ng-app="appOne">
    <div ng-controller="control">
        <h1>{{mess}}</h1>
    </div>
</div>
 
<div id="two" ng-app="appTwo">
    <div ng-controller="control">
        <h1>{{mess}}</h1>
    </div>
</div>
```

```js
angular.module('appOne', []).controller('control', function($scope) {
       $scope.mess = 'I am app one';
});
 
angular.module('appTwo', []).controller('control', function($scope) {
       $scope.mess = 'I am app two';
});
 
angular.bootstrap(document.getElementById('two'),['appTwo']);
```

The problem with the ng-app directive is that angular will only bootstrap the first module. However angular can bootstrap more than one module on the same page, it just has to be done with angular.bootstrap, or some other means.