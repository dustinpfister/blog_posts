---
title: Get by id with document.getElementById and other ways to gain references to elements in javaScript
date: 2018-12-27 19:08:00
tags: [js]
layout: post
categories: js
id: 351
updated: 2020-07-29 10:41:52
version: 1.19
---

With front end javaScript it is important to know how to create one or more references to HTML elements such as divs, canvas elements, and so forth. That is because much of front end javaScript development has to do with interacting with element objects that represent an element in an HTML document, such as creating and appending more elements them, attaching events, and working with element specific methods that have to do with the nature of the type of element. So creating a reference to an HTML element is what is typically needed as a first step before anything else can be done with such an element reference, to do that you need to have something unique about the element, and a way to use that to get a reference to it.

One way to go about getting a reference to an element is by way of an elements [id attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). The typical way to go about getting a reference to an element by way of an id attribute would be to use the [document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) method of the [document object](https://developer.mozilla.org/en-US/docs/Web/API/Document). There are other ways of getting a reference to an element by id, and of course many other ways to get references to elements by other aspects of an element, but this is one of the more tired yet true ways to do so that have been around for a great while now.

One nice thing about the get by id method in javaScript is that it has great backward compatibility as it will work in really old browsers as old as IE 5.5 even which these days is of course a dinosaur of a browser. However in addition it is possible to get a reference to an element by other means when it comes to what is available in modern browsers, and they are of course worth mentioning also. So in this post I will be covering some methods and examples of how to go about grabbing references to HTML elements in client side javaScript by way of an id, and other ways when it comes to the many other options for getting a reference to one or more elements in a client side javaScript environment.

<!-- more -->

## 1 - Get by id by using document.getElementById to get a reference to an element

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

If you are familiar with jQuery then you will like [document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) when as a way to gain references to elements in javaScript. This allows for a wide range of possibilities for gaining accesses to dom elements, by Id, class, tag name, and more.

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

## 5 - Conclusion

There are many other ways to go about getting references to elements in client side javaScript. In some cases you might all ready have a reference to work with in some object that you might not even be aware of actually. For example in the body of an event handler there is the target and currentTarget properties of events objects that are references to the element where an event was dispatched, and the current element in the event of event bubbling. So if you are working something out in an event hander and want a reference to an element of interest for the event, changes are you all ready have a reference just take a closer look at the event object.

There are also references to other elements in the element objects themselves such as the parentNode and children properties of element objects, however maybe that is all a matter for another post.