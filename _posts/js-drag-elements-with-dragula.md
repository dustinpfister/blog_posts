---
title: Drag elements around with dragula
date: 2017-12-04 12:53:00
tags: [js,node.js]
layout: post
categories: js
id: 106
updated: 2020-11-21 10:42:33
version: 1.10
---

There is a [javaScript project on github](https://github.com/bevacqua/dragula) called [Dragula](https://bevacqua.github.io/dragula/) that can be used to quickly move elements from one element container to another when it comes to front end javaScript. It is a quick and simple way to get this sort of thing working, and does not require any additional dependencies such as jQuery or lodash.

There are of course many other ways to go about doing this when it comes to working out a custom vanilla javaScript solution for dragging and dropping things around. In modern client side javaScript there are even some native browser options now such as the [HTML drag and drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API), and there is also doing drag, drop, and snap in a canvas element with display objects rather than HTML elements. So this post will be on using Dragula, but also click and drag in general with javaScript in the front end.

<!-- more -->

## 1 - install Dragula

Dragual can be installed via npm or bower, or I guess one could just grab what is in the dist folder of the project on github. I always have node and npm installed on the computer I am using so for my example I made a test folder and installed it with npm.

```
$ npm install dragula
```

Once I have it in a test folder I just need to link to in in an html file, as this is very mush a front end kind of project. Once that is done I am ready to use it to work out some simple examples of dragula for what it is worth.

## 2 - Basic usage example

For my Basic use example of dragula I created a basic.html file in my test folder, and linked to the path in which dragula.js is in this case th node modules folder where it was installed when brining it into my test folder with npm. In a real project of course I would park this asset elsewhere, but for this silly demo it will work okay.

I also found that I want to link to the dragula.css file as well, it seems to work without it but with weird rendering behavior, so just use the given css for starters at least.

```html
<!doctype html>
<html>
    <head>
    <title> Dragula </title>
 
    <!-- Although it will work without it, you will want the css -->
    <link rel="stylesheet" href="node_modules/dragula/dist/dragula.css">
 
    </head>
    <body>
 
        <!-- be sure dragula is loaded in the client before using it-->
        <script src="node_modules/dragula/dist/dragula.min.js"></script>
 
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

## 3 - Conclusion

There are a lot of options for dragula, I could make some more advanced examples but for now I will just keep this post pretty basic. For the mean time there is the [README](https://github.com/bevacqua/dragula/blob/master/readme.markdown) for the project.
It would seem that there are also some native options for dragging elements in a front end javaScript environment also these days. In addition there is also working with a canvas element, and having display objects that are clicked and dragged within a canvas element also that is another option that comes to mind when it comes to this sort of thing. If I get some time to do so maybe I will expand this post with additional options for dragging and dropping elements with javaScript, but for now I am going to leave things as they are.