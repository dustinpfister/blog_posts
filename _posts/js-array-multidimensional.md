---
title: Multidimensional arrays in javaScript
date: 2020-03-31 15:10:00
tags: [js]
layout: post
categories: js
id: 638
updated: 2020-04-01 08:24:30
version: 1.4
---

In JavaScript Multidimensional arrays can be implemented in a number of ways. Maybe the most common way is to just have arrays of arrays, however there are other ways of doing so that involve just having a single linear array and a formula to get a proper index value.

Multidimensional arrays will come up often when it comes to any kind of project that will involve a 2d grid, a 3d plain, tables, or anything else where doing so might be called for. So having a solid understanding of the different ways to go about having arrays with two or more dimensions is called for when it comes to a wide range of applications where the use of them will come into play. So lets look at some typical examples, as well as some other examples that might be not so typical with multidimensional arrays in javaScript.

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

### 2.1 - A static example of using a single array and formula to get the proper index value

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