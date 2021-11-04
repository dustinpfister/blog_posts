---
title: Drag elements around with dragula
date: 2017-12-04 12:53:00
tags: [js,node.js]
layout: post
categories: js
id: 106
updated: 2021-11-04 11:16:15
version: 1.20
---

There is a [javaScript project on github](https://github.com/bevacqua/dragula) called [Dragula](https://bevacqua.github.io/dragula/) that can be used to quickly move elements from one element container to another when it comes to front end javaScript. It is a quick and simple way to get this sort of thing working, and does not require any additional dependencies such as jQuery or lodash.

There are of course many other ways to go about doing this when it comes to working out a custom vanilla javaScript solution for dragging and dropping things around. In modern client side javaScript there are even some native browser options now such as the [HTML drag and drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API), and there is also doing drag, drop, and snap in a canvas element with display objects rather than HTML elements. So this post will be on using Dragula, but also click and drag in general with javaScript in the front end.

<!-- more -->

## 1 - install Dragula

Dragual can be installed via npm or bower, or I guess one could just grab what is in the [dist folder of the project on github](https://github.com/bevacqua/dragula/tree/master/dist). In any case once I have it in a test folder I just need to link to in in an html file by way of a script tag with the src attribute pointing to the file, as this is very mush a front end kind of project. However this is also a project where I need to include some css with the javaScript also, the css can be found in the dist folder of the Github repository also alone with the javaScrit files. Once that is done I am ready to use it to work out some simple examples of Dragula for what it is worth.

Although I often like to keep my basic sections very simple this is still not a getting started type posts with [javaScript in general](/2018/11/27/js-getting-started/). I assume that you have at least some background then when it comes to getting started with javaScript when it comes to [client side javaScript such as by way of the file protocol](/2020/09/21/js-getting-started-file-protocol/). However there are other ways of working on a client side javaScript project so it might be a good idea to look into how to [get started with nodejs](/2017/04/05/nodejs-helloworld/), and also how to use [nodejs to set up a simple static web sever](/2017/12/04/nodejs-simple-static-server-file/) so that one can work on a client side project by way of the http protocol in a web browser.

### - The source code examples in this post are on Github

I have the source code examples for this post up on my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-drag-elements-with-dragula) on Gihub along with the source code examples for my many other [posts on javaScript](/categories/js/).

### 1.1 - Basic usage example

For my Basic use example of dragula I created a basic.html file in my test folder, and linked to the path in which dragula.js is in this case th node modules folder where it was installed when brining it into my test folder with npm. In a real project of course I would park this asset elsewhere, but for this silly demo it will work okay.

I also found that I want to link to the dragula.css file as well, it seems to work without it but with weird rendering behavior, so just use the given css for starters at least.

```html
<!doctype html>
<html>
    <head>
    <title> Dragula </title>
    <!-- Although it will work without it, you will want the css -->
    <link rel="stylesheet" href="dragula.css">
    <meta name="google" content="notranslate" />
    </head>
    <body>
        <!-- be sure dragula is loaded in the client before using it-->
        <script src="dragula.min.js"></script>
        <!-- just need to containers with some elements in them like this: -->
        <div id="top">
            <div><span>item1</span></div>
            <div><span>item2</span></div>
            <div><span>item3</span></div>
            <div><span>item4</span></div>
        </div>
        <br><br><br>
        <div id="bottom">
            <div><span>item5</span></div>
        </div>
        <!-- here is the most basic example -->
        <script>
            var get = function(id){
                return document.getElementById(id);
            };
            dragula([get('top'), get('bottom')]);
        </script>
    </body>
</html>
```

To set up some areas to drag to and from I just need two container divs, and then pass references to each of them when calling the main dragula method that is returned from the dragula module.

So thats it at a minimum I just need to give it an array of elements that are containers of elements that can be dragged from one location to another.

## 2 - The drag and drop API

There is now the [drag and drop api](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) when it comes to built in browser features that can be used to do this sort of thing without an external javaScript library. This api works by setting an [draggable attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable) for an element to true, at which point one or more events can be attached for the element that will define what will happen for certain events. One of the most impotent events to attach would be the drag start event, but there are a few others that are important also such as the drop event, and drag enter events.

### 2.1 - Working example I found

I found this [js fiddle that is a basic working example](https://jsfiddle.net/radonirinamaminiaina/zfnj5rv4/) of the built in drag and drop API. The general idea is that the draggable attribute must be set for any and all elements that will need to be dragged. That might be the first step, but it does not end there as in order to get things working there are a few event handers that need to be attached, and that is what is key it would seem when it comes to creating what is a valid target when it comes to doing some kind of drag and drop type thing with elements.

```html
<!doctype html>
<html>
    <head>
    <title> Dragula </title>
    <meta name="google" content="notranslate" />
    <style>
#draggable {
    width: 200px;
    height: 20px;
    text-align: center;
    background: white;
  }

  .dropzone {
    width: 200px;
    height: 20px;
    background: blueviolet;
    margin-bottom: 10px;
    padding: 10px;
  }
    </style>
    </head>
    <body>
<div class="dropzone">
    <div id="draggable" draggable="true" ondragstart="event.dataTransfer.setData('text/plain',null)">
        This div is draggable
    </div>
</div>
<div class="dropzone"></div>
<div class="dropzone"></div>
<div class="dropzone"></div>
        <script>

// https://jsfiddle.net/radonirinamaminiaina/zfnj5rv4/

var dragged;

  /* events fired on the draggable target */
  document.addEventListener("drag", function( event ) {

  }, false);

  document.addEventListener("dragstart", function( event ) {
      // store a ref. on the dragged elem
      dragged = event.target;
      // make it half transparent
      event.target.style.opacity = .5;
  }, false);

  document.addEventListener("dragend", function( event ) {
      // reset the transparency
      event.target.style.opacity = "";
  }, false);

  // events fired on the drop targets 
  document.addEventListener("dragover", function( event ) {
      // prevent default to allow drop
      event.preventDefault();
  }, false);

  document.addEventListener("dragenter", function( event ) {
      // highlight potential drop target when the draggable element enters it
      if ( event.target.className == "dropzone" ) {
          event.target.style.background = "purple";
      }

  }, false);

  document.addEventListener("dragleave", function( event ) {
      // reset background of potential drop target when the draggable element leaves it
      if ( event.target.className == "dropzone" ) {
          event.target.style.background = "";
      }

  }, false);

  document.addEventListener("drop", function( event ) {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged elem to the selected drop target
      if ( event.target.className == "dropzone" ) {
          event.target.style.background = "";
          dragged.parentNode.removeChild( dragged );
          event.target.appendChild( dragged );
      }
    
  }, false);
        </script>
    </body>
</html>
```

## 3 - Conclusion

There are a lot of options for dragula, I could make some more advanced examples but for now I will just keep this post pretty basic. For the mean time there is the [README](https://github.com/bevacqua/dragula/blob/master/readme.markdown) for the project.
It would seem that there are also some native options for dragging elements in a front end javaScript environment also these days. In addition there is also working with a canvas element, and having display objects that are clicked and dragged within a canvas element also that is another option that comes to mind when it comes to this sort of thing. If I get some time to do so maybe I will expand this post with additional options for dragging and dropping elements with javaScript, but for now I am going to leave things as they are.