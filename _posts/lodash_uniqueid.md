---
title: Using _.uniqueId in lodash, and alternatives
date: 2018-10-03 18:14:00
tags: [js,lodash]
layout: post
categories: lodash
id: 296
updated: 2018-10-03 20:46:10
version: 1.3
---

Writing more content on [lodash](https://lodash.com/) this month for now, and have noticed that I did not get around to \_.uniqueId yet. The method addresses something that comes up a lot now and then when developing projects, so it deserves a post. Also in these lodash posts I often take a moment to brush up on how hard it is to go about making a vanilla js solution, or if there are native methods that can be used, and as such this post will be no exception. So lets take a look at \_.uniqueId, and some other solutions for generating unique ids.

<!-- more -->

## 1 - What to know

This is a post on the \_.uniqueId method in lodash. This method can be used to create a unique id for something each time it is called. This method will work for the purpose of assigning a unique id for most use cases, but not with complex projects that require a unique id always even if the project restarts. In any case this will be a brief post on this topic.

## 2 - An \_.uniqueId example

```js
let _ = require('lodash');
 
let id = _.uniqueId('id_');
 
console.log(id); // 'id_1'
 
let i = 10, ids = [];
while (i--) {
    ids.push(_.uniqueId('id_'));
}
 
console.log(ids[0]); // id_2
console.log(ids[9]); // id_11
```

## 3 Vanilla js alternative to \_.uniqueId

```js
let uniqueId = (function () {
    let num = 0;
    return function (prefix) {
        prefix = String(prefix) || '';
        num += 1;
        return prefix + num;
    }
}
    ());

let id = uniqueId('id_');
console.log(id); // 'id_1'
```
