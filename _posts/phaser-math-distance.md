---
title: Finding the distance between two points in Phaser
date: 2017-10-27 12:17:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 76
updated: 2017-10-28 18:00:11
version: 1.5
---

In [Phaser](http://phaser.io/) there is a Math object like that of the Math object in core javaScript. There are a few methods there that come in handy, one of which is a usual suspects in most projects that is used to find the distance between two points. That is the 2d distance formula that can be found at Phaser.Math.distance.

<!-- more -->

{% phaser_top %}

{% phaser_if_new_mess %}

## The basic example

If I am using phaser as a dependency there is no need for a quick refresher for how to write the 2d distance formula, it's right there in Phasers Math Object. To use it I gave it four arguments that are the x, and y positions of both points concerned.

So anywhere in my project I can find distance like this.

```js
console.log(Phaser.Math.distance(0,0,100,25)); // 103.07764064044152
```

## A more advanced Phaser.Math.distance example using some graphics

So I put togather a quick demo for this one method involving two Graphics display objects.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {
 
        // create method
        create : function () {
 
            var one = game.add.graphics(game.world.centerX, game.world.centerY),
            text = game.add.text(10, 10, '', {
                    fill : '#ffffff',
                    font : '15px courier'
                });
 
            one.beginFill(0xff0000);
            one.drawCircle(0, 0, 25);
            one.endFill();
 
            var two = game.add.graphics(100, 50);
            two.beginFill(0x00ff00);
            two.drawCircle(0, 0, 25);
            two.endFill();
 
            two.data = {
 
                a : 0,
                aMax : 1000,
                radius : 100,
 
                amount : -100,
                over : 50,
                done : 0,
 
                // no mathematical modulo?
 
                modulo : function (x, m) {
 
                    return (x % m + m) % m;
 
                },
 
                update : function (gra) {
 
                    var r;
 
                    this.a += 1;
 
                    this.a = this.modulo(this.a, this.aMax);
 
                    r = Math.PI * 2 / this.aMax * this.a;
 
                    gra.x = game.world.centerX + Math.cos(r) * this.radius;
                    gra.y = game.world.centerY + Math.sin(r) * this.radius;
 
                    if (this.done < this.over) {
 
                        var delta = this.amount / this.over;
 
                        this.radius += delta;
 
                        this.done += 1;
 
                    } else {
 
                        if (this.radius <= 0) {
 
                            this.radius = 0;
                            this.amount = 100 * Math.random();
 
                        } else {
 
                            this.amount = -this.radius;
 
                        }
 
                        this.over = 10 + Math.floor(Math.random() * 490);
                        this.done = 0;
 
                    }
 
                }
 
            };
 
        },
 
        // the update method will be called on each tick
        update : function () {
 
            var text = game.world.children[1],
            one = game.world.children[0],
            two = game.world.children[2];
 
            two.data.update(two);
 
            // display the current distnace between the two
            text.text = 'distance: ' + Phaser.Math.distance(one.x, one.y, two.x, two.y).toFixed(2);
 
        }
 
    });
```

## Conclusion

The distance between two points comes up all the time in my projects. As I learn more about phaser I am happy to know that this is a great project to know a thing or two about. When it comes to making projects vanilla js style I can not tell you how many times I end up fishing for the distance formula, trying to remember how to write it yet again, but now it is always there for me within phaser, along with almost everything else I could want.

{% phaser_bottom %}