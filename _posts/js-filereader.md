---
title: How to read a client side file with javaScript
date: 2020-03-24 16:33:00
tags: [js,JSON]
layout: post
categories: js
id: 634
updated: 2020-03-25 13:15:45
version: 1.8
---

Typically when dealing with files in javaScript it is dealing with a file that is stored on a server. However with some projects I might want to [read a file on a users local file system](https://www.html5rocks.com/en/tutorials/file/dndfiles/). Of course I can not just do so for what should be obvious security reasons, however there is a way of doing so that involves allowing the user to select a file that they do not mind giving access to.

It will involve the use of the [FileReader constructor](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) in conjunction with [file objects](https://developer.mozilla.org/en-US/docs/Web/API/File) and a [file list input tag](https://developer.mozilla.org/en-US/docs/Web/API/FileList).

<!-- more -->

## 1 - basic js file reader example

So for now in this section I will be making a very basic use case example of the FileReader constructor that will just load a json file, and display the values in a div element. The JSON file will just be some very basic object that just contains a few number primitives. In a read project this might be some kind of game state file that will be far more complex, or exist as some kind of binary format outside that of JSON. However for just a basic example this should work just file.

### 1.1 - The json

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