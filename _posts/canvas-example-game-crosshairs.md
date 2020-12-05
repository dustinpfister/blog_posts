---
title: Canvas example of a cross hairs game
date: 2020-07-29 15:44:00
tags: [canvas]
layout: post
categories: canvas
id: 689
updated: 2020-12-05 13:23:02
version: 1.37
---

<!-- edit bookmark -->

For this weeks [canvas example](/2020/03/23/canvas-example/) post I made a quick little cross hairs type game idea that just popped into my head one day. This is a game where I just use the mouse or touch events to move a cross hairs or [Reticle](https://en.wikipedia.org/wiki/Reticle) if you prefer around the canvas, and depending on where the cross hairs is located will result in panning movement around a map, or firing of the current weapon at some map cells. That is the basic idea at least, but I have added much more to it then just that at this point when it comes to choosing this example as something to continue working on at least a little each day, or at least fairly often.

At the time that I started this not much thought went into the other aspects of this that can help turn the game into something that is a little fun, interesting, or just simply addictive. I think that it might be fun to have a game where you just go around and shoot at stuff below me, and just rack up a whole lot of damage on what there is below in a top down perspective. So far that is more or less what this is, but it could still use a little something more that I have not yet hammered down thus far I think. Maybe put some things in the map that fire back for one thing, so that it is a kind of game where it is possible to, you know, loose. 

However another thought was to make this just some kind of idle game where there are no such enemies that fight back, I am just blowing stuff up, and it keeps growing back. I all ready have some code worked out that automates the process of playing that I have enabled by default that will kick in after a moment of inactivity, but at any time the player can just take over and start playing. This is a kind of feature that I find myself enjoying when it comes to where I am at when it comes to playing video games, I can not say that I am that interested in playing them any more, but I sure have not lost interest in making them. The act of making the game has become the game sort of speak. So I seem to like games that involve things like away production, and games that to one extent or another play themselves.

So in this post I will be wring about all of the source code for the game thus far, so this will likely be a pretty lengthy post as it is over 1500 lines of code thus far. There are all ready a few modules, and I keep expanding them, and writing more modules as I keep adding features.

<!-- more -->

<div id="canvas-app"style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script src="/js/canvas-examples/game-crosshairs/0.21.0/pkg.js"></script>


So if you are just interested in playing I will inject a package here that reflects the state of the canvas example at the time that I last updated this posts content. I would recommend against spending to much time playing it so far at this time as I have not implement any way to have a save state, but that is on the todo list of course. Auto Play is enabled by default so if you want to can just watch the game play itself for a bit.

To check out the latest state of the source code with this example there is of course the [corresponding folder in my canvas examples repository at github](https://github.com/dustinpfister/canvas-examples/tree/master/forpost/canvas-example-game-crosshairs) for cross hairs.

## 1 - The utility module

For the canvas example just like with many of my other examples this one has a custom utility library. I end up using this kind of library as a dumping ground for methods that are being used, or might end up being used in two or more modules in the over all project. There always seems to be a need for this kind of utility library that can be described as a kind of application specific, custom tailored lodash of sorts. In other words it is a collection of utility methods that I am actually going to use in one or more of the modules that compose the over all project.

One such method that I have here is a distance formula method that will just give me the distance between two points. This is a usual suspect that I have in many of these utility modules, and is often used in a number of expressions where and when needed. I am using the method in my cross module that I will be getting to later in this post that has to do with the major part of the user interface.

```js
// UTILS
var utils = {};
// get distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// return a percent value from another percent value using Math.log
utils.logPer = function (per, high) {
    high = high === undefined ? 2 : high;
    per = per < 0 ? 0 : per;
    per = per > 1 ? 1 : per;
    return Math.log((1 + high - 2) + per) / Math.log(high);
};
// deep clone an object
utils.deepClone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};
```

The logPer method is something that I worked out when it comes to havening a way to turn a linear percentage value into a percentage value that does not go up in a linear kind of way. As of this writing I am just using this method in my game module when it comes to the AI selecting a weapon. In time I might use this method, or something like it when it comes to maybe the experience point system which is something that I am sure I will be getting around to improve at some point if I do keep working on this project.

So now that I have the basic utility library out of the way lets move on to the modules that built on top of this to make a game modules that is used to create and update the main state of the game.

## 2 - The experience point system

So for this canvas example I want to have an experience point system. I did not work out anything that original for this project at least not of this writing, in fact I just copied over what I [workout out in another post that has to do with, you guessed it, experience point systems](/2020/04/27/js-javascript-example-exp-system/).

The module provided two public methods, one that can be used to create a level object by giving and experience point value, and another that does the inversion of that by giving a level value.

```js
```

I might get around to changing things around with this kind of system at a later point as I keep working on this example, so I do not want to write about this to much here if I am just going to need to rewrite everything extensively later. However for now it is working okay as a place holder of sorts until I get around to investing more time into developing this experience point system, and many of the other components.

In any case this experience point system is used in both the main game.js module, as well as the map.js module, and it goes without saying that this system will probably be used in a few more modules here and there as I keep working on additional minor releases of this project.

## 3 - The cross.js file

In this section I will be going over the module that will be used to create and update a state object for a cross hairs state object that is used as a major component for the user interface aside from the buttons module, and state machine that I will be getting to later in this post. This main cross hairs state object contains a bunch of additional objects and properties that help with many points of interest in the canvas matrix. One such point of interest is the center point of the cross hairs area, which is now and will likely continue to be the center of the canvas element. Another is the actual cross hairs cursor position in the canvas, and yet another is an offset point that can be used as a way to navigate a map. The state of these points of interest are stored in the object that this module creates, and the module is also used as a way to update the state of this object.

The idea of this module is when the cross hairs point object is within an inner radius, the  cross hairs object is just used as a way to set the position of where a weapon is going to fire at what might be around that area. While the outer radius is used as a zone to define angle and rate of movement in terms of pixels per second when it comes to updating that offset value that I mentioned that can then in turn be used as a way to update the position of a map when it comes to how this is used outside of this module. 

So when the cross hairs object is in the zone between inner and outer radius value that will effect the offset point in the cross state object. When the cross hairs object is within the inner radius then the offset value is not effected, and a isInner public method can be used as a way to find out if this is the case or not, and in that case the state of the object can be used differently in the case of this project it is being used as a means to determine where to shoot, however that is a matter that I will be getting to in detail later in the post when I get to the game module.

So with that said the module contains a number of private helper methods, some of which I have made public. There are helper methods that will return true or false if the cross hairs object is in the fire area, or in the movement area. There is also a helper method that has to do with moving the offset object based on the current values of the cross hairs object and a given value that is the number of seconds sense the last frame tick update.

```js
```

I then have my public API of this module that contains methods for both creating and updating a cross state object. In addition I have my userAction method that is used as a way to control the mutation of the cross hairs position. As you can see this is where my get canvas relative method is coming into play for now. When I first started working on this project I did not have the main state machine that I have now, and I have not yet transitioned everything over to just working out things like that there yet.

## 4 - The map.js file

So now that I have my cross hairs module I am also going to want to have a map file that will be used to create a map of cell objects. I can then move around the map with the state of a cross object created with the cross hairs modules create method when working out the game module. I went with having the offset values in the cross object rather than the map object, so I will be using a public method in this map module to get at cells by passing a cross object along with the map and canvas relative position values.

```js
```

## 5 - A pool.js module for creating an object pool to be used for shots amd any other future display object pools

I made a another post in which I touched base on [object pools](/2020/07/20/canvas-example-object-pool/). I decided to include such a module in this project that for starters will be used to create shot objects that will move from the side of the canvas to the target area where an attack was made on the map. In future versions of the canvas example display object pools could be used for all kinds of additional things where a display object would be called for such as explosions, enemies, and power ups.

The module for now just has three public methods, one to create an object pool, one to update an object pool, and another that will call the spawn method of a display object that is inactive if any is available.

```js
```

As of this writing I am using the pool module to create a pool of display objects for shots that the player can fire by clicking in the inner circle area of the cross object. So I need a way to have a pool of objects that can be reused for the display objects that will represent these shots, and this is for starters what the pool.js module is for.

## 6 - The game.js file for creating a main game state object

So I ending up working out a main game module that will serve as a way to create and set up a main game state module for this canvas example. This module will create a main game state object that will contain an instance of the cross module object, along with a map object, and at least a single object pool for shot objects. This module will also attach a whole bunch of event handers for the canvas element.

```js
```

## 7 - generate sprite sheets

I wanted to at east start some kind of system that will be used to create sprite sheets. For now I just work out this genSheets module that creates sheets just for map cells. I am not happy with it thus far, and will get around to making a lot of changes here at a point in the future so I do not want to write to much about it.

```js
```

## 8 - The draw.js file

So now that I have mt modules for creating state objects, I will now want a module with methods that are used to draw aspects of these state objects to a canvas element.

```js
```

## 9 - Buttons

I have a module that helps me with creating button objects that I place in the canvas to preform certain actions. This way I can pull a lot of code that has to do with checking if a pointer position is over a button display object, or common button tasks like looping an index value for an option and so forth away from the main state machine and into its own module.

As of this writing I have just three button types, but in future releases I intend to add additional types that have to do with contorting settings of things like an upgrades menu and so forth.

```js
```

## 10 - Now for a Main.js file along with a main app loop

So now I need some additional code to pull everything together here in a main.js file that will be used after everything else is in place to work with. Here I create and inject a canvas element into a hard coded container element that I have in my html. I create instances of a map and cross state objects, and attach a whole bunch of event handers for mouse and touch events using the create event method of the cross module.

I then have an attack method that I will likely work into the map module, or some kind of future module that has to do with a weapons or something to that effect. I do not want to get into to much detail with that because at some point in the future I will just have to re write what I have to say about it when it comes to putting a little more time into this canvas example, because I think this one needs and deserve more work.

Another method that I ended up parking here is the get canvas relative method that helps with getting a point that is relative to the canvas element rather than window. In this canvas example I am not doing anything with multi touch, so I went with a method that will just use the first touch object in the changed touches array of a touch event. I will not be getting into detail about this method here as I have [wrote a post on this topic of getting a canvas relative point in detail before hand](/2020/03/04/canvas-get-point-relative-to-canvas/).

```js
```

I then of course have my main app loop where I am using the requestAnimationFrame method, inside the loop method. In this loop method I am updating the state of the cross object and drawing the state of the cross and map objects.


I then have just a little HTML and inline css for the container for the canvas element, or elements at some point in the future if I get into layering with this one.

```html
```

So that is it when this canvas example is up and running I am able to move around and when I click on the map I cause damage to the areas that I click. Nothing to interesting at the point of this writing at least, but I think that this one has some decent potential when it comes to putting a little more time into it. I do have many other canvas examples in a state like this also that need more attention, but I am sure I will come back around to this one at some point.

## 11 - Conclusion

So now I have the basic idea of what I had in mind together at least, now it is just a question of what more I can do to it to make it more interesting. There is making it so that each time the player clicks or touches an area in the inner circle that causes a shot to fire from one side of the canvas or another to the point where such an event happened. So there is adding much more when it comes to weapons and what it is that we are shooting at. In addition there is doing something so that there are units in the map the shoot back at the player also.

I made [another canvas example that is like this one when it comes to moving around a map that I called just simply pointer movement](/2020/01/26/canvas-example-pointer-movement/). That one was programed a little differently from this one as that was just simply a means to move around a map by clicking and dragging away from the point that was clicked. Here I have a set of circles fixed at the center of the canvas, or any other location that I choose to fix these circle areas to. There is an outer circle area that is used to move around based on the distance from the end of the inner circle rather than the center point. In addition the inner circle area will not result in any movement, but is used as an area where I can shoot at things, but not move.