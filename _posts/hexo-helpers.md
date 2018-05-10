---
title: Using hexo helpers to inject html in a theme
date: 2018-01-05 08:11:00
tags: [hexo,js,node.js,ejs]
layout: post
categories: hexo
id: 127
updated: 2018-01-07 09:37:36
version: 1.3
---

Hexo [helpers](https://hexo.io/api/helper.html) are one of many extensions in [hexo](https://hexo.io/) that allow for the extension of functionality in hexo. There are extensions for [generating files](/2018/01/04/hexo-generators/), adding html from markdown files with [tags](/2017/02/04/hexo-tags/), and a wide range of other options when [making a script or plug-in for hexo](/2018/01/03/hexo-plugins/). However in this post I will be focusing on useing helpers that are used [when making a theme](/2017/04/17/hexo-theme-start/) for hexo.

<!-- more -->

## What to know before hand.

This is a post on helper extensions that are used to extend the functionality of the node.js powered static site generator known as [hexo](https://hexo.io/). This post does not cover the basics of html, css and javaScript. It is also not a getting started post on hexo. I assume that you know at least a thing or two about hexo, and one of the template options used to make themes, such as [ejs](/2017/12/07/nodejs-ejs-javascript-templates/).

If you do not know how to make scripts, and plug-ins for hexo, you might want to check out my [post on that](/2018/01/03/hexo-plugins/) before hand.

## What helpers do

Helpers are just simply methods that can be used when making a theme for hexo that do things like building html, and formating values. There are many built in helpers, and it is also possible to make your own helpers as part of, or the entirety of a hexo script or plug-in.

## Hexo Built in helpers

Hexo comes with some built in helpers, that can be used for common tasks like injecting a script tag, and formatting dates. If you ever look at the source code of a hexo template you might see something like this:

```
<%- js('file.js') %>
```

That is an example of a helper, the js helper is a shorthand for writing this:

```
<script src="files.js"></script>
```

There are a great deal more helpers that are built in for common tasks, for the full list you might want to check out the [hexo docs](https://hexo.io/docs/helpers.html) on helpers. There are a lot of them, so make sure it is there before taking the time to make one.

## Making a helper

When making a [script or plug-in for hexo](/2018/01/03/hexo-plugins/) I just need to start with something like this in the body of my javaScript.

```js
hexo.extend.helper.register('my_helper', function () {
 
    return '<p>My Helper<\/p>';
 
});
```

Now when making my theme I can use my helper just like any of the built in ones.

```
<%- my_helper() %>
```

## Passing arguments to a helper

Helpers are often used for injecting html, but they can also be used for formating values that can be passed to it as well. Just add some arguments to the function that is passed to helper.register

```js
hexo.extend.helper.register('foo_bar', function (n) {
 
    return '<p>The anwser is: ' + n + '<\/p>';
 
});
```

Then just give the value that you want when making the theme.

```
<%- foo_bar(42) %>
```

## What about helpers that need to do something asynchronous?

It seems that this can not be done with helpers by themselves. However I can use a [hexo generator extension](/2018/01/04/hexo-generators/) to do something async, and then pass the data to my template via an ejs object that can then be used my a helper. So far it seems like this is the only way to get something like that done.

## Use helpers to abstract important html into the plugin.

When making my *.ejs files for a theme I end up making html that is very specific to a certain plug-in. As I develop the plug-in, I find myself also needing to make a theme right along with it. If a client system I am making for the plugin changes, so to does the theme.

As such something like this in one or more templates:

```html
<script src="/js/pluginName/client_system.js"></script>
```

Might end up changing to something like this:

```html
<script src="/pluginName/js/lib/some_api.js"><script>
<script src="/pluginName/js/src/another_file.js"><script>
<script src="/pluginName/js/src/yet_another_file.js"><script>
<script src="/pluginName/js/client_system.js"></script>
```

Say I end up making some 50 themes, whenever I make a change like this I have to go threw and update all of my templates as well. However if I define this as a helper in my plug-in:

```js
hexo.extend.helper.register('pluginName_getClientSystem', function () {
 
    return '<script src=\"/pluginName/js/lib/some_api.js\"><script>' +
    '<script src=\"/pluginName/js/src/another_file.js\"><script>' +
    '<script src=\"/pluginName/js/src/yet_another_file.js\"><script>' +
    '<script src=\"/pluginName/js/client_system.js\"></script>';
 
});
```

Then I can always just have this in the body of my templates:

```html
<%- pluginName_getClientSystem()  %>
```

## Conclusion

Helpers are an important extension for making a hexo plug-in. However do not attempt to do everything with helpers, [generators](https://hexo.io/api/generator.html) are there for a reason, as helpers do have there limitations. Be sure to check out my other posts on [hexo](/categories/hexo/), it's a great static site generator.