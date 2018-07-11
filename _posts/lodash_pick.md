---
title: Examples of the _.pick object method in lodash
date: 2018-07-11 12:29:00
tags: [js,lodash]
layout: post
categories: lodash
id: 233
updated: 2018-07-11 13:17:09
version: 1.2
---

When working with objects it is sometimes nice to quickly be able to make a custom object that is composed of properties from another object, just a few of them, not the whole thing. For this in [lodash](https://lodash.com/) there is the [\_.pick](https://lodash.com/docs/4.17.10#pick) method that can be used to create a new object that is a shallow copy of a given object, but with only properties that are in a given list of property names.


<!-- more -->


## 2 - An example of using \_.pick involving an object about traffic received in a day.

### 2.1 - The day object

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

### 2.2 - Basic exmaple of \_.pick, to get just the date, and users from the day object.

```js
console.log( _.pick(day, ['date', 'users']) );
```

### 2.3 - With \_.pick the object returned is a shallow clone

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

### 2.4 - If a deep clone is needed try just doing a \_.deepclone on the object that is given to \_.pick.


```js
let custom = _.pick(_.cloneDeep(day), ['date','pages']);
 
day.pages[0].users += 50;
 
console.log(day.pages[0].users); // 53
console.log(custom.pages[0].users); // 3
```
