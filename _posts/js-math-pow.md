---
title: Math pow in javaScript
date: 2019-12-10 21:28:00
tags: [js]
layout: post
categories: js
id: 578
updated: 2019-12-11 13:51:59
version: 1.9
---

The [Math pow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow) method is what can be used i javaScript to create a number that is a power from a base and an exponent. The use of this will come up often when working out expressions for things like curves, finding the distance between two points, working out a formula for leveling up a character in a game, and much more.

There are many other Math methods of interesting in javaScript also that are often used in conjunction with Math pow, and I will be using those as well in this post. However the focal point here will be the Math pow method and a few other things of interest the revolve around the method as I see it.

<!-- more -->

## 1 - Math pow basic example

So here I have a very basic example of the Math.pow method where I am just using the array map method to make each element a power of 2 using a number in the array as an exponent.

```js

var nums = [0, 1, 2, 3, 4];
 
nums = nums.map((n) => Math.pow(2, n));
 
console.log(nums.join(','));
// 1,2,4,8,16
```

## 2 - Get the exp of a number is you know the base

So lets say that I have this number. I know that the number is a power of a base, and I have the base, but I want to know the exponent. The Math.log method can be used to find that exponent, but dividing the log of that number by the log of the base.

```js
var getExp = function (n, b) {
    return Math.log(n) / Math.log(2);
};
 
var n = Math.pow(2, 4);
console.log(getExp(n, 2)); // 4
```

This is something that comes up now and then when working with powers in projects so I though I should mention this in my post on math.pow.

## 3 - limits of 2d images

Now for an interesting example of the math pow method that has to do with the total possible number of image combinations in an image matrix with a fixed width, height and color depth. This is something of interest to me that I seem to keep coming back to now and then, because I find it so interesting. That is that there is a limit to what is possible in a 2d image, sure we are talking about very large numbers, even with very low resolution and color depth, but still it is not infinite.

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

### 3.4 - Chunk and image string into an array of arrays

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