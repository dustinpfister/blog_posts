---
title: The JavaScript style API, and CSS values.
date: 2019-02-12 11:23:00
tags: [js]
layout: post
categories: js
id: 377
updated: 2021-11-07 11:47:47
version: 1.33
---

The [JavaScript style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) API is one way to go about changing CSS values with a little javaScript code rather than just plain old static [hard coded CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). This is not to be confused with a javaScript [coding style](https://en.wikipedia.org/wiki/Programming_style), which is of course a whole other subject that might be though of as another kind of javaScript style. 

There are other ways of changing CSS values with javaScript such as changing the [className property](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) value of one or more elements with respect to a collection of hard coded CSS classes to work with. In some respects this might prove to be a better option, client side javaScript is not meant to be a replacement for HTML and CSS, if you are using javaScript to do everything in your site I would say that you might want to rethink your approach.

The style API is not the best choice for doing anything that might involve complex animations, or a great deal of rapid fast change, for those kinds of effects there are [canvas elements](/2017/05/17/canvas-getting-started/), [SVG](/2019/02/11/js-javascript-svg/), and CSS3 animations to work with all of which might prove to be better options. There are many tools to a web developer and the style API is not always the best tool for the job, but it is there, and in some cases the use of it may be called for. So lets take a look at the style API in javaScript today, and while I am at it I might touch base on a whole other little aspects of client side javaScript in general.

<!-- more -->

## 1 - JavaScript style API overview

I assume that you have at least some knowledge of how to work with javaScript in a front end environment, if not this is not a [getting started post on javaScript](/2018/11/27/js-getting-started/) let alone any of the subjects that are needed before hand. If you know at least the basics when it comes to adding script tags, and how to get references to an element, then you might be ready to learn a thing or two about the style API which can be a fun next step.

The style API is a property of an HTML element reference that serves as a way to intact with the in-line CSS style of that element via JavaScript code. This is a more dynamic way of controlling CSS rather than the use of the hard coded HTML style attribute of the element, or an external CSS file loaded into the page via a link element. This differs from any additional style rules that may apply to the element via class names, ids and other selectors in the CSS of a project.

In case you did not know style values set via the javaScript style API supersede all other style rules that may be in effect by way of hard coded CSS. This means that style API values will override CSS values that are defined by way of a style element, the in-line style attribute of an element, or an external CSS file. So in some cases where the style API is call for it can be used to overwrite anything that may be in effect via the hard coded CSS of a page.

### - the source code examples here are on Github

The [test vjs repository on my Guhub](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-style) account is where I am parking the source code examples that I have slapped together for this post. In this repository I also have all the various other source code examples for [my many other posts on client side javaScript](/categories/js/). That repository would be a good place to make any and all pull requests that should be made, there is also the comments section at the bottom of this post that can be sued as a way to bring up some kind of problem that is relative to the style api in client side javaScript.

### 1.1 - Get in-line javaScript style

To get a style value that was set via the style attribute in the HTML element first I will need to get a reference to that element. One tired yet true way to do so is to use the [document.getElementById](/2018/12/27/js-document-getelementbyid/) method. There are many more modern alternatives to this method of course, however part of the appeal to working with the style API is that it will work in really old browsers, so it makes sense to stick to older methods of doing things as a way to make sure that things will still work. 

In any case once there is a reference to the element that I want to set the style for I can use the style API to both get and set CSS rules. For example I can use the color property of the style API to get the current text color of an element.

```html
<html>
    <head>
        <title>javaScript get style example</title>
    </head>
    <body>
        <h1 id="header" style="color:red"></h1>
        <script>
var el = document.getElementById('header');
color = el.style.color;
el.innerText = 'This header is: ' + color;
        </script>
    </body>
</html>
```

So then the Style API can be used as a way to pul what the current style values are for a given element. Setting the style values for an element is not all that much harder.

### 1.2 - Set in-line javaScript style

Setting in-line style is just a matter of using the assignment operator with the desired property once a reference to the style API is obtained. There is some variation with the property names compared to the equivalent names that are used in hard coded css, but that is just about it.

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

So for the most part getting and setting CSS values is just a matter of getting a reference to an element to which one wants to mutate CSS values for, and then figure out what the property name is for the given CSS rule. The names are more or less the same only we are going with Camel case style with the names rather than dashes. That is about it when it comes to the basics of using the style API in client side javaScript. However maybe I should take a moment to cover at least a few more basic examples of this before moving on.

### 1.3 - Property names differ from CSS

As I mentioned before when setting the CSS property and value pairs for in-line style via the HTML style attribute, the property names are the same as they would be in a style element or external CSS file. However when accessing those values via the javaScript style API, the property names follow a camel case pattern.

SOe good examples of this would be background-color becoming backgroundColor, and z-index becoming zIndex;

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

## 2 - Get unknown in-line style values

So the [CSS Style Declaration object](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) that the style API is an instance of appears to have an array like nature to it when it comes to the styles that are set via the style attribute. In other words there is a collection of numbered rather than named key value pairs and a length property that is consistent with the way that arrays are structured in JavaScript. This means that an Array method like Array.forEach can be used to loop over any and all CSS properties that are set via the style attribute in the event that the set properties for an element are not known. 

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

## 3 - A div grid example using the style API

One quick fun little project is to create a grid of div elements using the style API, and a few other client side javaScript Element methods and properties. When it comes to making a grid in client side javaScript there are many other alternatives such as canvas that might prove to be better solutions. However taking a moment to make one or two examples such as this might prove to be some good exercise when it comes to getting familiar with not just the style API, but other helpful methods and properties such as document.createElement, el.scrollWidth, and el.appendChild.

```html
<html>
    <head>
        <title>javaScript style API example</title>
        <style>
#div-grid{
  position: absolute;
  width:640px;
  height:240px;
  background:gray;
}
.grid-div{
  position: absolute;
  background: black;
}
        </style>
    </head>
    <body>
        <div id="div-grid">
        </div>
        <script>
var el_grid = document.getElementById('div-grid'),
gridDivCountWidth = 32,
gridDivCountHeight = 12,
// use scrollWidth and scrollHeight to get the pixel size
divWidth = el_grid.scrollWidth / gridDivCountWidth,
divHeight = el_grid.scrollHeight / gridDivCountHeight,
x = 0, y = 0,
g,
div;
while(y < gridDivCountHeight){
  x = 0;
  while(x < gridDivCountWidth){
    // create a div
    div = document.createElement('div');
    div.className = 'grid-div';
    div.style.width = divWidth + 'px';
    div.style.height = divHeight + 'px';
    div.style.left = (divWidth * x) + 'px';
    div.style.top = (divHeight * y) + 'px';
    // set random green color for each div
    g = Math.floor(128 + 128 * Math.random());
    div.style.backgroundColor = 'rgba(0,' + g + ',0,1)';
    // append to the el_grid container
    el_grid.appendChild(div);
    x += 1;
  }
  y += 1;
}
 
        </script>
    </body>
</html>
```

In this example I end up with a grid of div elements with random green colors for the background of each div element. Here I am setting some base style rules with a style element in the head of the HTML file. basically anything that will be fixed for the container element, as well as all the div elements should still be part of a set of static CSS rules. 

However when creating div elements I do need to still set the class name that I want to use with each div element, and that can be done with the className property of the element object reference that is returned when using the cerateElement method. This can of course be used in conjunction with all the use case examples of the style API where I am setting values for width, height, top, and left on a per div bases.

There is a great deal more than can be done with an example such as this. If I get some time to expand this post more at some point in the future I think I will add a few more examples of this div grid thing when it comes to adding events and so forth.

## 4 - Moving divs example

In this example I will be creating a main app loop function using the [request animation frame method](/2018/03/13/js-request-animation-frame/) to do so. In the main javaScript file that contains this main app loop I also have two helper methods that are used to cerate a collection of child divs for a given parent div, and one to update such a collection of elements for a parent div. It is in the update method that I am using the style api as a way to update the position of the dive elements.

### 4.1 - A main.js javaScript file with a app loop

Here I have the source code for the main javaScript file where I am using the style api to update the position of div elements. In the create element I am using the create element method of the [document object](/2021/10/29/js-document/) as a way to go about creating some div elements by way of javaScript code and then I am appending them to the given parent element. In this method I am also setting some values for each div by way of the data attribute of each div element for the current position of the dive as well as speed heading and rate of change for heading.

```js
// create children
var createChildren = function (div) {
    var i = 10;
    while (i--) {
        var child = document.createElement('div');
        child.className = 'div_child';
        child.id = 'child_' + i;
        child.dataset.x = 100;
        child.dataset.y = 100;
        child.dataset.pps = 32 + Math.round(64 * Math.random());
        child.dataset.rps = -Math.PI * 0.5 + Math.PI * 1 * Math.random();
        child.dataset.heading = Math.PI * 2 * Math.random();
        div.appendChild(child);
    }
};
// update children using the STYLE API
var updateChildren = function (div, secs) {
    [].forEach.call(div.children, function (child) {
        var x = parseFloat(child.dataset.x),
        y = parseFloat(child.dataset.y),
        heading = parseFloat(child.dataset.heading),
        pps = parseInt(child.dataset.pps);
        // move by heading and pps
        x += Math.cos(heading) * pps * secs;
        y = y += Math.sin(heading) * pps * secs;
        // update heading
        heading += parseFloat(child.dataset.rps) * secs;
        heading %= Math.PI * 2;
        child.dataset.heading = heading;
        // wrap
        x = x < 0 ? parseInt(div.scrollWidth) - 20 : x;
        x = x > parseInt(div.scrollWidth) - 20 ? 0 : x;
        y = y < 0 ? parseInt(div.scrollHeight) - 20 : y;
        y = y > parseInt(div.scrollHeight) - 20 ? 0 : y;
        // update dataset
        child.dataset.x = x;
        child.dataset.y = y;
        // use style api to update CSS of div
        child.style.left = x + 'px';
        child.style.top = y + 'px';
    });
};
// get ref to parent div
var div_parent = document.querySelector('.div_parent');
// create and append child divs to the parent div
createChildren(div_parent);
var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 1 / 30) {
        updateChildren(div_parent, secs);
        lt = now;
    }
};
loop();
```

### 4.2 - The html file and css

I just need a little HTML now in order to pull all of this together, which will also include a little base CSS for divs, as well as the two classes of divs.

```html
<html>
    <head>
        <title>javaScript style API example</title>
        <style>
div { position: relative;}
.div_parent { width: 300px; height:300px;background:gray;}
.div_child { position:absolute;width:20px;height:20px;background:lime;}
        </style>
    </head>
    <body>
        <div class="div_parent"></div>
        <script src="main.js"></script>
    </body>
</html>
```

## 5 - Conclusion

The javaScript style API might be fun to play with when it comes to just making quick examples that make use of the style API to move elements around the page. However when it comes to doing anything flashy there are better options for doing so such as the canvas element and also there is SVG that might also prove to be a better solution for anything that is going to be a bit animated.

There is also knowing when not to make things so flashy also though. I would say that it is generally a good idea to avoid making anything that is just eye candy when it comes to making any kind of serious application. Also when it comes to making a Game or anything where I would say doing a thing or two that is a little flashy is called for, the style API is just not such a great way to go about doing it.

Still the style API is there when it is needed. If for some reason I do want to set CSS values with javaScript it is the way to go about doing it. I just think that it is generally something that should be avoided when and where possible, and other alternatives should be explored.