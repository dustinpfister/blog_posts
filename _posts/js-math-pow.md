---
title: Math pow in javaScript
date: 2019-12-10 21:28:00
tags: [js]
layout: post
categories: js
id: 578
updated: 2021-08-12 11:47:04
version: 1.31
---

The [Math pow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow) method is what can be used in javaScript to create a number that is a power from a base and an exponent, also know as [Exponentiation](https://en.wikipedia.org/wiki/Exponentiation). The use of this will come up often when working out expressions for things like curves, finding the distance between two points, working out a formula for leveling up a character in a game, and much more. There are many other Math methods that are often used in conjunction with Math.pow, such as Math.sqrt to create all kinds of useful expressions that are often used in creating pure functions that make up a useful module for kind of general task or another.

So then in this post I will be going over some basic examples of the Math.pow method of course, but from there I will also be getting into some other examples that I find myself using all the time in various projects. That is some usual suspects of sorts when it comes to the use of the Math.pow method in expressions and pure functions. However the focal point here will be the Math pow method and a few other things of interest the revolve around the method as I see it.

<!-- more -->

## 1 - Math pow basic example

So here I have a very basic example of the Math.pow method where I am just using the [array map method](/2020/06/16/js-array-map/) to make each element a power of 2 using a number in the array as an exponent. When using the Math.pow method the first argument is the base, and the second argument is the exponent value. So if I want an array of powers of two I pass two as the first argument, and then pass in the value for each number in the array as the exponent value which is the second argument.

```js

var nums = [0, 1, 2, 3, 4];
 
nums = nums.map((n) => Math.pow(2, n));
 
console.log(nums.join(','));
// 1,2,4,8,16
```

So then that is the basic idea of what the Math.pow method is all about. However there is a great deal more to be aware of when it comes to what this method is used for. Also there are many other methods, expressions, and topics that come into pay when it comes to using the Math.pow method to create some kind of actual project. So now that I have the basic example out of the way lets continue on to the good stuff.

## 2 - Get the exp of a number if you know the base

So lets say that I have this number, and I know that the number is a power of a base. Lets say that I also known the base, but I want to know the exponent. The [Math.log method](/2018/12/26/js-math-log/) can be used to find that exponent, by dividing the log of the number by the log of the base. This can then be used to create a kind of getExp method that can serve as a kind of inverse of the Math.pow method.

```js
var getExp = function (n, b) {
    return Math.log(n) / Math.log(2);
};
 
var n = Math.pow(2, 4);
console.log(getExp(n, 2)); // 4
```

This is something that comes up now and then when working with powers in projects so I though I should mention this in my post on math.pow. I will be getting more into the subject of inverse functions later in this post when I start getting into some actual basic project examples, such as with the experience point system example.

## 3 - limits of 2d images

Now for an interesting example of the math pow method that has to do with the total possible number of image combinations in an image matrix with a fixed width, height and color depth. This is something of interest to me that I seem to keep coming back to now and then, because I find it so interesting. In fact I have made a [canvas example that is on this topic of a limit to what is possible in a 2d image](/2019/12/11/canvas-example-image-limits/). Sure we are talking about very large numbers, even with very low resolution and color depth, but still it is not infinite.

When I think of the most basic form of an image I think of an image that is just one by one in pixel resolution, with a color depth of only two indexed colors. When it comes to that kind of image there are only two possible images one with a pixel that is of the first indexed color, and other which is the other indexed color. As the color depth increases on its way to true color, and as the resolution approaches infinity, the total number of possible images approaches, but never truly reaches infinity. So there is always a limit to the number of possible images, it is just that things can quickly get into a situation in which we are taking about crazy large finite numbers.

So in this section I will be going over some methods that have to do with creating image data by way of an index value that is a number between zero and the total number of possible images in a given image matrix. This is one of the most fun and interesting things I can think of that has to do with the math pow method.

### 3.1 - Find the total number of possible images and MAX_SAFE_INTEGER

When it comes to the total possible number of images in a given image matrix such numbers can quickly surpass max safe integer even with very low resolutions and color depths. However it is not so hard to work out some simple methods that will return a true or false value if a number surpasses max safe integer and also the total possible number of images in the event that all is good.

```js
// find total number of images
var totalImages = function (w, h, colorDepth) {
    return Math.pow(colorDepth, w * h);
};
// is the image size and depth beyond MAX_SAFE_INTEGER ?
var pastSafe = function (w, h, colorDepth) {
    return totalImages(w, h, colorDepth) >= Number.MAX_SAFE_INTEGER
};
```

Using the math pow method I can just use the color depth as the base and the total number of pixels in the image as the exponent and the result will be the total number of images that is possible in the matrix. When it comes to getting into this sort of thing you will want to keep the resolutions and color depths very low as it is very easy to start getting into very large numbers.

### 3.2 - index from an image string methods

```js
// Basic indexFromString using parseInt that will work for a colorDepth
// up to 36
var indexFromString = function (string, colorDepth) {
    return parseInt(str.split('').reverse().join(''), colorDepth);
};
// complex indexFromString using Math.pow and parseInt
var indexFromString2 = function (string, colorDepth) {
    colorDepth = colorDepth || 2;
    var index = 0;
    string.split('').forEach(function (pix, i) {
        index += Math.pow(colorDepth, i) * parseInt(pix, colorDepth);
    });
    return index;
}
```

### 3.3 - Create and image string from an index

I will need to work out a way to express image data as a string of color index values for each pixel. This can be done with the to string method of a number as long as I do not mind keeping the color depth below that of 36. For this set of examples I will only want to keep the color depth at 2, or not that much higher anyway because of the limits of javaScript numbers. 
```js
// create a image String from an index value of a color depth and size
var IMGStringFromIndex = function (index, colorDepth, size) {
    index = index || 0;
    size = size || 7 * 7;
    colorDepth = colorDepth || 2;
    var maxIndex = Math.pow(colorDepth, size) - 1,
    num,
    baseStr;
    if (index > maxIndex) {
        index = maxIndex;
    }
    if (index < 0) {
        index = 0;
    }
    num = index.toString(colorDepth);
    baseStr = new Array(size).fill('0').join('');
    return String(baseStr + num).slice(size * -1).split('').reverse().join('');
};
```

This method will then create and return and image string for a given image index value, color depth, and pixel size. This will work just fine for what I want to do with these methods, things can get into very large numbers very fast after all.

### 3.4 - Chunk and image string into an array of arrays

Here I have a method that can be used to quickly [chunk](/2017/09/13/lodash-chunk/) an image string into an array of arrays so that the image is more apparent. This could also be used in conjunction with other methods like [map](/2018/02/02/lodash_map/) and [flatten](/2018/08/12/lodash_flatten/) to create actual image data.

```js
// chunk and img string into an array of arrays
// with the given width
var chunkIMGString = function (str, w) {
    var i = 0,
    strArr = str.split(''),
    arr = [];
    while (i < str.length) {
        arr.push(strArr.slice(i, i+ w));
        i += w;
    }
    return arr;
};
```

### 3.5 - Lets check this out

So now to try things out with these methods to see if everything works as expected. I will want to start out with a very low resolution and color depth such as 4 by 4 with a depth of 2.

```js
var w = 4, h = 4,
size = w * h,
colorDepth = 2,
index = 38505,
 
str = IMGStringFromIndex(index, colorDepth, size),
img = chunkIMGString(str, w);
 
console.log(str);
// 1100100000000000
 
console.log(img);
// [ [ '1', '0', '0', '1' ],
//   [ '0', '1', '1', '0' ],
//   [ '0', '1', '1', '0' ],
//   [ '1', '0', '0', '1' ] ]
 
console.log(totalImages(w, h, colorDepth)); // 65536
console.log(pastSafe(w, h, colorDepth)); // false
console.log(indexFromString(str, colorDepth)); // 19
console.log(indexFromString2(str, colorDepth)); // 19
```

This seem to work as expected, but this is just scratching the surface of what can be done with the math pow method. It is pretty cool that the total number of possible images in a matrix as low as 4 by 4 with a color depth of only two indexed colors all ready is a fairly large number of 65536. As I play around with the values I very quickly go beyond max safe integer.

If I wanted to make a more comprehensive project centered around this I would want to use the math pow method of some kind of big integer library that uses strings to store numbers. There is also now the big init type in javaScript itself actually, but as of this writing it is not well supported.

## 4 - Creating an experience point system

Another major example of the Math.pow method and methods that are used to invert such a method would be to use Math.pow in one or more expressions that have to to with an experience point system. When [making an experience point system](/2020/04/27/js-javascript-example-exp-system/) I have found that I usually will need to [functions that are inversions](/2021/07/23/js-function-inverse/) of each other. That is one function where I pass an argument that is an exp value, and the return value is level, and another method where the argument that I pass is level and the return value is exp.

I might go so far is to create a full experience point system module of one kind or another, but some times I might just use a simple system that is a collection of these two methods. Here I have one such example of this kind of module that has the two getXP, and getLevel methods. I also have methods in a form where it is an object that is returned with all the usual properties that I would want to have.

```js
var utils = {};
utils.XP = (function () {
    // default values
    var default_deltaNext = 50,
    defualt_cap = 100;
    // get level with given xp
    var getLevel = function (xp, deltaNext) {
        deltaNext = deltaNext === undefined ? default_deltaNext : deltaNext;
        return (1 + Math.sqrt(1 + 8 * xp / deltaNext)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var getXP = function (level, deltaNext) {
        deltaNext = deltaNext === undefined ? default_deltaNext : deltaNext;
        return ((Math.pow(level, 2) - level) * deltaNext) / 2;
    };
    // parse a levelObj by XP
    var parseByXP = function (xp, cap, deltaNext) {
        //cap = cap === undefined ? default_cap : cap;
        var l = getLevel(xp);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = getXP(level + 1);
        return {
            level: level,
            levelFrac: l,
            per: l % 1,
            xp: xp,
            forNext: l === cap ? Infinity : forNext,
            toNext: l === cap ? Infinity : forNext - xp
        };
    };
    return {
        // use getXP method and then pass that to parseXP for utils.XP.parseByLevel
        parseByLevel: function (l, cap, deltaNext) {
            return parseByXP(getXP(l, deltaNext), cap);
        },
        // can just directly use parseByXP for utils.XP.parseByXP
        parseByXP: parseByXP
    };
}
    ());
// seems to work okay
var a = utils.XP.parseByLevel(80, 100, 75);
var b = utils.XP.parseByXP(a.xp, 100, 75);
console.log(a); // { level: 10, levelFrac: 10, xp: 2250, forNext: 2750, toNext: 500 }
console.log(b); // { level: 10, levelFrac: 10, xp: 2250, forNext: 2750, toNext: 500 }
```

I decided to make this example part of my collection of usual suspect type methods for my [general utilities module](/2021/08/06/js-javascript-example-utils/).

## 5 - Conclusion

So that Math.pow method has many uses including finding out the limits of 2d images which is pretty cool. What else is there that can be done with the Math.pow method? Well I fairly sure that I have not even starched the surface. As I find even more examples to write about, I will get around to expanding this post even more.