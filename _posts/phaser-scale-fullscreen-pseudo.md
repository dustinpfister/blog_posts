---
title: Pseudo full screen in phaser using that scale manager
date: 2018-08-13 17:06:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 258
updated: 2018-08-13 17:30:44
version: 1.3
---

Toggling full screen when making a [phaser](http://phaser.io) project can end up becoming a bit of a rabbit hole, at least that has been my experience with it. Never the less, I think I have worked out some solutions that seem to work okay. With the phaser Scale manager it is possible to make a request to set actual full screen mode in the browser, and with some browsers this works fine without any problems. However on some browsers it will not work, so there might be a desire of a back up plan, one that involves just simply scaling up the game to the full size of the browser window. Doing so with phaser is a little involved, but in the post I will be writing about toggling a kind of pseudo full screen mode in phaser.

<!-- more -->

## 1 - what to know about before continuing

This is an advanced post on phaser, the javaScript powered game frame work used to make web based games. In this post I will be writing about many different aspects of the framework, and web development that I will not be covering in detail. However if you have at least some background with phaser, and javaScript you might find this post useful.

## 1.1 - The Scale Manager

In the post I am using the Phaser Scale Manager. As the name implies this is the component of phaser that is of interest when it comes to Scaling a game, or toggling full screen. This manager has many properties, and methods, but I will only be covering some of the most relevant aspects of the Scale manager in this post. If you want to read more about that scale manager there is always the [phaser ce docs](https://photonstorm.github.io/phaser-ce/Phaser.ScaleManager.html) on the subject.


## 2 - An example of pseudo full screen

For an example of pseudo full screen, fake full screen, or just simply game canvas scaling I will be making a simple phaser example. This example will just be a basic image of something like just a circle, in a real project this will of course be the view port of a game, but for the scope of just scaling it should work just fine. When I click the canvas of this project the canvas will scale up to the size of the browser window, and when I click it again it will go back to the old location in the layout of a page. 

This can be archived by removing the canvas from the layouts container element, and then placing it in a fixed position div. Then when it is toggled back, it will be removed from the fixed div, and back to the original container. As you might guess the fixed div is placed above all other content on the page, and is scaled to fit the whole of the window.

### 2.1 - The index.html file

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Phaser Demos</title>
        <link rel="stylesheet" href="/css/style_vanilla.css">
    </head>
    <body style="margin:0px;padding:0px">
 
        <div style="margin-left:15px;margin-right:15px;">
            <div style="position:relative;width:100%;height:100px;background:#af0000;"></div>
            <div style="position:relative;background:#00af00;padding:20px;">
                <div id="gamearea"></div>
            </div>
        </div>
 
        <script src="/js/phaser.min.js"></script>
        <script src="./main.js"></script>
    </body>
</html>
```


