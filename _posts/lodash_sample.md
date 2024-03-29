---
title: The lodash sample method, and vanilla javaScript solutions for getting random elements from a collection.
date: 2018-07-13 12:34:00
tags: [js,lodash]
layout: post
categories: lodash
id: 234
updated: 2021-12-23 14:31:13
version: 1.24
---

In [lodash](https://lodash.com/) the [\_.sample](https://lodash.com/docs/4.17.4#sample) method will return a random element from a given collection object. That is it will give a random value from a random public key from an array, or one of the own properties of a given object in general.

Although methods like the lodash sample method can prove to be useful in some situations, it is still not to hard to clone many such methods with plain vanilla javaScript. Also often I might need to do something similar to what the lodash same method does such as getting a random range of elements, or a few single selections from a collection with or without replacement. So in this post I will be writing about \_.sample in lodash, as well as native javaScript solutions for the same task that the lodash sample method does and then some. These examples might help to show why many still like to use lodash to help get things done faster, and focus more on what really matters when working on a project. However they might also show the limitations of lodash, and why it might in fact be best to write, and select solutions from the ground up as they are needed by making some kind of custom made utilty library in place of lodash.

<!-- more -->

## 1 - What to know

This is a post on the lodash method \_.sample, and a few related methods, as well as some corresponding plain old javaScript examples as well. It is not a getting started post on lodash, or javaScript in general, so I assume  that you have at least a little experience with the very basics of what is needed before hand. If not you might want to start out with something else that has more to do with [getting started with javaScript](/2018/11/27/js-getting-started/) itself rather than using a user space library such as lodash first.

Also even if you have a fair amount of experience with javaScript thus far it might be best to read up more on various advanced topics surrounding the use of [Math.random](/2020/04/21/js-math-random/) in native javaScript actually rather than bothering with the lodash sample method. Unless you are using lodash in a project, and the method will work fine for what you need it for in which case maybe you wold want to just use the sample method and move on with things. So then with that said in this sectionI will be starting out with the lodash sample method and other related lodash features before moving on to additional sections that have to do with vanilla javaScript and simple project examples.

### 1.1 - Basic array example of \_.sample

So Sample is pretty straight forward, just give it an array, and it will return a random element from that array, a common task that comes up a lot when developing.

```js
let nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1];
console.log( _.sample(nums) ); // (random element from nums)
```

However when working on a project I might now always be dealing with a collection that is an instance of an array, but some other kind of collection. For example it might be a node list or some other kind of object standard that is like an array but not. Of I might even be dealing with a collection that is not an array at all, but an object with named rather than numbered public keys. The good news though is that this lodash sample method is a collection method that will also work with those kinds of objects, so lets look at a few more examples of this method with other kinds of collections.

### 1.2 - Basic example of lodash sample with a named keys collection object

The nice thing about the lodash sample method is that it is just one example of the many collection methods in lodash, which means it will not just work with arrays, but objects in general. So then if I have an object with named keys and I want a random value of one of these names keys I can also use the lodash sample method to do that.

```js
let obj = {
    foo: 40,
    bar: 2,
    baz: 7
};
let n = _.sample(obj);
console.log(n);
```

## 2 - Valina javaScript solutions for what lodash sample does

It is not so hard to do what the lodash sample method does with just plain javaScript my itself. So with that said in this section I will be going over some quick examples of doing what the lodash sample methods does using just plain javaScript by itself. The basic idea of what sample is as far as arrays in concerned will just involve the Math random method alone with the [length property of an array](/2018/12/14/js-array-length/), and some quick rounding using a method like the [Math floor method](/2020/06/15/js-math-round/). There is a bit more to be aware of when it comes to doing the same with objects in general, but it will just involve a few more native javaScript tools to work with.

### 2.1 - A vanilla js solution with an array

It's not like doing this in plain old javaScript is that hard, and if you are just using lodash for this method and nothing else, it is kind of overkill, unless you just use just this one method or some kind of equivalent.

```js
nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1];
 
let si = Math.floor(nums.length * Math.random()),
samp = nums.slice(si,si+1)[0];
 
console.log(samp); // (random element from nums)
```

The think about this is that if I am going to bother with lodash, rather than going pure vanilla as some might say, I would of course use more than just one method, so maybe a more advanced example that makes use of a few lodash methods is in order to really see how lodash does in fact help.

### 2.2 - A vanilla ja solution with an object with named keys

Doing the same with an object in general can be done the same way, assuming that you have a way to create an array of values to begin with from the object. In most situations the Object.values static method will work just fine whe  it comes to quickly creating an array of values from an object in general.

```js
let obj = {
    foo: 40,
    bar: 2,
    baz: 7
};
var values = Object.values(obj);
var n =  values[ Math.floor( values.length * Math.random() ) ];
console.log(n);
```

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
// demo
console.log(grid.rnd());
console.log(grid.rnd('row'));
console.log(grid.rnd('col'));


```

There are many ways to go about crunching this down a little more I am sure, but you get the idea. I know that it is nice to have a situation in which I am not depending on additional external resources, and as such am juts working directly within javaScripot itself. However these days, as I work on more complex projects, I often do just end up making lodash part of the stack, and if it is there I might as well make use of it.

## 4 - Conclusion

The lodash same method is then one way to go about getting a random element from a collection, that is a random value from an array or any object in general. However it is really not all that hard to write a simple line or two of javaScript in order to do this sort of thing also, and when doing so that of course gives me more flexibility when it comes to how to go about getting a simple element from a collection.

If you enjoyed this post and are in the mood for some more lodash relevant reading there is my [main post on lodash](/2019/02/15/lodash/), as well as my [many other posts that I have written on the lodash](/categories/lodash) utility library. Speaking of utility libraries there is the idea of making a custom utility library from the ground up rather than using something like lodash with that said there is my post on my [vanilla javaScript utilities library](/2021/08/06/js-javascript-example-utils/).

