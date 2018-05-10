---
title: Starting and stopping full screen in phaser.
date: 2017-10-15 12:40:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 66
updated: 2017-11-01 12:16:53
version: 1.3
---

Switching two and back from full screen is pretty easy in [phaser](http://phaser.io), there are just two methods, and a property of interest via game.scale to get stared with it. There are also properties that can be set to fill to the screen of the device, and preserve aspect ratio.

<!-- more -->

As such this post will be a quick overview of how to get this one out of the way, and on with your project in a flash.

<div id="gamearea" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>

var game = (function () {

    var updateInfo;

    return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            // create some kind of graphic
            var gra = game.add.graphics(160, 120),

            // text style
            style = {
                fill : '#ffffff',
                font : '12px courier',
                align : 'center',
                boundsAlignH : 'center'
            },

            // text 1
            text1 = game.add.text(0, 0, 'tx1', style);

            // update info method
            updateInfo = function () {

                if (game.scale.compatibility.supportsFullScreen) {

                    text1.text = 'Client supports fullscreen';
                    text1.text += '\n click or touch to toggle';
                    text1.text += '\n isFullScreen: ' + game.scale.isFullScreen;

                    text1.text += '\n world size: ' + game.world.width + ',' + game.world.height;
                    text1.text += '\n scale size: ' + game.scale.width + ',' + game.scale.height;

                } else {

                    text1.text = 'Client does not support full screen';

                }

            };

            // set text bounds
            text1.setTextBounds(0, 20, game.world.width, game.world.height);

            // update into for first time
            updateInfo();

            // draw graphic
            gra.beginFill(0x0000ff);
            gra.drawCircle(0, 0, 240);
            gra.endFill();

            // set background color
            game.stage.backgroundColor = '#2a2a2a';

            // disable scrollTo
            game.scale.compatibility.scrollTo = false;

            // add a handler for onDown that will toggle full screen
            game.input.onDown.add(function () {

                // Maintain aspect ratio
                game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

                // if game is full screen
                if (game.scale.isFullScreen) {

                    // turn it off
                    game.scale.stopFullScreen();

                } else {

                    // else turn it on
                    game.scale.startFullScreen(false);
                }

                console.log(game.scale);

            });

        },

        update : function () {

            // update info
            updateInfo();

        }

    });

}
    ());

</script>

{% phaser_top %}

{% phaser_if_new_mess %}

## Setting the native size of the project.

When I make a project, I typically just choose a certain native resolution, and stick to it. As of late that is 320 x 240, as I want to always think in terms of at least the potential of making my project mobile friendly. I also Like the idea of working with a low res screen that can be scaled up, rather than the other way around. 

## A word on aspect ratio

Any resolution has a ratio between the width, and height, often refereed to as an aspect ratio. Often it is desired to maintain this ratio when scaling up or down, but it might also be desired to fill the screen, even though it will be distorted. With phaser it is possible to quickly do ether one by setting the fullScreenScaleMode property, which will be explained in detail here.

## The game.scale.fullScreenScaleMode property

This is the property of concern when it comes to setting a mode that will maintain aspect ratio or not. By default the value is 1 which means NO_SCALE the constant value of which is also stored at Phaser.ScaleManager.NO_SCALE. 

### Phaser.ScaleManager.EXACT_FIT (0)

This is the scale mode that you will want to set if you want the content to be stretched to the screen, and do not care if it is distorted.

### Phaser.ScaleManager.NO_SCALE (1) (default 2.6.2)

This is the default if no mode is set, when entering full screen the game area will be centered, but it will not be scaled up (or down) to the device screen.

### Phaser.ScaleManager.SHOW_ALL (2)

This is the mode that I often set because it will scale up, and preserve aspect ratio. As such often it will result in bars on the sides or on the top of the screen, but the image will not be distorted or cut.

### Phaser.ScaleManager.RESIZE (3)

This will change the size of the game area to match the device screen resolution.

### Phaser.ScaleManager.USER_SCALE (4)

This mode is useful if you want to get into allowing for more than one screen resolution. It would be used with setUserScale method.

## isFullScreen

There is a boolean value at game.scale.isFullScreen that is true when the project is in full screen mode. This is a useful value to look at when it comes to designing the method that will allow for a project to enter full screen.

## startFullScreen, and stopFullScreen

The method names should say it all, call game.scale.startFullScreen to start full screen mode, and game.scale.stopFullScreen to stop it, thats all there is to it.

## Toggling full screen example

So now that we have the basics down, I have put together this quick example that is working great for me. I just added a single display object, the size of which fills up the whole height of the screen. I set the background color to something other than black, so I can see that there are bars on the sides to conform that aspect ratio is being preserve when using the SHOW_ALL full screen mode.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', 
 
    {
 
        // create method
        create : function () {
 
            bx = game.add.graphics(160, 120);
 
            bx.beginFill(0x00ff00);
            bx.drawCircle(0, 0, 240);
            bx.endFill();
 
            game.stage.backgroundColor = '#2a2a2a';
 
            game.input.onDown.add(function () {
 
                // Maintain aspect ratio
                game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
 
                // if game is full screen
                if (game.scale.isFullScreen) {
 
                    // turn it off
                    game.scale.stopFullScreen();
 
                } else {
 
                    // else turn it on
                    game.scale.startFullScreen(false);
                }
 
            });
 
        }
 
    }
 
);
```

In practice I might would have a full screen icon somewhere in the game, but you get the idea. Just set the desired mode, test if the project is in full screen mode, and turn it on, or off.

## Conclusion

There is more to write about on the Scale Manager in phaser, as many additional properties and methods exist to work with. This post was just something I put together to help get going with typical use of the Manager. Still I love how easy it is to get this out of the way, and more on to more important matters when it comes to the core of that my project is about.

{% phaser_bottom %}