---
title: Mongoose Schema Middleware
date: 2018-07-09 15:02:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 231
updated: 2018-07-09 17:54:08
version: 1.1
---

This post is about making [Schema middelware using mongoose](http://mongoosejs.com/docs/middleware.html) as a [mongodb](https://www.mongodb.com/) client.

<!-- more -->


## 2 - Basic example of a schema level middleware in mongoose.

### 2.1 - The Setup

### 2.2 - The Orb Model

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

### 2.3 - The create_orb script

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