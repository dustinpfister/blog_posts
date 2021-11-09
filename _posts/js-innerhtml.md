---
title: innerhtml and alternatives for creating and appending html with javaScript
date: 2019-01-13 17:27:00
tags: [js]
layout: post
categories: js
id: 359
updated: 2021-11-09 13:34:39
version: 1.56
---

With client side javaScript projects the [innerHtml](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) property of an element reference can be used as a way to create and append additional HTML with just a string representation of the desired markup. This might often prove to be a more convenient way of adding HTML code to a page compared to creating nested nodes created with a method like [document.createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) and the [append child](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) method of an element reference.

The nice thing about innerHtml is that it is very easy to use, but there are some security concerns with the use of innerHTML as well that are not a big deal when it comes to simple JavaScript examples, but might present problems when working on a more complex project. Many of the concerns stem from html strings that might be subject to user input that might not always be property sanitized, resulting in the possibility of html injection. That being said using innerHTML is not the only option when it comes to creating and [adding elements](/2019/02/26/js-add-element/) in javaScript, and it may be best to learn a thing ot two about what those alternatives are. In this post I will be focusing mainly on examples that showcase the use of innerHTML, and some other topics that branch off from the use of that client side javaScript feature as the way to go about expanding hard coded html with a little javaScript.

<!-- more -->

## 1 - Basic innerHTML basic examples

The innerHTML property of an element is one way to go about changing the inner html content of an element in client side javaScript. There are other ways that are considered more professional by many developers because of several factors that I will get to later in this post. However the nice thing about innerHTML is that it is fairly easy to use, as I can just use a string representation of the innerHTML that I want to inject. This string value can then be set to the value of the innerHTML property of the element that I want to inject html for and in most cases it will work just fine.

In addition to this the innerHTML property can also be used as a quick way to go about removing html content from and element also by just simply setting the value of innerHTML to an empty string. So for starters lets just look at some simple examples of what innerHTML can do in this getting started type section of the inner html property.

I will be trying my best to keep the examples in this section as simple as possible, however this is still not a [getting started with javaScript type post](/2018/11/27/js-getting-started/). So I trust that you have at least a little experience when it comes to making the first steps of learning client side javaScript. When I first started out learning client side javaScript I did so by [way of the file protocol](/2020/09/21/js-getting-started-file-protocol/), and the examples in this post should largely work okay that way. However if you have not done so all ready you might want to look into how to get started with stetting up a [simple http sever](/2017/12/04/nodejs-simple-static-server-file/) also as one will run into problems with some things sooner or later by using the file protocol with certain client side javaScript features such as canvas elements, and WebWorkers.

### - Source code examples are on Github

The source code examples in this post are up on Github in my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-innerhtml). This test vjs repository is also where I park the source code examples for my [many other posts on vanilla javaScript](/categories/js).

### 1.1 - innerHTML hello world example

Here I have a very simple example of inneHTML that will just display the message hello world in an header element. The basic process is to just get a reference to an element that I want to inject html for by whatever means possible, and then set the value of the innerHTML property of the element with an html string. 

In this example I am using the document.getElementById method to get a reference to a div element that I have assigned an id value to in the hard coded html. I then just set the value of the innerHTML property of that element to a sting with header elements in it.

```html
<html>
    <head>
        <title>innerHTML example</title>
    </head>
    <body>
        <div id="out"></div>
        <script>
var out = document.getElementById('out');
out.innerHTML = '<h1>Hello World><\/h1>';
        </script>
    </body>
</html>
```

So the Basic idea of the innerHTML property is fairly simple and straight forward for the most part, but in some cases things can get a little confusing so lets look at some more examples related to the use of the innerHTML property in client side javaScript.

### 1.2 - Getting an html string of an element with innerHTML

The innerHTML property of an element can be used to set the content of an element but it can also be used as a way to get a string representation of the current dom state of that element as well. Say I want to pull the content of an element in string form into a text area element, that can be done with innerHTML.

```html
<html>
    <head>
        <title>innerHTML example</title>
    </head>
    <body>
        <div id="header">
            <h1>Hello world</h1>
            <p>
                <a href="/home">Home</a> | 
                <a href="/blog">Blog</a> | 
                <a href="/about">About</a>
            </p>
            <br>
        </div>
        <textarea id="out" cols="60" rows="20">
        </textarea>
        <script>
var out = document.getElementById('out'),
header = document.getElementById('header');
out.value = header.innerHTML;
console.log(typeof header.innerHTML); // 'string'
console.log(typeof header); // 'object'
        </script>
    </body>
</html>
```

So we can both get and set the content of an html element with the innerHTML property, so then it is possible to use the innerHTML property as a way to create complex user interfaces that both get and set html content. For the most part that is true but there are a few draw backs to using innerHTML and ways of addressing it. lets look at some more basic examples before moving on to more complex topics.

### 1.3 - Using a variable to concatenate a string before using innerHTML to set the content of an element

So it is a common practice to use a variable to help with the process of concatenating a string before using innerHTML to set the content of an element. The reasoning here is that each time the innerHTML property is used it can result in page re-flow, so it is a good idea to minimize that by using innerHTML just once, rather than a whole bunch of times in a loop.


```html
<html>
    <head>
        <title>innerHTML example</title>
    </head>
    <body>
        <div id="disp">
        </div>
        <script>
var disp = document.getElementById('disp');
var html = '<table>',
i = 0;
while(i < 10){
  html += '<tr>' +
    '<td>foo<\/td>' +
    '<td>bar<\/td>' +
    '<td>baz<\/td>' +
  '<\/tr>';
  i += 1;
}
html += '<\/table>';
disp.innerHTML = html;
        </script>
    </body>
</html>
```

Well yes a lot can be done with innerHTML but there are also some things that are best done other ways with with the element reference. So now that we have a good grasp on the basics lets look at some more advanced examples of the innerHTML property in action.

## 2 - Now for the innerHTML alternatives

In this section I will be covering alternatives to innerHTML, which for the most part is the create element method. However the create element method is never typically just used by itself, but in combination with a whole bunch of other html element methods and properties. This is because the return value of the create element object is an element object reference which is the same kind of object that there is to work with when getting a reference to a hard coded element by using a method like document.getElementById or document.querySelector.

 This is of course one reason why so many developers like to just use innerHTML as it is fairly easy to use to just create elements with a String. However inner html does have its draw backs, and often I do like to use the create element method over innerHTml actually as often I do want to get a reference to an element object to preform some various things that I can only do so with such an object. So for many reason sit is often best to just get used to using the cerate element method actually at least when it comes to native javaScript by itself anyway.

### 2.1 - Basic create element example

```html
<html>
    <head>
        <title>innerHTML example</title>
    </head>
    <body>
        <div id="out"></div>
        <script>
var el = document.getElementById('out');
// creating a text area element
var ta = document.createElement('textarea');
ta.cols = 60;
ta.rows = 15;
ta.value = "Hello World";
// appending to html
el.appendChild(ta);
        </script>
    </body>
</html>
```

### 2.2 - The innerText property for setting the value of a text node

```html
<html>
    <head>
        <title>innerHTML example</title>
    </head>
    <body>
        <div id="out"></div>
        <script>
var el = document.getElementById('out');
// creating a text area element
var p = document.createElement('p');
// using the innerText prop to set a value for a text node
p.innerText = "Hello World";
// appending to html
el.appendChild(p);
        </script>
    </body>
</html>
```

### 2.3 - document.createElement, document.createTextNode, and el.appendChild

If you are not familiar with document.createElement, then you should play around with that one a little at some point sooner or later. The createElement method as the name suggests is what can be used in client side javaScript to create an element with javaScript. The method can be used with additional methods like document.createTextNode, and el.appendChild to do the same thing as innerHTML.

To use the create element method just call the method off of the document object, passing the tag name of the element that you want to create, the returned result is then a new element that can be assigned to a variable. However this alone will just create the element, it will not append it to the html. To do that a reference to a mount point must be obtained, at which point a method such as append child can be called off of the mount point and the new element can be passed to append child to actual append the new element to the html.

```js
var el = document.getElementById('out');
var p = document.createElement('p');
p.appendChild(document.createTextNode('foo'));
el.appendChild(p);
```


## 3 - Using eval to execute javaScript code in an element, and using innerHTML to get it

So it is generally not a good idea to place script tags into a project with innerHTML, if you want to create script tags with javaScript that should be done with the createElement, and appendChild methods. However there are ways of getting javaScript code to run that is in an element one way to do so would be with eval.

```html
<html>
    <head>
        <title>innerHTML example</title>
    </head>
    <body>
        <div id="out" style="display:none;"></div>
        <script>
var out = document.getElementById('out');
out.innerHTML = 'console.log(\'foo\')';
eval(out.innerHTML);
        </script>
    </body>
</html>
```

I cant say eval is something that I use often, and a lot of developers frown on its use. Chances are if you are using eval there is a better way to do whatever it is that you are trying to accomplish.

## 4 - Using innerText, textContent, and innerHTML

So on top of the innerHTML property there is also innerText and textContent properties of elements. The innerText property has to do with the rendered text content of a DOM element rather than the html markup.

```html
<html>
    <head>
        <title>innerText example</title>
    </head>
    <body>
        <div id="content">
            <h1>So this is a header</h1>
            <p>This is some text in a paragraph element</p>
        </div>
        <script>
var el = document.getElementById('content');
console.log(el.innerText.length); // 61
console.log(el.textContent.length); // 94
console.log(el.innerHTML.length); // 110
        </script>
    </body>
</html>
```

## 5 - Security concerns with innerHTML

The issue of security concerns with innerHTML often comes up in various discussions when it comes to using this features as a way to create and append html code with javaScript. However often it would seem that people just say that without sighting examples that help to showcase the reasons why it is better to use the alternatives to inner html. So in this section I will be showcasing some examples that might help to show what the concerns are with this.

### 5.1 - An onclick event in the string.

Here I am creating an html string that contains an input tag with on on click event that will call the alert method when the element is clicked. This might nit be the most comprehensive example of what the concern is surrounding the use of inner html, but I have to start somewhere when it comes to this one.

```html
<html>
    <head>
        <title>innerHTML example</title>
    </head>
    <body>
        <div id="out"></div>
        <script>
var el = document.getElementById('out');
el.innerHTML = "<input type=\"button\" value=\"click it\" onclick='alert(\"bad times\")'>";
        </script>
    </body>
</html>
```

Maybe it is hard to see why this is a concern with this example at the moment because the source of the text that will be used with inner html is a string literal. However what if the source is in stead from user input, it could allow for me to create and inject any kind of html and javaScript code that I would want. If this is something that I am just doing on my own computer then that is of course not such a big deal, because of course I can play around with whatever I want on a page by way of the javaScript console. However what if the situation was such that I was submitting text by way of some kind of comment system that end up being transmitted to a server, and then in turn ends up getting injecting into the html of everyone who visits a a site that uses such a system. Also what if the javaScript that end sup getting inject does a bit more that just alter the string "bad times"? With that said in order to really get an idea as to what the situation is with inner html it might be best to create some kind of simple full stack application with intentional poor server side sanitation.

## 6 - Conclusion

So using innerHTNL as a way to inject content is nice because it makes the process fairly easy as the content can just be created by generating a string representation of html markup. However it is no replacement for the more professional alternatives that involve creating an new element object with the createElement method and then appending that with an element method like the append child method of a hard coded element in the html. I do generally prefer to work with a tree of objects and then find ways to create a string from that tree of objects, when, and if I even need to do so to begin with.

Although innerHTML and html in general is a great way to go about creating a user interface, it might not be the best choice for all projects. There are many other ways of creating an interface in a web browser and not all of them are subject to page re-flow, there is of course [canvas elements](/2017/05/17/canvas-getting-started/) and [svg](/2019/02/11/js-javascript-svg/) that are there to work with as well. Some times it might be called for to work within some whole other context other than that of html elements, such as some kind of additional drawing context that can be used through and html element such as a canvas element, or some additional nodes that are not part of the html standard which would be the case with svg.

