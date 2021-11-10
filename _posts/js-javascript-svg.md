---
title: JavaScript SVG graphics
date: 2019-02-11 10:03:00
tags: [js]
layout: post
categories: js
id: 376
updated: 2021-11-10 11:56:03
version: 1.25
---

In javaScript SVG or [Scalable Vector Graphics](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) graphics are an option for making vector graphics with javaScript, inline tags, or an external file format. The process of making SVG by way of hand coding it is to make use of a number of standard tags or nodes that have to do with defining what a graphic is. These nodes are not standard HTML elements, but they work in a very similar way to them, so it is an HTML like kind of way of making vector graphics that can be scaled up and down by just chaining some values in the root element. So it is easy to mutate such tags with javaScript code in a very similar fashion to that of mutating the Document Object Model of plain HTML nodes. Also just like with html elements there are ways of creating and injecting svg nodes as well as mutating the values of svg nodes using javaScript which is cool.

When it comes to making graphics with javaScript there are a number of options these days, including the 2d canvas drawing API which is often the preferred raster graphics option. However svg is a [vector based graphics](https://en.wikipedia.org/wiki/Vector_graphics) solution rather than the [raster based graphics](https://en.wikipedia.org/wiki/Raster_graphics) used in canvas. So Scalable Vector Graphics is still a viable option for creating on the fly graphics with javaScript.

Truly getting into SVG might require reading not just one but several posts on the subject, I am not sure if I really want to get into the depth of SVG myself. However it is certainly something that I should write at least one post on. So this will be just the usual basic getting started post, and if I get some time maybe I will expand the content on this post as needed.

<!-- more -->


## 1 - javaScript svg graphics basics

In this section I will be just starting out with the basics of svg graphics and client side javaScript. With that said there is creating svg graphics inline in html itself, and then there is having an external svg file that can then be loaded into the html via and object tag. Also just like with html, and canvas elements, yet another options would be to generate SVG by way of a little javaScript code also which would be yet even another option for working with SVG in a web page.

I try my best to keep these basic sections fairly easy, but this is still not a [getting started with javaScript](/2018/11/27/js-getting-started/) type post, there are some things you should be solid with first. When it comes to creating and changing the state of SVG graphics with javaScript it is more or less as easy as DOM manipulation if one is familiar with that to begin with. If not you might want to check out my post on [getting started with javaScript by way of the file protocol](/2020/09/21/js-getting-started-file-protocol/), as well as maybe some other posts on [document object](/2021/10/29/js-document/) methods, and DOM manipulation first. There are only some slight differences when it comes to the process of creating Nodes that are used in the element try that will make up graphics created with javaScript and SVG.

### - The source code examples are On Github

In my [test vjs repository on Github](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-svg) I have the source code examples that I am writing about in this post. This repository is also where I am holding all the source code examples for my [many other posts on vanilla javaScript related topics](/categories/js/).

### 1.1 - inline svg graphics

With inline svg graphics the svg elements as well as all other elements with svg can just be included in the html itself just like all the other html elements. This can be used in conjunction with inline scripts as a way to access the svg in a very simulate way of accessing the pain old document object model as usual.

```html
<html>
    <head>
        <title>javascript svg inline</title>
    </head>
    <body>
        <svg version="1.1" width="320" height="240" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <circle cx="160" cy="120" r="120" fill="red" />
        </svg>
        <script>
var circle = document.getElementsByTagName('circle')[0];
circle.setAttributeNS(null, 'r', 75);
        </script>
    </body>
</html>
```

### 1.2 - external svg graphics

It may be preferable to have svg graphics as an external file that can then be loaded into an html file, and accessed with javaScript. Here I have an example of going just that, with the html there needs to be an object element that is used to load the external svg data. To load the svg I only need a data attribute that points to the url of the external svg file.

```html
<html>
    <head>
        <title>javascript svg external</title>
    </head>
    <body>
        <object id="svg-external" data="external.svg" type="image/svg+xml"></object>
        <script src="external.js"></script>
    </body>
</html>
```

With the external.svg file it will need to be formated in xml and might look something like this example I worked out that makes use of many of the most basic, yet still useful elements there are to work with.

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" width="320" height="240" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect x="5" y="5" width="200" height="200" fill="green" stroke-width="4" stroke="black" />
  <line x1="5" y1="5" x2="205" y2="205" stroke="black" stroke-width="2" />
  <circle id="cir" cx="50" cy="50" r="25" fill="red" />
  <polyline points="50,50,50,175,125,175,125,125,175,125" stroke="blue" stroke-width="4" fill="none" />
  <use xlink:href="external.svg#the_svg"/>
</svg>
```

I can then access and work with the values of the svg data with javaScript like this.

```js
var obj = document.getElementById('svg-external');
obj.addEventListener('load', function () {
    var svg = obj.contentDocument;
    var cir = svg.getElementById('cir');
    cir.setAttributeNS(null, 'r', 75);
});

```

### 1.3 - Generating svg with javaScript

Another option is to create an svg element with javaScript and inject the svg element into the html with a method like appendChild. To do this I must use the document.createElementNS method that works just like the regular document.createElement method only this is a special name space method for creating svg elements.

So then in my html I can just like to an external javaScript file.

```html
<html>
    <head>
        <title>javascript svg generate</title>
    </head>
    <body>
        <script src="generate.js"></script>
    </body>
</html>
```

And then in the javaScript file I can do everything of interest.

```js
var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttributeNS(null, 'width', 320);
svg.setAttributeNS(null, 'height', 240);
 
var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
circle.setAttributeNS(null, 'cx', 160);
circle.setAttributeNS(null, 'cy', 120);
circle.setAttributeNS(null, 'r', 75);
circle.setAttributeNS(null, 'fill', 'green');
svg.appendChild(circle);
 
document.body.appendChild(svg);
```

## 2 - Scaling SVG 

The whole thing about Scalable Vector Graphics is that they are, well scalable. So of course I should have a section in which the cous is how to go about getting started with this sort of thing, and also start a section in which I will write about any additional advanced topics surrounding the topic of scaling with SVG.

### 2.1 - The viewBox attribute

When it comes to getting started with scaling there is the viewBox attribute of the root svg node that should maybe be the first place to start. So for this example I am just starting out with that when it comes to using this veiwBox attribute along with the width and height properties of the root svg element.

```html
<html>
    <head>
        <title>svg scale</title>
    </head>
    <body style="background:black;">
        <svg version="1.1"
             width="400" height="400"
             viewBox="0 0 200 200"
             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <circle cx="200" cy="200" r="200" fill="red" />
        </svg>
    </body>
</html>
```

## 3 - JavaScript SVG example 1 setting all properties of a circle in a loop

For this javaScript SVG example I worked out a quick simple little animation that moves a circle in an elliptical pattern, while also adjusting the radius of the circle. I Just get a reference to the circle element with any typical method that will work just like with any other DOM element. Once I have a reference I then just need to use the setAttributeNS method to change the values for cx cy and radius inside the body of the loop.

```html
<html>
    <head>
        <title>javaScript svg example</title>
    </head>
    <body>
        <svg 
            width="320" height="240" 
            xmlns="http://www.w3.org/2000/svg" 
            style="background:black;"
            stroke-width="3"
        >
            <circle cx="160" cy="120" r="50" fill="white" stroke="red" />
        </svg>
        <script>
var circle = document.getElementsByTagName('circle')[0];
 
var frame = 0, maxFrame = 100;
var loop = function(){
    requestAnimationFrame(loop);
    var per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    radian = Math.PI * 2 * per,
    x = 160 + Math.cos(radian) * 75,
    y = 120 + Math.sin(radian) * 25,
    r = 10 + 50 * bias;
    circle.setAttributeNS(null, 'cx', x);
    circle.setAttributeNS(null, 'cy', y);
    circle.setAttributeNS(null, 'r', r);
    frame += 1;
    frame %= maxFrame;
};
loop();
        </script>
    </body>
</html>
```

## 4 - Conclusion

So Scalable Vector Graphics is yet another way to create graphics with javaScript code on top of using canvas elements. However there are still some other options when it comes to creating graphics or displaying some info. I often find myself using [canvas elements](/2017/05/17/canvas-getting-started/) over svg for the most part, but it makes sense to play around with svg at least a little once in a while just for the sake of trying something new. There is more to it when it comes to just getting into working with SVG just for that reason though as there are of course note worth differences between SVG and canvas.

There is the idea of using html as CSS as a way to try to create graphics. I can not say that doing so is a good idea really, but if you feel like getting into that just for the hell of it there is looking into the [style api](/2019/02/12/js-javascript-style/) which is how to go about paying around with css values of HTML elements using javaScript code. There are a number of other options of which I am sure, but many of them might involve having java installed on the client system, it might be an obsolete technology oto work with like VML or flash, or something to that effect. So I generally like to work with stuff that is still used today, is built into the browser, and not just the browser but all browsers. with that said there is of course canvas, and SVG is the other major thing to be aware of besides just canvas.



