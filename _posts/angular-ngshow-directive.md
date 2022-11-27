---
title: Using the angular.js ng-show directive to toggle the display of an element
date: 2017-12-21 11:10:00
tags: [js,node.js,hapi,angular,canvas]
layout: post
categories: angular
id: 120
updated: 2022-11-27 11:21:01
version: 1.2
---

When working with [angular.js](https://angularjs.org/) there may come a time to have a way to toggle the display of a given element. There are many ways of doing this, but if you wish to stick to some kind of angular.js built in way of pulling it off there is [ng-show](https://docs.angularjs.org/api/ng/directive/ngShow).

The ng-show directive will show or hide the element that it is used in depending on the expression provided to it with the ng-show attribute. This can be a useful way to toggle the display of something on and off, such as a UI component of some kind that is part of a custom directive.

<!-- more -->

## The ng-show directive basic use example

For the HTML I have this worked out where I have a main div element that is where I will have my main mount point for this demo. I am then using the nv [controler directive](https://docs.angularjs.org/api/ng/directive/ngController) and using the value toggle for it. For a nested div I am then using the ng-show direction and have some nested content in that div that will display when it is viable.

```html
<div ng-app="app" ng-controller="toggle">
    <div ng-show="showOn" class="ng-hide" >
        <p>Okay it is visable</p>
    </div>
    <input type="button" value="toggle show" ng-click="showToggle()">
</div>
```

In my javaScript code I am then defining what the toggle controller will be. With this controller I just have to so that there is a show on bool as part of the scope. When the show toggle function is called each time there is a click this bool value will be switched back and forth.

```js
var app = angular.module('app', []);
app.controller('toggle', function ($scope) {
    $scope.showOn = true;
    $scope.showToggle = function () {
        $scope.showOn = !$scope.showOn;
    }
});
```

## Conclusion

That is if for this post at least, I might get around to doing some more editing of my old angular js content at some point in the future, but maybe only while I am updating my vuejs content when doing so. I have found that I very much prefer to us vuejs over that of angular when it comes to using this kind of front end framework. Also I might have to get into editing this kind of content now and then when I update my posts on plain old vanilla javaScript as well. I can not say that I use angular that much, in fact thus far I am not really using it all in favor of vuejs, or just plain vanilla javaScript. So this is then one major reason why I have been neglecting my content on angularjs.

Speaking of vuejs there is reading my post on how to do this [sort of thing in vuejs](/2019/05/22/vuejs-if) rather than that of angularjs by making use of the if directive in vuejs. Also speaking of vanilla javaScript it is not like doing this sort of thing is that hard when it comes to kicking any and all front end frameworks to the curb and just directly work within the web browser. One way would be to just get a reference to one or more div elements that I want to show or hide by one means or another, and then just make use of something like that of the [style api](/2019/02/12/js-javascript-style/) to set the CSS value that will be used to show or hind the element. The CSS properties that could be changed are the [visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) or the [display property](https://developer.mozilla.org/en-US/docs/Web/CSS/display).

