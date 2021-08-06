---
title: JavaScript general utility module example
date: 2021-08-06 11:09:00
tags: [js]
layout: post
categories: js
id: 923
updated: 2021-08-06 11:25:53
version: 1.4
---

When I start a new project I often want to have a generic dumping ground for usual suspect type methods, in other words a kind of lodash like module only with methods that I am actually going to use in the project. Many methods that I might park in this kind of module might utility end up in some other module that has to do with something more specific such as working with angles, or creating and working with canvas elements, however when first starting out I just need a place to put them. So in todays post I will be going over a general utility module and the kind of methods that I might place in such a module that will serve as yet another one o my [javascript example](/2021/04/02/js-javascript-example/) type posts.

<!-- more -->

## 1 - The utils module

### 1.1 - Start of the module and noop

```js
var utils = {};
// no operation ref
utils.noop = function(){};
```

### 1.2 - A distance formula

```js
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

### 1.3 - Bounding box

```js
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
```

### 1.4 - Mathematical Modulo

```js
// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};
```

### 1.5 - create a create canvas element method

```js
// create a canvas element
utils.createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () { return false; }
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
```

### 1.6 - Get a canvas relative position method

```js
// get a canvas relative position that is adjusted for scale
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // adjust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};
```

