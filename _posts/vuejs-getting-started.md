---
title: vue start with setup and some basic examples
date: 2019-05-05 11:24:00
tags: [vuejs]
layout: post
categories: vuejs
id: 435
updated: 2021-02-25 20:20:49
version: 1.38
---

So this week I think I will be starting a new collection of posts on [vuejs](https://vuejs.org/) and as such when I learn something new I like to start writing some posts on the topic while I am at it. As such whenever I start a new collection of content I often start out with a getting started post on that collection because that is just what needs to happen first naturally. Getting started with vuejs requires al least some background with javaScript, html, and css. In addition to front end experience it is also a good idea to gain at least a little experience working with back end systems also when it comes to using nodejs, and express.js for example.

So this will be a post on [getting started with vuejs](https://vuejs.org/v2/guide/), and just a few basic hello world type examples of things. However I will also in this post be outlining how to set up a quick project that involves using node.js and express to serve up the first of what should be at least a few examples on vuejs. This might not always be necessary, but one way or another what you are working on should be served up via the http protocol rather than that of the file protocol, in some examples you will run into errors that can happen relating to that. You do not have to do this the way that I am doing it here, but it is still a good idea to learn how to lost something you are working on locally anyway.

<!-- more -->

## 1 - vue start

There is more than one way to get started with vue.js, some ways might be easier, others maybe not so easy. When I started experimenting with vue.js I started something that is a bit of a project by itself, involving some back end code with express. After all what is a front end javaScript framework without at least some back end code as well? 

Anyway the project is my test vuejs project which is just a massive collection of vuejs examples. I have the source code for this up on my github account, and maybe the best way to reproduce what I am writing about here would be to clone that down, do an npm install in the project folder and then run the main static script. You can then browse and hack over the examples in this post as well as all my other posts on vuejs.

However I think I should still cover how to get started from the ground up also, so in this section I will be going over how I set up my test vuejs project folder. In addition I will also cover a very basic static server script for the sake of quickly browsing each example that I come up with. In order to really get into this sort of thing you will want to learn more about getting started with nodejs, and express.js, that is if you want to go with those options when it comes to a back end system.

### 1.1 - Just clone down the repo, do an npm install, and run the static sever

The fastest way to go about reproducing what I have worked out for this getting started with vuejs post is to just [clone down the repository on my github](https://github.com/dustinpfister/test_vuejs) account. Then cd into the root folder of the clone of the repo, no an npm install to install the dependences. Once that is all done you can just run the static server script passing a port number as the first and only argument.

```
$ git clone --depth 1 https://github.com/dustinpfister/test_vuejs
$ cd test_vuejs
$ npm install
$ num run static 3000
```

Once the server is up and running you can then navigate to the list of all the vuejs examples by going to localhost:3000 in the address bar of a web browser. If all goes well you should see a list of the root name space of the repo folder to which you can then navigate to the forpost folder and then the folder for this post which should be vuejs-getting-started. There should then be links to each of the examples here.

### 1.2 - vuejs test folder setup

So I started out by making a new folder called test\_vuejs and made it the current working directory. Once the folder is the current working directory I did a git init to make it a git folder, and I also did the usual npm init for any project folder that is going to contain a few least npm packages such as express. Doing this will generate a package.json file for the project folder.

I then installed express and added it to my package.json folder as a dependency by using the save option. I am also using serve-index as a way to create an index for all the examples that I will have in a public folder for each post.

There is then using the mkdir command to create the public folder that will contain vuejs and all other front end assets that will be hosted by express.static when it comes to working out back end scripts. 


```
$ mkdir test_vuejs
$ cd test_vuejs
$ git init
$ npm init
$ npm install express --save
$ npm install serve-index --save
$ mkdir public
```

### 1.3 - Additional folders in the for post folder

In the public folder I also made a for post folder that will contain folders for each post I write for vue.js including this one, as well as the js folder as well to hold vue.js and any other front end javaScript that I might use across examples.

```
$ cd public
$ mkdir forpost
$ mkdir js
```

For starters I have downloaded vue 2.6.10 from the [installation](https://vuejs.org/v2/guide/installation.html) page at the vue.js website and placed it in a vuejs\/2.6.10 path in the js folder of my public folder. This way as my collection of examples grow I can potentially place other versions in the vuejs folder, and also have both development and production files for each version as well. This is also a pattern that I like to follow with any other additional frameworks that I might add into the mix at a later point.

```
$ cd js
$ mkdir vuejs
$ cd vuejs
$ mkdir 2.6.10
```

### 1.4 - A very basic example of an express.js powered static server

So now that I have the very basics worked out when it comes to setting up a new nodejs project it is now time to just work out a very quick simple static server using express. I do so by requiring in express, and then create a new instance of an express app my calling the main expression function that is exported by express.

In this simple server I am also using the nodejs the path.resolve method in the nodejs built in path module with the \_\_dirname variable that should be the dir where this static.js file is located. If I have this static.js file located at the root level of the project folder then I just need to resolve a new absolute path with the path value in the \_\_dirname variable with the public folder name to get the absolute path that I will want to use with express.static.

```js
// just a way to serve the html folder
let express = require('express'),
serveIndex = require('serve-index'),
path = require('path'),
app = express(),
PORT = process.env.PORT || process.argv[2] || 8080,
PUBLIC_HTML = path.resolve(__dirname, 'public');
 
// use serve index to nav public folder
app.use('/', serveIndex( path.resolve(PUBLIC_HTML) ))
// use express static to serve public folder assets
app.use('/', express.static( path.join(PUBLIC_HTML) ));
 
// listen on PORT
app.listen(PORT, function () {
    console.log('static server up');
    console.log('serving PUBLIC HTML folder at: ' + PUBLIC_HTML);
    console.log('on port: ' + PORT);
});
```

## 2 - vuejs Hello world

So for my first vuejs example folder in my for post folder in test\_vuejs, the name of the example folder is the same as the file name for this post which is [vuejs-getting-started](https://github.com/dustinpfister/test_vuejs/tree/master/public/forpost/vuejs-getting-started). I have got into the habit of making the example folder names consistent with the name of the post in which I am writing about it when it comes to these kinds of projects.

Form the main root folder of the repo cd to forpost, and then vuejs-getting-started.

```
$ cd forpost
$ mkdir vuejs-getting-started
```

In this section I will be going over the examples in that folder. In all of my other vuejs posts there should be examples in the corresponding folders just like with this post.

### 2.1 - The vuejs hello-world example

So here I have a single html file that contains both the html code as well as a script tag that links to the development version of vuejs that I am using so far. The link to vuejs is an absolute path to the js folder in the public folder of my test vuejs root folder. In other words this will work when the static.js script is up and running, but this example will not work if you just open it up in a web browser. 

In addition to the script tag that links to vuejs I also have a script tag with some javaScript that constitutes the hello world example. In this vuejs hello world example I have a single Vue instance that I am creating by calling the main Vue constructor. When I call the main vuejs constructor I pass at least a few options. For this example I am just starting out with the [vue el](/2019/05/06/vuejs-el/) option, and the [vue data](/2019/05/18/vuejs-data/) option.


```html
<html>
  <head>
    <title>First vue.js example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <p id="mess">{{message}}</p>
  <script>
  
  new Vue({
    el:'#mess',
    data: {
      message:'hello world'
    }
  })
  
  </script>
  </body>
</html>
```

So vuejs involves the use of a Vue constructor that is called with the new keyword just like any other constructor function in javaScript. I then use the vue el option to set the mount point of the example to a paragraph element with an id of mess. There is also the mount instance method that can be used as a way to mount a vuejs instance to html manually. 

I then used the interpolation or mustache syntax to place the message in the data object into the paragraph element in my hard coded html. However this is just one wy to go about doing a vuejs hello world example, there is also getting into using static templates, render functions, directives, and components. I will not be getting into these things in detail here as this is a getting started post after all, but I think I should at least touch base on these to say the least.

### 2.2 - A Template example

I can have hard coded html and use vuejs features in that hard coded html, however I often prefer to keep everything like that inside a static [vue template](/2019/05/07/vuejs-template/). This way I can make the vuejs instance not just consist of a data object, and data management related features, but also function as the view for that data in addition to this. I also just like to pull any and add vuejs specific html markup out of the actual hard coded html and into vuejs instance templates and render functions.

```html
<html>
  <head>
    <title>First vue.js example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
  
  new Vue({
    el:'#demo',
    template: '<div>{{ message }}</div>',
    data: {
      message:'hello world'
    }
  })
  
  </script>
  </body>
</html>
```

### 2.3 - Hello World render function style

In some situations it would seem like I have to use a [render function](/2019/05/12/vuejs-render/) rather than a static template. What is great about render functions is that I can go ahead and use the full power of javaScript to do whatever I need to do for a vue instance of component. However the strength of using render functions is also the draw back of suing them it would seem. I have to admit that they are a little harder to work with, read, and debug when I tend to go overboard with the use of render functions. So I still like to go with templates first and foremost, break things down into components, and only use render functions in components where it would seem that I have to because there is just no way to get what i want to work with a simple static template.

```html
<html>
  <head>
    <title>First vue.js example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
  new Vue({
    el:'#demo',
    render: function(createElement){
        return createElement('div', this.$data.message);
    },
    data: {
      message:'hello world'
    }
  })
  </script>
  </body>
</html>
```

### 2.4 - Directives, Methods, and Hooks

When it comes to progressing beyond hello world sooner or later you are just going to need to start to become familiar with directives. In vuejs a directive is just a way to preform some kind of action on an element in a template. Some examples would be the [v-text](/2020/10/30/vuejs-text/) directive which is just another way of setting the value of a text node of an element, the [v-on](/2019/11/14/vuejs-on/) directive which is what is used for event attachment, and the [v-bind](/2019/05/31/vuejs-bind/) directive which is what is used to set the value of an attribute.

When it comes to using the v-on directive I will often want to call a method, and when it comes to vuejs instances the [methods option](/2019/05/20/vuejs-method/) of a vuejs instance is the standard place where I will want to park these methods. Often I might want to call a method once when the data object is created, or when the vue instance is mounted to the hard coded html of a page. For these sort of things there are life cycle hooks such as the [created life cycle hook](/2019/05/24/vuejs-lifecycle-created/) that will be called after the instance is created, but before it is mounted to the page.

```html
<html>
  <head>
    <title>First vue.js example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
new Vue({
    el:'#demo',
    template: '<div>'+
        '<input '+
            'type="button" ' + 
            'v-on:click="step" ' +
            'v-bind:value="\'Step Mess Index ( \' + index + \'\/\' + strArray.length + \' )\'"> ' +
        '<p v-text="mess"></p>' +
    '</div>',
    data: function(){
        var dat = {
            index: 0,
            strArray: ['hello world', 'foo', 'bar'],
            mess: ''
        };
        return dat;
    },
    // a created life cycle hook
    created: function(){
        this.set(0);
    },
    methods: {
        // set a mesage index
        set: function(index){
            var dat = this.$data;
            dat.index = index === undefined ? dat.index : index;
            dat.mess = dat.strArray[dat.index];
        },
        // step the mesage index
        step: function(){
            var dat = this.$data;
            dat.index += 1;
            dat.index %= dat.strArray.length;
            this.set(dat.index);
        }
    }
});
  </script>
  </body>
</html>
```

### 2.5 - Components

One thing that I wish I got started with right away with when starting out with vuejs is components design. As a project grows sooner or later breaking things down into smaller pieces is just what needs to happen. In vuejs there are a few ways to go about helping to break things down such as with mixins, and the Vue.extend method that can be used to create custom cut main vuejs instances. However the central way to go about breaking a vuejs project down would be to start creating a [component or two](/2019/05/16/vuejs-component/).

```html
<html>
  <head>
    <title>First vue.js example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
 
Vue.component('hello', {
    props: ['color'],
    template: '<div><span v-bind:style="setStyle()"><slot></slot></span><br></div>',
    methods: {
        setStyle: function(){
            var color = this.$props.color;
            if(color){
                return 'color:' + color + ';';
            }
            return 'color:cyan;'
        }
    }
});
 
new Vue({
    el:'#demo',
    template: '<div>'+
        '<hello color="red">{{ mess }}</hello>' +
        '<hello color="green">{{ mess }}</hello>' +
        '<hello color="blue">{{ mess }}</hello>' +
    '</div>',
    data: function(){
        var dat = {
            mess: 'Hello World'
        };
        return dat;
    }
});
  </script>
  </body>
</html>
```

## 3 - Conclusion

That is it for getting started with vuejs, for now there is checking out the [main post on vuejs](/2021/02/05/vuejs/) that I aim to turn into a central post on the subject of vuejs. However I think the best way to learn vuejs, or just about anything really, is to just jump into creating some actual project of one kind or another and learn as you go. Maybe a good getting started point for some actual projects is one of the many [vuejs examples](/2021/02/04/vuejs-example/) that I have made thus far. These examples range from the typical todo list app, to idle games, and image editing programs.
