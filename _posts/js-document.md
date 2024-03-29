---
title: JavaScript document object
date: 2021-10-29 07:37:00
tags: [js]
layout: post
categories: js
id: 935
updated: 2021-10-29 11:52:10
version: 1.26
---

The [javaScript document](https://developer.mozilla.org/en-US/docs/Web/API/Document) object is the main object of a loaded page, and is a property of the window object which is the global object in client side javaScript. There is a lot of ground to cover with this object that serves as an interface for a whole range of things that have to do with getting, creating, and injecting one or more HTML elements when it comes to working with the Document Object Model or DOM. There are a number of other features in the document object also that are worth looking into at some point such as the location object, and the various events that can be attached for this object.

In this post I will then be doing a general overview of the document object in client side javaScript, and while I am at it touch base on a wide range of other topics that will branch off from the document object, which is a lot.

<!-- more -->


## 1 - Basic of the javaScript document interface

In this section I will be going over a few quick, simple, copy and paste style examples of the javaScript document interface. One thing I should mention here is that this whole post is on just one object to work with in client side javaScript, it is not a kind of [javaScript document in some other sense of what you might be looking for](https://developer.mozilla.org/en-US/docs/Web/JavaScript). With that said if you are still fairly new to javaScript it might be best to start with my [getting started with javaScript post](/2018/11/27/js-getting-started/) rather than starting here.

### - The source code examples in this post are on Github

The source code examples in this post can be found in my [test vjs Github](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-document) repository. This repository also contains all the various source code examples for all my [other posts on vanilla javaScript](/categories/js/).

### 1.1 - Get a reference to an element

There are a number of methods in the document object that can be used to get an [element object reference](https://developer.mozilla.org/en-US/docs/Web/API/Element). For example say that I have a div element in my hard coded html that has an id attribute assigned to it. lets say that all I want to do is just append some text to the inner text node of this div element with a little javaScript code in a [script tag](/2019/01/19/js-script-tag/). The first thing I would want to do is get an element object reference to the div element, and one way would be to use the [get element by id method](/2018/12/27/js-document-getelementbyid/) of the js document object.

```html
<html>
    <head>
        <title>javaScript document object example</title>
    </head>
    <body>
        <div id="out">Hello </div>
        <script>
var el = document.getElementById('out');
el.innerText += 'World';
        </script>
    </body>
</html>
```

There is a lot more to get into when it comes to the various ways to go about getting a reference to an element in html, including options like the [document body](/2019/01/03/js-document-body/), and [document title](/2018/12/28/js-document-title/) properties just to name a few. However there is not just getting a single element object reference, but also a collection of elements that meet a given condition also, when it comes to this of course there are also some methods to use in the document object.

### 1.2 - Get a collection of elements

There is also not just getting a single element object reference but a collection of elements in the form of a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) or an [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection). These collections are array like objects in the sense that they are formated like arrays, but are of there own prototype and as such the same array methods in the array prototype are not always there to work with. There are reasons why that is, but I should maybe get into those things in a more advanced section in this post.

In this example I am using the [query selector all method of the document object](/2020/06/23/js-document-queryselector/) to get a node list of all the elements in the html that contain a certain class.

```html
<html>
    <head>
        <title>js document object example</title>
    </head>
    <body>
        <div>
            <div class="foo"></div>
            <div class="foo"></div>
            <div class="foo"></div>
        </div>
        <script>
var divs = document.querySelectorAll('.foo');
var i = divs.length;
while(i--){
   var d = divs[i];
   d.innerText = 'Hello World';
}
        </script>
    </body>
</html>
```

### 1.3 - Attaching Events to the document object

When it comes to [attaching events](/2019/01/16/js-event-listeners/) to the document object there are a number of options when it comes to global events, as well as a number of events that have to do with just the document object that are worth looking into in greater detail.

For this example I am just attaching a client event to the document object, when I do this I the event hander that I attach will fire for any element that I click on in the page. Inside the body of the event hander I have access to an [event object](/2020/07/23/js-event-object/) that will be passed by way of the first argument for the event hander function. This event object contains many useful properties such as the target property that is a reference to the element that was clicked.

```html
<html>
    <head>
        <title>js document object example</title>
    </head>
    <body>
        <div style="width:100px;height:100px;background:gray;"></div>
        <script>
var handler = function(e){
   alert(e.target.nodeName)
}
document.addEventListener('click', handler);
        </script>
    </body>
</html>
```

### 1.4 - The Location object

Another major feature of the document object would be the location object that is attached to the [location property of the document object](/2019/01/26/js-document-location/). This object contains the href property that is the url of the current page, the property can also be set to a new url that will cause a redirection to that url. There are also all kinds of properties and methods in the object that can be used to extract useful information and do things like reload the page.

```html
<html>
    <head>
        <title>javaScript document object example</title>
    </head>
    <body>
        <div id="out">Hello </div>
        <script>
var el = document.getElementById('out');
el.innerText += document.location.href;
        </script>
    </body>
</html>
```

## 2 - Getting Element Object references in detail

Although I have touched base on the subject of getting one or more references to element objects in the basic section of this post, I think that this is a subject that I should do more to cover in detail when it comes to more advanced topics. There are a lot of options actually for getting references to elements and or nodes in a client side javaScript project, beyond just that of getting them by id and class. Also there is also things like the question of what the difference is between a NodeList and an HTML collection, and all kinds of little details that are near the subject of getting element object references. So in this section I will be exploring the various options for getting one or more elements using the various methods in the document interface.

### 2.1 - By id and class

In the basic section I have all ready covered the tired yet true document get element by id method, but there is also the question of getting one or more elements by a class name rater than an id also. Event when it comes to that I also covered the use of the quest selector all method as a way to get a collection of elements that way. However I did not write about the get elements by class name method also in the document interface. This get elements by class name method is another option when it comes to getting a collection of elements by class name, it may be a little more restricted co pared to the query selector method however there is one note worthy difference. The get elements by class name method will return an HTML collection object rather than a Node list object.

```html
<html>
    <head>
        <title>javaScript document object example</title>
    </head>
    <body>
        <div>
            <h1 id="header-title">The title of this</h1>
            <h2 class="header-subject">Subject One</h2>
            <p>I am some text on subject one</p>
            <h2 class="header-subject">Subject Two</h2>
            <p>I am some text on subject Two</p>
        </div>
        <script>
// getting an element reference by id
var header = document.getElementById('header-title');
header.style.color = 'red';
// getting an HTMLCollection by way of the document.getElementsByClassName method
var subjectHeaders = document.getElementsByClassName('header-subject');
var i = subjectHeaders.length;
while(i--){
    var h = subjectHeaders[i];
    h.style.color = 'orange';
}
        </script>
    </body>
</html>
```

I should get more into what the differences is between HTML Collections and Node lists, but maybe that is a matter for another examples, section or even a whole other post. For now at least there is just being mindful that there is more than one tool in the toolbox when it comes to grabbing at elements, and there is more than one standard when it comes to collections of elements, or nodes in general.

### 2.2 - The query selector, and query selector all methods

In the basic section of this post I used the [query selection all method](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) to get a collection of elements by class name. So then once again I want to have a quick example of this method when it comes to getting a collection of elements in the from of a Node List rather than an HTML Collection. There is also the [query selector method](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) that works just like the query selector all method only it will return an element object reference. So then that method can be used as a replacement for the get element by id method as it can be used to just get a single element by id, as well as by class and tag name. The only draw back about these methods is that they will not work on very old browsers, but that becomes less of a problem every day.

```html
<html>
    <head>
        <title>javaScript document object example</title>
    </head>
    <body>
        <div>
           <span class="num">5</span><br>
           <span class="num">7</span><br>
           <span class="num">BAR</span><br>
           <span class="num">3</span><br><br>
        </div>
        <div id="out"></div>
        <script>
var nodes = document.querySelectorAll('.num'),
out = document.querySelector('#out'),
i = nodes.length,
sum = 0;
while(i--){
   var d = nodes[i],
   n = parseInt(d.innerText);
   sum += String(n) === 'NaN' ? 0 : n;
}
out.innerText = 'total: ' + sum;
        </script>
    </body>
</html>
```

## 3 - Create and remove elements

There is getting one or more references to elements that are hard coded into html, but there is also the question of creating additional elements and appending them into the existing html. Also I can not really write about the topic of creating elements without at least going over one or more examples of removing them also. ALthiigh there may not be any methods that have to do with removing elements there sure are methods that can be used to select one or more elements that can then be removed by calling the remove method of an element object reference.

### 3.1 - The document create element method

The [create element method of the document object](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) is the main method to use to create any HTML element, such as canvas elements. With that said in this example I am using the create element to do just the create, and inject a canvas element that I then draw to with the 2d drawing context.

The first step would be to get a mount point where I would want to append a canvas element, for this I can use any of the meth9ds that I have covered in the above sections such as the get element by id method. Now that I have something that I can append an element to there is then creating the element with the create element method by just calling the method and passing a string that is the name of the element that I wan to create which in this case is canvas. What is returned by the create element method is then a new element object that is a canvas element, at this point I can start to do things with the element such as setting the native size and getting a reference to the 2d drawing context sense it is a canvas element.

Once I create my new element object, and do anything that I might want to do before appending to the hard coded html, I can then do jst that append it. For this I call the append child method of the container element object reference and pass the new element object that is to be appended to the container element. After that I am just drawing to the canvas element with the 2d context methods.

```html
<html>
    <head>
        <title>javaScript document object example</title>
    </head>
    <body>
        <div id="wrap"></div>
        <script>
// getting a reference to a container element by id, or document.body
// if I change the id or remove the element
var container = document.getElementById('wrap') || document.body;
// CREATING A CANVAS ELEMENT with the document.createElement method
var canvas = document.createElement('canvas'),
// I can now do things with this element all ready such as getting the
// drawing content, and setting the native image size
ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;
// I will want to append the crated element to a container if I want to see anything
container.appendChild(canvas);
// drawing to the canvas
ctx.fillStyle = '#008f8f';
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.fillStyle = '#ffffff';
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.font = '40px arial';
ctx.fillText('Hello World', canvas.width / 2, canvas.height / 2);
        </script>
    </body>
</html>
```

### 3.2 - Removing elements

There does not seem to be any methods in the document interface that have to do with removing elements. However there are a number of methods that can be used get one or more references to elements, and there is the remove method of an element object.

```html
<html>
    <head>
        <title>javaScript document object example</title>
    </head>
    <body>
        <ul>
            <li class="list-item">One</li>
            <li class="list-item">1</li>
            <li class="list-item">Two</li>
            <li class="list-item">2</li>
            <li class="list-item">Three</li>
            <li class="list-item">3</li>
            <li class="list-item">Four</li>
            <li class="list-item">4</li>
        </ul>
        <script>
var nodes = document.querySelectorAll('.list-item');
var i = nodes.length;
while(i--){
   var d = nodes[i];
   if( String( parseInt(d.innerText)) != 'NaN'){
       d.remove();
   }
}
        </script>
    </body>
</html>
```

## 4 - Conclusion

There is then a lot more to cover when it comes to going beyond the document object even farther, but even just the document object alone is a major part of everything that has to do with client side javaScript. Whenever I want to create and append and element to html by way of a little javaScript I need to use the create element method of the document object, I also need to use various methods and properties of the document object to gain references to elements that may all ready exists before hand also.

