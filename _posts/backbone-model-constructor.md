---
title: Making a custom backbone model constructor
date: 2017-11-02 10:36:00
tags: [js,backbone]
layout: post
categories: backbone
id: 82
updated: 2017-11-02 15:54:47
version: 1.3
---

Generally it is not need to make a custom [constructor method](http://backbonejs.org/#Model-constructor) for a backbone Model. However if for some reason it is needed doing so is as simple as just adding one to the object that is passed to Backbone Model.extend, when making the Model.
<!-- more -->

## What to know before hand

This is an advanced post on backbone Models, be sure to check out my [Main post on Models](/2017/11/02/backbone-model/) if you want to know more about them in general. Also I you are new to backbone you will want to check out my [getting start post](/2017/11/01/backbone-getting-started/) on backbone as well.

## Is it okay to do this?

Sure is, it's just that in most cases it is not needed, there is much that can be done with the initialize method. However if for some reason that does not cut it, it is also possible to define a constructor method for the model.

## Making a custom constructor method for the model

So to do this just add a constructor method to the object that is passed to Backbone.Model.extend like this:

```js
var Item = Backbone.Model.extend(
 
    {
 
        // set some defaults
        defaults : {
            title : 'unknown',
            done : false,
            time : new Date(0) // and old date
        },
 
        // making a custom constructor
        constructor : function () {
 
            // this is what backbones built in constructor does.
            Backbone.Model.apply(this, arguments);
 
            // but set the time to now (it's not 1969,
            // or whatever time I placed in the defaults object)
            this.set('time', new Date());
 
        },
 
        // simple log method
        log : function () {
 
            console.log('title: ' + this.get('title') + '; done: ' + this.get('done'));
 
        }
 
    }
 
);
 
var blankItem = new Item();
 
console.log(blankItem.get('time')); // the time it was created
 
var later = function () {
 
    var it = new Item({
            title : 'foo'
        });
 
    console.log(it.get('time')); // the time it was created
 
};
 
setTimeout(later, 3000);
 
```

## Conclusion

So far I have not found myself in many situations in which I need to do this, however I am still somewhat new to using backbone.