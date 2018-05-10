---
title: Getting started with Hexo Plug-ins, and scripts
date: 2018-01-03 22:11:00
tags: [hexo,js,node.js,ejs]
layout: post
categories: hexo
id: 125
updated: 2018-01-06 12:11:35
version: 1.7
---

These days I am interested in ether making my own static site generator from the ground up, or just making plug-ins for one that all ready exists such as [hexo](https://hexo.io/). I might work on making one just for the sake of having a long term pet project to work on, but for now I am leaning more in the direction of making plug-ins for one that all ready exists before hand, and I might as well make it the one that I am using to begin with.

<!-- more -->

## Scripts and plug-ins

There are two general ways of extending hexos functionality, one way is to just make a script folder in the root name space of the hexo project, and place a \*.js file in there. The other way is to make a completely separate project folder and develop something that I will go in the node_modules folder of the hexo project.

## Scripts

It might be best to start with scripts first, and then progress into the more professional way of extending hexo functionality by way of plug-ins. The reason why may be because they are easier to make as it just involves placing a \*.js file in a scripts folder that will be placed in the root name space of the hexo project.

## Plug-ins

It might be preferred to have what it is that is being made placed in it's own folder, to be added to a hexo project by some means. That is by way of an npm install command, or a copy and past action of one kind or another into the node_modules folder of a hexo project. If it is something very completed this might be the preferred coarse of action to take.

## Lets start with a simple script

Before getting into plug-ins lets start with a simple script that will be placed in the main scripts folder. Create a folder called scripts in the root name space of the hexo project if it is not there before hand, and save a new \*.js file in that folder. The js file can be called anything as long as it ends with the *.js file extension.

For example I saved this one as demo-gen-basic.js in the scripts folder.

```js
hexo.extend.generator.register('gen-basic', function (locals) {
 
    return {
 
        path: 'test.md',
        data: 'this is only a test.'
 
    };
 
});
```

When I generate the site this script will now create a test.md file in the public folder of this site. This is a basic example of what a hexo generator will do, create one or more files. In most cases a generator will be used to create a collection of \*.html files, but it can also be used to automate the process of making other files [such as sitemaps](/2017/05/02/hexo-sitemap-automation/) as well.

## The Extensions.

What does the plug-in need to do? Do you want to have something that can be using when writing markdown files that will inject html that way? If So you want a [tag](https://hexo.io/api/tag.html). Do you want to make a function that can be called from an \*.ejs template to generate some html in the theme? Then a [helper](https://hexo.io/api/helper.html) is what is called for. Do you want to make a whole new complete site structure, containing many \*.html files in a certain path in the public html folder? Then you will want to look into [generators](https://hexo.io/api/generator.html). 

The [full list of hexo extensions](https://hexo.io/api/) can be found on the hexo site api documentation. I will be covering the ones I use the most in my projects here:

### Generators

Read my [full post on hexo generators](/2018/01/04/hexo-generators/)

Generators are by far one of the most useful, and important extensions in hexo. This is what you want to use if the aim of the plugin, in part, or whole has to do with generating a section of the sites structurer.

A generator can just simple create a file at a specific path like this:

```js
hexo.extend.generator.register('gen-basic', function (locals) {
 
    return {
 
        path: 'test.md',
        data: 'this is only a test.'
 
    };
 
});
```

Or it can be used with a \*.ejs file that is to be used in the theme. In which case it might also be desired to pass some data to that will be used in the \*ejs template as well

```js
// an example of an object that is returned by a generator
return {
    path: '/section/index.html',
    data: _.merge({}, locals, {
        data: {
            foo: 'bar'
        }
    }),
    layout: ['my_layout']
}
```

In the above example this is the object of a generator that is making an index.html file at /source/index.html using a \*.ejs in the layouts folder of my theme called my_layout.ejs, and passing a variable called 'foo' with a value of 'bar' to it that can then be used in my template like this:

```
<%= data.foo %>
```

The object returned can also be an array of objects like this, which is how one would go about making a complex structure of *.html files.

### Helpers

read my [full post on hexo helpers](/2018/01/05/hexo-helpers/)

Helpers are methods that can be called when working with a template. It can be used to format some data from an ejs object, or inject some html.

### Tags

read my [full post on hexo tags](/2017/02/04/hexo-tags/)

This allows for the addition of methods that can be used when writing markdown file for the sites blog posts.

## Start a simple hexo plug-in

I will want to start by making a new folder in the node_modules folder of the hexo project called hexo-first. The plugin should begin with 'hexo-' or else hexo will ignore the module. In there I will want at least a package.json file, and an index.js file that will contain the code that will extend hexo with one of the extensions mentioned above. In this example I will be making a tag.


```js
hexo.extend.tag.register('first_plugin', function(){
 
    return '<p>This is my first hexo plugin.</p>';
 
});
```

After making a npm init I end up with a package.json like this:

```js
{
  "name": "hexo-first",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Dustin Pfister",
  "license": "GPL-3.0"
}
```

The last thing to do will be to add the plug-in to the main package.json of the hexo project.

```js
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "hexo": {
    "version": "3.4.4"
  },
  "dependencies": {
    "hexo": "^3.2.0",
    "hexo-generator-archive": "^0.1.4",
    "hexo-generator-category": "^0.1.3",
    "hexo-generator-index": "^0.2.0",
    "hexo-generator-tag": "^0.2.0",
    "hexo-renderer-ejs": "^0.3.0",
    "hexo-renderer-stylus": "^0.3.1",
    "hexo-renderer-marked": "^0.3.0",
    "hexo-server": "^0.2.0",
    "hexo-first": "^0.0.0"
  }
}
```

Now in my markdown files I can call my tag like this:

```
{% first_plugin %}
```

Which will cause the text 'This is my first hexo plug-in.' to appear in the content of the post. This is just a simple example, but for something else I might want to publish it to npm.

## Publishing to github

I always keep my plugins published in my personal github account.

## Publishing a hexo plug-in to npmjs

If the plugin is something that is intended to be used across many hexo projects it might be a good idea to publish the plugin to npmjs. Once the plug-in is published to npmjs a new hexo project can be set up with the plugin with the usual npm install packageName --save command.

```
$ hexo init
$ npm install hexo-plug-in-name --save
```

## Publishing a hexo plug-in to the hexo plug-in list

As of this writing I have not published any plug-ins to the [official hexo plugin list](https://hexo.io/plugins/). If interested in doing so a pull request will have to be made, this is explained in detail in the [hexo site docs](https://hexo.io/docs/plugins.html#Publishing).

## conclusion

Hexo plug-ins are pretty great, I was thinking about making my own static site generator from the ground up, but now I think it might be better to just write a whole bunch of plug-ins for hexo. What I really want to work on are plug-ins with a static site generator, because that is where I can still see a great deal of room for originality.