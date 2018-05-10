---
title: Hexo data files for use in themes
date: 2018-01-16 14:49:00
tags: [hexo,js,node.js]
layout: post
categories: hexo
id: 132
updated: 2018-01-16 15:31:43
version: 1.2
---

In [hexo](https://hexo.io/) there is a standard way of having [data files](https://hexo.io/docs/data-files.html) that can contain data that is to be used when rendering a static website with hexo. This is useful if you are making a [script or plugin](/2018/01/03/hexo-plugins/) that will generated data that will then be displayed on one or more pages when making a theme.

<!-- more -->

## What to know before hand

This post is about the node.js powered static website generator called hexo. I will not be covering a getting started post on hexo here, and I assume you have at least some knowledge of how hexo works. I also assume that you have at least some knowledge on html, css, and javascript. In order to get started with data files in hexo you will also need a hexo project that you have started that contains a source folder, and a theme that is made with some kind of template language, I often use ejs. In addition to all of this the date files themselves will be written in json, or yaml which are also subjects of interest to research more if you do not know much about them.

## The \_data folder

The first thing to do is to make a \_data folder in the \source folder of the hexo project, inside that folder is where I will want to make my data files. For example I can make a file called test.json at /source/_data/test.json that might look like this:

```js
{
    "foo": "bar"
}
```

Once the file is there it will then be usable in my theme. The data will be accessible by way of an object that can be accessed when making a template file for a theme. The filename of the data file is important, as it will be used as a property name in that object, so do not use any chars that would not be used in a object property name.

## Using a data file in a hexo theme

Now that I have my test.json file in the proper location I can now make use of it in my theme. In any of my \*.ejs files I can use the data that is contained in the site object like this:

```
<%- site.data.test.foo %>
```

this is of course an ejs template example. If you are not familiar with ejs [check out my post on how to get started with ejs](/2017/12/07/nodejs-ejs-javascript-templates/) as a template language.

## Making a hexo helper that makes use of hexo data files

If you are not familiar with [helper extensions in hexo](https://hexo.io/api/helper.html) it would be worth it to read up on them. They are a way of abstracting plugin specific html into the script or plugin that is being made. I made a full [post on helpers](/2018/01/05/hexo-helpers/) if interested.

```js
// basic info for the given blog post
hexo.extend.helper.register('foo', function (site) {

   return '<p>' + site.data.test.foo + '<\/p>';

});
```

Now when making a theme I can just call this in my template files.

```
<%- foo() %>
```

## json or yaml can be used to make data files in hexo

Both json and a superset of json called yaml can be used to make data files as such my test.json can be made as a test.yml. I will not get into these two different languages in detail here, but yaml is a bit more powerful as it allows for more features such as comments.

## Conclusion

Hexo data files are a great hexo built in way of making use of data in a site. This is a great way of storing data that may not be contained in posts, or data that I might want to share across posts.