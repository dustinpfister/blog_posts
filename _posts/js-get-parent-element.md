---
title: Get parent elements with javaScript
date: 2019-02-21 18:37:00
tags: [js]
layout: post
categories: js
id: 388
updated: 2019-08-19 10:52:44
version: 1.5
---

So this will be a quick post on getting parent elements for today. There are two properties of concern with this when it come to an element in javaScript which are [parentElement](https://developer.mozilla.org/en/docs/Web/API/Node/parentElement) and [parentNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode). The two of these more or less do the same thing but with just one little subtle difference.

<!-- more -->

## 1 - Get parent element

Once a reference to an element is gained by use of a method like getElementById or querySelector, there is the parentElement property of the elements parentElement if it has one.

```js
<html>
    <head>
        <title>parent element example</title>
    </head>
    <body>
        <div class="wrap">
            <div id="gamearea"></div>
        </div>
        <script>
var ga = document.querySelector('#gamearea'),
container = ga.parentElement;
console.log(container.className); // wrap
        </script>
    </body>
</html>
```

In the event that the element does not have a parent element, or the parent element is not a DOM element the property will have a value of null.

## 2 - Parent Node 

Another option is the parent node property, this works in more or less the same way as parentElement but with one note worth difference. If there is a non DOM element node  of sorts it will give that in place of what would otherwise be a null value.

```js
<html>
    <head>
        <title>parent node example</title>
    </head>
    <body>
        <script>
var el = document.getElementsByTagName('html')[0];
console.log(el.parentElement); // null
console.log(el.parentNode); // #document
        </script>
    </body>
</html>
```

## 3 - Get all parent elements

So for now I am not aware of any native browser method that can be used to get all the parent elemets of a given element, but it is not to hard to write one. The solution I put together for this in a flash just involves looping until the current parentNode equals the document. For each loop that the current parent node is not the document just keep pushing the parent node to an array and then return the array once the looping has finished.

```html
<html>
    <head>
        <title>parent node example</title>
    </head>
    <body>
        <div id="wrap">
            <div id="header">
                <div id="logo"></div>
            </div>
        </div>
        <script>
var getParents = function (el) {
    var parents = [],
    node = el;
    while (node != document) {
        parents.push(node.parentNode);
        node = node.parentNode;
    }
    return parents;
}
var el = document.getElementById('logo');
getParents(el).forEach(function (el) {
    console.log(el.nodeName, el.id || '');
});
// DIV header
// DIV wrap
// BODY
// HTML
// #document
        </script>
    </body>
</html>
```

## 4 - Other possible future ways with querySelector

As of this writing there is no css selector that I know of that can be used to get a parent element, so there is no way of getting a parent element with querySelector. There is of course chatter about possible future selectors and pseudo classes that might be a way to do so, but so far nothing solid or well supported. 