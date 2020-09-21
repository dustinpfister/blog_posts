---
title: The File Protocol and getting started with javaScript
date: 2020-09-21 14:02:00
tags: [js]
layout: post
categories: js
id: 709
updated: 2020-09-21 14:54:37
version: 1.6
---

I have wrote a post on [getting started with javaScript in general](/2018/11/27/js-getting-started/), and another [getting started post that is centered on getting started with the javaScript console](/2019/07/29/js-getting-started-javascript-console/) rather than other ways to get going with javaScript. However I have not yet wrote a post on getting started with javaScript, and using the [file protocol](https://en.wikipedia.org/wiki/File_URI_scheme) of a web browser to run files that are stored locally on the personal computer that you are using. This is strange sense that is how I first started way back in the day for me at least so this is something that I should have go to in my writing a long time ago actually. Anyway better late then never so I thought I would take a moment to write a post on getting started with javaScript, and using the file protocol, a text editor, and a web browser as a starting point to learn javaScript.

If you do not know what the file protocol is it is a way to load an html document, or other assets into a web browser that is stored locally on your computer. In other worlds loading a file in a web browser by way of file:\/\/ rather than https:\/\/. This might not be the best way to go about doing things as in some situations you will run into problems that have to do with the use of the file protocol, but it can still be thought of as a stepping stone to using https that will result those problems. 

One nice thing about the file protocol is that you do not have to take the time to fool around with some kind of http sever to serve static assets that you will be starting out with. You can just create a plain old html file with some javaScript, save the file locally, open it up in the browser and your are done. So I would say that it is a good starting point, and as long as one avoids things that will cause problems it will work okay as a starting point when it comes to learning javaScript for the first time.

<!-- more -->

## 1 - Some basic html and javaScript examples to use via the file protocol

So for starters I thought it would be go to start out with a few very basic starting points when it comes to using the file protocol as a way to get started with javaScript. These will be examples that one can just copy and past from this post into a text editor, save them as a file with the extension .html, and just open them up in a text editor. On ecan then make changes to the html and JavaScript code in there editor, and then switch over to there browser, and reload the page to view there changes. This is how I first started out learning html, and JavaScript. Also often it still is how I make many projects that will still work okay via the file protocol actually.

### 1.1 - Very basic hello world

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

### 1.2 - Starting out with some events

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

## 2 - Conclusion

So getting started with javaScript by way of creating assets that one can just open up in a web browser is a great starting point for starting to learn javaScript. Also in many cases it is a way to just keep moving forward with learning as long as one does not run into any problems doing so, and what it is that they are working on will still work just fine via https also, and in most situations it will.