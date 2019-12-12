---
title: A grid defense game canvas example
date: 2019-11-27 14:07:00
tags: [js, canvas]
layout: post
categories: canvas
id: 579
updated: 2019-12-11 20:13:10
version: 1.6
---

So now for yet another canvas example, this one is going to be pretty cool, or at least I think so. It has to do with the limits of 2d images.

<!-- more -->


## 1 - The image lib of the canvas example

I put together a library just for this canvas example. It contains methods that do things like converting an index number to a string that is formated depending on the color depth of the image matrix.

### 1.1 - Beginning of the library, total images, and past safe integer methods

So I started off the library with just an object literal, the reason why is because I think this kind of pattern will work okay for this module. The whole module is just going to be a collection of methods that just accept arguments and return a product without anything going on with a state.

The first method is just a total images method that I pass the width, height, and color depth of an image matrix, and receive the total number of possible images for that matrix. For this project I am just using plain old javaScript numbers, so I do not want to go over the max safe integer when it comes to the total images value. So to make sure things are good with that I also have a pastSafe method.

```js
var IMG = {};

IMG.totalImages = function (w, h, colorDepth) {
    return Math.pow(colorDepth, w * h);
};
IMG.pastSafe = function (w, h, colorDepth) {
    return totalImages(w, h, colorDepth) >= Number.MAX_SAFE_INTEGER
};
```

### 1.2 - Get an index number from an image string, and create a string from an index number

So the images that I am going to work with can be stored as a string of chars. For this canvas example I am going to be keeping the color depth very low, so I can get away with each char in the string representing a color index value for each pixel.

```js
IMG.indexFromString = function (string, colorDepth) {
    colorDepth = colorDepth || 2;
    var index = 0;
    string.split('').forEach(function (pix, i) {
        index += Math.pow(colorDepth, i) * parseInt(pix, colorDepth);
    });
    return index;
}
// create a image String from an index value of a color depth and size
IMG.stringFromIndex = function (index, colorDepth, size) {
    index = index || 0;
    size = size || 7 * 7;
    colorDepth = colorDepth || 2;
    var maxIndex = Math.pow(colorDepth, size) - 1,
    num,
    baseStr;
    if (index > maxIndex) {
        index = maxIndex;
    }
    if (index < 0) {
        index = 0;
    }
    num = index.toString(colorDepth);
    baseStr = new Array(size).fill('0').join('');
    return String(baseStr + num).slice(size * -1).split('').reverse().join('');
};
```

### 1.3 - Chunk a string and back

```js
// chunk and img string into an array of arrays
// with the given width
IMG.stringToChunk = function (str, w) {
    var i = 0,
    strArr = str.split(''),
    arr = [];
    while (i < str.length) {
        arr.push(strArr.slice(i, i + w));
        i += w;
    }
    return arr;
};
IMG.chunkToString = function (chunk, colorDepth) {
    colorDepth = colorDepth || 2;
    var str = '';
    chunk.forEach(function (row, y) {
        row.forEach(function (px, x) {
            str += Number(px);
        });
    });
    return str.split('').reverse().join('');
};
```

### 1.4 - Draw to a canvas

```js
// draw to a canvas
IMG.draw = function (canvas, chunk, w, pal) {
    pal = pal || ['white', 'black', 'red', 'green', 'blue'];
    var ctx = canvas.getContext('2d'),
    size = canvas.width / w;
    chunk.forEach(function (row, y) {
        row.forEach(function (px, x) {
            ctx.fillStyle = pal[px] || 'black';
            ctx.fillRect(x * size, y * size, size, size);
        });
    });
};
```

## 2 - The main.js file and html

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d'),
inputStr = document.getElementById('img-str');

canvas.width = 320;
canvas.height = 320;
 
var w = 4, h = 4,
colorDepth = 2,
str = IMG.stringFromIndex(38505, colorDepth, w * h),
matrix = IMG.stringToChunk(str, w);
inputStr.value = parseInt(str, colorDepth);
IMG.draw(canvas, matrix, w);
 
// update by clicking canvas
canvas.addEventListener('click', function (e) {
    var bx = e.target.getBoundingClientRect(),
    size = canvas.width / w,
    x = Math.floor((e.clientX - bx.left) / size),
    y = Math.floor((e.clientY - bx.top) / size),
    px = matrix[y][x];
    px += 1;
    if (px >= colorDepth) {
        px = 0;
    }
    matrix[y][x] = px;
    str = IMG.chunkToString(matrix, colorDepth);
    inputStr.value = parseInt(str, colorDepth);
    IMG.draw(canvas, matrix, w);
});
// update from input element
inputStr.addEventListener('keyup', function (e) {
    var text = e.target.value,
    n = parseInt(text);
    if (n.toString() != 'NaN') {
        if (n >= IMG.totalImages(w, h, colorDepth)) {
            n = e.target.value = IMG.totalImages(w, h, colorDepth) - 1;
        }
        if (n < 0) {
            n = e.target.value = 0;
        }
        str = IMG.stringFromIndex(n, colorDepth, w * h);
        matrix = IMG.stringToChunk(str, w);
        IMG.draw(canvas, matrix, w);
    }
});
```

```html
<html>
    <head>
        <title>canvas example image limits</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas><br><br>
        <input id="img-str" type="text" >
        <script src="img.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```