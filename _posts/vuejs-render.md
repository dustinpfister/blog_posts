---
title: vue render method for client side rendering
date: 2019-05-12 16:40:00
tags: [vuejs]
layout: post
categories: vuejs
id: 442
updated: 2021-02-08 18:01:12
version: 1.15
---

So for the most part vue templates work find for most projects, but it is not always the best solution when it comes to taking full advantage of javaScript to render DOM elements. If a template will not cut it than an alternative would be a [vue render](https://vuejs.org/v2/api/#render) method. 

When working out a render method a createElement method can be used to create virtual dom elements that can then be used to render a view rather that of a static template. This method is a little clunky to work with compared to static templates, but it will work a whole world better then static templates when it comes to doing something a little advanced like generating node names for components. There is a bit to get solid when it comes to the options of these methods, but once all that is understood they work great for those situstions in which a render function is just the only way to get the job done.

Render functions should not be used as a drop in replacement for templates at every twitch and turn, at least I have found that is not a good idea. The draw back with render functions as that they are a little more intense to work with then static templates when it comes to readabilty of code. So if I am making a simple compoents that just displayes some data that is given to it by way of a props option then chances are I will stick with just a plain template still.

<!-- more -->

## 1 - Vue render basics

A basic example of using a vue render method will involve using it as an option when making a new instance of Vue. It just needs to be a function with a single argument, which is the createElement method that can be used to create instances of vNode. What the method returns is then is one or more of these virtual node elements than can then be used by vuejs to create an actual DOM tree when updating the view.

So a very basic example of a vue render method could be just a single vNode that is a paragraph element with the inner text of 'hello world'

```html
<html>
  <head>
    <title>vue render example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="bar">
  </div>
  <script>
  
  var vm = new Vue({
    el:'#bar',
    render : function(createElement){
       return createElement('p', 'Hello World');
    }
  });
  
  
  </script>
  </body>
</html>
```

The first argument can be just a string, and object or a function that resolves to a tag name of one sort or another. The second argument can just be a string like above, or it can be an array of additional vNodes made with the createElement method. In addition it can also be an options object as well that can be used as a way to set all kinds of attributes for the element, and then a third argument can be used to set a text node, or add additional children in the vue render method.


## 2 - Vue render list example

So for this example I made an unordered list element with many inner list elements in it. The createElement method must be used to create an vNode, or an array of vNodes. So nested elements can be made by just simply making an array of vNodes with the createElement method.

```js
new Vue(
    {
        el: '#bar',
        render: function (createElement){
            var i = 0,
            len = 10,
            children = [];
            // some javaScript
            figForI = function (i){
                return (i - len / 2) / len * Math.pow(2, i);
            };
            // create vNodes
            while (i < len){
                children.push(createElement('li', i + ') : ' + figForI(i)));
                i += 1;
            }
            // return ui with vNodes
            return createElement('ul', children);
        }
    }
);

```

## 3 - Adding CSS to a vNode created with the createElement method in vue render

To add CSS to an element that is made with the create element method the class and style properties of an options object that can be passed as a second argument can be used. When it comes to the class object in this options object each key name is the class name, and then a boolean can be used to set that css class to the element.

There is also of course the style attribute as well that can be used to set in-line style as well. 

```js
new Vue({
    el: '#demo-render',
    render: function (createElement) {
        return createElement(
            // tag name
            'p',
            // options
            {
                class: {
                    theClassName: true
                },
                style: {
                    color: 'red'
                }
            },
            // text node
            'red text');
    }
});
```

## 4 - adding events when using the vue render option

So to add one or more event handers for elements created with the createElement method in a vue render an object should be given as the second argument and this object can contain an on property that is also an object. The object assigned to the on property can then be used to attach events to the element where each object key is the type of event, and the value is the method that is to fire for that event.

```js
new Vue({
    el: '#demo-render',
    data: {
        frame: 0,
        maxFrame: 10
    },
    render: function (createElement) {
        return createElement('input', {
            attrs: {
                type: 'button',
                value: 'step ' + this.$data.frame + '/' + this.$data.maxFrame
            },
            on: {
                click: this.step
            }
        });
    },
    methods: {
        step: function () {
            this.$data.frame += 1;
            this.$data.frame %= this.$data.maxFrame;
        }
    }
});
```