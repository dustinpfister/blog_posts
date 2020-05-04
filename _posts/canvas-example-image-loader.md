---
title: A Image loader canvas example
date: 2020-04-30 17:28:00
tags: [canvas]
layout: post
categories: canvas
id: 653
updated: 2020-05-04 18:22:08
version: 1.10
---

Most of my [canvas examples](/2020/03/23/canvas-example/) thus far do not involve using external images, but I might want to break that habit with some of them. For the most part just using simple fill rect 2d context calls will work just fine when it comes to working out mechanics, however there will come a time sooner or later where I will want to skin the project with some images. Popular canvas frameworks should have a way to go about loading images, but in this post I will be writing about a vanilla javaScript solution that I worked out for loading images.

There is much more beyond just loading the images when it comes to things like how to go about figuring out where all the frame index value are if the image is a sprite sheet. However as I see it a lot of that might have to do with the project, there are many ways to go about solving that problem and as such it is required to pick one and more froward. However in any case there is of course still just loading one or more images first so lets get to it.

<!-- more -->

## 1 - The image loader module

The first thing I would work out is a main image loader module that I would make in a way that is reusable for more than one project. So this module will just be used to load images and just about everything else that comes to mind should be handled elsewhere.

```js
var imgLoad = (function () {
    return function (opt) {
        opt = opt || {};
        opt.baseURL = opt.baseURL || '';
        opt.fileType = opt.fileType || '.png';
        opt.fileCount = opt.fileCount || 1;
        opt.onFileLoad = opt.onFileLoad || function () {};
        opt.onDone = opt.onDone || function () {};
        opt.onError = opt.onError || function () {};
        var img,
        imgArr = [],
        i = 0,
        count = 0;
        while (i < opt.fileCount) {
            img = new Image();
            (function (i, img) {
                img.addEventListener('load', function (e) {
                    count += 1;
                    // call on file load method
                    opt.onFileLoad(count / opt.fileCount, i, img, e);
                    // if last file call on done
                    if (count === opt.fileCount) {
                        opt.onDone(imgArr);
                    }
                });
                img.addEventListener('error', function (e) {
                    opt.onError(e, i, img);
                });
            }
                (i, img));
            imgArr.push(img);
            img.src = opt.baseURL + i + opt.fileType;
            i += 1;
        };
        return imgArr;
    };
}
    ());
```

## 2 - A Simple use case example of the image loader module

So now that I have a simple image file loader module in this section I will be going over a simple example of using it.

## 2.1 - draw.js

So for this example I have a draw.js module that is used to just draw a background to a canvas element, and one additional method that I can use to draw cells from a sprite sheet.

```js
var draw = (function () {
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        // crude starting draw cell index method
        cellIndex: function (ctx, sheet, cellIndex, x, y, opt) {
            opt = opt || {};
            opt.cellWidthPX = opt.cellWidth || 32;
            opt.cellHeightPX = opt.cellHeight || 32;
            opt.drawWidth = opt.drawWidth || 32;
            opt.drawHeight = opt.drawHeight || 32;
            var sx = sheet.width / opt.cellWidthPX * cellIndex,
            sy = 0,
            sw = opt.cellWidthPX,
            sh = opt.cellHeightPX;
            ctx.drawImage(sheet,
                sheet.width / opt.cellWidthPX * cellIndex, 0,
                opt.cellWidthPX, opt.cellHeightPX,
                x, y,
                opt.drawWidth, opt.drawHeight);
        }
    }
}
    ());
```

 However in order to use my draw cell index method I will first need to load some images so lets get to the main.js file.

### 2.2 - The main.js and index.html

Here I have a main.js file where I create a canvas element, and use my image loader module to load some image assets.

```js
// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var img = imgLoad({
        baseURL: './img/',
        fileCount: 2,
        onFileLoad: function (per, i, img, e) {
            // update something like a loading bar here
        },
        onError: function (e, i, img) {
            console.log('Error loading image');
            console.log(img);
            draw.back(ctx, canvas);
        },
        onDone: function (imgArr) {
            console.log('files loaded');
            draw.back(ctx, canvas);
            draw.cellIndex(ctx, imgArr[1], 0, 10, 10);
        }
    });
```

So now I just need some html to tie this all together.

```html
<html>
    <head>
        <title>canvas example image loader</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="./lib/img_load.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

So far things seem to work as expected when this example is up and running.


## 3 - Conclusion

So far this image loader solution seems to work okay, but I will want to have some more use case examples of it. There is a lot more that comes to mind when it comes to working with sprite sheets such as how to go about having cells of animations organized. However some kind of sprite sheet object constructor should maybe be a part of another project all together. Some images will just be backgrounds and things to that effect, and in any case I do just simple need to load the images first anyway.