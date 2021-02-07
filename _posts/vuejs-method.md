---
title: vue method event handers
date: 2019-05-20 09:20:00
tags: [vuejs]
layout: post
categories: vuejs
id: 454
updated: 2021-02-07 15:44:48
version: 1.18
---

In vuejs there is the [vue methods](https://v1.vuejs.org/guide/events.html) option of a vue class constructor that can be used to define event handers for a vuejs project, but they can also be generak methods that can be used within the vue instance. It is aslo possible to share a set of methods accrosss more than one vue instance by way of the mixin option of vue instances. In additin it is also possible to make a set of methods global by making use of the Vue.mixin static method.

In native client side javaScript events can be attached to DOM elements with [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), or some similar method. These event handlers are a way to define what needs to happen when a user clicks on something with a mouse, or preforms one of many other such actions. There are also a number of events that have to do with something that is not a user action such as the on load event. When it comes to working out a vuejs project though I end up having a lot of these kinds of methods as part of the methods object of a main vue instance, or a component.

However the methods in the methods option do not have to just be event handlers, the methods can be used in other methods, as well as in other functions such as life cycle hooks. In vuejs the methods option is one of many options that can be used to define what a Vue call instance of constructor is, keeping everything neat, tidy, and well structured. So in this post I will be going over some quick examples of using the vue methods option.

<!-- more -->

## 1 - vue method option basic examples

One of the major use case examples of the method option is to have a place to park event handers for use in a template. However there are a number of other places to which one of these methods can be used also. In this section I will be going over a few quick examples of the methods option that have to do with just a single vue instance.

### 1.1 - Using The v-on directive to use a method as an event handler

This basic example for the vue methods option is just a single clicker method that is fried when an input element in a template is clicked. So this is an example of using the methods option as a way to define the event handers for the one or more elements in a template of the vue instance which of some major use case for the methods option. The v-on:event directive must be used as a way to attach a method in the vue methods option object as an event hander when using a static template.

```html
<html>
  <head>
    <title>vue methods example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-methods"></div>
  <script>
new Vue({
    el: '#demo-methods',
    template: '<input v-on:click="clicker" type="button" v-bind:value="\'click count: \'+i" >',
    data: {
        i: 0
    },
    methods: {
        clicker: function () {
            this.i += 1;
        }
    }
});
  </script>
  </body>
</html>
```

### 1.2 - Using methods as helpers for other methods.

Another use case example of the methods option is to take something that I might be doing that is a little involved and start breaking it now into smaller find grain helper functions. These helper functions can then be called within other methods, or in many of the other functions for the various options for a vuejs instance.

```html
<html>
  <head>
    <title>vue methods example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
new Vue({
    el: '#demo',
    template: '<div>'+
        '<p v-bind:style="getColorStyle(1)">Red</p>' +
        '<p v-bind:style="getColorStyle(0,1)">Lime</p>' +
        '<p v-bind:style="getColorStyle(0,0,1)">Blue</p>' +
    '</div>',
    data: {
        i: 0
    },
    methods: {
        // return a value in the range of 0 to 255
        // based on a value per value in the range of [0, 1],
        // and where a value of undefined will default to 0
        toColorValue: function(per){
           per = per === undefined ? 0 : per;
           return Math.round(per * 255);
        },
        // return a CSS string that will set color with the given
        // percent values for red, green, blue, and alpha
        getColorStyle: function(rPer, gPer, bPer, aPer){
            aPer = aPer === undefined ? 1 : aPer;
            // using toColorValue method in this getColorStyle method
            return 'color:rgba(' + this.toColorValue(rPer) + 
                ',' + this.toColorValue(gPer) + 
                ',' + this.toColorValue(bPer) + 
                ',' + aPer.toFixed(2) + ');'
        }
    }
});
  </script>
  </body>
</html>
```

## 2 - vue method key mods

When it comes to using a method in a template there are a number of modifers for the v-on directive that is often what is used to call a method in a template. For example when I want to have an on click event work for just the right mouse button rather than then left I could do is when working out the logic of the event handler, or I could use the right modifer with the click event when using v-on. In this section I will be going over a few quick examples of these modifiers.

### 2.1 - keycode v-on modifier

When using the v-on:event directive there is an additional modifier that can be used to set the key code that the event will fire for when using keyboard events. For example say that I want to call a submit method when a keyup event fires for a text input method, but only for the enter key wich has a keycode of 13. There are a number of ways to go about doing this, but one way would be to use a key modifier when using the v-on directive.

```js
new Vue({
    el: '#demo-methods',
    template: '<div>' +
    '<input v-on:keyup.13="submit" v-on:change="change" type="text" v-bind:value="name" >' +
    '<input type="button" v-on:click="submit" value="submit">' +
    '<ul><li> name: {{ name }}</li><li>mess: {{ mess}}</li></ul>' +
    '</div>',
    data: {
        name: 'Dustin',
        mess: ''
    },
    methods: {
        change: function (e) {
            this.$data.name = e.target.value;
        },
        submit: function (e) {
            this.$data.mess = 'Hello ' + this.$data.name;
        }
    }
});
```

### 2.2 - Left and right mouse buttons

When using the click event with the v-on directive I can use the left and right modifers to use differnt methods for the right and let button or call the same method in diferent ways. When using a right click on a web page there is often a default menu that will pop up on desktops, so I can also use the prevent modifer as a way to prevent this kind of browser default action.

```js
// Using Pointer Object utils as a mixin
new Vue({
    el: '#demo-methods',
    template: '<div>' +
        '<canvas class="myCanvas" '+
            'v-on:click.right.prevent="clickRight" '+
            'v-on:click.left.prevent="clickLeft" '+
            'width="320" height="240"></canvas>' +
    '</div>',
    data: function(){
       return {
           x: 0,
           y: 0,
           menu: 'none'
       };
    },
    mounted: function(){
        this.draw();
    },
    methods: {
        draw: function(){
            var canvas = this.$el.querySelector('.myCanvas'),
            ctx = canvas.getContext('2d');
            ctx.fillStyle = 'black';
            ctx.fillRect(0,0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.fillText(this.$data.x + ', ' + this.$data.y, 10, 20);
            ctx.fillText(this.$data.menu, 10, 40);
        },
        click: function(e){
            var pos = this.getELPos(e),
            dat = this.$data;
            dat.x = pos.x;
            dat.y = pos.y;
        },
        clickLeft: function(e){
            this.click(e);
            this.menu = 'left';
            this.draw();
        },
        clickRight: function(e){
            this.click(e);
            this.menu = 'right';
            this.draw();
        },
        getWindowPos: function(evnt){
            if(evnt.changedTouches){
                var touch = evnt.changedTouches[0];
                return {
                    x: touch.clientX,
                    y: touch.clientY
                };
            }
            return {
                x: evnt.clientX,
                y: evnt.clientY
            };
        },
        getElementRelative: function(el, pos){
            var bx = el.getBoundingClientRect();
            return {
                x: pos.x - bx.left,
                y: pos.y - bx.top
            };
        },
        getELPos: function(evnt){
            var pos = this.getWindowPos(evnt);
            return this.getElementRelative(evnt.target, pos);
        }
    }
});
```

## 3 - Mixins and methods

I can go to town adding all kinds of methods to the method option of a single instance, but when it comes to working on a real project there is going to be a need to have a way to pull some methods out of the methods option of a single instance and share those methods accross many instances of a Vue class. To do this I will want to make use of the mixin option of the vuejs constructor, or make methods global for everything in the page by passing a collection of methods to the Vue.mixin static method.

```html
<html>
  <head>
    <title>vue methods example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-methods"></div>
  <script>
 
// Pointer Object utils
var utils_pointer_pos = {
    methods: {
        // get a window relative position object
        // from the given touch or mouse event
        getWindowPos: function(evnt){
            if(evnt.changedTouches){
                var touch = evnt.changedTouches[0];
                return {
                    x: touch.clientX,
                    y: touch.clientY
                };
            }
            return {
                x: evnt.clientX,
                y: evnt.clientY
            };
        },
        // get an element relative position for the given
        // element, and window relative position object
        getElementRelative: function(el, pos){
            var bx = el.getBoundingClientRect();
            return {
                x: pos.x - bx.left,
                y: pos.y - bx.top
            };
        },
        // get an element relative pos
        getELPos: function(evnt){
            var pos = this.getWindowPos(evnt);
            return this.getElementRelative(evnt.target, pos);
        }
    }
};
 
// Using Pointer Object utils as a mixin
new Vue({
    el: '#demo-methods',
    mixins: [utils_pointer_pos],
    template: '<div>' +
        '<canvas class="myCanvas" v-on:mouseup="canvasClick" width="320" height="240"></canvas>' +
    '</div>',
    data: function(){
       return {
           x: 0,
           y: 0
       };
    },
    mounted: function(){
        this.draw();
    },
    methods: {
        draw: function(){
            var canvas = this.$el.querySelector('.myCanvas'),
            ctx = canvas.getContext('2d');
            ctx.fillStyle = 'black';
            ctx.fillRect(0,0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.fillText(this.$data.x + ', ' + this.$data.y, 10, 20);
        },
        canvasClick: function(e){
            var pos = this.getELPos(e),
            dat = this.$data;
            dat.x = pos.x;
            dat.y = pos.y;
            this.draw();
        }
    }
});
  </script>
  </body>
</html>
```

## 4 - Conclusion

The method option of a vue instance is how I can go about adding event handlers, and helper methods to a vue instance. I can also use the mixin option or the Vue.mixin static method as a way to have sets of methods that I can use accross more than one or even all vue insatnces in a single pager app that I am making with vuejs.

