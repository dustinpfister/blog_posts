---
title: Drag elements around with dragula
date: 2017-12-04 12:53:00
tags: [js,node.js]
layout: post
categories: js
id: 106
updated: 2017-12-04 18:02:07
version: 1.1
---

There is a [popular javaScript project on github](https://github.com/bevacqua/dragula) called [dragula](https://bevacqua.github.io/dragula/) that can be used to quickly move elements from one element container to another. It is a quick and simple way to get this sort of this working, and does not require any additional dependencies such as jquery and lodash.

<!-- more -->

## install Dragula

Dragual can be installed via npm or bower, or I guess ou could just grab what is in the dist folder of the project on github. For my example I made a test folder and installed it with npm.

```
$ npm install dragula
```

Once I have it in a test folder I just need to link to in in an html file, as this is very mush a front end kind of project.

## Basic usage example

For my Basic use example of dragula I created a basic.html file in my test folder, and linked to the path in which dragula is. For me it is in the dist folder of the dragula node module folder, but the path my differ depending on how you are going about structuring things.

I aslo found that I want to link to the dragula.css file as well, it seems to work without it but with weird rendering behavior, so just use the given css.

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

So thats it at a minimum I just need to give it an array of elements that are containers of elements that can be dragged from one location to another.

## Conclusion

There are a lot of options for dragula, I could make some more advanced examples but for now I will just keep this post pretty basic. For the mean time there is the [README](https://github.com/bevacqua/dragula/blob/master/readme.markdown) for the project.