---
title: Node.js powered site generator Harp.
date: 2017-03-29 9:26:00
tags: [js,node.js]
layout: post
categories: node.js
id: 9
updated: 2019-11-18 08:11:05
version: 1.5
---

In the npm ecosystem [Harp.js](http://harpjs.com/) is a very minimalistic static site sever, but it can also be used to generate a static site in addition to this. So far I have been using [hexo](https://hexo.io) as my static site generator, but as of late I have been trying out some others that exist in the [node.js](https://nodejs.org/en/) world.

I have also made several attempts at making my own static site generator which at times seems like he best option if I really get into websites rather than anything else that one might develop with javaScript. So far I still do not have anything together that I would call production ready with this.

As of the last time I updated this there is still some activity on the [harp.js git hub](https://github.com/sintaxi/harp) when it comes to support. Given that this is a very minimal static site generator, as long as the project is fairly solid, then a great deal of support might not be needed. One of the benefits of keeping thins simple and streamlined.

<!-- more -->

## 1 - Getting started with harp

Installing harp is as simple as with any other npm package, and like most static site generators you will want to install it as a global script like so.

```
$ npm install -g harp
```

Once installed to start a new project, and start the static server just do this.

```
$ harp init newProject
$ harp server newProject
```

You should get a message saying that the site is being hosted at localhost:9000, just open that up in the browser, and you will see what you start with.

## 2 - Starting theme

Harps out of the box theme is pretty minimal. In fact it is just a single index.jade file. I can't say this is a deal breaker for me though, with hexo I am currently using just a hacked over version of the default theme. Themes are not the most important aspect of a site, that would be content, still I am all wondering how I will be dealing with pagination, will I have to write my own thing for that?

## 3 - Adding content

Adding new content is as simple as just creating a new *.jade, or in my case a *.ejs file. It makes use coffee script, and Harp also supports both Sass, and Less as well as Stylus for style. 

So I just did a little hello world by saving a page1.ejs file, that was really just a single html element in the root name space. I am not sure how much time I care to give this one just yet, even though I kind of like it a little.

```
<h1>yes this is dog</h1>
```

While running as a server any changes I make will take effect right away with having to regenerate each time. The page showed up right away when I pointed my browser to localhost:9000/page1

## 4 - Generating a static site

calling generate like this

```
$ harp generate
```

will result in an html,css structure that can be severed up by whatever means, which is of course the basic feature that I expect from any static site generator. I noticed that the style was lost for some reason though, I was able to see a *.css file in the public name space, so maybe it is just a simple fix on my part.

## 5 - My thoughts on harp

If I where to take the time to make a static site generator I might very well come up with something like harp. My thinking is that I would make something pretty minimal, and stream line. When it comes to my site, all that really matters is that I can server up simple plain out static content.

Still I am pretty paschal to hexo still for the moment, it's popular, and has more features for what they are worth. Still a minimal site generator like harp comes to mind when working on a very simple site where all the client cares about is the content and thats it.

## 6 - Conclusion

Be sure to check out my many other [posts on node.js and npm packages](/categories/node-js/). Also it would seem harp has a [twitter](https://twitter.com/harpwebserver) that might be worth checking out.