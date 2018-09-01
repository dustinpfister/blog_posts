---
title: Making a group of sprites in phaser with group.create
date: 2018-08-30 18:32:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 274
updated: 2018-09-01 17:26:52
version: 1.1
---

In this post on [Phaser ce](https://photonstorm.github.io/phaser-ce/) I will be covering some examples of making a collection of sprites using Group.create. There is also Group.add that can be used to add sprites, as well as many display objects as well, however in this post the emphasis will be just on sprites.

<!-- more -->

## 1 - What to know



### 2 - Using \_.defaults when making a constructor


```js
let Box = function (opt) {
 
    opt = opt || {};
 
    // handle defaults
    _.defaults(opt, {
        width: 32,
        height: 32,
        x: 0,
        y: 0
    });
 
    // merge in opt
    _.merge(this, opt);
 
};
 
// works as expected
let bx = new Box();
console.log(bx.width); // 32;
 
let bx2 = new Box({width:64,x:37});
console.log(bx2.width); // 64
console.log(bx2.x); // 37
console.log(bx2.y); // 0
```
