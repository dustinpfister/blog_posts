---
title: Using the same html template in angular with ng-repeat directive
date: 2017-12-17 22:43:00
tags: [js,node.js,hapi,angular]
layout: post
categories: angular
id: 116
updated: 2017-12-17 22:58:26
version: 1.0
---

The ng-repeat directive in angular is useful for using the same html over and over again with a bunch of objects that have similar structure.

<!-- more -->

## An ng-repeat angular example

Say you have a bunch pf objects, and each object has the same properties. It is possible to use ng-repeat to use some html as a template for all instances of the objects in an array that I have in my $scope.

Say I have an array of objects in $scope variable that contain information for enemy's in some kind of game. I want all the info displayed using the same standard html template.

So A template might look like this

<ul ng-app="enemyMod" ng-controller="EnemyList">
    <li ng-repeat="e in enemys">
        <h3>Desc: {{e.desc}}</h3>
        <p>Attack: {{e.attack}}</p>
        <p>Defence: {{e.defence}}</p>
    </li>
</ul>

A controller would have the $scope, In this example I am using a literal, but It could be grabbed from a service in some kind of real example.

## JS

```
var app = angular.module('enemyMod', []);

app.controller('EnemyList', function ($scope) {
    $scope.enemys = [
        {
            desc: 'Goblin',
            attack: 3,
            defence: 1
        }, {
            desc: 'Org',
            attack: 7,
            defence: 5
        }, {
            desc: 'Org boss',
            attack: 10,
            defence: 6
        }
    ];
});

Angular will see the ng-repeat directive and know it should use the object in $scope.enemys in my EnemyList controller as a way to create html using what is contained in the element with ng-repeat as a template resulting in something that is equivalent to the following html.

```html
<ul>
    <li>
        <h3>Desc: Goblin</h3>
        <p>Attack: 3</p>
        <p>Defence: 1</p>
    </li>
    <li>
        <h3>Desc: Org</h3>
        <p>Attack: 7</p>
        <p>Defence: 5</p>
    </li>
    <li>
        <h3>Desc: Org boxx</h3>
        <p>Attack: 10</p>
        <p>Defence: 6</p>
    </li>
</ul>
```

As such ng-repeat is a pretty useful directive.