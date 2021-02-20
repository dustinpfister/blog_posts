---
title: Vue on directive
date: 2019-11-14 16:02:00
tags: [vuejs]
layout: post
categories: vuejs
id: 563
updated: 2021-02-20 18:42:00
version: 1.12
---

The [vue on](https://vuejs.org/v2/api/#v-on) directive is what can be used in vue templates to preform [event attachment](https://vuejs.org/v2/guide/events.html). In line JavaScript can be given, however the typical use of the vue on directive is to call a method in the methods object. There are a number of event and key modifiers that can be used to help make it so the methods that I write are more about the actual logic of what the method does rather than having additional code that helps with DOM element related quirks. So lets take a look at a few quick examples of the vue on directive in action.

<!-- more -->

## 1 - vue on basic on click example

So then I have an example of the vue on directive here where I am just using the vue el option to mount to a single div element in the hard coded html. I then worked out a simple template with just a single input element that I made as a button type. This button element then uses the vue on directive to make it so that when the button is clicked a step method is called that steps a variable in the vue data object.

I am also using the vue bind directive to bind a message variable in the data object for the value attribute of the input element. This is so that each time the button is clicked the current value of the variables that is stepped is displayed as part of the buttons value.

```html
<html>
  <head>
    <title>vue on example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <div id="demo"></div>
    <script>
new Vue({
    el:'#demo',
    template: '<div><input type="button" v-on:click="step" v-bind:value="mess" ></div>',
    data: {
        n : 0,
        mess: 'step (0)'
    },
    methods: {
        step: function(){
            var data = this.$data;
            data.n += 1;
            data.mess = 'step (' + data.n + ')';
        }
    }
});
  
    </script>
  </body>
</html>
```

This is a simple example of just making a basic example where I am just stepping a variable in the data object, a real example depends on what I want to accomplish. Sometimes that can be done with a single event and handler, other times I need a few events and also use additional directives on top of the vue on directive. SO with that being said lets look at some more examples of the vue on directive in action.

## 2 - A vue on key up, and on change example

Now for a vue on directive example that uses the on key up, and the on change events, along with the [vue model directive](https://vuejs.org/v2/guide/forms.html). 

The on key up event will fire when a keyboard key returns from the down position to the up position. SO this is the event that I would want to use when it comes to preforming some kind of action that should happen each time a key is presses, such as checking the character length, and updating a message as it goes up or down. A common task when working out a form.

The on change event will only fire once the value of a text element changes, but not while the value is being edited. So it is useful for doing something that will happen when the inputted value is really changed rather than being edited.

The model directive is a way to go about creating a two way data binding between the value of the text input element, and the value in the data object. This makes it so any value that is set with javaScript will show up in the text input element, and any change to the text input element value will update the binded value in the data object.

```js
new Vue({
    el: '#demo',
    template: '<div>' +
    '<input type="text" v-model="username" v-on:keyup="check" v-on:change="end"><br>' +
    '<p> {{ mess }}</p>' +
    '</div>',
    data: {
        username: '',
        valid: false,
        mess: 'enter a username'
    },
    methods: {
        check: function () {
            this.$data.valid = false;
            this.$data.mess = 'need 8 chars or more here';
            if (this.$data.username.length >= 8) {
                this.$data.valid = true;
                this.$data.mess = 'looking good so far';
            }
        },
        end: function () {
            this.$data.mess = 'Not a vaild username'
                if (this.$data.valid) {
                    this.$data.mess = 'Okay Good thanks';
                }
        }
    }
});
```

## 3 - Prevent default mod and right click

There are a number of modifiers when using the v-on directive such as the prevent modifier that is a short hand for using e.PreventDefault in the body of an event handler.

```js
new Vue({
    el: '#demo',
    template: '<div>' +
        '<canvas v-on:click.right.prevent="rightDown" v-on:mouseup.prevent="up" width="320" height="240"></canvas>' +
    '</div>',
    data: {
        canvas: null,
        ctx:null,
        down: false
    },
    mounted: function(){
        this.$data.canvas = this.$el.querySelectorAll('canvas')[0];
        this.$data.ctx = this.$data.canvas.getContext('2d');
        this.draw();
    },
    methods: {
        draw: function(){
            var dat = this.$data,
            ctx = dat.ctx,
            canvas = dat.canvas;
            ctx.fillStyle = 'black';
            ctx.fillRect(0,0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.fillText(dat.down, 20, 20);
        },
        up: function(){
            this.$data.down = false;
            this.draw();
        },
        rightDown: function () {
            this.$data.down = true;
            this.draw();
        }
    }
});
```

## 4 - Conclusion

The v-on directive is one of the first directives that oen should know about when starting to learn vuejs for the first time. When working out a static template there is often going to be a need to attach some events for certian elements in such a template, and the v-on directive is how to go about doing so with static templates.

It migth be a good idea to bruch up on event attachement in general when it comes to native javaScript also though. There are a wide range of events for all kinds of things that can happen on a page, and to and element.
