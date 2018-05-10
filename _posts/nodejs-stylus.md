---
title: Generate stylus to css using the npm package stylus
date: 2018-01-09 13:51:00
tags: [js,node.js]
layout: post
categories: node.js
id: 129
updated: 2018-01-09 15:28:54
version: 1.4
---

Still hand coding css? So am I, so I thought I would try one of the many options out there when it comes to some kind of superset of css. In [hexo](https://hexo.io/) one of the dependences that is used is the npm package [stylus](https://www.npmjs.com/package/stylus), which is both a language, and a software package used to parse stylus into plain old css. 

<!-- more -->

The documentation [on the readme for stylus](https://github.com/stylus/stylus/blob/dev/Readme.md) instructs me to install the package globally which is fine if I aim to use it as a stand alone CLI tool. However in this post I will be covering how to go about using it in a project grabbing at it with require, rather than making calls with [child-process](https://nodejs.org/api/child_process.html).

## The Stylus language

If you are looking for a decent resource on the stylus language, rather than how to get up and running with the npm package there is the [stylus-lang](http://stylus-lang.com/) site that seems to do a decent job of that. I will only be covering the basics of the language here, so be sure to check out the site to get a more in depth understanding of the language.

### Start with plain old css

When it comes to plain old \*.css files I might have many instances of css properties, and values enclosed inside curly brackets that are set to one or more selectors such as a tag selector like this:

```
body {
    margin : 0px;
    padding : 0px;
    color: #ffffff;
    background: #000000;
}
```

To convert my \*.css file to a \*.styl file I just need to save my style.css to something like style.styl. Then just loose the curly brackets, and the semicolons.

```
body
    margin : 0px
    padding : 0px
    color: #ffffff
    background: #000000
```

If you know css fairly well before hand, thats are there is to know in order to get started with stylus. There is the question of more advanced features, but there are other resources that get into the language deeply, and the idea I had in mind with this post is working with the npm package to get parsing to work.

## Making the test folder

Whenever I test out a new npm package I create a new folder, and initialize a new npm package, and also make it a git folder. I then install the package I want to test out, in this case stylus, and I may also install some more projects as well to help with making one or more demos to write about in a blog post like this.

```
$ mkdir test_stylus
$ cs test_stylus
$ npm init
$ npm install stylus --save
```

In this project I am also using fs-extra which is a great project for working with files. If you want to use something else great, I just like using sometime more than just the built in file system module in node.

```
$ npm install fs-extra --save
```

I will also [publish this project to my github account](https://github.com/dustinpfister/test_stylus) if interested.

## Basic example of using stylus in node.js

Once stylus is in the node_modules folder I can pull it in with require as usual. This will give me an object with many methods, the one that I am most interested in here is the render method, which can be used to parse stylus into css.

So in my project I made a basic.js file at the root space that looks like this:

```js
let stylus = require('stylus');
 
console.log(stylus.render('body \n    padding: 5px'));
```

When I call it with node in the console, it gives me plain old css.

```
$ node basic
body {
  padding: 5px;
}
```

## Processing a *.styl file

Although I can render hard coded stylus into css this way, it most real world use case examples this project will be used with one or more external files that contain stylus that need to be parsed into css. The easiest way to do this might be to just install the script globally, and use stylus as a CLI tool. However if you are using stylus as a dependency of some kind of complex project, you might not want to make use of it by making child-process calls. If so no problem, I had no trouble starting to work with it by pulling it in with require as well.

### The stylus file extension

The stylus file extension is often in the form of \*.styl, so just remember the word style less the e and you should be good.

In my test project I have just one test.styl file in a folder called styl, that I aim to process into a css folder.

### Install stylus globally

If you want to give it a go, the go for it.

```
$ npm install stylus -g
```

You can then watch an process a style file [as describe in the readme](https://github.com/stylus/stylus/blob/dev/Readme.md).

```
$ stylus -w style.styl -o style.css
```

The quick and simple way to get it done if need be. Taking a look at the bin folder in the project, it looks like they are just using the built in node.js module to read styl files, and write out css. So when it comes to using stylus as a dependency, the same can be done in a complex project as well, in place of using exec, or spawn.

### Using fs-extra to read an extremal \*.styl file, and process to css with the stylus.render method.

If you have not heard of fs-extra it might be a good idea to [check it out](https://www.npmjs.com/package/fs-extra). It is a great extension to the built in node.js file system module that adds a few more methods that should be there, alone with making it so all the built in methods return promises. I would get into detail about it here, as I have [wrote a post on it](/2018/01/08/nodejs-fs-extra/).

In my test project I created a file called process.js that makes use of fs-extra, and the stylus render method to process \*.styl files into \*.css files.

```js
let stylus = require('stylus'),
fs = require('fs-extra'),
path = require('path'),
 
source = 'styl',
target = 'css';
 
// write the given css in the target folder
let writeCSS = function (css, fn) {
 
    let uri = path.join(target, fn);
 
    return fs.writeFile(uri, css, 'utf-8');
 
};
 
// process the given styl file
let processFile = function (file) {
 
    let uri = path.join(source, file);
 
    return fs.readFile(uri, 'utf-8').then(function (data) {
 
        // here I am using stylus in the same manor as in the
        // basic example, just feeding it data from a external
        // file with the stylus file extension \*.styl rather
        // than a hard coded string
        let css = stylus.render(data);
        let fn = file.replace(/.styl$/, '.css');
 
        return writeCSS(css, fn);
 
    }).then(function () {
 
        console.log('sucess');
 
    }).catch (function (e) {
 
        console.log(e);
 
    });
 
};
 
// ensure the styl folder is there
fs.ensureDir(source).then(function () {
 
    // ensure the css folder is there
    return fs.ensureDir(target);
 
}).then(function () {
 
    // read the source path
    return fs.readdir(source);
 
}).then(function (files) {
 
    // call for each
    files.forEach(processFile);
 
}).catch (function (e) {
 
    console.log(e);
 
});
```

If you do not what to use fs-extra thats fine, you just need to find a way to get the text, and feed it to stylus.render as that is the actual parser method in the project.

## conclusion

I have just started with stylus, and I think I like it over plain old hand coding of css. Not that there is anything wrong with that, in fact I might keep doing that for some projects. However I am getting more interested in making themes for hexo, and stylus seems to be used as the language for styles when making themes.

I have not gotten into more advanced features available in stylus, it I get aground to it I might update this post some day if it gets some attention.

Happy coding.