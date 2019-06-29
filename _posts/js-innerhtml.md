---
title: innerhtml and alternatives for creating and appending html with javaScript
date: 2019-01-13 17:27:00
tags: [js]
layout: post
categories: js
id: 359
updated: 2019-06-29 08:46:11
version: 1.19
---

With client side javaScript projects the [innerHtml](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) property of an element can be used as a way to create and append html. The nice thing about innerHtml is that it is very easy to use, but there are some security concerns with the use of innerHTML as well that are not a big deal when it comes to simple examples, but might present problems when working on a more complex project. That being said using innerHTML is not the only option when it comes to creating and adding elements in javaScript, so I have another post in which I get into [this subject in general](/2019/02/26/js-add-element/) if interested.

<!-- more -->

## 1 - Basic innerHTML basic examples

The innerHTML property of an element is one way to go about changing the content of an element. There are other ways that are considered more professional by many developers because of several factors that I will get to later in this post. However the nice thing about innerHTML is that it is fairly easy to use, as I can just use a string representation of the innerHTML that I want to inject. This string value can then be set to the value of the innerHTML property of the element that I want to inject html for and in most cases it will work just fine.

### 1.1 - innerHTML hello world example

Here I have a very simple example of inneHTML. The basic process is to just get a reference to an element that I want to inject html for by whatever means and then set the value of the innerHTML property of the element with an html string.

```html
<html>
    <head>
        <title>innerHTML example</title>
    </head>
    <body>
        <div id="out"></div>
        <script>
var out = document.getElementById('out');
out.innerHTML = 'Hello World';
        </script>
    </body>
</html>
```



## 2 - Using eval to execute javaScript code in an element

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
eval(out.innerHTML)
        </script>
    </body>
</html>
```

I cant say eval is something that I use often, and a lot of developers frown on its use. Chance are if you are using eval there is a better way to do whatever it is that you are trying to accomplish.

## 3 - Security concerns with innerHTML

The issue of security concerns with innerHTML often comes up in. The thing about innerHTML is that when script tags are used in the html string, the code in the string will run. As such this can potentially result in code injection attacks compared to the use of an alternative like createTextNode, or innerText.

```js
var el = document.getElementById('out');
 
el.innerHTML = "<input type=\"button\" value=\"click it\" onclick='alert(\"bad times\")'>";
```

## 4 - innerHTML alternatives

In this section I will be covering alternatives to innerHTML. This includes the use of many methods that are used together, and simple alternatives that work in a similar way as is the case with innerText.

### 4.1 - document.createElement, document.createTextNode, and el.appendChild

If you are not familiar with document.createElement, then you should play around with that one a little at some point. The createElement method as the name suggests is what can be used in client side javaScript to create an element with javaScript. The method can be used with additional methods like document.createTextNode, and el.appendChild to do the same thing as innerHTML.

```js
var el = document.getElementById('out');
var p = document.createElement('p');
p.appendChild(document.createTextNode('foo'));
el.appendChild(p);
```

## 5 - Conclusion

So suing innerHTNL as a way to inject content is nice because it makes the process fairly easy as the content can just be created by generating a string representation of html markup. However it is no replacement for the more professional alternatives that involve create an new element object with the createElement method and then appending that with an element method like appendChild.

Although innerHTML and html in general is a great way to go about creating a user interface, it might not be the best choice for all projects. There are many other ways of creating an interface in a web browser and not all of them are subject to page re-flow, there is of course canvas elements and svg that are there to play with as well.