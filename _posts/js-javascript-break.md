---
title: javaScript break statement examples
date: 2019-02-19 12:02:00
tags: [js]
layout: post
categories: js
id: 386
updated: 2019-02-19 14:12:53
version: 1.5
---

The break statement in javaScript can be used to break out of a loop. It can also be used in combination with labels to break a specific loop from within two or more nested loops. There are other ways to break a loop as well, such as using the return keyword within the body of a function for example, and there is also the continue keyword as well that can be used to skip a body of code and continue a loop as well. In this post however I will be focusing on the break statement and some basic use case examples as to why it might come in handy now and then.

<!-- more -->

## 1 - javaScript break

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

## 2 - switch statements

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

## 3 - break and labels

```js
let findGuy = (grid) => {
 
    let y = 0,
    x,
    c = 0,
    cell = {};
 
    outer: while (y < grid.h) {
        x = 0;
        while (x < grid.w) {
            cell = grid.cells[y * grid.w + x];
            if (cell.guy) {
                break outer;
            }
            c += 1;
            x += 1;
        }
        y += 1;
    }
 
    if (cell.hp > 0) {
        return {
            guy: cell,
            c: c
        };
    }
    return {
        guy: false,
        c: c
    };
 
};
 
console.log(findGuy({
        h: 3,
        w: 3,
        cells: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    })); // {guy: false, c:9}
 
console.log(findGuy({
        h: 3,
        w: 3,
        cells: [0, 0, {guy:true,hp:10}, 0, 0, 0, 0, 0, 0]
    })); // { guy: { guy: true, hp: 10 }, c: 2 }
```