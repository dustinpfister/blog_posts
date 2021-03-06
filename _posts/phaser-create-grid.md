---
title: Quickly create a grid in phaser ce
date: 2018-10-07 20:16:00
tags: [js,phaser]
layout: post
categories: phaser
id: 300
updated: 2018-10-10 10:08:31
version: 1.8
---

In many game projects there is a need to create a grid, either as part of the games mechanics, as a way to dimension space, or as a way to quickly have some way to show that a sprite is moving my having at least some kind of background other than a solid color. In [Phaser ce](https://photonstorm.github.io/phaser-ce/) there is a way to quickly make a grid texture with create.grid, but this might not be the best option for some cases. In any case in this post I will revive a quick simple demo of how to use [create.grid](https://photonstorm.github.io/phaser-ce/Phaser.Create.html#grid), and some pother alternatives as well.

<!-- more -->

## 1 - What to know

In this post I am writing about ways to go about making a quick simple grid texture in a phaser ce project. There is a phaser build in way to quickly go about doing this, and then there are ways of making my own solutions with the many different ways of how to go about making textures via javaScript code rather than an external image. This is not a [getting started post on phaser ce](/2017/10/04/phaser-getting-started/) or javaScript in general, but rather a quick post on just one little topic about game development that is very simple, yet can still prove to be a little time consuming.

### 1.1 - This is a phaser ce 2.1x post

In this post I am using phaser community edition 2.11.0, and yes phaser is the kind or project where the version number matters big time, most of all with the major release number. Always check the version number of the revision of phaser that you are using first if you run into any problems.

## 2 - A quick example of Create.grid

Although this method works, it is a little buggy at least in 2.11.0. When the call back fires it will work if I use the reference to the texture that is based to the call back, but any key that I set will not work as a way to use the texture. Never the less it is a phaser built in way to quickly generate a grid texture, it's just that I very quickly become more interested in using a better options for generating a grid, and not just because of this one little issue with the key value that is given as the first argument that I just leave as an empty string. There is also no option to set the line width, or any fill texture as well.

```js
var createGrid = function (game, done) {
 
    game.create.grid('', 320, 240, 32, 24, 'red', true, done);
 
};
 
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('boot', {
 
    create: function () {
 
        createGrid(game, function (texture) {
 
            game.add.sprite(0, 0, texture);
 
        });
 
    }
 
});
 
game.state.start('boot');
```

Still as a quick brainless solution for making a grid in a flash, it does get the job done. Later on in development depending on the project the gird might be removed, or replaced with something more interesting anyway. In which case this can serve it's intended purpose okay.

## 3 - A canvas solution for the same thing

If for some reason you do not like create.grid, then you might consider going with a [canvas powered solution](/2018/08/04/phaser-spritesheet-from-canvas/). I like doping this often for many of my simple examples on this site because I am comfortable with the 2d canvas drawing context, but there are many other ways of drawing a grid on the fly with things the the [Graphics display objects](/2017/10/21/phaser-graphics/), and [create.texture](/2018/10/06/phaser-create-texture/) as well.

```js
createGridCanvas = function (opt) {
 
    opt = opt || {};
 
    opt.key = opt.key || 'grid';
    opt.pxWidth = opt.pxWidth || 320;
    opt.pxHeight = opt.pxHeight || 240;
    opt.cellWidth = opt.cellWidth || 32;
    opt.cellHeight = opt.cellHeight || 24;
 
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
 
    canvas.width = opt.pxWidth;
    canvas.height = opt.pxHeight;
 
    ctx.strokeStyle = opt.strokeStyle || '#ff0000';
    ctx.fillStyle = opt.fillStyle || '#8a0000';
    ctx.lineWidth = opt.lineWidth || 3;
 
    var y = 0,
    x,
    w = opt.pxWidth / opt.cellWidth,
    h = opt.pxHeight / opt.cellHeight;
    while (y < opt.cellHeight) {
 
        x = 0;
        while (x < opt.cellWidth) {
 
            ctx.fillRect(x * w, y * h, w, h);
            ctx.strokeRect(x * w, y * h, w, h);
 
            x += 1;
 
        }
 
        y += 1;
 
    }
 
    game.cache.addImage(opt.key, null, canvas);
 
};
```

## 4 - Conclusion

So create.grid is an okay little feature for quickly drawing a grid in phaser ce, but it might not be the best solution for doing so in some cases. Also it is not at all a replacement for [tile maps](/2018/09/20/phaser-tilemap/), or having a [group or sprites aligned into a grid like pattern](/2018/09/28/phaser-group-align//).
