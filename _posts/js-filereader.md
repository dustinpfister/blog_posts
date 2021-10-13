---
title: How to read a client side file with javaScript
date: 2020-03-24 16:33:00
tags: [js,JSON]
layout: post
categories: js
id: 634
updated: 2021-10-13 12:21:50
version: 1.27
---

Typically when dealing with files in javaScript I am actually dealing with a file that is stored on a server, I then use XMLHttpRequest or some other means as a way to retrieve all or part of that data by way of scripting the HTTP protocol. However it is not like http is the only way to retrieve and post some data over a network, and also in some cases there is going to be a need to read and save data on a clients local file system.

So then there are other ways of getting or saving files remotely, and also ways of storing data locally such as with the [web storage API](/2019/08/20/js-web-storage/) which is often the first go to solution for this sort of thing. However with some projects I might want to [read a file on a users local file system](https://www.html5rocks.com/en/tutorials/file/dndfiles/) rather than data that I am parking by way of the web storage API. Of course I can not just do so for what should be obvious security reasons, however there is a way of doing so that involves allowing the user to select a file that they do not mind giving access to. That is allowing the user to navigate to a location on there local file system, and allow for a file to be saved to loaded there at a given file URI.

Creating and loading files on the users local file system will involve the use of the [FileReader constructor](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) in conjunction with [file objects](https://developer.mozilla.org/en-US/docs/Web/API/File) and a [file list input tag](https://developer.mozilla.org/en-US/docs/Web/API/FileList). In this post I will be going over a few basic examples of how to use this as a means of local storage of state.

<!-- more -->

## 1 - A basic js file reader example

So for now in this section I will be making a very basic use case example of the FileReader constructor that will just load a json file, and display the values in a div element. The JSON file will just be some very basic object that just contains a few number primitives. In a read project this might be some kind of game state file that will be far more complex, or exist as some kind of binary format outside that of JSON. However for just a basic example this should work just file.

In this section I also often add in some additional details when it comes to anything else you should know about when it comes to continuing to read the rest of this post. For example I assume that you have at least some background with html and javaScript, if not you might want to start out with some [getting started type posts on javaScript](/2018/11/27/js-getting-strated/). With that said there are all kinds of little details that I am not going to be getting into detail here such as [what a constructor function is](/2019/02/27/js-javascript-constructor/), and that is the kind of function the File Reader constructor is.

### 1.1 - The json

So I will want a json file stored somewhere on the local client system, it does not matter where as long as it is a typical place to store files that contain data for something such as the home folder in Linux systems, or the My Documents folder in Windows. For this example the contents of the json file will just contain and x and y property value that will be used by the simple example that uses the File Reader Constructor.

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

### 1.3 - The source code examples in this post are on github

The source code examples in this post can be found on [Github in my test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-filereader), along with all my other vanilla javaScript examples that I write posts about. I still have a lot more planed out for this post when it comes to additional examples, as well as code examples that have to do with alternatives to using File Reader. As such the Github repository may have more up to date source code examples compared to what I have here thus far, this content like many other posts is still very much a work in progress.

## 2 - Starting a Copy and paste type system with text area elements

The file reader constructor is one great option for loading some kind of state into an web application, as well as saving such a state. However I am thinking that a good solution for this sort of thing would provide an array of options for this sort of thing. There is getting into cookie files, and the web storage API, but there is also looking into other options. One that comes to mind is to provide a way for users to copy and paste a string of data that represents a state and then click a load button. With that said this section is a getting started type section on this kind of solution.

### 2.1 - A storage.js module

So then for this section I am going to start out with the source code of a storage.js file that is the beginnings of a module to help with saving one or mode state objects. A full solution as I see it would be far more complex than this, but for the sake of keeping things simple here I will just be seeing about getting started with this text area idea.

Inside the body of an [IIFE](/2020/02/04/js-iife/) I have a private create UI method that will be used to create and append a text area element to a given container element that will default to the body element. I then also have a public create method that will create and return a storage object as I am calling it which in turn is what I will need to pass to the other methods in this module mainly the save and load methods.

```js
(function (StorageMod) {
 
    // create the UI
    var createUI = function (opt, storage) {
        opt = opt || {};
        opt.container = opt.container || document.body;
        if (typeof opt.container === 'string') {
            opt.container = document.querySelector(opt.container);
        }
        var textArea = document.createElement('textarea');
        textArea.cols = opt.cols || 60;
        textArea.rows = opt.rows || 15;
        opt.container.appendChild(textArea);
        var loadButton = document.createElement('input');
        loadButton.type = 'button';
        loadButton.value = 'Load';
        loadButton.addEventListener('click', function(e){
            StorageMod.load(storage);
        });
        opt.container.appendChild(loadButton);
        return opt.container;
    };
 
    StorageMod.create = function (opt) {
        opt = opt || {};
        var storage = {};
        storage.onNoSaveFound = opt.onNoSaveFound || function (storage) {};
        storage.onLoadState = opt.onLoadState || function (storage, state) {};
        // create the UI for the given container or body
        storage.el = createUI(opt, storage);
        StorageMod.load(storage);
        return storage;
    };
 
    // save to the storage
    StorageMod.save = function (storage, state) {
        var textArea = storage.el.querySelector('textarea');
        textArea.value = JSON.stringify(state);
    };
 
    // load from the storage
    StorageMod.load = function (storage) {
        var textArea = storage.el.querySelector('textarea');
        var state = null;
        // try to load what should be json
        try {
            state = JSON.parse(textArea.value);
        } catch (e) {
            // if there is an error loading json call the no save found call back
            // this method should return a new state
            state = storage.onNoSaveFound.call(storage, storage);
        }
        // save what is loaded, OR CREATED in the event of an error
        // in any case this should update things like the text area element
        StorageMod.save(storage, state);
        // call on load state callback
        storage.onLoadState(storage, state);
        return state;
    };
 
}
    (this['StorageMod'] = {}));
```

### 2.2 - Simple demo

Now that I have a module together I am going to want to have at least one simple demo to make sure that what I have together is working as it should thus far. For now I just want to try something out with a very simple game module if it can event be called that, where it just creates and returns a state that contains a money property. This is just so I have something that will serve as  a game Mode that creates and updates a state object, in a real use case example there would be a bot more to this game module of course.

Anyway the main thing about this is that I just want to make sure that I can just mutate the game state in the text area element, and then click the load button of the UI to load the JSON in the text area and make that the game state object.

```html
<html>
    <head>
        <title> Storage example </title>
    </head>
    <body>
        <div id="ui_storage"></div>
        <br><br>
        <h3>Game State:</h3>
        <div id="disp_game" style="padding:10px;background:gray;"></div>
        <script src="storage.js"></script>
        <script>
// a crude game module
var gameMod = {};
gameMod.create = function(){
    return {
        money : 100
    };
};
 
var draw = function(el, game){
    el.innerText = 'money: ' + game.money;
};
 
var disp_game = document.querySelector('#disp_game');
var game = {};
 
// setting up a storage object
var storage = StorageMod.create({
    container: '#ui_storage',
    cols: 50, rows: 10,
    onNoSaveFound : function(storage){
        return gameMod.create();
    },
    onLoadState : function(stroage, state){
        game = state;
        draw(disp_game, game);
    }
});
 
draw(disp_game, game);
 
        </script>
    </body>
</html>
```

So far so good when I have this up and running it seems to work as I would want it to thus far, however there are a lot of ruff edges with this that would need to be addressed before I can call this a done deal project of some kind. There are more features that I would want to add when it comes to validation, as well as making the save state exist in some other kind of string format other than that of plain old JSON. Also there is making a more complex revision of this that will allow for the use of the File Reader constructor as a way to load test into the text area which would also be nice.

## 3 - Conclusion

The file reader constructor is then a great native way to allow the user to select a file to open to use in a web application, as well to save such a file. What is great about this kind of solution is that it allows for users to save and load data in a way that they are familial with. 

Another thing to keep in mind is that some users like to disable local storage, and cookies in there browsers. Although there is feature testing for this and informing they users that they should enable this, another option would be to give users an array of options for loading and saving a state.

