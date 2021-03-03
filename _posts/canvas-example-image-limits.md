---
title: A canvas example on the limits to images
date: 2019-12-11 14:07:00
tags: [canvas]
layout: post
categories: canvas
id: 579
updated: 2021-03-03 18:56:18
version: 1.28
---

So now for yet another [canvas example](/2020/03/23/canvas-example/), this one is going to be pretty cool, or at least I think so. It has to do with the [limits of 2d images](https://medium.com/@adrian_cooney/generating-every-image-possible-21beed4789fe) when it comes to a set resolution and color depth. Or in other words every image that is possible when given a finite width, height and color depth.
 
When working with an image of any fixed width, height, and color depth there is a finite number of possible combinations for that kind of a matrix. Sure as you increase the resolution and color depth the total number of possibilities does start to become a crazy large finite number but it is still never the less a finite number never the less.

So with that said this is one of several ideas that keep coming back to be, and I revisit it now and then. So I though I would make it part of my canvas example collection of projects and write a post about this one because I think it is pretty cool. For now I think I might just stick with regular javaScript numbers when it comes to the image index values, but sooner or later I think this is the kind of project that calls for the use of high precession math via a module like bigInt.js or the javaScript built in [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) constructor.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/image-limits/0.0.0/pkg.js"></script>

## 1 - The image lib of the canvas example

I put together a library just for this canvas example. It contains methods that do things like converting an index number to a string that is formated depending on the color depth of the image matrix. 

Because I do not want to use a library for working with big numbers, and I also do not want to make use of the native big int type also the methods will work okay as long as I am dealing with low res and low depth images. I like to try to keep these canvas examples simple, but in a more serious version of this canvas example I would want to use big numbers that go beyond the limits of plain old javaScript numbers when it comes to concerns surrounding max safe int.

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

So the images that I am going to work with can be stored as a string of chars where each char is a color depth value. For this canvas example I am going to be keeping the color depth very low, so I can get away with each char in the string representing a color index value for each pixel. This kind of system should just about always work because I can not see the color depth getting really high as the number of possible combinations of images gets crazy high enough with just two index colors.

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

I then also have some methods that can be used to convert a string to an array of arrays where each element in a nested array is a pixel color index value. This is another format that I tend to work with often so I would like some convenience methods to convert to this from and back again.

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

Included in the collection of methods is a method that can be used to draw an image in chunk format to a given canvas. This method works by passing a reference to the canvas as the first argument, and then a chunk of the image as the second argument. I can also then use a custom pallet to set which color to draw for each index value.

```js
// draw to a canvas
IMG.draw = function (canvas, chunk, pal) {
    pal = pal || ['white', 'black', 'red', 'green', 'blue'];
    var ctx = canvas.getContext('2d'),
    size = canvas.width / chunk[0].length;
    chunk.forEach(function (row, y) {
        row.forEach(function (px, x) {
            ctx.fillStyle = pal[px] || 'black';
            ctx.fillRect(x * size, y * size, size, size);
        });
    });
};
```

## 2 - The utils lib

For the utility library I just have my create canvas method, and a get canvas relative method. These are to just create and append the canvas element itself, and get a pointer event position that is relative to the canvas rather than the window.

```js
var utils = {};
 
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
    opt.canvas.style.imageRendering = 'pixelated';
    opt.ctx.imageSmoothingEnabled = false;
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
 
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // ajust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};
```

## 3 - The main.js file and html

Now that I have my image library it is time to use it in a canvas example. Here in my main javaScript file that I will also be linking to in my html, I am grabbing references to a canvas element as well as a text input element. These elements will be used to display the current image, as well as the current index value fo the image. They will also server as a way to change the state of the image.

```js

var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
container = canvasObj.container;

var inputStr = document.createElement('input');
inputStr.setAttribute('id', 'img-str');
inputStr.setAttribute('type', 'text');
canvasObj.container.appendChild(inputStr);

var w = 4, h = 4,
colorDepth = 2,
str = IMG.stringFromIndex(38505, colorDepth, w * h),
matrix = IMG.stringToChunk(str, w);
inputStr.value = parseInt(str, colorDepth);
IMG.draw(canvas, matrix);

// update by clicking canvas
canvas.addEventListener('click', function (e) {
    var pos = utils.getCanvasRelative(e),
    size = canvas.width / w,
    x = Math.floor(pos.x / size),
    y = Math.floor(pos.y / size),
    px = matrix[y][x];
    px += 1;
    if (px >= colorDepth) {
        px = 0;
    }
    matrix[y][x] = px;
    str = IMG.chunkToString(matrix, colorDepth);
    inputStr.value = parseInt(str, colorDepth);
    IMG.draw(canvas, matrix);
    // draw ver
    ctx.fillStyle = 'lime';
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    ctx.fillText('v0.0.0', 5, canvas.height - 15);
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
        IMG.draw(canvas, matrix);
    }
});
```

Now that I have my image library and my main javaScript file that makes use of the library I can not link to them both in the html of the canvas example. Here I have two hard coded elements including the canvas element and the text input element that will be used to get and set the current image index number of the image.

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

## 4 - Conclusion

When I start up this project in my browser I can see the starting image that I have set. I can then use the mouse to click on the canvas and when doing so I change the indexed color value of the logical pixel of the matrix, in turn this also updates the index value in the text input element. I can also use the text input element to change the image also, and this can then also be used as a way to save the state of the image.

There is way more to develop and wrote about when it comes to this kind of canvas example. It would be nice to get inti using a library that will make used of big integers, as well as methods that will figure how long it will take to run there all possible image combinations. Still I think that this is a real cool canvas example even in its current crude form.