---
title: Multidimensional arrays in javaScript
date: 2020-03-31 15:10:00
tags: [js]
layout: post
categories: js
id: 638
updated: 2021-04-01 14:56:47
version: 1.13
---

In [JavaScript Multidimensional arrays](https://0fps.net/2013/05/22/implementing-multidimensional-arrays-in-javascript/) can be implemented in a number of ways. Maybe the most common way is to just have arrays of arrays, however there are other ways of doing so that involve just having a single linear array and a formula to get or set the proper index value in the [javaScript array](/2018/12/10/js-array/). In addition there is also doing things like having an array of arrays, bit each element is an object and these objects then have an array as one of its properties.

Multidimensional arrays will come up often when it comes to any kind of project that will involve a 2d grid, a 3d plane, tables, or anything else where doing so might be called for when doing something interesting with many dimensions. So having a solid understanding of the different ways to go about having arrays with two or more dimensions is called for when it comes to a wide range of applications where the use of them will come into play. So lets look at some typical examples, as well as some other examples that might be not so typical with multidimensional arrays in javaScript.

<!-- more -->

## 1 - Using Arrays of arrays

The most common way of making a multidimensional array in javaScript might be to just have arrays of arrays. That is having a single array, and then have each element in that array be an array. That alone would be a 2d array of arrays at which point making each element in each nested array an array would add yet another dimension, and so on.

In this section I will be going over just some simple examples of making 2d arrays of arrays this way.

### 1.1 - Using literal array bracket syntax to create a static array of arrays

So for this example I just have a grid of single digit hex values that is four by four. I start out with just a simple array, and then have four arrays within that array. In each nested array I then have my hex values where the lowest hex value is the first index of the first nested array, things then progress from that index value forward to the end of the nested array, and then continue in the next.

I can then access the primitive value in each nested array, by using the bracket syntax just like a single array, only when doing so I get a nested array rather than a primitive value, so Then need to give the index value of the element that I want in the nested array to get an element with one of my hex values.

If you are still confused maybe it would be best to look at a code example of this.

```js
// a 2d array of arrays can be created
// in a literal way like this
var grid = [
    ['0', '1', '2', '3'],
    ['4', '5', '6', '7'],
    ['8', '9', 'a', 'b'],
    ['c', 'd', 'e', 'f']
];
 
// elements can then be accessed like this
var cell = grid[3][2];
 
console.log(cell); // 'e'
```

This is a static form of a 2d array of arrays, however often I will want to have a way to generate such an array, so for this I will want to use some loops, and maybe do so in the body of a function.

### 1.2 - Using a function that will generate an array of arrays

I almost all projects I will want a way to go about creating a multidimensional array by way of some javaScript code that will generate the state of the array rather than the state being some kind of fixed hard coded value.

```js
// A function of some kind like this can be used
// to create the gird
var createGrid = function (w, h, forCell) {
    var grid = [],
    y = 0,
    row,
    i = 0,
    x;
    w = w === undefined ? 3 : w;
    h = h === undefined ? 3 : h;
    forCell = forCell === undefined ? function (i) {
        return i;
    }
     : forCell;
    while (y < w) {
        x = 0;
        row = [];
        while (x < h) {
            row.push(forCell(i));
            i += 1;
            x += 1;
        }
        grid.push(row);
        y += 1;
    }
    return grid;
};
 
// I can then create the same grid like this
var grid = createGrid(4, 4, function (i) {
        return i.toString(16);
    });
var cell = grid[3][2];
 
console.log(cell); // 'e'
```

## 2 - Using just one linear array

Although arrays of arrays work okay, I often just use a single array, and then work out a formula that is used to figure the proper index value for this single array.

### 2.1 - A static example of using a single array and formula to get the proper index value

One again lets start out with a simple static hard coded form of this kind of multinational array in javaScript.

```js
var grid = {
    w: 4,
    h: 4,
    cells: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
    get: function (x, y) {
        return this.cells[y * this.w + x];
    }
};
 
console.log(grid.get(2, 3)); // 'e'
```

### 2.2 - Making a function that will return an API with a single array and get method

Now to do the same thing, only once again make a function that will return my multidimensional array. Only this time it will return the array along with at least a width property. In addition I might also want a height property, and a method that I can use to get a location by way of passing an x and y value.

```js
var createGrid = function (w, h, forCell) {
    w = w === undefined ? 3 : w;
    h = h === undefined ? 3 : h;
    forCell = forCell === undefined ? function (i) {
        return i;
    }
     : forCell;
    var cells = [],
    i = 0,
    len = w * h;
    while (i < len) {
        cells.push(forCell(i));
        i += 1;
    }
    return {
        w: w,
        h: h,
        cells: cells,
        get: function (x, y) {
            return this.cells[y * this.w + x];
        }
    };
};
 
var grid = createGrid(4, 4, function (i) {
        return i.toString(16);
    });
 
console.log(grid.get(2, 3)); // 'e'
```

## 3 - Three or more dimensions

So then there is working something out for working with three or more dimensions. I quickly put something together for that, but it is still not working the way I would like it to really. I do get around to editing these posts now and then, maybe at some point I will come back to this one, or just come up with a better example all together when it comes to this sort of thing.

```js
var lengthFromDims = function (dims) {
    return Object.values(dims).reduce(function (acc, n) {
        return acc * n;
    });
};
 
// get Dim Value by index
var getDVByIndex = function (dims, i) {
    return Object.values(dims)[i];
};
 
// get the product of all dims from si to ei
var getDimProduct = function (dims, si, ei) {
    var p = getDVByIndex(dims, si),
    i = si + 1;
    while (i <= ei) {
        p = p * getDVByIndex(dims, i);
        i += 1;
    }
    return p;
};
 
var threePlus = function (dims, forCell) {
    dims = dims || {
        x: 2,
        y: 2,
        z: 2
    };
 
    var threePlus = [],
    i = 0,
    len = lengthFromDims(dims),
    pos = {};
    while (i < len) {
 
        Object.keys(dims).forEach(function (dimName, di) {
            var val = dims[dimName];
            // product of all dims from 0 to current
            var p = getDimProduct(dims, 0, di);
            // product of dims from less one from current to current
            var pdi = di - 1 < 0 ? 0 : di - 1;
            var p2 = getDimProduct(dims, pdi, di);
            var p3 = getDimProduct(dims, pdi, di - 1);
            //var s1 = (i % p2 + Math.floor(i / p)) % val;
            var a = i % p2,
            b = Math.floor(i / p),
            c = a + b,
            s1 = c % val;
            pos[dimName] = s1;
        });
 
        var cell = {};
        cell.i = i;
        Object.keys(pos).forEach(function (d) {
            cell[d] = pos[d];
        });
        threePlus.push(cell);
        i += 1;
    }
 
    return threePlus;
 
};
 
var print = function (threePlus) {
    return threePlus.map(function (a) {
        var vals = Object.values(a);
        return a.i + ':' + vals.slice(1, vals.length).join('');
    }).sort().join('\n');
}
 
var three = threePlus({
        x: 2,
        y: 2,
        z: 2
    });
 
console.log(print(three));
 
// output
// 0:000
// 1:111
// 2:100
// 3:011
// 4:010
// 5:101
// 6:110
// 7:001
 
// Desired output
// 0:000 0
// 1:100 2
// 2:010 4
// 3:110 6
// 4:001 7
// 5:101 5
// 6:011 3
// 7:111 1
```

## 4 - Conclusion

So then there is making an array of arrays, and then there is just having a single array, and just having a formula that can be used to get what you want from it. For an additional example of a multi denominational array there is my [draw points function](/2021/04/01/) that I made where I am using an array fo arrays to store points as well as settings for a bunch of lies that draw something to a canvas. The typical use case example though is to make some kind of grid module that will be an array fo arrays, or a single array that make use of an expression to knowhow to get and put values into the array. If you are having a hard time making a decision with it though there is always making methods that will convert one from to another, and other that might just be what needs to happen. When working out a project there might be typical forms that are used for various modules, but often developers come up with there own weird formats for things to, present company included.

