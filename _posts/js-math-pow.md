---
title: Math pow in javaScript
date: 2019-12-10 21:28:00
tags: [js]
layout: post
categories: js
id: 578
updated: 2020-07-18 13:34:35
version: 1.17
---

The [Math pow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow) method is what can be used in javaScript to create a number that is a power from a base and an exponent, also know as [Exponentiation](https://en.wikipedia.org/wiki/Exponentiation). The use of this will come up often when working out expressions for things like curves, finding the distance between two points, working out a formula for leveling up a character in a game, and much more. There are many other Math methods that are often used in conjunction with Math.pow, such as Math.sqrt to create all kinds of usful expressions that are often used in creating pure functions that make up a useful module.

So then in this post I will be going over some basic examples of the Math.pow method of course, but from there I will also be getting into some other examples that I find myself using all the time in various projects. That is some usual suspects of sorts when it comes to the use of the Math.pow method in expressions and pure functions. However the focal point here will be the Math pow method and a few other things of interest the revolve around the method as I see it.

<!-- more -->

## 1 - Math pow basic example

So here I have a very basic example of the Math.pow method where I am just using the array map method to make each element a power of 2 using a number in the array as an exponent. When using the Math.pow method the first argument is the base, and the second argument is the exponent value. So if I want an array of powers of two I pass two as the first argument, and then pass in the value for each number in the array as the exponent value which is the second argument.

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

## 4 - Conclusion

So that Math.pow method has many uses including finding out the limits of 2d images which is pretty cool. What else is there that can be done with the Math.pow method? Well I fairly sure that I have not even starched the surface. As I find even more examples to write about, I will gte around to expanding this post even more.