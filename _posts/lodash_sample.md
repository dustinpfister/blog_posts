---
title: The lodash _.sample method for simpler sampling
date: 2018-07-13 12:34:00
tags: [js,lodash]
layout: post
categories: lodash
id: 234
updated: 2019-11-07 13:22:46
version: 1.6
---

Time for another post on [lodash](https://lodash.com/) because it is still widely used these days, and it is still useful even in light of new features added to native javaScript in late specs of the language. Regardless of what people say, methods like [\_.sample](https://lodash.com/docs/4.17.4#sample) help to make coding in javaScript faster, and more concise. However it is still not to hard to clone many such methods with plain vanilla javaScript. In this post I will be writing about \_.sample, as well as native javaScript solutions for the same task. These examples might help to show why many still like to use lodash to help get things done faster, and focus more on what really matters when working on a project.

<!-- more -->

## 1 - What to know

This is a post on the lodash method \_.sample, and a few related methods, as well as some corresponding plain old javaScript examples as well. It is not a getting started post on lodash, or javaScript in general.

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

For a more advanced example of this I made an object that represents a grid of objects. The objects are stored as a linear array, so I would want some methods that can be used to convert it to an array of arrays. For the sake of this post I would also want a method that I can use to get a random object, ans well as a random row, and col of objects.

### 3.1 - The lodash version of the gird object

If using lodash there is \_.chunk, and _.zip that are very useful when dealing with these kinds of situations apart from that of just \_.sample. So for my example of the grid object using lodash I would use those methods.

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
 
console.log(grid.rnd()); // random object
console.log(grid.rnd('row')); // random row
console.log(grid.rnd('col')); // random col
```

I was able to put this together in a flash, and the code is very short, and clean. This is what lodash ( and making use of what is all ready out there in general ) is all about, making use of usual suspect methods to make quick work of things, and move on with what really matters.

### 3.2 - A vanilla js alternative

So for me it's not so hard to make a vanilla js alternative to this, but it was still far more time consuming. When coding with vanilla js I seem to prefer while loops over for loops or for each.

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

There are many ways to go about crunching this down a little more I am sure, but you get the idea. I know that it is nice to have a situation in which I am not depending on additional external resources, and as such am juts working directly within javaScripot itself. However these days, as I work on more complex projects, I often do just end up making lodash part of the stack, and if it is there I might as well make use of it.