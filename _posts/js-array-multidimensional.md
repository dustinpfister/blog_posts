---
title: Multidimensional arrays in javaScript
date: 2020-03-31 15:10:00
tags: [js]
layout: post
categories: js
id: 638
updated: 2020-04-01 08:15:05
version: 1.2
---

In JavaScript Multidimensional arrays can be implemented in a number of ways. Maybe the most common way is to just have arrays of arrays, however there are other ways of doing so that involve just having a single linear array and a formula to get a proper index value.

Multidimensional arrays will come up often when it comes to any kind of project that will involve a 2d grid, a 3d plain, tables, or anything else where doing so might be called for. So having a solid understanding of the different ways to go about having arrays with two or more dimensions is called for when it comes to a wide range of applications where the use of them will come into play. So lets look at some typical examples, as well as some other examples that might be not so typical with multidimensional arrays in javaScript.

<!-- more -->


## 1 - Using Arrays of arrays

### 1.1 - Using literal array bracket syntax to create a static array of arrays

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