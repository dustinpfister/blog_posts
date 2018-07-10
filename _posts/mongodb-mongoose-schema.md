---
title: Mongoose Schema
date: 2018-07-09 15:01:00
tags: [js,mongodb]
layout: post
categories: mongodb
id: 230
updated: 2018-07-10 09:19:17
version: 1.5
---

This post is about working with a [database Schema](https://en.wikipedia.org/wiki/Database_schema) with [mongodb](https://www.mongodb.com/), using [mongoose](http://mongoosejs.com/docs/guide.html) as a mongodb client. A Schema can be thought of as a blueprint of sorts for a Model that will be used to create many instances of said Model that will compose a collection. So in other words a Shema is a formal way of setting up the format of a database item, mainly its properties, and what types each property should be. This post will be a quick overview of how to define and use a Schema in with mongoose.

<!-- more -->

## 1 - What to know

This post is about making a [Schema with mongoose](http://mongoosejs.com/docs/guide.html) the mongodb client. I am not going to get into detail about everything there is to write about with models, and mongodb here, just some basics with a Schema.


## 2 - A User Model Example of a Schema in mongoose

For an example of a Schema I will be writing about a Schema that I am making for a current project that is used for the User model. This Schema, the Model that uses it, and the project as a whole is a work in progress, but it should still serve well as a basic example of a Schema.


### 2.1 - Basic Schema example

So here is a basic example of a Schema in mongoose.

```js
// grab mongoose
let mongoose = require('mongoose'),
Schema = mongoose.Schema;
 
// the User Schema
 
let UserSchema = new Schema({
        name: String,
        password: String,
        createDate: Date,
        lastOn: Date
    });
```

I start out by grabbing a reference to mongoose, and then Schema constructor. I then use the Schema constructor to create an instance of Schema. In doing so I pass the Schema constructor an object that contains the names of all the properties that define an instance of the Model that will use this Schema. In this object at a minimum contains the constructors that will be used for each property, but it can be more than that of course.

### 2.2 - Setting defaults for properties

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

Here is the beginnings of what will become a User Model, it \

### 2.3 - Some pre save middleware hooks

```js
// Must have a name
UserSchema.pre('save', function (next) {
 
    let e = null;
 
    if (this.name === '_none' || !this.name) {
 
        e = new Error('name equals the default value _none, or evaluates to false');
 
    }
 
    next(e);
 
});
 
// The name must begin with a lowercase letter, and can not be longer than ten chars
UserSchema.pre('save', function (next) {
 
    let e = null;
 
    if (!this.name.match(/^[a-d]/) || this.name.length > 10) {
 
        e = new Error('must begin with a lowercase letter');
 
    }
 
    next(e);
 
});
```

### 2.4 - Static methods

```js
// find by name
UserSchema.statics.findByName = function (name, cb) {
 
    return this.find({
        name: name
    }, cb);
 
};
```