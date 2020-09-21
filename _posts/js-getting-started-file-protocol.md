---
title: The File Protocol and getting started with javaScript
date: 2020-09-21 14:02:00
tags: [js]
layout: post
categories: js
id: 709
updated: 2020-09-21 14:35:06
version: 1.3
---

I have wrote a post on [getting started with javaScript in general](/2018/11/27/js-getting-started/), and another [getting started post that is centered on getting started with the javaScript console](/2019/07/29/js-getting-started-javascript-console/) rather than other ways to get going with javaScript. However I have not yet wrote a post on getting started with javaScript, and using the [file protocol](https://en.wikipedia.org/wiki/File_URI_scheme) of a web browser to run files that are stored locally on the personal computer that you are using. This is strange sense that is how I first started way back in the day for me at least so this is something that I should have go to in my writing a long time ago actually. Anyway better late then never so I thought I would take a moment to write a post on getting started with javaScript, and using the file protocol, a text editor, and a web browser as a starting point to learn javaScript.

If you do not know what the file protocol is it is a way to load an html document, or other assets into a web browser that is stored locally on your computer. In other worlds loading a file in a web browser by way of file:\/\/ rather than https:\/\/. This might not be the best way to go about doing things as in some situations you will run into problems that have to do with the use of the file protocol, but it can still be thought of as a stepping stone to using https that will result those problems. 

One nice thing about the file protocol is that you do not have to take the time to fool around with some kind of http sever to serve static assets that you will be starting out with. You can just create a plain old html file with some javaScript, save the file locally, open it up in the browser and your are done. So I would say that it is a good starting point, and as long as one avoids things that will cause problems it will work okay as a starting point when it comes to learning javaScript for the first time.

<!-- more -->

## 1 - Some basic html and javaScript examples to use via the file protocol

So for starters I thought it would be go to start out with a few very basic starting points when it comes to using the file protocol as a way to get started with javaScript. These will be examples that one can just copy and past from this post into a text editor, save them as a file with the extension .html, and just open them up in a text editor. On ecan then make changes to the html and JavaScript code in there editor, and then switch over to there browser, and reload the page to view there changes. This is how I first started out learning html, and JavaScript. Also often it still is how I make many projects that will still work okay via the file protocol actually.

### 1.1 - Very basic hello world

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