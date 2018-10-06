---
title: The Phaser inputEnabled component for use on Sprites, Graphics, ect
date: 2017-10-23 14:56:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 73
updated: 2018-10-06 16:48:26
version: 1.12
---

The [phaser ce]((https://photonstorm.github.io/phaser-ce/index.html) inputEnabled component is used in most game display objects including sprites to allow for input handing in relation to the display object. These are many instances of a [Signal](/2018/10/04/phaser-signal/) than can be used to attach event handers that will fire when a player does something such as clicking or touching the display object. This post will serve as an overview of the [input enabled component in phaser ce](https://photonstorm.github.io/phaser-ce/Phaser.Component.InputEnabled.html), and I will like to other relevant posts on handing input in a phaser ce project where appropriate.

<!-- more -->

## 1 - what to know

In this post I am writing about some of the properties of the input enabled component in phaser ce. I will be covering a basic example of its use, and how it can be helpful as a way of handling player input when making a phaser ce powered game with javaScript. In this post I am making use of many phaser ce features that I explain in detail in other posts on this site. If you are new to phaser it might be best to start with [my getting started post on phaser ce](/2017/10/04/phaser-getting-started/). 

There are also other ways of handing user input that may be a better choice depending on the nature of the game that is being developed. The events that can be used with input enabled will work okay for some projects, however other projects might call for other ways of handing user input that involve directly polling the state of input devices. It is possible to poll pointer objects in general such as with active pointer, touch pointers, and then there is also of course the [keyboard](/2017/10/13/phaser-gameobj-input-keyboard/) and [mouse pointer](/2017/10/12/phaser-input-mousepointer/) when making desktop centric style games. A good starting point might be to check out the [main input handler](/2017/10/13/phaser-gameobj-input/) thought.

## 2 - InputEnabled example

In Order to do much of anything involving attaching input handers to a certain display object like a sprite, the display object must support the inputEnabled component. If so to get started the inputEnambed boolean must be set to true.

Once the the inputEnabled bool of the display object is set to true, the input property of the display object will have a value that is an instance of inputHandler rather than null. In addition any event handers added with the events component, will now work. Be sure to also read my post on the [events component](/2017/10/26/phaser-components-events/).

### 2.1 - The mkGraphic method that will enable input

```js
var mkGraphic = function (game) {
 
    var gra = game.data.gra = game.add.graphics(160, 120);
 
    // enable the input
    gra.inputEnabled = true;
 
};
```

### 2.2 - The draw method

```js
var draw = function (gra, color) {
 
    color = color || 0x0000ff;
 
    gra.clear();
    gra.beginFill(color);
    gra.drawRect(-50, -50, 100, 100);
    gra.endFill();
 
};
```

### 2.3 - Attach events

```js
var attachEvents = function () {
 
    var gra = game.data.gra;
 
    // I can now use the onInputDown event
    gra.events.onInputDown.add(function (gra, pt) {
 
        draw(gra, 0x00ff00);
 
    });
 
    // onInputUp also
    gra.events.onInputUp.add(function (gra, pt) {
 
        draw(gra, 0x0000ff);
 
    });
 
};
```

### 2.4 - The Phaser.Game instance, and state object

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('demo', {
 
    create: function () {
 
        game.data = game.data || {};
 
        mkGraphic(game);
 
        attachEvents();
 
        draw(game.data.gra);
    }
 
});
 
game.state.start('demo');
```

## 3 - Conclusion

There is not much to know about the component itself, but there is a great deal to know about the inputHandler, as well as the [Events](/2017/10/26/phaser-components-events/) that can now be used once input is enabled.
