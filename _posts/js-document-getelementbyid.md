---
title: document.getElementById and other ways to gain references to elements in javaScript
date: 2018-12-27 19:08:00
tags: [js]
layout: post
categories: js
id: 351
updated: 2019-01-18 18:13:06
version: 1.9
---

With front end javaScript it is important to know how to create references to html elements. That is much of front end javaScript development has to do with interacting with the document object model, so creating a reference to an html element is needed in order to get something from and element, change something about it, or add something to it. So in other words there is a need to get an element by its id, such as with [document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) or failing that by some other means, so in this post I will be covering some methods and examples of how to go about doing just this.

<!-- more -->

## 1 - Using document.getElementById to get a reference to an element

One of the most common ways of getting a reference to an html element with javaScript is to use document.getElementById. This is seen in tones of code examples, and is still often a favorite way of going about accessing an element in front end javaScript.

```html
<html>
  <head>
    <title>Demo</title>
  </head>
  <body>
    <div id="foo"><p>bar</p></div>
    <script>
 
    var el = document.getElementById('foo');
    console.log( el.children[0].innerText ); // bar
 
    </script>
  </body>
</html>
```

Works fine assuming that the desired element has an id, and you know what it is. No worries there is of course a great deal of other ways to go about grabbing an element as well, more on that later.

### 1.1 - Wrapping document.getElementById

When making a complex project in which document.getElementById is going to be called many times there might be a desire to wrap the method like this.

```js
var get = function(id){
 
    return document.getElementById(id)
 
};

get('baz').addEventListener('click', function(){
 
    console.log('42');
 
})
 
get('foo').innerHTML = 'bar';
```

If document.getElementById is only used once or twice there is no need, but at some point it might be a good move to do something like this.

## 2 - getElementsByClassName

So one of the many alternatives to getElementById is getElementsByClassName. This is a method that as the name suggests can get elements by a class name that they have assigned to them, rather than an id. This will return an HTMLcollection of each element that has the given class name.

```html
<html>
  <head>
    <title>Demo</title>
  </head>
  <body>
    <div>
        <span class="foo">one</span>
        <span>two</span>
        <span class="foo">three</span>
        <span class="foo">four</span>
    </div>
    <script>
    
    var foos = document.getElementsByClassName('foo');
    
    [].forEach.call(foos, function(foo){
    
        console.log(foo.innerText); // one, three, four
    
    });
    
    </script>
  </body>
</html>
```

An HTMLCollection is not an Array, but it is an Array like object, so Array methods can be used via Function.call. You might still see this used in code examples now and then, but as of late there is querySelectorAll, more on that one later.

## 3 - document.getElementsByTagName

There is also a way to get a html collection of all elements of a given tag name with document.getElementsByTagName.

```js
var divs = document.getElementsByTagName('div');
console.log(divs.length);
```

## 4 - Document.querySelector, and Document.querySelectorAll

If you are familial with jQuery then you will like [document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) when as a way to gain references to elements in javaScript. This allows for a wide range of possibilities for gaining accesses to dom elements, by Id, class, tag name, and more.

```html
<html>
    <head>
        <title>document getelementbyid </title>
    </head>
    <body>
        <span class="foo">one</span>
        <span class="foo">two</span>
        <span class="foo">three</span>
        <p id="out"></p>
        <script>
var foos = document.querySelectorAll('.foo');
 
console.log(foos[1].innerText); // two
 
        
        </script>
    </body>
</html>
```