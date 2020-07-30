---
title: Hit region and html 5 canvas elements
date: 2019-12-01 14:20:00
tags: [js, canvas]
layout: post
categories: canvas
id: 573
updated: 2020-07-30 09:57:03
version: 1.27
---

There is the possibly of a new [hit region](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility) api in [canvas](/2020/07/22/canvas/) that can be used as a way to define additional interactivity for objects that are drawn in a canvas. As of this writing there is very poor browser support for this, in fact it does not seem to work at all in any browser that I use at least.

Still I though that I should write a post on this subject, and also on hit detection in general in canvas projects. So this post will not be on the hit region api that much, but it will be on bounding box collision detection in a vanilla javaScript canvas project. A subject that will come up often in many such projects.

In addition I think it might be worth mentioning that I do have the source code for what I am writing about here also up on my test_vjs repository in github. That woubd be the place to go to see what might be coming up next when and if I get around to editing this post. Also if you want to make a pull request becuase you see sometuing wrong you might want to do it there.

<!-- more -->

<div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var Box=(function(){var clone=function(bx){return JSON.parse(JSON.stringify(bx));};var api={};api.create=function(opt){opt=opt||{};return{ver:'0.1.0',x:opt.x===undefined?0:opt.x,y:opt.y===undefined?0:opt.y,w:opt.w===undefined?32:opt.w,h:opt.h===undefined?32:opt.h,color:'white',damage:0,DPS:opt.DPS||5,hitCheck:opt.hitCheck||function(bx,secs){this.color='white';if(api.boundingBox(bx,this)){this.color='red';this.damage+=bx.DPS*secs;}}};};api.boundingBox=function(bx1,bx2){return!((bx1.y+bx1.h)<bx2.y||bx1.y>(bx2.y+bx2.h)||(bx1.x+bx1.w)<bx2.x||bx1.x>(bx2.x+bx2.w));};api.moveByHeading=function(bx,heading,delta){heading=heading===undefined?0:heading;delta=delta===undefined?1:delta;var nbx=clone(bx);nbx.x=nbx.x+Math.cos(heading)*delta;nbx.y=nbx.y+Math.sin(heading)*delta;return nbx;};return api;}());var draw={};draw.back=function(ctx,canvas){ctx.fillStyle='#000000';ctx.fillRect(0,0,canvas.width,canvas.height);};draw.box=function(ctx,bx,fill,stroke){ctx.fillStyle=fill||'#ffffff';ctx.strokeStyle=stroke||'#000000';ctx.beginPath();ctx.rect(bx.x,bx.y,bx.w,bx.h);ctx.fill();ctx.stroke();};draw.pool=function(ctx,pool){var i=pool.length,bx;while(i--){bx=pool[i];draw.box(ctx,bx,bx.color,'black');ctx.fillStyle='black';ctx.textBaseline='top';ctx.textAlign='center';ctx.font='10px courier';ctx.fillText(Math.floor(bx.damage),bx.x+bx.w/2,bx.y+bx.h/2-5)}};draw.info=function(ctx,canvas,player,pool){ctx.fillStyle='lime';ctx.textBaseline='top';ctx.textAlign='left';ctx.font='10px courier';ctx.fillText('v'+player.ver,10,canvas.height-10);};var container=document.getElementById('canvas-app'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');container.appendChild(canvas);canvas.width=320;canvas.height=240;var player=Box.create({x:150,y:50}),pool=[Box.create({x:canvas.width/1.5-50,y:120,w:100}),Box.create({x:5,y:20,w:75,h:75}),Box.create({x:80,y:20,w:75,h:50})];var poolHitCheck=function(p,bx,secs){var i=p.length;while(i--){p[i].hitCheck(bx,secs);}};var lt=new Date(),heading=45;var loop=function(){var now=new Date(),t=now-lt,secs=t/1000;requestAnimationFrame(loop);player=Box.moveByHeading(player,Math.PI/180*heading,32*secs);poolHitCheck(pool,player,secs);heading+=25*secs;heading%=360;draw.back(ctx,canvas);draw.pool(ctx,pool);draw.box(ctx,player,player.color);draw.info(ctx,canvas,player,pool);lt=now;};loop();</script>

## 1 - Basic bounding box hit region area

I do not think that a hit region area should really be the responsibility of a canvas drawing api any way, and that a canvas element does not need to be a replacement for other HTML elements. Sure the subject will come up often, but hit detection should be a part of the class, model, framework or whatever it is that you are using outside of just the canvas element and the drawing api alone.

In short a canvas is just a bitmap drawing area that can be used to draw things with javaScript and all kinds of external assets. So with that said a javaScript module or state object of some kind should be where you are storing information about objects drawn in the canvas, as well as logic that updates and works with that state.

### 1.1 - A Basic bounding box method

One way to make it so you have a hit area in the canvas is to use a basic bounding box collision detection method. This kind of method should be a part of a framework that you are using, if you are just going vanilla js style though you could start out with just something like this maybe.

```js
var bb = function (a, b) {
    return !(
        (a.y + a.h) < b.y ||
        a.y > (b.y + b.h) ||
        (a.x + a.w) < b.x ||
        a.x > (b.x + b.w))
};
 
var box = {x:50,y:50,w:100,h:50};
console.log( bb(box,{x: 75,y:75,w:1,h:1}) ); // true
console.log( bb(box,{x: 5,y:5,w:1,h:1}) ); // false

```

A method such as this can be used to find out if one box area overlaps another, and can then be used in conjunction with many other methods and objects to create, and mutate a state. That state then just needs to be rendered to the canvas.

## 2 - Basic canvas hit region example

Now that I have covered how to have a simple bounding box collision detection method, I can now use that to make it so that when an area of the canvas is clicked that results in some kind of action. In this section I have an example that uses the bounding box method to know that an area is clicked and when such an area is click I cycle over some indexed color values for that area. In other words when the area is click it changes color, not the most interesting example, but it is a start when it comes to this sort of thing with canvas.

So at the top of my script I have my bounding box method that I covered in the first section, then I have my get canvas relative position method. I will not be getting into this method in detail here as I have wrote a post before hand on this topic, but this method just helps me get a canvas rather than window relative position when inside the body of an event hander for a mouse event, if you want to read more about this you can read the post on [getting a canvas relative pointer position](/2020/03/04/canvas-get-point-relative-to-canvas/).

I then have a method that can be used to create an event hander for the object that I will be using to define the area in the canvas. This method excepts the area object as the first and only argument, and then returns an event hander that is intended to be used when attaching such an event hander to a canvas element using the add event listener method. The event hander that is returned will use the get canvas relative method to get a position relative to the canvas, and then attach width and height values that are 1 by 1 to the object and use that as an argument, along with the area object when calling the bounding box method. In the event that the bounding box method returns true, then a click method of the area object will be called.

I then of course have a draw method that will take a 2d drawing context, and this area object and render everything to the canvas. For this example I have just one main draw method as I am trying to keep things simple for now, but in a real project I would break this method down, and start to form something that is a separate draw module rather than just a single method pack together with everything else.

```html
<html>
    <head>
        <title>canvas hit region</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
var bb = function (a, b) {
    return !(
        (a.y + a.h) < b.y ||
        a.y > (b.y + b.h) ||
        (a.x + a.w) < b.x ||
        a.x > (b.x + b.w))
};
var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: e.clientX - bx.left,
        y: e.clientY - bx.top,
        bx: bx
    };
};
var createClickHandler = function (obj) {
    return function (e) {
        var pos = getCanvasRelative(e);
        pos.w = 1;
        pos.h = 1;
        if (bb(pos, obj)) {
            obj.click();
        }
    };
};
var draw = function (ctx, obj) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = obj.colors[obj.colorIndex];
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = 'black';
    ctx.font = '40px courier';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillText(obj.clicks, obj.x + obj.w / 2, obj.y + obj.h / 2 - 20);
};
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
var obj = {
    x: canvas.width / 2 - 100,
    y: canvas.height / 2 - 50,
    w: 200,
    h: 100,
    clicks: 0,
    colors: ['red', 'white', 'blue'],
    colorIndex: 0,
    click: function () {
        this.colorIndex += 1;
        this.colorIndex %= 3;
        this.clicks += 1;
        draw(ctx, obj);
    }
};
canvas.addEventListener('click', createClickHandler(obj));
draw(ctx, obj);
        </script>
    </body>
</html>
```

I can not say that this is the best way to go about setting up some buttons in a canvas project, but you get the general idea. A hit detection method can be used to find out of an object was clicked or not, and then some kind of action can be preformed. In a real project I might go about pulling code like this into a module of sorts, and also make the objects a little more flashy by doing all kinds of things other than just changing color, and stepping a click variable.

## 3 - A simple functional javaScript canvas box module

So maybe it will be best to make some kind of javaScript Box module that returns a Class, or a functional style module of some kind that can be used with these box objects, and have it make use of the bounding box method. In this section I will be going over a more functional approach to this kind of module design, or at least functional like as some of the methods might still mutate in place.I have come to like a more functional approach to module design better these days, but I am not there fully it would seem. So there will be a box.js module that can be used to create a Box object, and then a bounding box method as part of it that I can use to find if two box objects overlap each other or not.

In additional I will be pulling logic that has to do with the box module into its own box.js file, and additional javaScript code that has to do with drawing a box module into a draw.js file. I will be using those two assets in a main JavaScript file that will be included together with everything else in an index.html that will wrap all of this together. This helps to keeping things better organized by separating logic that creates and works with state, from logic that draws state, and logic that sores a current state object.

### 3.1 - The box.js file

Here I have the box.js file that I made for this section. It is based on what I worked out for my post on [making a javaScript box class](/2017/07/24/canvas-box-class/) in general that I started a few years back, and come back to now and then when it comes to editing. It is more or less the same as what I copied from there, but with the introduction of a bounding box method, and a whole bunch of additional changes that make use of that method when it comes to the properties of a box object such as Damage and Damage per second properties.

```js
var Box = (function () {
 
    var clone = function (bx) {
        return JSON.parse(JSON.stringify(bx));
    };
 
    var api = {};
 
    api.create = function (opt) {
        opt = opt || {};
        return {
            ver: '0.1.0',
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w === undefined ? 32 : opt.w,
            h: opt.h === undefined ? 32 : opt.h,
            color: 'white',
            damage: 0,
            DPS: opt.DPS || 5,
            hitCheck: opt.hitCheck || function (bx, secs) {
                this.color = 'white';
                if (api.boundingBox(bx, this)) {
                    this.color = 'red';
                    this.damage += bx.DPS * secs;
                }
            }
        };
    };
 
    api.boundingBox = function (bx1, bx2) {
        return !((bx1.y + bx1.h) < bx2.y ||
            bx1.y > (bx2.y + bx2.h) ||
            (bx1.x + bx1.w) < bx2.x ||
            bx1.x > (bx2.x + bx2.w));
    };
 
    api.moveByHeading = function (bx, heading, delta) {
        heading = heading === undefined ? 0 : heading;
        delta = delta === undefined ? 1 : delta;
        var nbx = clone(bx);
        nbx.x = nbx.x + Math.cos(heading) * delta;
        nbx.y = nbx.y + Math.sin(heading) * delta;
        return nbx;
    };
 
    return api;
 
}
    ());
```

So this is not really an end point in development for several reasons. When it comes to making a game a functional approach might not always be a such a great idea because of the performance loss from cloning objects with certain methods that will not mutate in place. Also when it comes to a real project I am likely going to need this to do a bit more than just creating box objects, bounding box collision detection, and moving a box by a heading and delta. Still for just the sake of canvas hit areas this alone will do the trick.

### 3.2 - The draw.js file

So then I will want a draw.js file that can be used to draw a box object to a canvas element. In addition I will place any additional draw methods hear that I will want to use from a project in general. For now I am just pulling the process of drawing a plain background into its own methods, but if this where to grow into something more this module would have a lot more going on.

```js
var draw = {};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
// draw a box
draw.box = function (ctx, bx, fill, stroke) {
    ctx.fillStyle = fill || '#ffffff';
    ctx.strokeStyle = stroke || '#000000';
    ctx.beginPath();
    ctx.rect(bx.x, bx.y, bx.w, bx.h);
    ctx.fill();
    ctx.stroke();
};
// raw pool of box objects
draw.pool = function (ctx, pool) {
    var i = pool.length,
    bx;
    while (i--) {
        bx = pool[i];
        draw.box(ctx, bx, bx.color, 'black');
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.font = '10px courier';
        ctx.fillText(Math.floor(bx.damage), bx.x + bx.w / 2, bx.y + bx.h / 2 - 5)
    }
};
draw.info = function (ctx, canvas, player, pool) {
    ctx.fillStyle = 'lime';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '10px courier';
    ctx.fillText('v' + player.ver, 10, canvas.height - 10);
};
```

### 3.3 - An example of the javaScript module in action with hit detection

Time to test this out now with a some html, and a little more javaScript. In my html I have a hard coded canvas element that I get a reference to in some additional javaScript code after loading my box.js, and draw.js files outline above in this section.

Once I have my reference to the canvas element, and the 2d drawing context, I create a box that will serve as a player object. I also created a collection of box objects that compose a pool of these objects that will be set at various areas of the canvas element. I also have a method that will loop over all of the boxes in the pool object and call a git check method for all of the obejcts in the pool with respect to the current values of the player object that will be in motion.

```js
var container = document.getElementById('canvas-app'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
 
var player = Box.create({
        x: 150,
        y: 50
    }),
pool = [Box.create({
        x: canvas.width / 1.5 - 50,
        y: 120,
        w: 100
    }),
    Box.create({
        x: 5,
        y: 20,
        w: 75,
        h: 75
    }),
    Box.create({
        x: 80,
        y: 20,
        w: 75,
        h: 50
    })];
 
var poolHitCheck = function (p, bx, secs) {
    var i = p.length;
    while (i--) {
        p[i].hitCheck(bx, secs);
    }
};
 
var lt = new Date(),
heading = 45;
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
 
    player = Box.moveByHeading(player, Math.PI / 180 * heading, 32 * secs);
    poolHitCheck(pool, player, secs);
    heading += 25 * secs;
    heading %= 360;
 
    draw.back(ctx, canvas);
    //draw.box(ctx, pool[0], pool[0].color);
    draw.pool(ctx, pool);
    draw.box(ctx, player, player.color);
    draw.info(ctx, canvas, player, pool);
    lt = now;
};
 
loop();
```

So then the player object moves around the canvas in a circle by making use of the move by heading method, and when it moves over a box in the pool that hit check method for that box will fire each time until the player object is not over it anymore. When the hit check method is called a secs value that is the amount of time that is passes sense the last update is available in the body of the hit check method. This secs value is used to add an amount of damage to the pool object based on that secs value and the Damage Per Second value of the player object.

Now all I need is a little html to tie this all together.

```html
<html>
    <head>
        <title>canvas hit region</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="box.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```


So this turned out to be a fun little project that just shows off the use of the bounding box method as a way to find out if a display object is getting hit or not. If I get some more time at some point I might add all kinds of additional features to this one to make it a little more interesting. However I have a lot of other projects that I want to get to, so do not hold your breath on that one. In the mean time you might want to check out my [canvas examples](/2020/03/23/canvas-example/) that are examples of full canvas projects rather that just simple little demos like this.

## 4 - Conclusion

So for the most part I try to just stick to bounding box collision detection if I can. With some projects I might just have to use something more advanced, but often doing so often will eat up more resources. Bounding box collision detection is very simple and to the point with this, and it will not eat up as much over head as a more pixel perfect solution would.