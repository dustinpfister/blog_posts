---
title: Vue on directive
date: 2019-11-14 16:02:00
tags: [vuejs]
layout: post
categories: vuejs
id: 563
updated: 2019-11-16 12:08:01
version: 1.8
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

## 2 - A vue on key up  and on change example

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