---
title: Making my own angular.js directives with the module api
date: 2017-12-19 12:59:00
tags: [js,node.js,hapi,angular]
layout: post
categories: angular
id: 118
updated: 2017-12-19 13:29:53
version: 1.2
---

Directives are a big part of angular.js web application development. If you have ever used angular at all you have used at least some built in directives such as ng-app, and ng-repeat. However it is possible to create your own directives using the directive method in the module api when creating an angular module.

<!-- more -->

Whats really cool about this is that It allows for me to create my own html elements, and attributes. In other words it allows for me to extend the functionally of html, and make something very complicated as simple as just having an element in an html document like this.

```
<x-my-element></x-my-element>
```

## Basic example of making a directive in angularjs

It is possible to make directives in a way where they can be elements, attributes, classes, and event comments. For my basic demo of this lets start with an attribute.

```html
<div ng-app="app">
 
   <div first-directive></div>
 
</div>
```

So then my angular module that I will be calling simply _app_ will look like this:

```js
var app = angular.module('app', []);
 
app.directive('firstDirective', function () {
 
    return {
 
        restrict: 'AE',
        replace: 'true',
        template: '<p>My own directive</p>'
 
    };
 
});
```

This will inject the text _my own directive_ into any element in which I use it. Of course it can be something much more than just a simple string, but hopefully you get the basic idea.

## The object to return when using module.directive

When using the directive method I will want to return an object with at least a template, replace, and restrict properties. The template is of course the html that will be used in my directive, replace set to true means that any content in the element used with the directive will be replaces with what I am defining in my directive. The restrict property is used to tell angular that this directive can be used as an element, or an attribute.

Heres a full list of the properties of this object that is returned in module.directive:

* restrict - What the directive should be restricted to in html, In this demo it can be used as an Element or an attribute. If I want to use the directive as an element, attribute, and class I would want to set it to "AEC"

* replace - If set to true the directive will replace what may be inside the element with what is generated, else if false the content will be appended to whatever may be there to begin with.

* template - This is of course the html that is to be used. It does not have to be a simple string, it can involve other directives, and so forth.

* templateUrl - this can be used to link to an external template

* link - add custom $scope to a directive.

* compile - I use this if I need to do something once during the angular compile phase.

## directives and $scope of a controller

The new directive that I make does not get it's own scope, at least not out of the gate, instead it uses the scope of its parent element.

```js
app.directive('useController', function () {
 
    return {
 
        restrict: 'AE',
        replace: 'true',
        template: '<p>{{mess}}</p>'
 
    };
 
});
 
app.controller('the-controller', function ($scope) {
 
    $scope.mess = 'using the controller';
 
});
```

It is possible to append some things to $scope if they are not given from the parent element, This is where the link property comes into play.

## adding $scope to a directive using the link property

If I want to add some custom stuff to $scope i can do so with the link property of the object

```js
app.directive('addScope', function () {
 
    return {
 
        restrict: 'AE',
        replace: 'true',
        template: '<p>{{mess}}</p>',
        link: function (scope, el, att) {
 
            if (!scope.mess) {
 
                scope.mess = 'this is some local stuff.';
 
            }
        }
 
    };
 
});
```

## the compile property

The compile property is useful i find myself in a situation in which I want to do something during the compile phase of angulars life cycle. For the most part link alone will work fine with what I want to accomplish, but in some cases it might be a bit more efficient.

```js
app.directive('many', function () {
 
    return {
 
        restrict: 'AE',
        replace: 'true',
        template: '<div><p>{{p.mess}}</p></div>',
        compile: function (el, att) {
 
            console.log('complie');
            return this.link;
 
        },
        link: function (scope, el, att) {
 
            console.log('link');
 
            if (!scope.p) {
 
                scope.p = {mess:'single use'};
 
            }
 
        }
 
    };
 
});
 
app.controller('manyControl', function ($scope) {
    $scope.obj = [{
            mess: 'one'
        }, {
            mess: 'two'
        }, {
            mess: 'three'
        }
    ];
});
```

```html
<div ng-app="app">
 
    <div ng-controller="manyControl">
 
        <!-- repeat -->
        <div ng-repeat="p in obj">
            <data-many></data-many>
        </div>

        <!-- single use -->
        <data-many></data-many>
 
    </div>
 
</div>
```

## conclusion

This might be one of the most useful aspects of angular. It allows to take something that might be a bit of a mess and structure it in a way in which it is all pretty easy to follow. I am still a little new to angular, but so far I can clearly see why this framework is so popular.