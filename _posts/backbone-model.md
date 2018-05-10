---
title: A general overview of Models in backbone.js
date: 2017-11-02 09:15:00
tags: [js,backbone]
layout: post
categories: backbone
id: 80
updated: 2017-11-02 16:13:02
version: 1.6
---

In this post I will be writing a general overview of [Models in backbone](http://backbonejs.org/#Model). This post will not cover everything there is to know about them, but it will be a good starting point, and I will link to any, and all other posts of mine that have to do with backbone Models.

<!-- more -->

## What to know before hand.

I assume you have a descent understanding of client side javaScript, also this is not a getting started post for backbone, [I have written that before](/2017/11/01/backbone-getting-started/).

## The Whole Idea of Models in backbone

If you are new to javaScript, or for that matter coding in general, you might not be aware of the reasons why you might want to break things down into many separate components that may or may not depend on each other. Going on my experience so far whenever I start to make a project that is a little complicated there is a tenancy for things to get a little messy, one way to go about remedying that is to pull code that has to do with one thing, away from another. Such as removing code that has to do with the state, and management of a Model away from code that has to do with displaying some of that model, and allowing for an interface to work with it.

## A simple backbone model Example

If I where to make the most simple example of a backbone model it will typically still need to set some defaults for properties for that model. That can be done with a defaults object like this.

```js
var Item = Backbone.Model.extend(
 
    {
 
        // these are the default values that will
        // be augmented with the object that is passed
        // to the constructor function
        defaults : {
            title : 'unknown',
            done : false
        },
 
        // simple log method
        log : function () {
 
            console.log('title: ' + this.get('title') + '; done: ' + this.get('done'));
 
        }
 
    }
 
);
 
var blankItem = new Item();
 
blankItem.log(); // 'title: unknown; done: false
 
var it = new Item({title : 'foo'});
 
it.log(); // 'title: foo; done: false
```

This is one of the most basic ideas that come to mind In which I just set some defaults for the Model state, and have a method that just logs those values to the console. The Model should aways be something to that effect, an independent structure that just houses the current state of something, and has methods that help with updating, changing, and manipulating the state of that model. Viewing it, and working with it from a UI rather than the console is another matter when talking about a Model.

## Backbone.Model.extend

Check out my [full post on this](/2017/11/02/backbone-model-extend/)

So whenever I make a new backbone Model it is going to involve expanding on Backbone.Model.extend as shown in the above example.

## What to know about Model.defaults

Be sure to check out my [post on setting Model defaults](/2017/11/02/backbone-model-defaults/)

In the above example I am using an Object to do so, but in some cases you might want to use a function to set defaults if you do not want the same defaults object, and values referenced each time a new instance is made.

## Be sure to use Set, and get when working with the Models state.

Check out the [full post](/2017/11/02/backbone-model-set/)

When I first got started with backbone I assumed I could use the this keyword to get and set certain state properties, but this is not the case. Instead it is advised to use set to set a property, and get to retrieve it.

## The initialize method

If I do not set an initialize method in the object that defines my model then the harde coded default is a noop, or no operation method ( function(){} ). If there is something that I want done each time a new instance of a Model is made I will want to give an initialize method.

```js
var Angle = Backbone.Model.extend({
 
        // some defaults set with a function
        defaults : {
 
            mode : 'deg',
            angle : 46
 
        },
 
        normalize : function () {
 
            // if degrees
            if (this.get('mode') === 'deg') {
 
                this.set('angle', this.get('angle') % 360);
 
            } else {
 
                // else radians
 
                this.set('angle', this.get('angle') % (Math.PI * 2));
 
            }
 
        },
 
        initialize : function () {
 
            // what is written here is called once
            // each time a new instnace of the
            // model is made
 
            // normalize the angle given.
            this.normalize();
 
        }
 
    });
 
var a = new Angle({angle : 810});
 
console.log(a.get('angle')); // 90
 
var r = new Angle({mode:'rad', angle: Math.PI * 2.5});
 
console.log(r.get('angle')); // 1.57...
```

## Writing a custom constructor method

Check out the [full post](/2017/11/02/backbone-model-constructor/).

In most cases it is not necessary to make a custom constructor method, as the initialize method works just fine for this. However that can be done by just including a method for the key 'constructor'. I detail more about what needs to get done with this on a [full post about this](/2017/11/02/backbone-model-constructor/).

## Conclusion

The most important thing to understand about models is that they work independently from a certain view, and over all client system. It is possible to make a view with backbone, I have covered that briefly in my [getting started post](/2017/11/01/backbone-getting-started/) on backbone. However The model should also work by just calling methods from the javaScript console, and as such I can do anything I want when it comes to making a client system.

I will be writing many [posts on backbone](/categories/backbone/), as time goes on this post will be updated.