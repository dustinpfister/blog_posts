---
title: The lodash _.sample method for simpler sampling
date: 2018-07-13 12:34:00
tags: [js,lodash]
layout: post
categories: lodash
id: 234
updated: 2018-07-13 13:23:56
version: 1.1
---

Time for another post on [lodash](https://lodash.com/) becuase it is very popular, and it is still useful. Regardless of what people say methods like [\_.sample](https://lodash.com/docs/4.17.4#sample) help to make coding in javaScript faster, and more concise. In this post I will be writing about \_.sample, and also show some examples of why I do tent to prefer using lodash to help get things done faster, and focus more on what really matters.

<!-- more -->


## 2 - Basic example of \_.sample

So Sample is pretty straight forward, just give it an array, and it will return a random element from that array, a common task that comes up a lot when developing.

```js
let nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1];
 
console.log( _.sample(nums) ); // (random element from nums)
```

### 2.1 - Compare to a vanilla js solution.

It's not like doing this in plain old javaScript is that hard, and if you are just using lodash for this method and nothing else, it is kind of overkill, unless you just use just this one method or some kind of equivalent.

```js
nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1];
 
let si = Math.floor(nums.length * Math.random()),
samp = nums.slice(si,si+1)[0];
 
console.log(samp); // (random element from nums)
```

The think about this is that if I am going to bother with lodash, rather than going pure vanilla as some might say, I would of course use more than just one method, so maybe a more advanced example that makes use of a few lodash methods is in order to really see how lodash does in fact help.

## 3 - The grid object example

### 3.1 - The lodash version of the gird object

```js
let grid = {
 
    // the col width, and grid cells stored as a linear array
    w : 3,
    cells : [
        {gold: 1,wood:0},{gold: 0,wood:7},{gold: 2,wood:9},
        {gold: 0,wood:0},{gold: 0,wood:7},{gold: 0,wood:7},
        {gold: 0,wood:0},{gold: 10,wood:0},{gold: 0,wood:6}],
 
    // chunk the linear array into an array of arrays
    // where each array is a row
    chunkToRows: function () {
 
        // so _.chunk makes quick work of this
        return _.chunk(this.cells, this.w)
 
    },
 
    // chunk the linear array into an array of arrays
    // where each array is a col (rotated right)
    chunkToCols : function(){
 
        // _.zip is useful for doing this
        return _.zip.apply(0, this.chunkToRows());
 
    },
 
    // get a Random row, col or cell
    rnd: function(what){
 
       what = what || 'cell';
 
       // get a random row
       if(what === 'row'){
 
            return _.sample(this.chunkToRows());
 
        }
 
       // get a random col
       if(what === 'col'){
 
           return _.sample(this.chunkToCols());
 
       }
 
        // default to getting a random single cell
        return _.sample(this.cells);
 
    }
 
};
 
console.log(grid.rnd());
console.log(grid.rnd('row'));
console.log(grid.rnd('col'));
```

### 3.2 - A vanilla js alternative

```js
let grid = {
 
    // the col width, and grid cells stored as a linear array
    w: 3,
    cells : [
        {gold: 1,wood:0},{gold: 0,wood:7},{gold: 2,wood:9},
        {gold: 0,wood:0},{gold: 0,wood:7},{gold: 0,wood:7},
        {gold: 0,wood:0},{gold: 10,wood:0},{gold: 0,wood:6}],
 
    // chunk the linear array into an array of arrays
    // where each array is a row
    chunkToRows: function () {
 
        let matrix = [],
        i = 0;
        while (i < this.cells.length) {
 
            let x = i % this.w,
            y = Math.floor(i / this.w);
 
            if (!matrix[y]) {
 
                matrix[y] = [];
 
            }
 
            let row = matrix[y];
 
            row.push(this.cells[y * this.w + x]);
 
            i += 1;
 
        }
 
        return matrix;
 
    },
 
    // chunk the linear array into an array of arrays
    // where each array is a col (rotated right)
    chunkToCols: function () {
 
        let copy = [],
        original = this.chunkToRows(),
        i = 0;
        while (i < this.cells.length) {
 
            let x = i % this.w,
            y = Math.floor(i / this.w);
 
            // create row if it doesn't exist yet
            if (copy[y] === undefined) {
                copy[y] = [];
 
            }
 
            // swap
            copy[y][x] = original[x][y];
 
            i += 1;
        }
        return copy;
 
    },
 
    // get a Random row, col or cell
    rnd: function (what) {
 
        what = what || 'cell';
 
        // get a random row
        if (what === 'row') {
 
            let rows = this.chunkToRows();
            return rows[  Math.floor( Math.random() * rows.length ) ];
 
        }
 
        // get a random col
        if (what === 'col') {
 
            let cols = this.chunkToCols();
            return cols[  Math.floor( Math.random() * cols.length ) ];
 
        }
 
        // default to getting a random single cell
        return this.cells[  Math.floor( Math.random() * this.cells.length ) ];
 
    }
 
};
 
console.log(grid.rnd());
console.log(grid.rnd('row'));
console.log(grid.rnd('col'));
```