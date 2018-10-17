---
title: Why you want to use the set method to change Model state values in backbone.
date: 2017-11-02 15:16:00
tags: [js,backbone]
layout: post
categories: backbone
id: 84
updated: 2018-10-17 16:28:32
version: 1.4
---

When making a [backbone](http://backbonejs.org/) [Model](http://backbonejs.org/#Model), I am going to get into many situations in which I will want to get, and set values for various attributes in the attributes object of a backbone Model. Getting values is not a big deal as the model.get('foo') method is just a shorthand for model.attributes.foo. However it is important to use the [set method](http://backbonejs.org/#Model-set) to set values rather than directly modifying the attributes object so that any events that have been defined will work. In this post I will be showing some simple examples of the set model method in backbone.

<!-- more -->

## 1 - What To know before hand

This is an advanced post on backbone Models, be sure to check out [my main post on them](/2017/11/02/backbone-model/) before reading this if you are new to backbone. Also this is not a getting [started post on backbone](/2017/11/01/backbone-getting-started/), or javaScript in general so I trust that you have logged at least some time getting up to speed with the basics so far.

## 2 - A quick demo of Model.set

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

### 2.1 - The event will not fire if I do not use set

The problem with just setting the value by directly changing the contents of attributes object is that no other code defined in backbones set method will run. As such any events that should fire will not fire.

```js
i.attributes.anwser = 43; // the event does not fire
```

## So use set, if you care about your events

```js
i.set('anwser',42); // 'a new anwser!'
```

## 3 - Conclusion

This all that comes to mind for now on this matter. Be sure to check out [my many other growing posts on backbone](/categories/backbone/) if you feel inclined.