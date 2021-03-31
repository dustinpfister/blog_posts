---
title: javaScript break statement examples
date: 2019-02-19 12:02:00
tags: [js]
layout: post
categories: js
id: 386
updated: 2021-03-31 09:16:07
version: 1.25
---

The [break statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break) in javaScript can be used to break out of a loop such as a [while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while) or [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) loop. It can also be used in combination with labels to break a specific loop from within two or more nested loops when one finds oneself in such situations.

There are other ways to break a loop as well, such as using the [return keyword](/2019/03/01/js-javascript-return/) within the body of a function for example, and there is also the continue keyword that is worth mentioning also as that keyword can be used to skip a body of code and continue a loop without breaking out of it, but just skipping over any additional code that would run otherwise. 

The break keyword also comes into play when doing something with a [switch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch), as the use of the keyword should be used after each case block in the body of a switch. So then in this post I will be focusing on the break statement, and some basic use case examples as to why it might come in handy now and then. In the process of doing so I might also touch base on a whole bunch of other little javaScript features that have to do with switch statements, and loops.

<!-- more -->

## 1 - javaScript break basics

The break keyword would typically be used used in the body of a certain conditional statement within the body of a loop as a way to get out of something that would otherwise be an infinite loop, or to just get out of a loop sooner compared to how long it would take for some other condition to happen that will result in an end to the loop. 

So then the break keyword can help avoid having to loop over the full contents of an array for example whe looping over the contents of an array that way. If the array is fairly large the break keyword can help reduce the amount of time it takes for the loop to complete which proves to be more efficient compared to other options such as Array.forEach that will always loop over the full contents of an array. Also the break keyword could be used to keep some code from running that I would not want to run if a condition is met that warrants a break statement. 

There are other options to the use of a break statement when it comes to this that are worth mentioning later, but for now in this section I will be sticking mainly with some basic hello world style javaScript break examples.


### 1.1 - Break out of a while loop before the end

When using a while loop I often like to make use of the trick where I start an index value at the end and then subtract from the index value while also using th result new value as a way to break out of the loop. That is that the number 0 evaluates to false so by starting a number at a value above zero and subtracting by one for each loop the value will become zero at some point which will result in and end to the loop. However I can use this in conjunction with a break statement to also get out before that happens, simply put something like this:

```js
let arr = [3, 'foo', 4],
i = arr.length;
while (i--) {
    if (typeof arr[i] === 'string') break;
}
console.log(i); // 1

```

With a simple example like this it does not make much of any difference really, but then it comes to a far more complex block of code that involves a much larger array, and some resource intensive code that does not need to be applied for all elements in an array in can of course make a difference. Using while loops seems to be one of the fastest ways to go about looping in javaScript, but there is also just fining ways to go about reducing the volume of work to do to begin with.

## 2 - switch statements and javaScript break

I do not come across switch statements often, and I do my best to avoid using them but never the less when working with a switch statement the break keyword is also used for each case statement of a switch. That is use use the case keyword in the body of a switch, followed by a value, and then terminated the case with a colon. I then do whatever needs to be done in the case block, and then finish with a break.

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

The same example that makes use of javaScript break and labels could be written in a more functional and fine grain form without the use of labels or the break keyword at all. This would involve working with a copy of the object so as not to mangle the original object that is passed to the fine guy method, and breaking the process down into several methods that each do just one little thing. In other words doing things in a way that is more in line with the values of functional programming.

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

So there is using break, and then there is finding way to not go about using break.

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

## 5 - javaScript break and continue

Another javaScript keyword worth mentioning is the continue keyword which can be used in conjunction with the break keyword. The javaScript break keyword will of course break out of the loop, however the continue keyword will not break out of the loop, but continue on with the loop, ignoring any additional code that may be in the body of the loop. 

```js
let arr = [8, 3, 16, 5, 32, 7, 2, null, 4, 19],
i = 0,
len = arr.length;
while (i < len) {
    n = arr[i];
    i += 1;
    // break if not number
    if (typeof n != 'number') {
        break;
    }
    // continue if not pow of 2
    if (String(Math.log(n) / Math.log(2)).indexOf('.') != -1) {
        continue;
    }
    console.log(n);
    // 8 16 32 2
}
```

here I have an example that will break out of the loop in the event that anything other than a number is detected, and will continue if the number is not a power of two. This might not be the best example, but if there was some code that did some heavy lifting after a continue statement, and it was a fairly lengthly array of elements that need to be looped over it might make a difference.

## 6 - Conclusion

So the javaScript break keyword can be used to break out of a loop when doing so is called for. However in many cases the break statement is not required when writing many fine grain functions that make use of the [return keyword](/2019/03/01/js-javascript-return/). The use of return to break out of a loop is what I find myself using more often then break, as i like to break code down into many small, functional, reusable code snippets. Still they break keyword is there for what it is called for, along with continue, labels, and everything else that comes to mind when working with loops.