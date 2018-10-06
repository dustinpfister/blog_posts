---
title: The Phaser inputEnabled component for use on Sprites, Graphics, ect
date: 2017-10-23 14:56:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 73
updated: 2018-10-06 16:24:26
version: 1.4
---

The [phaser ce]((https://photonstorm.github.io/phaser-ce/index.html) inputEnabled component is used in most game display objects including sprites to allow for input handing in relation to the display object. These are many instances of a [Signal](/2018/10/04/phaser-signal/) than can be used to attach event handers that will fire when a player does something such as clicking or touching the display object. This post will serve as an overview of the input enabled component in phaser ce, and I will like to other relevant posts on handing input in a phaser ce project where appropriate.

<!-- more -->



## InputEnabled example

In Order to do much of anything involving attaching input handers to a certain display object like a sprite, the display object must support the inputEnabled component. If so to get started the inputEnambed boolean must be set to true.

Once the the inputEnabled bool of the display object is set to true, the input property of the display object will have a value that is an instance of inputHandler rather than null. In addition any event handers added with the events component, will now work. Be sure to also read my post on the [events component](/2017/10/26/phaser-components-events/).

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {
 
        create : function () {
 
            var gra = game.add.graphics(160, 120),
 
            draw = function (gra, color) {
 
                color = color || 0x0000ff;
 
                gra.clear();
                gra.beginFill(color);
                gra.drawRect(-50, -50, 100, 100);
                gra.endFill();
 
            };
 
            // enable the input
            gra.inputEnabled = true;
 
            // I can now use the onInputDown event
            gra.events.onInputDown.add(function (gra, pt) {
 
                draw(gra, 0x00ff00);
 
            });
 
            // onInputUp also
            gra.events.onInputUp.add(function (gra, pt) {
 
                draw(gra, 0x0000ff);
 
            });
 
            draw(gra);
        }
 
    });
```

## Conclusion

There is not much to know about the component itself, but there is a great deal to know about the inputHandler, as well as the [Events](/2017/10/26/phaser-components-events/) that can now be used once input is enabled.

{% phaser_bottom %}
