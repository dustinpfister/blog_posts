---
title: Get parent elements with native javaScript
date: 2019-02-21 18:37:00
tags: [js]
layout: post
categories: js
id: 388
updated: 2021-04-14 11:39:27
version: 1.24
---

So this will be a quick post on getting parent elements of a given element with native javaScript. To cut quickly to the chase with this one there are two element object properties of concern with this which are [parentElement](https://developer.mozilla.org/en/docs/Web/API/Node/parentElement) and [parentNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode). The two of these more or less do the same thing but with just one little subtle difference that I will be getting to in this post.

If you do not care at all about supporting Internet explorer there is a new element method called [closest](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest). This method can be used as a way to get the closest element that matches a given query string. There are pollyfills, but it might still be best to just use the older properties if you just simply want to get the parent element and not much of anything else. However there might be a few other little tips and tricks when it comes to getting a parent element, from a starting element in a dom element tree so I should get around to writing about some of these attentional options beyond just parentEmenet, and parentNode.

I might also touch base on some other related topics as well when it comes to a chain of elements from document up to a given element as well, that is getting all parent elements of a given node. So in other words I will be making this post all about getting a parent HTML element when it comes to client side javaScript.

<!-- more -->

## 1 - Get parent element AKA DOM NODE if there is one

Once a reference to an element is gained by use of a method like getElementById or querySelector, there is the parentElement property of the element reference if it has one. This property is there to get a parent DOM element rather than a node in general, as there are some kinds of nodes that are often used that are not really actual html elements, such is the case with things like SVG. Tis then is the main different between parent element and parent node, the node property is more general and should work with nodes in general and not just standard html elements that are part of an html spec.

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

In the event that the element does not have a parent element, or the parent element is not a DOM element the property will have a value of null. This might be desired in some cases as the value of null will evaluate to false and can then be used as a way to break out of looping for example. 

In the event that the node is not a DOM node it will return null, this would make sense because the name of the property is indeed parent element, so if the parent is NOT A DOM Element, but some other kind of node then it should return false. If for some reason I want to use another property that will work with nodes in general then there is the parent node property which might be a more robust option for this sort of thing.

## 2 - Parent Node for getting any kind of node.

Another option is the parent node property, this works in more or less the same way as parentElement but with one note worthy difference. If there is a non DOM element node of sorts it will give that in place of what would otherwise be a null value when using the parent element property.

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

So then these are the two main properties of interest when it comes to getting a parent element with native javaScript by itself, but there are of course event more ways of getting a parent element. Maybe for whatever the reason I do not just want a single element but the whole tree of elements. So lets look at some additional examples of this task.

## 3 - The closest method for getting parent nodes with a query string

So a modern option now is the closest element method that works on most modern browsers. One draw back though is that it will get the closest element that matches the query string including the child element from which it is called.

```html
<html>
    <head>
        <title>closest example</title>
    </head>
    <body>
        <div id="f1" class="foo">
            <div id="b1" class="bar">
                <div id="b2" class="bar">
                    <div id="fb1" class="foobar"></div>
                </div>
            </div>
        </div>
        <script>
var el = document.getElementById('fb1');
var parent = el.closest('.bar');
console.log( parent.id ); // 'b2'
parent = el.closest('.foo');
console.log( parent.id ); // 'f1'
        </script>
    </body>
</html>
```

## 4 - Wrting a simple vanilla js get by tag method

So when it comes to making a quick [vanilla javaScript method](https://stackoverflow.com/questions/6856871/getting-the-parent-div-of-element/6857116#6857116) solution for getting parent elements by tag, something can be slapped together fairly quickly using a while loop, and the parent node property. In addition to the parent node property there is also of course the tagName property than can be used as something to compare to as I loop threw the elements.

```html
<html>
    <head>
        <title>get parent by tag</title>
    </head>
    <body>
        <div id="f1">
            <div id="b1">
                <ul id="u1">
                    <li id="li1">foo</li>
                    <li id="li2">bar</li>
                    <li id="li3">baz</li>
                </ul>
            </div>
        </div>
        <script>
var getParentByTag = function(child, tagName) {
  var el = child;
  tagName = tagName.toLowerCase();
  while (el && el.parentNode) {
    el = el.parentNode;
    if (el.tagName && el.tagName.toLowerCase() == tagName) {
      return el;
    }
  }
  return null;
};
 
var li = document.getElementById('li3');
console.log( getParentByTag(li, 'div').id ); // 'b1'
        </script>
    </body>
</html>
```

Making a variation of this that looks at the class name property would not be so hard as well, and this could also be developed into a pollyfill for the closest method that I wrote about in a previous section.

## 5 - Get all parent elements

So for now I am not aware of any native browser method that can be used to get all the parent elements of a given element, but it is not to hard to write one.

The solution I put together for this in a flash just involves looping until the current parentNode equals the document element. For each loop that the current parent node is not the document just keep pushing the parent node to an array and then return the array once the looping has finished. I can do whatever it is that I want to do with all the parent nodes, using an array method like filter to get all the ones I want for example.

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

I am sure there are many other ways to go about doing this. There are also all kinds of other topics in javaScript that come to mind, one thing that comes to mind right of the bat is event bubbling. That is when an event happens in a child element and then the event fires for each parent element also.

## 6 - Parent Elements and Event bubbling

So a related topic of interest when it comes to getting parent elements is the subject of [event bubbling](https://en.wikipedia.org/wiki/Event_bubbling). When an element is clicked for example it will fire an on click event that is set for that element, but it will also bubble up to the top most parent element and fire event handlers all the way up unless this is stopped.

```html
<html>
    <head>
        <title>Get parent element on event</title>
    </head>
    <body>
        <div id="wrap" style="width:640px;height:480px;background:red;">
            <div id="header" style="height:120px;background:green;">
                <div id="logo" style="width:120px;height:120px;background:blue;"></div>
            </div>
        </div>
        <script>
var onClick = function(e){
    console.log(e.target); // the element that was clicked
    console.log(e.currentTarget ); // the element this handler is attached to
};
document.body.addEventListener('click', onClick);
        </script>
    </body>
</html>
```

So when it comes to event handers the target property of the event object will refer to the element where the event happened and the current target property will refer to the element where the event handler is attached.

## 7 - Other possible future ways with querySelector

As of this writing there is no css selector that I know of that can be used to get a parent element, so there is no way of getting a parent element with querySelector. There is of course chatter about possible future selectors and pseudo classes that might be a way to do so, but so far nothing solid or well supported.

## 8 - Conclusion

So getting the parent element of an html element reference is just a matter of choosing an option for doing so. There are two main properties that come to mind one of which will work with just html elements, and the other will work with nodes in general for the most part. There are many other ways of doing so, but for the most part there are just those two properties that can be used to just do so and move on.