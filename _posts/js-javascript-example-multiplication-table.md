---
title: javaScript example
date: 2020-02-10 18:46:00
tags: [js]
layout: post
categories: js
id: 609
updated: 2020-02-12 12:53:36
version: 1.3
---

This will be the first post of a new series of posts that serve as [javaScript examples](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript). They will aim to be simple getting started examples for new developers that are just learning javaScript for the first time, while also maybe still being of interest for more experienced developers also. 

This javaScript example post will be on making a multiplication table module example.

<!-- more -->

## 1 - The multiplication table module for the javaScript example

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

## 2 - Making another method that will create html from the table object

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

## 2.1 - The resulting html

```html
<div style="position:absolute;"><div style="position:absolute;left:32px;top:32px;">1</div><div style="position:absolute;left:64px;top:32px;">2</div><div style="position:absolute;left:96px;top:32px;">3</div><div style="position:absolute;left:128px;top:32px;">4</div><div style="position:absolute;left:160px;top:32px;">5</div><div style="position:absolute;left:32px;top:64px;">2</div><div style="position:absolute;left:64px;top:64px;">4</div><div style="position:absolute;left:96px;top:64px;">6</div><div style="position:absolute;left:128px;top:64px;">8</div><div style="position:absolute;left:160px;top:64px;">10</div><div style="position:absolute;left:32px;top:96px;">3</div><div style="position:absolute;left:64px;top:96px;">6</div><div style="position:absolute;left:96px;top:96px;">9</div><div style="position:absolute;left:128px;top:96px;">12</div><div style="position:absolute;left:160px;top:96px;">15</div><div style="position:absolute;left:32px;top:128px;">4</div><div style="position:absolute;left:64px;top:128px;">8</div><div style="position:absolute;left:96px;top:128px;">12</div><div style="position:absolute;left:128px;top:128px;">16</div><div style="position:absolute;left:160px;top:128px;">20</div><div style="position:absolute;left:32px;top:160px;">5</div><div style="position:absolute;left:64px;top:160px;">10</div><div style="position:absolute;left:96px;top:160px;">15</div><div style="position:absolute;left:128px;top:160px;">20</div><div style="position:absolute;left:160px;top:160px;">25</div></div>*/
```