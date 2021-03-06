---
title: Basic text in phaser
date: 2017-10-14 08:43:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 65
updated: 2018-12-02 22:02:58
version: 1.5
---

In just about any [phaser 2](https://photonstorm.github.io/phaser-ce/index.html) game there is going to be a need to display some text, either because it is something that needs to be displayed, or for debugging purposes. There is of course bitmap text that can be used in Phaser, but that is a bit involved, as it requires a few asset files. If you just simply want to display some text, and are not two concerned about how it will look for now, there are the [text game objects](https://photonstorm.github.io/phaser-ce/Phaser.Text.html) that can be used.

<!-- more -->

# 1 - what to know

This is a post on creating basic text in a phaser game. It is also possible to create custom fonts using a sprite sheet, and json data, however thins post is just on the simple easy to use text display objects for just quickly displaying into in the game. The text display objects are great for debugging purposes, but they might not be the best choice when it comes to presentation. In any case they are very easy to use compared to the more complected time consuming rout of making a custom font, so if you just want to get displaying of text done, and move on they are a great choice for a phaser game.

## 2 - Phaser text hello world example

To add a text display object, just call game.add.text, and pass it a few arguments that have to do with position, content, and style of the text.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', 
 
    {
 
        create : function () {
 
            game.add.text(0, 0, 'Hello World', {fill : 'white'});
 
        }
 
    }
 
);
```

The first two arguments are the x, and y position of the text. The third argument is the content of the text, and the final argument is a style object.

## 3 - Changing text content

To change the content of the text there is the text property of the text display object that is returned when calling game.add.text.

```js
var game = (function () {
 
    var tx,
    foos = 0;
 
    return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {
 
        // create method
        create : function () {
 
            tx = game.add.text(20, 20, '', {
                    fill : '#ffffff'
                });
 
        },
 
        // the update method will be called on each tick
        update : function () {
 
            tx.text = 'foos: ' + foos;
 
            foos += 1;
        }
 
    });
 
}
    ());
```

## 4 - The style object

The style object used to style text follows many of the property names you may be familiar with when working with the 2d drawing context with canvas.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', 
 
{
 
        create : function () {
 
            game.add.text(0, 0, 'Hello World', {
                fill : 'white',
                font : '20px courier'
            });
 
        }
 
    }
 
);
```

## 5 - Changing position of text

Because a text object is a display object, it has many of the same properties as sprites, including of course x, and y. Changing the position of text is than just as simple.

```js
var game = (function () {
 
    var tx,
    i = 0,
    maxI = 500,
    per = 0,
    bias = 0;
 
    return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {
 
        // create method
        create : function () {
 
            tx = game.add.text(20, 20, '', {
                    fill : '#ffffff'
                });
 
        },
 
        // the update method will be called on each tick
        update : function () {
 
            per = i / maxI;
            bias = 1 - Math.abs(.5 - per) / .5;
 
            tx.text = 'i: ' + i;

            // changing text position on each update
            tx.x = 150 * bias;
            tx.y = Math.sin(Math.PI * 2 * bias) * 50 + 70;
 
            i += 1;
            if (i >= maxI) {
 
                i = i % maxI;
 
            }
        }
 
    });
 
}
    ());
```

## Conclusion

It many not be a replacement for bitmap text, but it gets the job done. When just starting out on a project it would be best to start out with regular old text at first, concentrate on what really matters in your project, is it how the text looks? If not hold off on bitmap text until you have the core of your project together.
