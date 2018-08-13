---
title: Starting and stopping full screen in phaser.
date: 2017-10-15 12:40:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 66
updated: 2018-08-13 18:44:21
version: 1.5
---

Switching two and back from full screen is pretty easy in [phaser](http://phaser.io), there are just two methods, and a property of interest via game.scale to get started with it. There are also properties that can be set to fill to the screen of the device, and preserve aspect ratio. In this post I will be writing about setting a game in actual full screen with the phaser scale manager. However this does not seem to work on some browsers, as it is something that can often be restricted. So I have written [another post on toggling pseudo full screen](/2018/08/13/phaser-scale-fullscreen-pseudo/) in phaser, that is actually just a way to scale up the canvas of the game. So you might want to check that out if what is written here does not work out okay for you.

As such this post will be a quick overview of how to get this one out of the way, and on with your project in a flash.

<!-- more -->

## 1 - What to know

This is an advanced post on full screen mode in the phaser ce game framework that can be used to make web based games with javaScript. This is not a beginners post on phaser, or javaScript in general.

### 1.1 - This might not be the best way to toggle full screen

There is more than one way to skin a cat as they say, and setting full screen more might not be the best way to give a full screen mode option for your project. With some browsers this will just not work at all, and it is best to to maybe just work out a way to scale the game up instead. If so you might want to check out my newer post on making a [full screen mode that way]((/2018/08/13/phaser-scale-fullscreen-pseudo/)).

### 1.2 - Setting the native size of the project.

When I make a project, I typically just choose a certain native resolution, and stick to it. As of late that is 320 x 240, as I want to always think in terms of at least the potential of making my project mobile friendly. I also Like the idea of working with a low res screen that can be scaled up, rather than the other way around. 

### 1.3 - A word on aspect ratio

Any resolution has a ratio between the width, and height, often refereed to as an aspect ratio. Often it is desired to maintain this ratio when scaling up or down, but it might also be desired to fill the screen, even though it will be distorted. With phaser it is possible to quickly do ether one by setting the fullScreenScaleMode property, which will be explained in detail here.

## 2 - The game.scale.fullScreenScaleMode property

This is the property of concern when it comes to setting a mode that will maintain aspect ratio or not. By default the value is 1 which means NO_SCALE the constant value of which is also stored at Phaser.ScaleManager.NO_SCALE. 

### 2.1 - Phaser.ScaleManager.EXACT_FIT (0)

This is the scale mode that you will want to set if you want the content to be stretched to the screen, and do not care if it is distorted.

### 2.2 - Phaser.ScaleManager.NO_SCALE (1) (default 2.6.2)

This is the default if no mode is set, when entering full screen the game area will be centered, but it will not be scaled up (or down) to the device screen.

### 2.3 - Phaser.ScaleManager.SHOW_ALL (2)

This is the mode that I often set because it will scale up, and preserve aspect ratio. As such often it will result in bars on the sides or on the top of the screen, but the image will not be distorted or cut.

### 2.4 - Phaser.ScaleManager.RESIZE (3)

This will change the size of the game area to match the device screen resolution.

### 2.5 - Phaser.ScaleManager.USER_SCALE (4)

This mode is useful if you want to get into allowing for more than one screen resolution. It would be used with setUserScale method.

## 3 - isFullScreen

There is a boolean value at game.scale.isFullScreen that is true when the project is in full screen mode. This is a useful value to look at when it comes to designing the method that will allow for a project to enter full screen.

## 4 - startFullScreen, and stopFullScreen

The method names should say it all, call game.scale.startFullScreen to start full screen mode, and game.scale.stopFullScreen to stop it, thats all there is to it.

## 5 - Toggling full screen example

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

## 6 -Conclusion

There is more to write about on the Scale Manager in phaser, as many additional properties and methods exist to work with. This post was just something I put together to help get going with typical use of the Manager. Still I love how easy it is to get this out of the way, and more on to more important matters when it comes to the core of that my project is about.

{% phaser_bottom %}