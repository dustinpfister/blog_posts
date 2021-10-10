---
title: The File Protocol and getting started with javaScript
date: 2020-09-21 14:02:00
tags: [js]
layout: post
categories: js
id: 709
updated: 2021-10-10 15:04:08
version: 1.13
---

I have wrote a post on [getting started with javaScript in general](/2018/11/27/js-getting-started/), and another [getting started post that is centered on getting started with the javaScript console](/2019/07/29/js-getting-started-javascript-console/) rather than other ways to get going with javaScript. However I have not yet wrote a post on getting started with javaScript, and using the [file protocol](https://en.wikipedia.org/wiki/File_URI_scheme) of a web browser to run files that are stored locally on the personal computer that you are using. This is strange sense that is how I first started way back in the day for me at least so this is something that I should have go to in my writing a long time ago actually. Anyway better late then never so I thought I would take a moment to write a post on getting started with javaScript, and using the file protocol, a text editor, and a web browser as a starting point to learn javaScript.

If you do not know what the file protocol is it is a way to load an html document, or other assets into a web browser that is stored locally on your computer. In other worlds loading a file in a web browser by way of file:\/\/ rather than https:\/\/. This might not be the best way to go about doing things as in some situations you will run into problems that have to do with the use of the file protocol, but it can still be thought of as a stepping stone to using https that will result those problems. 

One nice thing about the file protocol is that you do not have to take the time to fool around with some kind of http sever to serve static assets that you will be starting out with. You can just create a plain old html file with some javaScript, save the file locally, open it up in the browser and your are done. So I would say that it is a good starting point, and as long as one avoids things that will cause problems it will work okay as a starting point when it comes to learning javaScript for the first time.

<!-- more -->

## 1 - Some basic html and javaScript examples to use via the file protocol

So for starters I thought it would be go to start out with a few very basic starting points when it comes to using the file protocol as a way to get started with javaScript. These will be examples that one can just copy and past from this post into a text editor, save them as a file with the extension .html, and just open them up in a text editor. On ecan then make changes to the html and JavaScript code in there editor, and then switch over to there browser, and reload the page to view there changes. This is how I first started out learning html, and JavaScript. Also often it still is how I make many projects that will still work okay via the file protocol actually.

### 1.1 - The source code in this post is on github

The source code example here can be found in by [test vjs github repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-getting-started-file-protocol).

### 1.2 - Very basic hello world

Well lets get this one out of the way so we can move on to the more interesting stuff. There are a number of ways to go about creating a hello world html file with a script tag and some javaScript code. One way would be to have a single hard coded display element like a paragraph element, and then get a reference to that element in the script tag. Once a reference to the element is obtained the innerText property of the element reference to the paragraph element is one way to set the text of that element to something like hello world with javaScript code.

```html
<html>
    <head>
        <title>js getting started file protocol</title>
    </head>
    <body>
        <p></p>
        <script>
var p = document.getElementsByTagName('p')[0];
p.innerText = 'hello world';
        </script>
    </body>
</html>
```

So the whole idea here with getting started with javaScript by way of the file protocol is to write something like this in a text editor and then save it as an html file. Then open a web browser and pres ctrl+o and navigate to the location of the html file stored on your local computer and open it up in the browser.

### 1.3 - Starting out with some events

Now that we have a hello world out of the way lets move on to something else such as event attachment. There is a number of ways to attach a wide range of various types of events to elements in html. However for this getting started post I thought I would stick to just a basic example that has to do with just the click event and the add event listener method.

```html
<html>
    <head>
        <title>js getting started file protocol</title>
    </head>
    <body>
        <div>
            <p>count: <span id="disp_count"></span></p>
            <input id="button_step" type="button" value="step">
        </div>
        <script>
var count = 0,
disp_count = document.getElementById('disp_count');
var render = function(){
    disp_count.innerText = count;
};
var step = function(){
    count += 1;
    render();
};
document.getElementById('button_step').addEventListener('click', step);
render();
        </script>
    </body>
</html>
```

This subject could quickly branch off into not just one post, but many on just all there is to be aware of when it comes to event attachment in client side javaScript. I do not want to get into detail with that here in this section or this post. The idea here is that if you want to learn client side javaScript you have to start somewhere. Creating html files and working out just some very basic javaScript examples and opening them up in w web browser is a starting point.

## 2 - style api example

One thing that I started paying around with in the early days was the style API. This is one way to go about changing CSS values with javaScript code. To start using it one just needs to get a reference to an html element by one means or another an dhtne there are a whole bunch of properties off of a style object of the element reference. Each of these can be used as a way to set what the css style is for that element.

So for example one can have a div element and then another dic element that is a child of that container element. Some javaScript code can be used to get references to those elements and also use the style api to set the css values of the child element so that it is centered in the container element. The style api can also be used to change the width and height of the child element along with nay other css values.

```html
<html>
    <head>
        <title>js getting started file protocol</title>
    </head>
    <body>
        <div id="container" style="position:relative;width:320px;height:240px;background:black;">
           <div id="child" style="position:absolute;width:32px;height:32px;background:gray;"></div>
        </div>
        <script>
var render = function(child, state){
    child.style.left = state.x + 'px';
    child.style.top = state.y + 'px';
    child.style.width = state.w + 'px';
   child.style.height = state.h + 'px';
};
var center = function(state, container){
   state.x = container.scrollWidth / 2 - state.w / 2;
   state.y = container.scrollHeight / 2 - state.h / 2;
};
var state = {
   x: 25,
   y: 5,
   w: 128,
   h: 64
};
var container = document.getElementById('container');
var child = document.getElementById('child');
center(state, container);
render(child, state);
        </script>
    </body>
</html>
```

## 3 - Conclusion

So getting started with javaScript by way of creating assets that one can just open up in a web browser is a great starting point for starting to learn javaScript. Also in many cases it is a way to just keep moving forward with learning as long as one does not run into any problems doing so. However that is just it when it comes to getting started wit javaScript this way, sooner or later you will run into one or more problems when it comes to running javaScript code in a web browser this way. For example in my [post on async await I got into writing a few examples that have to do with using web workers](/2019/06/25/js-async-await/), and when it comes to those they will not work with the file protocol. So in order to get it to work I just have to [set up a simple static web server](/2017/12/04/nodejs-simple-static-server-file/) and sever what I am working on by way of the http protocol and view it in the browser that way.

Still this is mainly the way that I got started with javaScript so it still works fine as long as I avoid features that will case problems, in which case I just need to set up a sever in order to work on it even if I just need to do so locally on my computer.