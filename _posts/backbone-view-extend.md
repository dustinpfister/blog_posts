---
title: A Backbone.View.extend example
date: 2017-11-04 13:31:00
tags: [js,backbone]
layout: post
categories: backbone
id: 85
updated: 2017-11-04 19:50:10
version: 1.1
---

When making a backbone project the first and foremost thing to focus on in my view is the Model of a project. However once I have a Model that is in good shape there is a desire to make a front end in order to view some of that data in the state of that Model, and of course interact with that Model. That is to make a View to view and work with a Model.

To make a view in backbone it will involve using the extend method of Backbone.View, as such this post will give a quick example of that to get things started.

<!-- more -->

## Having a Model to begin with

It is advised to learn a thing or two about Models, before progressing on to Views. I have [wrote a post on Models](/2017/11/02/backbone-model/) in backbone that should help you get up to speed with that before hand if you have not done so.

## Backbone view Hello World

For a simple hello World of Backbone.View.extend I put together a simple view that works with an unordered list element. So I will want the following html. Typically I will want some kind of Model first, but for this demo I will just work with getting some text from li elements that are clicked.

```html
<div id="container">
 
    <ul>
       <li>item 1</li>
       <li>item 2</li>
       <li>item 3</li>
    </ul>
    <div id="disp"></div>
 
</div>
```

A View constructor can be created by calling Backbone.View.extend, and passing it an Object containing properties, and methods that will be used in the view.

```js
var View = Backbone.View.extend(
 
    // I create my view by passing an Object
    // to Backbone.View.extend
    {
 
        // el can be used to set the container element
        el : $('#container'),
 
        // set an event
        events : {
 
            // for every click on an li element call onListClick
            'click li' : 'onListClick'
 
        },
 
        // the method to call when an li element is clicked
        onListClick : function (e) {
 
            // call render method of the view, and pass the
            // inner text of the li element that was clicked
            this.render(e.target.innerText);
 
        },
 
        // I can set a template like this
        template : _.template('<p>selected: <%- text %></p>'),
 
        // an initialize method will be called once
        // and instance of the View is created
        initialize : function () {
 
            // render for the first time
            this.render();
 
        },
 
        render : function (text) {
 
            text = text || 'none';
 
            // render the text of the li that was clicked
            this.$el.find('#disp').html(this.template({
                    text : text
                }));
 
        }
 
    }
 
);

// creating an instance of the View
var app = new View();
```
