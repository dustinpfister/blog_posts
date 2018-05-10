---
title: The Phaser inputEnabled component for use on Sprites, Graphics, ect
date: 2017-10-23 14:56:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 73
updated: 2017-10-28 18:00:09
version: 1.3
---

The [phaser](http://phaser.io/) inputEnabled component is used in most game display objects including sprites to allow for input handing in relation to the display object. It adds properties to a display object that allow for input to be enabled on the display object.

<!-- more -->

{% phaser_top %}

{% phaser_if_new_mess %}

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
