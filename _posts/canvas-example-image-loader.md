---
title: A Image loader canvas example
date: 2020-04-30 17:28:00
tags: [canvas]
layout: post
categories: canvas
id: 653
updated: 2020-04-30 17:34:27
version: 1.1
---

Most of my [canvas examples](/2020/03/23/canvas-example/) thus far do not involve using external images, but I might want to break that habit with some of them.

<!-- more -->

## 1 - The image loader module

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

### 1.1 - Basic example

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

```js
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
            console.log(per, i);
            console.log(img);
            console.log(e);
        },
        onError: function (e, i, img) {
            console.log('Error loading image');
            console.log(img);
            draw.back(ctx, canvas);
        },
        onDone: function (imgArr) {
            console.log('files loaded');
            console.log(imgArr);
            draw.back(ctx, canvas);
            ctx.drawImage(imgArr[0], 0, 0);
            ctx.drawImage(imgArr[1], 100, 0);
        }
    });
```
