---
title: Normalizing Points in Phaser
date: 2018-08-21 09:40:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 266
updated: 2018-08-23 13:34:20
version: 1.6
---

In this post on [Phaser ce](https://photonstorm.github.io/phaser-ce/) the html5 powered game framework, I will be writing about the Point.normalize method that can be used to normalize 2d points. Normalizing points is a way to bring one or more Points into a common scale, once that is the case the process of scaling it back up, or down, as well a translating it is much easier.

<!-- more -->

## 1 - What to know before continuing

This is a post on the Phaser.Point.normalize method in phaser ce the html 5 powered game framework. I will not be getting into the basics of phaser, let alone javaScript in general. The Point class alone has many methods like this that are helpful in different ways, there are many more such methods that come in handy and I will be using those as well in the examples outline here.

## 2 - A very Basic example of Phaser.Point.normalize

So for a very basic example of Point.normalize I will be using the Point.normalize prototype method. There is also a static form of the method as well, but that expects only an instance of Point as the first argument, so you might as well just use the prototype method in most cases.

```js
var point = new Phaser.Point(10, 1),
 
// normalize point
normal = Phaser.Point.normalize(point);
 
console.log(point); // i.Point {x: 10, y: 1, type: 25}
console.log(normal); // i.Point {x: 0.9950371902099892, y: 0.09950371902099892, type: 25}
```

## 3 - A Point of Phaser.Point.normalize, easy scaling, and translating.

So the nice thing about normalizing is that it can bring an array of points into a standard once unit long size that can then be easily positioned and scaled. Say you have some kind of constructor that gives you an array of Points, and you want to set them to a certain scale, and translate them somewhere.

To make the process of doing this easy it would be nice to have all the points positioned relative to 0,0, and set to a certain polar distance from 0,0 that is between 0, and 1. Then the process of scaling is just a matter or running through each point and changing the distance from 0,0 to the desired unit length, and then translating to where I want them to be. This is where normalization comes into play.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

var mkPollyCircle = function (pLen, d, xOff, yOff) {

    var points = [],
    pt,
    x,
    y,
    a,
    pi;

    pLen = pLen === undefined ? 10 : pLen;
    d = d === undefined ? 100 : d;
    xOff = xOff === undefined ? 25 : xOff;
    yOff = yOff === undefined ? 25 : yOff;

    pi = 0;
    while (pi < pLen) {

        a = Math.PI * 2 * (pi / pLen);
        x = Math.floor(Math.cos(a) * d + xOff);
        y = Math.floor(Math.sin(a) * d + yOff);

        pt = new Phaser.Point(x, y);

        points.push(pt);

        pi += 1;
    }

    return new Phaser.Polygon(points);

};

// a polly state
game.state.add('polly', {

    create: function () {

        // create a Phaser Polygon  from an array of points
        var polly = mkPollyCircle(5, 100, 50, 50);

        // before normalization
        console.log(polly.points[0]); // i.Point {x: 150, y: 50, type: 25}

        // normalize all
        polly.points.forEach(function (pt) {
            pt = pt.normalize();
        });

        // after normalization
        console.log(polly.points[0]); // i.Point {x: 0.9486832980505138, y: 0.3162277660168379, type: 25}

        // now the polygon can be easily scaled, and positioned
        var scale = 5,
        offset = {
            x: 100,
            y: 100
        };
        polly.points.forEach(function (pt) {
            pt.x = pt.x * scale + offset.x;
            pt.y = pt.y * scale + offset.y;
        });

        console.log(polly.points[0]); // i.Point {x: 104.74341649025257, y: 101.58113883008419, type: 25}


    }

});

game.state.start('polly');
```

## 4 - Conclusion

So Point.normalize can be used to set the unit length of one or more points to 1, which can be thought of as a kind of standard unit length of the point. From there it can be scaled up to a higher distance, assuming that the angle, or direction of the point remains the same. For more on this you might want to check out my post on [Point.setMagnitude](/2018/08/22/phaser-point-setmagnitude/) as well.