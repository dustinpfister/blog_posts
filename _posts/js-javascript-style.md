---
title: Javascript style api for changing CSS values.
date: 2019-02-12 11:23:00
tags: [js]
layout: post
categories: js
id: 377
updated: 2020-07-09 08:36:15
version: 1.12
---

The [JavaScript style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) api is one way to go about changing css values with javaScript rather than static [hard coded CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) only. This is not to be confused with javaScript [coding style](https://en.wikipedia.org/wiki/Programming_style), which is of course a whole other subject that might be though of as another kind of javaScript style. 

There are other ways of changing CSS values with javaScript such as changing the [className property](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) value of one or more elements with respect to a collection of hard coded CSS classes to work with. The style api is not the best choice for doing anything that might involve complex animations, or a great deal of rapid fast change for that there are [canvas elements](/2017/05/17/canvas-getting-started/) and [SVG](/2019/02/11/js-javascript-svg/) to work with. There are many tools to a web developer and the style api is not always the best tool for the job, but it is there, and in some cases the use of it may be called for, so lets take a look at the style api in javaScript today.

<!-- more -->

## 1 - JavaScript style overview

The style api is a property of an html element reference that serves as a way to intact with the inline css style of that element via JavaScript code. This is a more dynamic way of controlling CSS rather than the use of the hard coded html style attribute of the element, or an external CSS file loaded into the page via a link element. This differs from any additional style rules that may apply to the element via class names, ids and other selectors in the css of a project.

In case you did not know style values set via the javaScript style api supersedes all other style rules that may be in effect via css that is defined by way of a style element, inline style attribute of an element, or an external css file. So in some cases where it is call for the style api can be used to overwrite anything that may be in effect via the hard coded html and CSS of a page.

## 2 - Get inline javaScript style

To get a style value that was set via the style attribute in the html a reference to the element in question must be obtained first. Then once there is a reference the style property of that reference is where the value will exist.

```html
<html>
    <head>
        <title>javaScript get style example</title>
    </head>
    <body>
        <h1 style="color:red">Red Header</h1>
        <script>
console.log(document.getElementsByTagName('h1')[0].style.color); // red
        </script>
    </body>
</html>
```

## 3 - Set inline javaScript style

Setting inline style is just a matter of using the assignment operator with the desired property once a reference to the style api is obtained. There is some variation with the property names compared to the equivalent to that is used in hard coded css, but that is just about it.

```html
<html>
    <head>
        <title>javaScript set style example</title>
    </head>
    <body>
        <h1>Red Header</h1>
        <script>
var el = document.getElementsByTagName('h1')[0];
console.log(el.style.color); // ''
el.style.color = 'red';
console.log(el.style.color); // 'red'
        </script>
    </body>
</html>
```

## 4 - Property names differ from CSS

When setting the css property and value pairs for inline style via the html style attribute, the property names are the same as they would be in a style element or external css file. However when accessing those values via the javaScript style api, the property names follow a camel case pattern.

```html
<html>
    <head>
        <title>javaScript style property names</title>
    </head>
    <body>
        <h1 style="background-color:red;z-index:1">Red Header</h1>
        <script>
var el = document.getElementsByTagName('h1')[0];
console.log(el.style.backgroundColor); // red
console.log(el.style.zIndex); // 1
        </script>
    </body>
</html>
```

## 5 - Get unknown inline style values

So the CSS Style Declaration object that the style api is an instance of appears to have an array like nature to it when it comes to the styles that are set via the style attribute. In other words there is a collection of key value pairs and a length property that is consistent with the way that arrays are structured in JavaScript. This means that an Array method like Array.forEach can be used to loop over any and all css properties that are set via the style attribute in the event that the properties are not know. 

```html
<html>
    <head>
        <title>javaScript style get properties</title>
    </head>
    <body>
        <h1 style="background-color:red;color:white;z-index:1;font-family:arial;">Header</h1>
        <script>
var el = document.getElementsByTagName('h1')[0];
 
[].forEach.call(el.style, function(prop){
console.log(prop, el.style[prop]); // background-color red color white...
});
        </script>
    </body>
</html>
```

## 6 - Conclusion

The javaScript style api might be fun to play with when it comes to just making quick examples that make use of the style api to move elements around the page. However when it comes to doing anything flashy there are better options for doing so such as the canvas element and javaScript SVG.