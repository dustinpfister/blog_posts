---
title: Examples of the _.pick object method in lodash
date: 2018-07-11 12:29:00
tags: [js,lodash]
layout: post
categories: lodash
id: 233
updated: 2018-07-11 15:48:18
version: 1.8
---

When working with objects it is sometimes nice to quickly be able to make a custom object that is composed of properties from another object, just a few of them, not the whole thing. For this in [lodash](https://lodash.com/) there is the [\_.pick](https://lodash.com/docs/4.17.10#pick) method that can be used to create a new object that is a shallow copy of a given object, but with only properties that are in a given list of property names.


<!-- more -->

## 1 - What to know

This is a post on just the \_.pick method in lodash. Here I will be writing just about that method, and some other related topics, but will not be getting into detail with lodash, or javaScript in general.

## 2 - An example of using \_.pick involving an object about traffic received in a day.

For a basic example of using \_.pick I will be giving a simple object that is created from the object literal notation. This object contains some simple primitives, and one property that is an Array. This will serve well as an example of what \_.pick does, and also what to look out for when using it.

### 2.1 - The day object

So here is that day object that will be used in some examples here.

```js
let _ = require('lodash');

var day = {
    date: '1/2/17',
    users: 10,
    pageviews: 13,
    pages: [{
            path: '/2017/01/01/hello/',
            users: 3,
            pageviews: 4
        }, {
            path: '/2017/01/02/hello-again/',
            users: 7,
            pageviews: 9
        }

    ]
};
```

When dealing with an object like this, there might be scenarios where I might just want the date, and users properties. Also In some cases I might want the pages Array, and have it so it is a deep copy as well.

### 2.2 - Basic example of \_.pick, to get just the date, and users from the day object.

So if I want a new object that is just a shallow copy of some of the primitive values of the day object, \_.pick works just fine out of the gate like this.

```js
console.log( _.pick(day, ['date', 'users']) ); // { date: '1/2/17', users: 10 }
```

I have my object with just the properties that I want, without the rest of the clutter, great. However things can get a little tricky when it comes to properties that have values that are not primitives.

### 2.3 - With \_.pick the object returned is a shallow clone

So if I get another new object that is the result of using \_.pick, but this time include the pages array, some might think that this array is a copy, or clone of the original. It is not, anything non-primitive will be referenced in.

```js
let custom = _.pick(day, ['date','users','pages']);

// what is returned is a shallow clone
day.users += 50;
console.log(day.users); // 60
console.log(custom.users); // 10
 
// but not a deep clone
day.pages[0].users += 50;
console.log(day.pages[0].users); // 53
console.log(custom.pages[0].users); // 53
```

In some cases this is not a problem if I actually want references rather than a copy. However if it is a problem one solution is to just make a \_.deepClone of the object, then passing that as the object for \_.pick.

### 2.4 - If a deep clone is needed try just doing a \_.deepclone on the object that is given to \_.pick.

If I want the pages array to be a copy, rather than a reference then this is where methods like \_.deepClone come into play.

```js
let custom = _.pick(_.cloneDeep(day), ['date','pages']);
 
day.pages[0].users += 50;
 
console.log(day.pages[0].users); // 53
console.log(custom.pages[0].users); // 3
```

## 3 - Picking from a Class

When using \_.pick a new object is going to be returned, so if I am using an object that has a constructor other than that of Object, then I am going to loose everything attached to the prototype. This is one of the main things to consider when doing anything with objects. Do I want a copy, or are references okay, and do I care about the prototype.

### 3.1 - The Day constructor

Say for example I have a Day constructor that can be used to create in instance of a day object rather than just an object literal.

```js
let Day = function (options) {
 
    options = options || {};
    this.date = options.date || '1/1/00';
    this.pages = [];
    this.users = 0;
    this.pageviews = 0;
 
    if (options.pages) {
 
        this.setPages(options.pages, this.date);
 
    }
 
};
 
// set pages
Day.prototype.setPages = function (pages) {
 
    let day = this;
    day.pages = _.cloneDeep(pages);
    day.setFromPages();
 
};
 
Day.prototype.setFromPages = function () {
 
    let day = this;
    day.users = 0;
    day.pageviews = 0;
 
    _.each(day.pages, function (page) {
 
        day.users += page.users ? page.users : 0;
        day.pageviews += page.pageviews ? page.pageviews : 0;
 
    });
 
};
 
Day.prototype.bounceRate = function () {
 
    return this.users / this.pageviews;
 
}
```

This differs from my earlier example in that now I can create an object that has a prototype with it.

```js
let day = new Day({
    date: '1/2/17',
    pages: [{
        path: '/2017/01/01/hello/',
        users: 3,
        pageviews: 4
    }, {
        path: '/2017/01/02/hello-again/',
        users: 7,
        pageviews: 9
    }]
});
console.log( day.constructor.name ); // 'Day'
console.log( {}.constructor.name ); // 'Object'
```
