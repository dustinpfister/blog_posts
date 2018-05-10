---
title: Getting started with Hexo Themes
date: 2017-04-17 12:25:00
tags: [hexo,js,node.js,themes,ejs]
layout: post
categories: hexo
updated: 2017-09-30 18:37:21
id: 14
version: 1.9
---
When it comes to ruining just a blog with [hexo](https://hexo.io/), it's easy to just get rolling along out of the box with hexo.io. However there will come a time when I will want to make my own custom theme for the project to add special sections that are rendered in a special kind of way using [embedded javascript](http://www.embeddedjs.com/).

<!-- more -->

Up until recently I have been hacking over the default landscape theme that comes with hexo, and in the process learned a thing or two more about how to make hexo themes, and Embedded javaScript or ejs for short.

There is a [page on themes](https://hexo.io/docs/themes.html) at the official hexo site, but I will but together a minimal example here.

## The main hexo _config.yml file.

At the root level of the hexo working tree you will find the main _config.yml file, set the theme property to the name of the new theme that is being made in this case &#34;my-hexo-theme&#34; In most cases this might be, or at least should be the only stetting that has to be changed in order to change themes.

## The Theme folder

Start by making a new folder in the themes folder of the main hexo working tree. You can give it a name like &#34;my-hexo-theme&#34; or any name you want, but for this post I will refer to this theme as my-hexo-theme. This folder will contain all template, style, config and other source files relevant to the structure and presentation of the theme. In this post I will just be using EJS To help put together a very simple hello world style theme.

## The layout folder

The layout folder is one of serveral folders that i will be placing inside my-hexo-theme. The layout folder is where I will be placing all my *.ejs template files that will compose the structure of my-hexo-theme.

## The source folder

The source folder is where I will be placing any external assets used by the theme including style, and images. In this example I will be placing just a single css folder in the source folder that I will be linking to in my layout.ejs file. As such this css file will contain site wide classes, and styles.

here is the css I have for the theme, that I placed in a file file at source/css/main_style.css
```css
body{
 
    margin:0px;
    background:#afafaf;
 
}
 
/* header */
#header{

    position:relative;
    width : 100%;
    padding-top: 50px;
    height:150px;
 
}
 
#logo_area{
 
    position:relative;
    min-width:125px;
    min-height:100px;
    margin-left:auto;
    margin-right:auto;
    text-align:center;
 
}
 
#nav_area{
 
    min-height:50px;
    width:100%;
    text-align:center;
 
}
 
.logo_text{
 
    font-size:50px;
    line-height:100px;
 
}
 
.nav_text{
 
    font-size:20px;
    line-height:50px;
 
}
 
/* content */
#content_wrap{
 
    width:75%;
    margin-left:auto;
    margin-right:auto;
    padding:50px;
 
}
 
/* footer */
#footer{
 
    padding-left:25%;
    height:200px;
    width:75%;
    color:#5f5f5f;
 
}
 
/* pageing */
#page-nav{
 
padding:5px;
 
}
 
.page-number{
 
padding:5px;
 
}
 
.current{
 
margin-left:20px;
margin-right:20px;
 
}
 
a:link{color:#000000;}
a:visited{color:#000000;}
a:active{color:#000000;}
a:hover{color:#5a5a5a;}
```

## The _parts folder

I will want a folder in the layout folder that holds ejs partials. I will then use these parts in one or more *.ejs file templates including maybe the layout where needed.


here is the ejs for the partial that I am uisng to display all posts excerpts placed at layout/_parts/posts_excerpts.ejs

```ejs
<!-- write all posts -->
<% if(page.posts){ %>
 
    <% page.posts.each(function(post){ %>
 
        <!-- title and date -->
        <h1><a href="<%- '/'+post.path %>"><%- post.title || 'untitled post' %> </a></h1>
        <p>date: <%= post.date %></p>
 
        <!-- the content of the post -->
        <div><%- post.excerpt %></div>
 
    <% }) %>
 
    <% if (page.total > 1){ %>
 
        <nav id="page-nav">
            <%- paginator({
                prev_text: "PREV",
                next_text: "NEXT"
            }) %>
        </nav>
 
    <% } %>
 
<% }else{ %>
 
    <% console.log('no pages object for path: ' + page.path) %>
 
<% } %>
```

In time this parts folder will expand but for now I just want a simple partial that will render all the post excerpts in the page.posts array, along with pagination controls in the event that it is there.

## layout.ejs

A theme should at least have a single layout.ejs file. This is the main ejs file that will always be rendered for all pages.

```ejs
<html>
 
    <head>
 
        <title><%- page.title || config.title || "untitled" %></title>
 
        <link rel="stylesheet" href="/css/main_style.css" >
 
    </head>
 
    <body>
 
        <!-- header -->
        <div id="header">
 
            <div id="logo_area">
 
                <h1><%- config.title || "title the site "%></h1>
 
            </div>
 
        </div>
 
        <!-- content -->
        <div id="content_wrap">
 
            <%- body %>
 
        </div>
 
    </body>
 
</html>
```

The content that will be placed in where we have &#60;%- body %&#62; will changed depending on the current template (index.ejs, archive.ejs, ect).

## Templates and index.ejs

Along with the main layout.ejs there should at the very least be an index.ejs file as well. This index.ejs is a template that will be rendered in the event that no other more appropriate template is available.

```ejs
<% if(page.posts){ %>
 
    <%- partial('_parts/posts_excerpts') %>
 
<% }else{ %>
 
    <h1><%- page.title || 'untitled' %></h1>
    <%- page.content %>
 
<% } %>
```

Here I am using the partial I defined earlier to simply list all my posts excerpts


## Future concerns

In this post I have not covered all bases, thats okay concerdering that this is just a &#34;getting started&#34; post. There is much more to write about with themes, as such I might write more posts in the future about them. For now if you are new to making themes you might considered hacking over a pre-existing theme in stead of writing a new one form scratch. There are plenty of published themes [at the site](https://hexo.io/themes/), that you can start with.

Be sure to check out my other posts on [hexo](/categories/hexo/)

<!--

## The Theme's _config.yml file


-->