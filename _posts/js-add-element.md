---
title: Add elements with javaScript
date: 2019-02-26 10:34:00
tags: [js]
layout: post
categories: js
id: 391
updated: 2021-09-25 14:33:21
version: 1.35
---

The process of [Adding elements](https://www.tutorialspoint.com/how-to-add-a-new-element-to-html-dom-in-javascript) in javaScript generally refers to creating and appending html elements to a container element in an html document. Also in core javaScript by itself in general, adding elements may refer to creating and appending elements for an Array. However in this post I will be going mainly over ways to go about adding html elements to an html document when it comes to client side javaScript.

In [jQuery there is the add method](https://api.jquery.com/add/) that can be used as a way to add elements. It is true that jQuery is still a widely used front end javaScript framework, but it is a library that is starting to die out a little. There are many other front end frameworks that make adding elements, and many DOM mutation related tasks a little easier but today for the most part just working in the browser itself is not so hard and can still work just fine for small projects.

I have written a [post on innerHTML](/2019/01/13/js-innerhtml/) not to long ago which is one typical way of adding elements once a reference to a container element is obtained. However in this post I will be covering the subject in general, and not just the use of innerHTML which might not always be the best choice. There are of course alternatives to innerHTML that involve the use of a collection of methods, such as [createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement), and appendChild. 

Also there is some things to cover when it comes to html node lists as well, and how they are like arrays. However they are not instances of the Array constructor so one can not just use array prototype methods with them. So there is a little to cover when it comes to adding elements to an html document, and everything else that might branch off from this topic such as removing elements.

<!-- more -->

## 1 - The very basics of Adding Elements in client side javaScript

To add an element in javaScript I first need to gain a reference to a hard coded element in the html to begin with. There are a number of ways to go about doing this such as with [document.getElementById](/2018/12/27/js-document-getelementbyid/) which shows up in a lot of javaScript examples, to properties such as [document.body](/2019/01/03/js-document-body/). Once I have a reference to a container element I can then use a property like [innerHTML](/2019/01/13/js-innerhtml/) or a collection of element object methods to create an add elements. In this section I will be going over the very basic tools for doing adding elements, but will not get into that much detail with other topics that surround this. I also often use these first sections to mention any other additional things that you might want to know before continuing to read the rest of the post.

### 1.1 - The source code examples here are on github

I have the source code examples that I am writing about here up on my [test vjs github repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-add-element). That is where you would want to make a pull request of you think that one needs to be made, there is also the comments section where something can be brought up with one of the examples here. This is also the repository where I hold my source code examples for all my other posts, and where I am working on examples for the next time I come around to edit and expand this post.

### 1.2 - Using innerHTML to add elements

The innerHTML property of an element object is one way to go about getting a string value of the innerHTML of an element, but it can also be used to set the innerHTML also with a string value of the desired innerHTML.

```html
<html>
    <head>
        <title>add elements</title>
    </head>
    <body>
        <script>
var el = document.body;
el.innerHTML += '<p>hello world<\/p>'
 
        </script>
    </body>
</html>
```

In this post I am not going to be going into detail about innerHTML as I have written a post on that all ready. However innerHTML is of course one option for making quick work of this when it comes to simple projects. When it comes to more advanced projects though there are some situations in which an alliterative way of doing this should be used.

So now that we have a very basic idea of what this is all about out of the way I can now move on to other ways of adding elements to an html document.

### 1.3 - The createElement, and append child methods for adding elements

The alternative to using innerhtml as a way to create elements is to use the document.createElement method along with something like appendChild, and createTextNode. This is generally the preferred way to create and add new elements into an html document because it allows for access to element object reference right away. In addition I can set all kinds of properties to the created element before appending it the the html, or I can even not append it at all if I find that I do not want to for whatever the reason.

```html
<html>
    <head>
        <title>javascript create element</title>
    </head>
    <body>
        <script>
// create an element
var el = document.createElement('textarea');
// can add values to properties
el.value = 'Hello World';
// then I can append it to the document
document.body.appendChild(el);
        </script>
    </body>
</html>
```

## 2 - The createTextNode method and creating paragraph elements, and any element that might require a text node

Some elements such as a p, span, and pre might require a text node value added to after creating it in order for the element to actually show some text. So in this section I think that it is called for to cover a few quick examples that have to do with adding text nodes to newly created elements with the create element method.

### 2.1 - The createTextNode method and a paragraph element

So for starters there are paragraph elements, and when creating them it is often called for to define what the value of the text node is for that element. One way to do so it to use the createTextNode method to create a text node with the desired text, and then append that to the newly created paragraph element.

```html
<html>
    <head>
        <title>javaScript create element</title>
    </head>
    <body>
        <div id="container">
        </div>
        <script>
var con = document.getElementById('container'),
p = document.createElement('p'),
text = document.createTextNode('hello world');
p.appendChild(text);
document.body.appendChild(p);
        </script>
    </body>
</html>
```

### 2.2 - pre element example

It might be fun to play around with some javaScript examples that have to do with preformatted text elements. If you are not familiar with them this kind of element is what is used in html for preformatted text that contains line breaks. WIth many other elements line breaks will be ignored when it comes to formating, but with preformatted elements they will not be ignored. So this might be a good way to become familiar with how to go about creating preformatted text with javaScript code by creating and adding pre elements to an html document.

There is more than one kind of line break depending on the operating system, but for the most part it is best to just go with the windows style one that contains a carriage return and then a line feed after. the reason why I say that it that that kind of line break will work o  windows but will also work okay on just about every other operating system just fine also.

```js
<html>
    <head>
        <title>javaScript create element</title>
    </head>
    <body>
        <div id="container">
        </div>
        <script>
// create a string with line breaks
var createLinesString = function (w, h, ch, EOL) {
    var i = 0,
    w = w || 16,
    h = h || 9,
    EOL = EOL || '\r\n',
    len = w * h,
    x,
    y,
    str = '';
    while (i < len) {
        x = i % w;
        y = Math.floor(i / w);
        str += ch || '.';
        if (x === w - 1) {
            str += EOL;
        }
        i += 1;
    }
    return str;
};
 
var con = document.getElementById('container'),
pre = document.createElement('pre'),
str = createLinesString(16, 9, 'o'),
text = document.createTextNode(str);
 
pre.appendChild(text);
document.body.appendChild(pre);
 
        </script>
    </body>
</html>
```

An example such as this could be expanded with additional methods to make a simple grid system, but this alone should help with the general idea of why it is that pre elements are useful in some situations.

## 3 - Removing elements

So there is the process of injecting new elements into a container element, however I can not write about adding elements without at least writing a thing or two about removing them also. This section will then be a few examples that have to do with removing elements that are there ti begin with, and also maybe a few exercise that have to do with both adding and removing them also while I am at it. As such in this section I will be going over methods like the remove method of an element object reference, but also many other topics such as [event attachment](/2019/01/16/js-event-listeners/).

### 3.1 - The remove method of an element

One of the first method to check out when it comes to removing elements might be the [remove method of an element](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove). Using this method is simple enough, once an reference to an element is obtained it is then just a matter of calling the remove element, and that is all there is to it.

```html
<html>
    <head>
        <title>javascript create element</title>
    </head>
    <body>
        <ul id="the-list">
            <li>Zero</li>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
        </ul>
        <script>
var list = document.querySelector('#the-list');
list.children[2].remove()
        </script>
    </body>
</html>
```

### 3.2 - remove all elements the meet a given condition

Some times I might want to remove all elements that will meet a given condition. That is that I might want to use the [document query selector all method](/2020/06/23/js-document-queryselector/) to get a collection of elements, and then filter that collection by a given condition. I will then want to loop over all the filtered elements and call the remove method for all of them. One way to go about doing something like this would be to use one of the [function prototype methods such as the call method](/2017/09/21/js-call-apply-and-bind/) to make the [filter array prototype method](/2020/10/03/js-array-filter/) work with an html collection and return an array of elements to each element that meets a given query, and condition in the form of a method that I given tot he array filter method. I can then use the [array for each method](/2019/02/16/js-javascript-foreach/) to loop over all of the elements in the array that is returned by the array filter method and call the remove method for each of them.

```html
<html>
    <head>
        <title>javascript create element</title>
    </head>
    <body>
        <ul id="the-list">
            <li data-purge="true">Zero</li>
            <li>One</li>
            <li data-purge="true">Two</li>
            <li data-purge="true">Three</li>
            <li>Four</li>
        </ul>
        <script>
// remove all helper
var removeAll = function(query, condition){
    var list = document.querySelectorAll(query);
    Array.prototype.filter.call(list, function(el){
        return condition(el);
    }).forEach(function(el){
        el.remove();
    });
};
// remove all by purge dataset prop
removeAll('li', function(el){
    return Boolean(el.dataset.purge);
});
        </script>
    </body>
</html>
```

### 3.4 - Remove and add elements

This is very much a post on adding elements to an html document, so in this section I will not just be going over an example that makes use of the remove method, but also append child and the create element methods. The idea here this is to have an unordered list element with a single starting li element. The li element then have some additional nested elements in which one of them is a delete button, and the other is a span that contains some text for the list item. There will then also be some additional html that will contain input buttons that can be used to inject additional list items that are formatted this way. As you might expect the additional html out side of the list wil be used to create and append additional li elements and the delete button will be used to remove a single li element from the list.

```html
<html>
    <head>
        <title>javaScript Create Element</title>
        <style>
li{margin:10px;}
span{margin:10px;}
        </style>
    </head>
    <body>
        <div id="add-list">
            <input id="txt-list" type="text"><input type="button" value="add">
        </div>
        <ul id="the-list">
            <li><input type="button" value="delete"><span>Hello</span></li>
        </ul>
        <script>
var deleteItem = function(e){
    var li = e.target.parentElement;
    if(e.target.nodeName === 'INPUT' && e.target.value === 'delete'){
        li.remove();
    }
};
var addItem = function(e){
    if(e.target.nodeName === 'INPUT' && e.target.type === 'button' && e.target.value === "add"){
        var li = document.createElement('li'),
        button_delete = document.createElement('input'),
        span = document.createElement('span');
        button_delete.type = 'button';
        button_delete.value = 'delete';
        span.innerText = document.getElementById('txt-list').value;
        li.appendChild(button_delete);
        li.appendChild(span);
        document.getElementById('the-list').appendChild(li);
    }
};
document.getElementById('the-list').addEventListener('click', deleteItem);
document.getElementById('add-list').addEventListener('click', addItem);
        </script>
    </body>
</html>
```

Event though this is a very basic list application using client side javaScript there are a lot of things to be aware of here. For example there is the target property of the event object in add item and delete item the event handlers, and the fact that these handers are attached to the parent elements of the elements that the user will be interacting with. This works because of something called event bubbling that is that something happens such as a click on a child element, and then events bubble up to parent elements. The target property of the event object is the element where the event happened and the current element property of the vent object is the current element where the event handlers are attached.

## 4 - Conclusion

So the two general ways to go about adding elements in front end javaScript is the inner html method, and then the createElements method that is often regarded as the more professional way of going about adding elements. There is also other properties and ways of doing things in front end javaScript that can be thought of as a way of adding nodes in general such as the innerText property. That is not a way of adding elements to some HTML, but it is a way of adding text nodes, and doing so in a way in which any inner content is removed while doing so.