---
title: javaScript example multiplication table
date: 2020-02-10 18:46:00
tags: [js]
layout: post
categories: js
id: 609
updated: 2021-04-02 13:25:13
version: 1.21
---

This will be the first post of a new series of posts that serve as [javaScript examples](/2021/04/02/js-javascript-example/). They will aim to be simple getting started examples for new developers that are just learning javaScript for the first time, while also maybe still being of interest for more experienced developers also. 

This javaScript example post will be on [making a multiplication](https://www.mathsisfun.com/tables.html) table module example with just core javaScript code. I will then be going over some additional client side javaScript code that can then be used as a way to render this multiplication table. So this might not prove to be the most interesting javaScript example post, but I have to start somewhere with these, and in time I might get around to making a few that will prove to be more interesting.

One major reason why is [because many posts on the topic of javaScript examples](https://www.freecodecamp.org/news/javascript-example/) do not always give such a great overview of what can be done with the language. So I thought I would start out with something very simple like just making a multiplication table, and then may move onto some more interesting examples like an [experience point system javaScript example](/2020/04/27/js-javascript-example-exp-system/) or something to that effect.

However I think that the bulk of these javaScript examples should be about a module that will work great in a client side environment, but also in a nodejs environment also actually without changing to much in the code. The emphasis should be on going headless as one might put it. That is making javaScript code that just creates and object, but does not render that object as that is something that will change from one environment to another.

Well lets get to it then so that we can move on to something else that might prove to be more interesting.

<!-- more -->

## 1 - A starring multiplication table javaScript example

In this section I will be staring out with a basic multiplication table javaScript example. This kind of solution should work out okay in both a browser and node environment as it will be a module that will just create a state object, but not draw that state object using some kind of renderer. I will be covering just one render function in this section but it is just a front end one, and even then just one way to go about doing it. In later sections I will be getting into other ways to go about rendering the state of the module.

### 1.1 - The multiplication table module for the javaScript example

The first step that came to mind is to make a module that will be used to create an array of cell objects. Each cell will have an x and y position as well as an index value, this information can then be used later for the purpose of formating. So then this module will have just one public method that is used to create an array of these cells, and then that array is what will then be passed to another method that is used to render it.

```js
var mTable = (function () {
 
    var forN_default = function (cell) {
        return cell.x * cell.y;
    };
 
    var mkCells = function (w, h, forN, wOffset, hOffset) {
        var cells = [],
        len = w * h,
        i = 0,
        cell;
        while (i < len) {
            cell = {
                i: i,
                x: i % w + wOffset,
                y: Math.floor(i / w) + hOffset
            };
            cell.n = forN(cell);
            cells.push(cell);
            i += 1;
        }
        cells.w = w;
        cells.h = h;
        cells.wOffset = wOffset;
        cells.hOffset = hOffset;
        return cells;
    };
 
    // public API
    var api = function (w, h, forN, wOffset, hOffset) {
        w = w === undefined ? 10 : w;
        h = h === undefined ? 10 : h;
        wOffset = wOffset === undefined ? 1 : wOffset;
        hOffset = hOffset === undefined ? 1 : hOffset;
        forN = forN === undefined ? forN_default : forN;
        return mkCells(w, h, forN, wOffset, hOffset);
    };
 
    return api; ;
 
}
    ());
```

In the body of the pubic method I have a forN option that is a method that will be called for each cell in the array. The default value for this will be a method that will set a n property for each cell that is the value of cell.x multiplied by cell.y.

### 1.2 - Making another method that will create html string from the table object

So then once I have my module worked out that creates the array of cells that will contain the numbers for each value in the multiplication table, I then need a method that will be used to render that is html. Now this is something that will differ depending on the environment. For example in a nodejs environment I might want to create an html string, however in a client system I might want to use methods the document create element, and append child methods.

```js
var htmlDiv = function (table, cellSize) {
    cellSize = cellSize || 32;
    var html = '<div style=\"position:absolute;\">';
    // cells
    html += table.map(function (cell) {
        var x = (cell.x - table.wOffset) * cellSize + cellSize,
        y = (cell.y - table.hOffset) * cellSize + cellSize;
        return '<div style=\"position:absolute;left:' + x + 'px;top:' + y + 'px;\">' + cell.n + '<\/div>';
    }).join('');
    return html + '<\/div>';
};
 
var table = mTable(5, 5);
console.log(htmlDiv(table, 32));
```

### 1.3 - The resulting html

So the render method that I made will create the following html as a string when making a five by five table. This can then in turn be used to create the view of the multiplication table by making use of a client side javaScript feature such as the innerHTML property of a container element.

```html
<div style="position:absolute;"><div style="position:absolute;left:32px;top:32px;">1</div><div style="position:absolute;left:64px;top:32px;">2</div><div style="position:absolute;left:96px;top:32px;">3</div><div style="position:absolute;left:128px;top:32px;">4</div><div style="position:absolute;left:160px;top:32px;">5</div><div style="position:absolute;left:32px;top:64px;">2</div><div style="position:absolute;left:64px;top:64px;">4</div><div style="position:absolute;left:96px;top:64px;">6</div><div style="position:absolute;left:128px;top:64px;">8</div><div style="position:absolute;left:160px;top:64px;">10</div><div style="position:absolute;left:32px;top:96px;">3</div><div style="position:absolute;left:64px;top:96px;">6</div><div style="position:absolute;left:96px;top:96px;">9</div><div style="position:absolute;left:128px;top:96px;">12</div><div style="position:absolute;left:160px;top:96px;">15</div><div style="position:absolute;left:32px;top:128px;">4</div><div style="position:absolute;left:64px;top:128px;">8</div><div style="position:absolute;left:96px;top:128px;">12</div><div style="position:absolute;left:128px;top:128px;">16</div><div style="position:absolute;left:160px;top:128px;">20</div><div style="position:absolute;left:32px;top:160px;">5</div><div style="position:absolute;left:64px;top:160px;">10</div><div style="position:absolute;left:96px;top:160px;">15</div><div style="position:absolute;left:128px;top:160px;">20</div><div style="position:absolute;left:160px;top:160px;">25</div></div>*/
```

## 2 - A nodejs multiplication table javaScript example

Now for another basic multiplication table javaScript example only now I will be getting into a nodejs style example with this. When it comes to working in a nodejs environment there is working out the logic to create a table, and then there is doing something to render that table. One way would be to log it out to the standard output of the console, however another option would be to create a file of one type or another.

### 2.1 - The nodejs module

So here is the example again, but now in a node js module. The module exports property is what I am using to define what will be returned to another script when this is used in another script with require.

```js
var forN_default = function (cell) {
    return cell.x * cell.y;
};
 
var mkCells = function (w, h, forN, wOffset, hOffset) {
    var cells = [],
    len = w * h,
    i = 0,
    cell;
    while (i < len) {
        cell = {
            i: i,
            x: i % w + wOffset,
            y: Math.floor(i / w) + hOffset
        };
        cell.n = forN(cell);
        cells.push(cell);
        i += 1;
    }
    cells.w = w;
    cells.h = h;
    cells.wOffset = wOffset;
    cells.hOffset = hOffset;
    return cells;
};
 
// public API is just a function
module.exports = function (w, h, forN, wOffset, hOffset) {
    w = w === undefined ? 10 : w;
    h = h === undefined ? 10 : h;
    wOffset = wOffset === undefined ? 1 : wOffset;
    hOffset = hOffset === undefined ? 1 : hOffset;
    forN = forN === undefined ? forN_default : forN;
    return mkCells(w, h, forN, wOffset, hOffset);
};
```

### 2.2 - Making a render method to the console.

Now to use the module to create a table, and to render the table somehow. In this example I am just logging to the standard output of the console by way of the console log method. There is another way of going about doing this in nodejs that allows for a greater deal of control, but maybe that is a but off topic.

```js
var mTable = require('./mtable.js');
 
var pad = function (n) {
    return String('0000' + n).slice(-4);
};
 
var renderTable = function (table) {
    var i = 0,
    line = '',
    len = table.length,
    cell;
    while (i < len) {
        cell = table[i];
        line += pad(cell.n) + '|';
        if (cell.x === table.w) {
            console.log(line);
            line = '';
        }
        i += 1;
    }
};
 
var t = mTable(20,100);
 
renderTable(t);
```

## 3 - Conclusion

So working out a multiplication table is a nice simple javaScript example, however even something not so simple can end up becoming a little intense when it comes to all the various ways to go about creating a main state object, and then displaying some or all of that state data. Even in client side javaScript alone there are a number fo ways of spiting the state of something like this out at the user. There is making a table, using a canvas element, and using a text area element and creating a plain text format for it. 

Then there is of course nodje and all the various ways to go about display g the data in that kind of environment when it comes to output the state of the table as standard output, writing a file, sending it over http to some server, and so on.
