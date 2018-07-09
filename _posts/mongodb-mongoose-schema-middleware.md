---
title: Mongoose Schema Middleware
date: 2018-07-09 15:02:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 231
updated: 2018-07-09 18:22:54
version: 1.5
---

This post is about making [Schema middelware using mongoose](http://mongoosejs.com/docs/middleware.html) as a [mongodb](https://www.mongodb.com/) client. Making such middleware for a schema is useful for preforming certain tasks such as sanitation, and producing certain values that are the result of a method before creating or updating a document. For example I could have a user model that has some middleware that makes sure that a username does not violate certain rules before continuing, rules like the username must begin with a letter, only contain permitted characters, and not exceed a set character length.

<!-- more -->

## 1 - what to know

This post is about mongoose middleware functions that act on a Schema that are used when making a model. It is not a post on models in general with mongoose, or mongodb in general. I also assume that you have a basic working knowledge of node.js, JavaScript, and other skills necessary to get anything of value from this post.

## 2 - An example of a schema level middleware in mongoose that involves Orbs.

I just started working on a project that will be the first of maybe a few mean stack application examples for this site. I thought that it would be nice to make at least one or two projects that are fun, so I can really get into it. So for an example of mongoose Shemea middlewareI will write about the current state of what will become one of several models that will be used in a game prototype that I am making that has to do with what I am calling Orbs.

I will not bore you with the details but for the sake of this post I want to have it so that every Orb will have an owner, and that owner will be the username that currently owns that Orb. So I can use a Shema middleware to make sure that the Orb has an owner before continuing with it's creation.

### 2.1 - The Orb Model

I start creating my Model by pulling in mongoose with require, and then referencing the Schema constructor. Once I have that I create a Schema for my model with the Schema constructor, I can then define a pre middleware by calling the pre method of the Schema instance, followed by the document function I want to make the middleware for, and then the function that defines the middleware.

```js
// grab mongoose
let mongoose = require('mongoose'),
Schema = mongoose.Schema;
 
// Schema
let OrbSchema = new Schema({
        
        points: {type: Array, default:[]},
        owner: {type: String, default: '_none'}
        
    });
 
// an orb must belong
OrbSchema.pre('save', function (next) {
 
   let e = null;
 
   if(this.owner === '_none' || !this.owner){
 
       e = new Error('The Orb must have an Owner')
 
   }
 
    console.log(this);
 
    next(e);
 
});
 
// The Orb Model
let Orb = mongoose.model('Orb', OrbSchema);
 
// export it
module.exports = Orb;
```

So with this example creating an Orb will result in an error if a username of '_none' which is the default for the current User model, or if the owner name results in false for any reason when converter to a boolean. I could also have it check if the user exsits, which would be even better, but you get the idea, these hooks are very useful for these kinds of checks.

### 2.2 - The create_orb script

```js
require('../lib/connect')(require('../connect.json')).then(function (mongoose) {
 
    let db = mongoose.connection,
    Orb = require('../models/orb'),
 
    // create the orb
    orb = new Orb({owner: process.argv[2] || null});
 
    // save the day
    orb.save(function (e, orb) {
 
        if (e) {
 
            console.log('create: error');
            console.log(e.message);
 
        } else {
 
            console.log('create: saved new orb');
            console.log(orb);
 
        }
 
        db.close();
 
    });
 
}).catch (function (e) {
 
    console.log(e.message);
 
});
```