---
title: javaScript break statement examples
date: 2019-02-19 12:02:00
tags: [js]
layout: post
categories: js
id: 386
updated: 2019-05-20 17:23:32
version: 1.13
---

The [break statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break) in javaScript can be used to break out of a loop. It can also be used in combination with labels to break a specific loop from within two or more nested loops. There are other ways to break a loop as well, such as using the return keyword within the body of a function for example, and there is also the continue keyword as well that can be used to skip a body of code and continue a loop as well. In this post however I will be focusing on the break statement and some basic use case examples as to why it might come in handy now and then.

<!-- more -->

## 1 - javaScript break basics

The break keyword can be used to break out of a loop when a certain condition is met. This can help avoid having to loop threw the full contents of an array for example.

```js
let arr = [3, 'foo', 4],
i = arr.length;
while (i--) {
    if (typeof arr[i] === 'string') break;
}
console.log(i); // 1

```

With a simple example like this it does not make much of any difference really, but then it comes to a far more complex block of code that involves a much larger array, and some resource intensive code that does not need to be applied for all elements in an array, or all permutations of a loop the break keyword can be used in conjunction with if statements and continue to help reduce the number of operations preformed.

## 2 - switch statements and javaScript break

I do not come across switch statements often, and I do my best to avoid using them but never the less when working with a switch statment the break keyword is also used for each case of a switch.

```js
let foo = (bar) => {
    switch (bar) {
        case 'foo':
            return 'foobar';
        break;
        case 'answer':
            return 42;
        break;
    }
    return 'bar';
}
console.log(foo()); // 'bar'
console.log(foo('foo')); // 'foobar'
console.log(foo('answer')); // 42
```

## 3 - javaScrpt break and labels

When making something that has two or more nested loops it is possible to use labels as a way to break out of the desired loop within the nested loops. By default the break keyword will break out of the loop from which it is called, but if for some reason I want to break out of a loop that is one other than that one I can use labels as a way to go about doing just that.

```js
let findGuy = (grid) => {
    let x,
    y = 0,
    guy = {};
    height: while (y < grid.h) {
        x = 0;
        width: while (x < grid.w) {
            let cell = grid.cells[y][x];
            if (typeof cell === 'object') {
                if (cell.type==='guy') {
                    guy = cell;
                    break height;
                }
            }
            x += 1;
        }
        y += 1;
    }
    if (guy.type === 'guy') {
        guy.x = x;
        guy.y = y;
    }
    return guy;
};
console.log(findGuy({
        w: 3,
        h: 3,
        cells: [
            [0, 0, 0],
            [0, {type: 'guy'}, 0],
            [0, 0, 0]]
    }));
// { type: 'guy', x: 1, y: 1 }
```

Some developers do not recommend the use of break and labels as it is similar to goto. It is then recommended to make a more functional approach with something like this, that would also be a a little more fine grain as well. Still this is one other way to go about using the break statement and can be used in conjunction with labels not just in switch statements but with loops as well.

### 3.1 - The same example without javaScript break and labels

The same example that makes use of javaScript break and labels could be written in a more functional and fine grain form. This would involve working with a copy of the object so as not to mangle the original object that is passed to the fine guy method, and breaking the process down into several methods that each do just one little thing.

```js

// return a grid with flat cells array
let flat = (grid) => {
    let gridC = JSON.parse(JSON.stringify(grid)),
    c = [];
    gridC.cells.forEach((cells, y) => {
        cells.forEach((cell, x) => {
            if (typeof cell === 'object') {
                cell.x = x;
                cell.y = y;
            }
            c.push(cell);
        });
    });
    gridC.cells = c;
    return gridC;
};
// find a guy
let findGuy = (grid) => {
    return flat(grid).cells.find((cell) => {
        if (typeof cell === 'object') {
            if (cell.type === 'guy') {
                return true
            }
        }
    });
};
console.log(findGuy({
        w: 3,
        h: 3,
        cells: [
            [0, 0, 0],
            [0, {
                    type: 'guy'
                }, 0],
            [0, 0, 0]]
    }));
// { type: 'guy', x: 1, y: 1 }
```

## 4 - Use return in a function over javaScript break when possible

Another way to break out of a loop is to use return in the body of a function. Just like that of the javaScript break keyword it will stop any loop that might be occurring in the body of the function.

```js
let arr = [3, 'foo', 4],
getFirstString = (arr) => {
    let i = arr.length;
    while (i--) {
        if (typeof arr[i] === 'string') {
            return {
                i: i,
                str: arr[i]
            }
        }
        console.log(i, arr[i]);
        // 2 4
        // 1 'foo'
    }
},
a = getFirstString(arr);
console.log(a.i, a.str); // 1 'foo'
```