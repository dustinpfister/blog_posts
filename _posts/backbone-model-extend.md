---
title: Making a new backbone Model with Backbone.Model.extend
date: 2017-11-02 10:35:00
tags: [js,backbone]
layout: post
categories: backbone
id: 83
updated: 2017-11-03 09:42:21
version: 1.3
---

In order to get started making a backbone model the first thing to do is use [Backbone.Model.extend](http://backbonejs.org/#Model-extend), and give it an object that will contain all of the methods, and objects that will be used to define the Model.

<!-- more -->

## What to know before hand

In this post I am writing about the Main method that is used to make in instance of a backbone model. This is not a post for anyone that is new to backbone, let alone javaScript. If that is the case I have a [getting started](/2017/11/01/backbone-getting-started/) post for backbone that will help get you up to speed.

Be sure to also check out my [post on backbone Models in general](/2017/11/02/backbone-model/) as well.

## A quick Backbone.Model.extend example

The Backbone.Model.extend method is where all the magic happens when making a Model with backbone. All I have to do is pass the Method an object that contains all of the methods, and attributes that compose a constructor that ca be used to make one or more instances of that Model.

For a quick, simple example I will throw together a Model that is the beginning of what might become an Idle game. Because making an idle game is way more fun than yet another todo app.

```js
// The Model
var Idle = Backbone.Model.extend(

        // you want to give Model.extend an object
        // that will contain all of the methods,
        // and attributes that compose your Model
    {
 
        // set some defaults
        defaults : {
 
            beens : 0
 
        },
 
        // what to do if some kind of user action happens
        manualGather : function () {
 
            var beens = this.get('beens');
 
            beens += 1;
 
            this.set('beens', beens);
 
        }
 
    });
 
// create an instance of the Model
var game = new Idle();
 
console.log('beens: ' + game.get('beens')); // 0
 
// use a method
game.manualGather();
 
console.log('beens: ' + game.get('beens')); // 1
```

