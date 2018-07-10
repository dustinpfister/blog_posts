---
title: Mongoose Schema
date: 2018-07-09 15:01:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 230
updated: 2018-07-09 20:01:14
version: 1.2
---

This post is about working with a [database Schema](https://en.wikipedia.org/wiki/Database_schema) with [mongodb](https://www.mongodb.com/), using [mongoose](http://mongoosejs.com/docs/guide.html) as a mongodb client. A Schema can be thought of as a blueprint of sorts for a Model that will be used to create many instances of said Model that will compose a collection. So in other words a Shema is a formal way of setting up the format of a database item, mainly its properties, and what types each property should be. This post will be a quick overview of how to define and use a Schema in with mongoose.

<!-- more -->

## 1 - What to know

This post is about making a [Schema with mongoose](http://mongoosejs.com/docs/guide.html) the mongodb client. I am not going to get into detail about everything there is to write about with models, and mongodb here, just some basics with a Schema.


## 2 - Basic Example of a Schema in mongoose

```js
// grab mongoose
let mongoose = require('mongoose'),
Schema = mongoose.Schema;
 
// the User Schema
 
let UserSchema = new Schema({
        name: { type: String, default: '_none'},
        password: { type: String, default: '1234'},
        createDate: { type: Date, default: Date.now},
        lastOn: { type: Date, default: Date.now}
    });
```