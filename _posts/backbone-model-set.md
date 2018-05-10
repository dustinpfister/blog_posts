---
title: Why you want to use the set method to change Model state values in backbone.
date: 2017-11-02 15:16:00
tags: [js,backbone]
layout: post
categories: backbone
id: 84
updated: 2017-11-02 15:42:17
version: 1.1
---

When making a backbone Model, I am going to get into main situations in which I will want to get, and set values for various attributes in the attributes object of a backbone Model. getting values is not a big deal as the model.get('foo') method is just a shorthand for model.attributes.foo. However it is important to use the set method to set values rather than directly modifying the attributes object so that any events that have been defined will work.

<!-- more -->

## What To know before hand

This is an advanced post on [backbone Models](http://backbonejs.org/#Model), be sure to check out [my main post on them](/2017/11/02/backbone-model/) before reading this if you are new to backbone.

## A Model quick demo 

So to outline why it is important to use set lets start with a real simple example of a backbone Model. In addition lets make a single instance of that Model, and define an event handler for it.

```js
var Item = Backbone.Model.extend(
 
    {
 
        // some defaults set with a function
        defaults : {
 
            foo : 'notbar',
            anwser : 10
 
        }
 
    }
 
);
 
// making a new instance of the Model
var i = new Item();
 
// adding an event hander that should fire
// when the anwser value changes
i.on('change:anwser', function () {
 
    console.log('a new anwser!');
 
});
```

## The event will not fire if I do not use set

The problem with just setting the value by directly changing the contents of attributes object is that no other code defined in backbones set method will run. As such any events that should fire will not fire.

```js
i.attributes.anwser = 43; // the event does not fire
```

## So use set, if you care about your events

```js
i.set('anwser',42); // 'a new anwser!'
```

## Conclusion

This all that comes to mind for now on this matter. Be sure to check out [my many other growing posts on backbone](/categories/backbone/) if you feel inclined.