---
title: Get by id with document.getElementById and other ways to gain references to elements in javaScript
date: 2018-12-27 19:08:00
tags: [js]
layout: post
categories: js
id: 351
updated: 2021-08-31 10:08:18
version: 1.41
---

With front end javaScript it is important to know how to create one or more references to HTML elements such as divs, canvas elements, and so forth. That is because much of front end javaScript development has to do with interacting with element objects that represent an element in an HTML document, such as creating and appending more elements them, attaching events, and working with element specific methods that have to do with the nature of the type of element. So creating a reference to an HTML element is what is typically needed as a first step before anything else can be done with such an element reference, to do that you need to have something unique about the element, and a way to use that to get a reference to it.

One way to go about getting a reference to an element is by way of an elements [id attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). The typical way to go about getting a reference to an element by way of an id attribute would be to use the [document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) method of the [document object](https://developer.mozilla.org/en-US/docs/Web/API/Document). There are other ways of getting a reference to an element by id, and of course many other ways to get references to elements by other aspects of an element, but this is one of the more tired yet true ways to do so that have been around for a great while now.

One nice thing about the get by id method in javaScript is that it has great backward compatibility as it will work in really old browsers as old as IE 5.5 even which these days is of course a dinosaur of a browser. However in addition it is possible to get a reference to an element by other means when it comes to what is available in modern browsers, and they are of course worth mentioning also. So in this post I will be covering some methods and examples of how to go about grabbing references to HTML elements in client side javaScript by way of an id, and other ways when it comes to the many other options for getting a reference to one or more elements in a client side javaScript environment.

<!-- more -->

## 1 - Get by id by using document.getElementById to get a reference to an element

One of the most common ways of getting a reference to an html element with javaScript is to use the document.getElementById method. This is seen in tones of code examples, and is still often a favorite way of going about accessing an element in front end javaScript. I still often find myself using it still, even though there are many other more versatile options to work with in native client side javaScript by itself without the addition of a framework.

The use of the method is simple enough, just call the method off of the document object, and pass a string that is the id of the element that you want as the first and only argument. If all goes well the value that is returned should be a reference to the desired element with the set id attribute if such an element is there in the HTML.

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

Works fine assuming that the desired element has an id, and you know what it is. No worries there is of course a great deal of other ways to go about grabbing an element when you do not have one. Also when you do have one there are lots of ways to go about getting references to other child and parent elements. In this example you might have noticed that I am using the children HTML collection of the reference to the div as a way to access another reference that is a child of the one that I obtained by way of the document.getElelementById method.

### 1.1 - Wrapping document.getElementById

When making a complex project in which document.getElementById is going to be called many times there might be a desire to wrap the method in another method that will just serve as a more concise way of doing the same thing. There is not much wrong with just repeating the lengthly method over and over again really, it is just the many would say that it looks bad.

```js
var get = function(id){
 
    return document.getElementById(id)
 
};

get('baz').addEventListener('click', function(){
 
    console.log('42');
 
})
 
get('foo').innerHTML = 'bar';
```

If document.getElementById is only used once or twice there is no need, but at some point it might be a good move to do something like this. The other option is to find other ways of going about getting and working with html collections rather than just a single element. The document.getElementById method is just one tool in the toolbox after all, so maybe a better option would be to drop the use of the method all together, and get at your html code by some other means.

### 1.2 - The global variable being define by id bug thing

There is actually a thing where by just setting an id attribute for an element, that results in a global variable being defined that is a reference to that element. So that means that I can just use the name of the id, as a reference to the element actually.

```html
<html>
  <head>
    <title>Demo</title>
  </head>
  <body>
    <div id="foo"><p>bar</p></div>
    <script>
foo.innerHTML = 'bar';
    </script>
  </body>
</html>
```

Although this can be done it is [not generally a good idea](https://stackoverflow.com/questions/25325221/why-dont-we-just-use-element-ids-as-identifiers-in-javascript) to use it as a way to go about getting a reference to an element. The window property can be over written, for example I can create a variable name foo and assign something to it other than a reference to the div element. However if I use the get element by id method, or another other method to get a reference to the div, that will always return a reference to the div.

## 2 - The document.getElementsByClassName method

So one of the many alternatives to getElementById is the [document.getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) method that will get a collection of elements by way of class name rather than by id. So then as the name suggests this method will return an [HTMLcollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) rather than  just a single element reference where each of the elements in the collection has the given class name when calling the method.

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

An HTMLCollection is not an Array, but it is an Array like object, so Array methods can be used via Function.call and doing so will work okay ore often than not as long as it is a read only like method. You might still see this used in code examples now and then, but as of late there is more modern alternatives such as querySelectorAll that might prove to be a better option as that can be used to get by class also as well as many other ways, more on that one later.

## 3 - document.getElementsByTagName

There is also a way to get a html collection of all elements of a given tag name such as div rather than any elements that have a class name or just one element by id. This method would be the [document.getElementsByTagName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName) method that like the get elements by class name will also return an html collection of all elements that are of a given tag..

```js
var divs = document.getElementsByTagName('div');
console.log(divs.length);
```

Just like document.getElementBy id this is a tired yet true method that will work in really old browsers, and still works just fine if I just want to get elements by a tag name. However when it comes to not caring so much about code breaking on old browsers any more there is again document.querySelector and document.querySelectorAll that are flexible methods that can do everything that these tired yet true methods do and more.

## 4 - Document.querySelector, and Document.querySelectorAll

If you are familiar with jQuery then you will like [document.querySelector](/2020/06/23/js-document-queryselector/) then as a way to gain references to an element in javaScript by a range of different query strings. There is also [document.quesySlectroAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) that can be used to get an html collection rather than a single element. This allows for a wide range of possibilities for gaining accesses to dom elements, by Id, class, tag name, and more. 

For example if I want to get all elements that are of a given class like the document.getElementsByClassName method for that I can call document.querySelectorAll and pass a string that begins with a dot which means I want to select by class name, and then the name of the class.

```html
<html>
    <head>
        <title>document query selector all</title>
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

## 5 - Get a reference to an element by way of a global click handler

All of the methods that I have covered so far are ways to go about getting a reference to an element by way of an id, class name, or tag name right away when a line of javaScript code is executed. However when it comes to event handlers there is a way to get a reference to the element from which the event happed by way of the event target property of an [event object](/2020/07/23/js-event-object/).

```html
<html>
    <head>
        <title>get by event target</title>
    </head>
    <body>
        <input id="action_foo" type="button" value="foo">
        <input id="action_bar" type="button" value="bar">
        <input id="action_baz" type="button" value="baz">
        <p id="out"></p>
        <script>
var out = document.querySelector('#out');
document.addEventListener('click', function(e){
    // getting a reference to the button that was clicked
    // by the target prop of this events event object
    out.innerText = e.target.id;
});
        </script>
    </body>
</html>
```

## 6 - The document get element from point method

There is yet another method in the document object that can be used to get a reference to an element, and that would be the [document get element from point](https://developer.mozilla.org/en-US/docs/Web/API/Document/elementFromPoint) method. As the name suggests this method can be used to get a reference to an element by way of a 2d position relative to the upper left corder of the browser window. In the event that there are two elements on top of each other than it is the top most element that is returned by this method. In the event that I want to get all elements that over lay each other in the from of a collection of element then I will need to work other another solution for that.

```html
<html>
    <head>
        <title>Demo</title>
        <style>
div{
    position: absolute;
    background: gray;
}
        </style>
    </head>
    <body>
        <div style="left:0px;top:0px;width:100%;height:100%;">
            <div style="left:32px;top:50px;width:50px;height:50px;background:red;">
        <div>
        <script>
var div = document.elementFromPoint(35, 52);
div.style.background = 'lime';
        </script>
    </body>
</html>
```

## 7 - Properties of the document object that are references to nodes and elements

In the document object there are a number of properties that are references to various elements in a page. Often these are references to elements and nodes to which there should only be one instance of anyway, such as the body, head, and title elements. So the concept of getting a reference to one of these elements by way of an id attribute is kind of silly sense there will always, or at least should always be just one of them.

### 7.1 - The document.body property

Everything that is a display element should ultimately be a child of the body element. There is only one of these elements in a page, and the only parent of this element should be the html element. So there is a [document.body property](/2019/01/03/js-document-body/) that is a reference to this single element.

```html
<html>
    <head>
        <title>Demo</title>
    </head>
    <body>
        <script>
var el = document.body;
var p = document.createElement('p');
p.innerText = 'Hello World';
el.appendChild(p);
        </script>
    </body>
</html>
```

### 7.2 - The document.title property

Another one of these kinds of [properties is the document title property](/2018/12/28/js-document-title/).

```html
<html>
  <head>
    <title>foo</title>
  </head>
  <body>
    <script>
      document.title = 'bar';
    </script>
  </body>
</html>
```

## 8 - Conclusion

There are many other ways to go about getting references to elements in client side javaScript. In some cases you might all ready have a reference to work with in some object that you might not even be aware of actually. For example in the body of an [event handler](/2019/01/16/js-event-listeners/) there is the target and currentTarget properties of events objects that are references to the element where an event was dispatched, and the current element in the event of event bubbling. So if you are working something out in an event hander and want a reference to an element of interest for the event, changes are you all ready have a reference just take a closer look at the event object.

There are also references to other elements in the element objects themselves such as the parentNode and children properties of element objects, however maybe that is all a matter for [another post when it comes to parents and children from an element](/2019/02/21/js-get-parent-element/). As time goes by I might become aware of yet event more ways to go about getting references to elements at which point I might get around to expanding this post further.
