---
title: How to read a client side file with javaScript
date: 2020-03-24 16:33:00
tags: [js,JSON]
layout: post
categories: js
id: 634
updated: 2020-03-25 09:57:40
version: 1.2
---

Typically when dealing with files in javaScript it is dealing with a file that is stored on a server. However with some projects I might want to read a file on a users local file system. Of course I can not just do so for what should be obvious security reasons, however there is a way of doing so that involves allowing the user to select a file that they do not mind giving access to.

<!-- more -->

## 1 - basic js file reader example

So for now in this section I will be making a very basic use case example of the FileReader constructor that will just load a json file, and display the values in a div element.

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