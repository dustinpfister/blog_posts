---
title: innerhtml and alternatives for creating and appending html with javaScript
date: 2019-01-13 17:27:00
tags: [js]
layout: post
categories: js
id: 359
updated: 2021-07-13 09:23:12
version: 1.33
---

With client side javaScript projects the [innerHtml](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) property of an element reference can be used as a way to create and append additional HTML with just a string representation of the desired markup. This might often prove to be a more convenient way of adding HTML code to a page compared to creating nested nodes created with a method like [document.createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) and the [append child](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) method of an element reference.

The nice thing about innerHtml is that it is very easy to use, but there are some security concerns with the use of innerHTML as well that are not a big deal when it comes to simple JavaScript examples, but might present problems when working on a more complex project. Many of the concerns stem from html strings that might be subject to user input that might not always be property sanitized, resulting in the possibility of html injection. That being said using innerHTML is not the only option when it comes to creating and adding elements in javaScript, so I have another post in which I get into [this subject in general](/2019/02/26/js-add-element/) if interested. However in this post I will be focusing mainly examples that showcase the use of innerHTML as the way to go about adding html code.

<!-- more -->

## 1 - Basic innerHTML basic examples

The innerHTML property of an element is one way to go about changing the inner html content of an element. There are other ways that are considered more professional by many developers because of several factors that I will get to later in this post. However the nice thing about innerHTML is that it is fairly easy to use, as I can just use a string representation of the innerHTML that I want to inject. This string value can then be set to the value of the innerHTML property of the element that I want to inject html for and in most cases it will work just fine.

In addition to this the innerHTML property can also be used as a quick way to go about removing html content from and element also by just simply setting the value of innerHTML to an empty string.

So for starters lets just look at some simple examples of what innerHTML can do.

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

## 2 - Using eval to execute javaScript code in an element, and using innerHTML to get it

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

## 3 - Using innerText, textContent, and innerHTML

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

## 3 - Security concerns with innerHTML

The issue of security concerns with innerHTML often comes up in. The thing about innerHTML is that when script tags are used in the html string, the code in the string will run. As such this can potentially result in code injection attacks compared to the use of an alternative like createTextNode, or innerText.

```js
var el = document.getElementById('out');
 
el.innerHTML = "<input type=\"button\" value=\"click it\" onclick='alert(\"bad times\")'>";
```

## 4 - Now for the innerHTML alternatives

In this section I will be covering alternatives to innerHTML, which for the most part is the create element method. However the create element method is never typically just used by itself, but in combination with a whole bunch of other html element methods and objects, the full breath of which will take time to get used to. This is of course one reason why so many developers like to just use innerHTML as it is fairly easy to use to just create elements, but it does have its draw backs, and as such innerHTML is not at all a replacement for the alternative way of creating elements with javaScript.

### 4.1 - document.createElement, document.createTextNode, and el.appendChild

If you are not familiar with document.createElement, then you should play around with that one a little at some point sooner or later. The createElement method as the name suggests is what can be used in client side javaScript to create an element with javaScript. The method can be used with additional methods like document.createTextNode, and el.appendChild to do the same thing as innerHTML.

To use the create element method just call the method off of the document object, passing the tag name of the element that you want to create, the returned result is then a new element that can be assigned to a variable. However this alone will just create the element, it will not append it to the html. To do that a reference to a mount point must be obtained, at which point a method such as append child can be called off of the mount point and the new element can be passed to append child to actual append the new element to the html.

```js
var el = document.getElementById('out');
var p = document.createElement('p');
p.appendChild(document.createTextNode('foo'));
el.appendChild(p);
```

## 5 - Conclusion

So using innerHTNL as a way to inject content is nice because it makes the process fairly easy as the content can just be created by generating a string representation of html markup. However it is no replacement for the more professional alternatives that involve create an new element object with the createElement method and then appending that with an element method like appendChild.

Although innerHTML and html in general is a great way to go about creating a user interface, it might not be the best choice for all projects. There are many other ways of creating an interface in a web browser and not all of them are subject to page re-flow, there is of course canvas elements and svg that are there to play with as well.