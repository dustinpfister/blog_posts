---
title: Quick color conversion in phaser using Phaser.Color
date: 2018-07-17 14:01:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 235
updated: 2018-12-01 12:36:46
version: 1.7
---

When making a game with [phaser 2](http://phaser.io), or with javaScript in general I sometimes come around to the issue of converting color values from one format to another. It is not hard to find or make methods that can be used to convert a decimal color value to a web friendly rgba string format, but still I can help but one can help but think that this should be part of the Phaser framework, well good news, [it is](https://photonstorm.github.io/phaser-ce/Phaser.Color.html).

<!-- more -->

## 1 - What to know

This is a post on the phaser color class that has a whole bunch of static methods that can be helpful for color conversion. This class is helpful for say converting a color value like 0x00ff00 to 'rgba(0,255,0,1)', which can be helpful for making quick work of this without wasting time writing such methods from the ground up, or copying and pasting a solution for stack overflow. There is of course no need for that if a solution is in the framework itself, and this is the case with phaser.

### 1.1 - I am using phaser 2.x, AKA phaser 2

As of this writing I am using [phaser 2.11.0](https://github.com/photonstorm/phaser-ce/tree/v2.11.0) when making this demo. In other words what is now known as Phaser Community Edition. So far I have not made the switch to Phaser 3, and I do not plan on doing so any time soon, as long as phaser 2 is still supported.

## Some must know methods in Phaser.Color

In this section I will be covering some must know methods in Phaser.Color.

### 2.1 - getWebRGB - for converting an integer color to a web friendly rgba string

The getWebRgb Method of the Color class is one of the methods that comes in handy when working with color in a phaser game. Often I am working with plain canvas, and some methods in phaser can accept a canvas as an argument. So there is a need to convert a phaser friendly color to a canvas friendly color, quickly. This is where getWebRgb comes in handy.

```js
console.log(Phaser.Color.getWebRGB(0x00ff00)); // 'rgba(0,255,0,1)';
 
console.log(Phaser.Color.getWebRGB(0xff00)); // 'rgba(0,255,0,1)';
 
console.log(Phaser.Color.getWebRGB(65280)); // 'rgba(0,255,0,1)';
```

So this method can be used to quickly convert an integer color value to a web friendly rgba color string. No need to hunt down a solution for this, yet alone make you r own from the ground up with this, there is a method in the framework itself.

### 2.2 - webRGB - rgb\/rgba web color strings to a color Object

Want to quickly convert an rgb, or rgba color string to an object with red, grenn ,blue, and alpha values. Then The webRGB method can be used to make quick work of that.

```js
var webRGB = 'rgba(0,255,0,1)',

colorObj = Phaser.Color.webToColor(webRGB);

console.log(colorObj.r); // 0
console.log(colorObj.g); // 255
console.log(colorObj.b); // 0
console.log(colorObj.a); // 1
```

This helps to keep me from making some kind of overly complex vanilla js solution for this.

```js
// vanilla
var colorObj = {},
colorArr = webRGB.replace(/rgba\(/, '').replace(/\)/, '').split(',');

colorObj.r = colorArr[0];
colorObj.g = colorArr[1];
colorObj.b = colorArr[2];
colorObj.a = colorArr[3];

console.log(colorObj.r); // 0
console.log(colorObj.g); // 255
console.log(colorObj.b); // 0
console.log(colorObj.a); // 1
```
