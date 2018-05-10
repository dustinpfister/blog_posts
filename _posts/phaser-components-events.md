---
title: The Phaser events component, setting up event handlers for Sprites and Graphics
date: 2017-10-26 09:25:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 75
updated: 2017-10-28 18:00:06
version: 1.7
---

The events component in phaser adds event handers to a display object such as onInputDown, and onDragStop. I just need to enable them with certain booleans, and I am ready to go with handing input for a certain display object in a project. This post will be a general overview of how to get going with the events display object component.

<!-- more -->

{% phaser_top %}

{% phaser_if_new_mess %}

## A basic example of usage of the events component

Although The events component is there to work with off the bat there are some boolean values that need to be set true in order for any of them to work. So a basic example will involve at least a single display object that has both the events, and input components (Sprites, Graphics). This display object will have it's input handler enabled by setting the inputEnabled boolean true, at which point a few event handlers will now work such as onInputDown.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', 
 
    {
 
        create : function () {
 
            // making a graphics display object object
            var gra = game.add.graphics(game.world.centerX, game.world.centerY),
 
            // draw method for the object
            draw = function (color, size) {
 
                color = color || 0xff0000;
                size = size || 75;
 
                gra.clear();
                gra.beginFill(color);
                gra.drawRect(-size / 2, -size / 2, size, size);
                gra.endFill();
 
            };
 
            // make sure input is enambed for the object
            gra.inputEnabled = true;
 
            // now I can set some event handlers
            gra.events.onInputDown.add(function () {
 
                draw(0x00ff00, 150);
 
            });
 
            gra.events.onInputUp.add(function () {
 
                draw();
 
            });
 
            draw();
 
        }
 
    }
 
);
```

I use the add method for a certain event handler such as onInputDown to add a single event handler to an array of methods that are to be called for that handler. That is because onInputDown is an instance of Phasers Signal Constructor, and as such works similarly to addEventListener in vanilla js, in the sense that I can have more than one callback for a certain event.

## Be sure to set inputEnabled to true

The events object is there to play with no matter what, but I will want to set inputEnabled true or else none of them will work. This also sets up an instance of inputHandler for the display object. Be sure to check out the post I wrote on [inputEnabled](/2017/10/23/phaser-components-input-enabled/) component.

## onInutDown

This is a handler that will fire when a mouse click, or touch start event occurs on the sprite, graphics or other display object. This event fires just once, and will not fire over, and over again after a pause like some other handlers.

```js
gra.events.onInputDown.add(function (dispObj, pointer) {

    // the display object (in this case gra)
    console.log(dispObj);

    // the pointer object of the mouse, or touch
    console.log(pointer);

});
```

The method that I give to the add method of the event handler will receive a reference to the relevant display object (in this post I am using [Graphics](/2017/10/21/phaser-graphics/) rather than sprites), and a reference to a [pointer object](/2017/10/17/phaser-input-pointer-objects/).

## onInputUp

Same as onInputDown, but if fires when the mouse button is release, or a touch event has ended.

## onInputOver, and onInputOut

These are additional handlers in the events object that are fired when a mouse cursor is hovering over the display object, and when it leaves, which is useful for desktop projects.

## Getting started with drag events

In order to get started with drag events in addition to setting the inputEnabled bool to true, there is also an additional bool to set true in the inputHandler of the display object at gra.input.draggable.

```js
// make some graphics
var gra = game.add.graphics(0,0);
 
gra.beginFill(0x00ff00);
gra.drawRect(0,0,50,50);
gra.endFill();
 
// enable input for the graphics
gra.inputEnabled = true;
 
// make the graphics draggable
gra.input.draggable = true;
```

Be sure to check out my [post on draggable](/2017/10/24/phaser-inputhandler-draggable/) input in phaser. To know a bit more about what is need to know with the inputHander, this post will cover more about the events involved.

## onDragStart, onDragUpdate, and onDragEnd

Any drag event will involve a mouse click down, movement of the mouse, and then release of the mouse button, or a similar situation involving a touch screen. Reslulting in dragStart, dragUpdate, and dragEnd events.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', 
 
    {
 
        create : function () {
 
            // making a graphics display object object
            var gra = game.add.graphics(game.world.centerX, game.world.centerY),
            info = game.add.text(0, 0, '', {
                    fill : '#ffffff'
                }),
 
            // draw method for the object
            draw = function (color, size) {
 
                color = color || 0xff0000;
                size = size || 75;
 
                gra.clear();
                gra.beginFill(color);
                gra.drawRect(-size / 2, -size / 2, size, size);
                gra.endFill();
 
            };
 
            // make sure input is enabled for the object
            gra.inputEnabled = true;
 
            // we also want to enable dragging
            gra.input.draggable = true;
 
            // what to do when the drag starts
            gra.events.onDragStart.add(function (gra) {
 
                gra.data.ticks = 0;
 
            });
 
            // what to do as the drag moves
            gra.events.onDragUpdate.add(function () {
 
                if (typeof gra.data.ticks === 'number') {
 
                    gra.data.ticks += 1;
 
                    info.text = gra.data.ticks;
 
                }
 
                info.x = gra.x;
                info.y = gra.y;
 
                draw();
 
            });
 
            // what to do when the drag stops
            gra.events.onDragStop.add(function (gra) {
 
                gra.data.ticks = 0;
                info.text = '';
                draw();
 
            });
 
            draw();
 
        }
 
    }
 
);
```

It is important to Keep in mind that the dragUpdate handler seems to fire before the dragStart handler, so if I use dragStart to set something up, it might not be there the first time dragUpdate fires.

##  Preventing the context menu from showing up with preventDefault

A context menu may show up when I long press, or right click a projects canvas element, there is of course the preventDefault bool that can called. A reference to the canvas element can be found at game.canvas where something like this can be done:

```js
// prevent context menu on long press, or right click
game.canvas.oncontextmenu = function (e) {
    e.preventDefault();
}
```

## Conclusion

The events component is very useful for quickly getting started with input involving display objects. As time goes on I may update this post to reference other posts on phaser display object components as time goes by.

{% phaser_bottom %}
