---
title: How to read a client side file with javaScript
date: 2020-03-24 16:33:00
tags: [js,JSON]
layout: post
categories: js
id: 634
updated: 2020-09-23 14:37:58
version: 1.12
---

Typically when dealing with files in javaScript it is dealing with a file that is stored on a server, I then use XMLHttpRequest or some other means as a way to retrieve all or part of that data by way of scripting the HTTP protocol. 

There are However other ways of getting or saving files remotely, and also ways of storing data locally such as with the [web storage API](/2019/08/20/js-web-storage/). However with some projects I might want to [read a file on a users local file system](https://www.html5rocks.com/en/tutorials/file/dndfiles/). Of course I can not just do so for what should be obvious security reasons, however there is a way of doing so that involves allowing the user to select a file that they do not mind giving access to. That is allowing the user to navigate to a location on there local file system, and allow for a file to be saved to loaded there at a given file URI.

Creating and loading files on the users local file system will involve the use of the [FileReader constructor](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) in conjunction with [file objects](https://developer.mozilla.org/en-US/docs/Web/API/File) and a [file list input tag](https://developer.mozilla.org/en-US/docs/Web/API/FileList). In this post I will be going over a few basic examples of how to use this as a means of local storage of state.

<!-- more -->

## 1 - basic js file reader example

So for now in this section I will be making a very basic use case example of the FileReader constructor that will just load a json file, and display the values in a div element. The JSON file will just be some very basic object that just contains a few number primitives. In a read project this might be some kind of game state file that will be far more complex, or exist as some kind of binary format outside that of JSON. However for just a basic example this should work just file.

### 1.1 - The json

So I will want a json file stored anywhere on the local client system. For this example the contents of the json file will look something like this.

```js
{
   "x": 42,
   "y": 5
}
```

### 1.2 - The basic.html file

In my html I will want an input tag with the type attribute set to file, as well as a div element that will be used to display data once it is loaded. In my script tag I will want to get a reference to the input tag and add a on change event in which I will be using the FileReader constructor by passing a reference to the file object in the event object of the event hander for the on change event.

In this example I am also using a load json method that will always return an object even if an error happens when attempting to parse the json, which might end up being badly formed json, or not even json to begin with.

```html
<input type = "file" id = "input_files">
<div id = "out"></div>
<script>
 
var loadJSON = function (text) {
    try {
        var obj = JSON.parse(text);
        obj.message = 'loaded file';
        return obj;
    } catch (e) {
        return {
            x: 0,
            y: 0,
            message: e.message
        };
    }
};
 
var el_files = document.getElementById('input_files');
el_out = document.getElementById('out'),
el_files.addEventListener('change', function (e) {
    var files = this.files;
    console.log(files);
    var reader = new FileReader();
    reader.onload = function (e) {
        var obj = loadJSON(e.target.result);
        //console.log(obj);
        out.innerText = 'state: ' + obj.x + ',' + obj.y + ' : ' + obj.message
    };
    reader.readAsText(files[0]);
});
</script>
```

When I have this example opened up in my browser I am able to open the json file and have the values displayed in the browser window as expected. Although this might not be anything that interesting the basic idea is there. I am able to open a file store in the local file system and then use that file in a very basic example of the file reader constructor. In a real example this json file could contain all kinds of state information that would be some kind of save state, and users could easily hack the values to cheat in the game of they wanted to.