---
title: Vue on directive
date: 2019-11-14 16:02:00
tags: [vuejs]
layout: post
categories: vuejs
id: 563
updated: 2021-02-21 09:36:48
version: 1.16
---

The [vue on](https://vuejs.org/v2/api/#v-on) directive is what can be used in [vue templates](/2019/05/07/vuejs-template/) to preform [event attachment](https://vuejs.org/v2/guide/events.html) for elements in the template. In line JavaScript can be given, however the typical use of the vue on directive is to call a method in the methods object. 

There are a number of event and key modifiers that can be used to help make it so the methods that I write are more about the actual logic of what the method does rather than having additional code that helps with DOM element related quirks. For example I can use a prevent event modifier so that I do not have to call the e.preventDefault method in the body of the event handler that I am calling. 

There are a few things to cover when it comes to just using the v-on directive, so I thought I would take a deepe look at a few quick examples of v-on directive in action. In the process of doing so I might also touch base on a whole bunch of other vuejs features in the process of doing so while I am at it.

<!-- more -->

## 1 - vue on basic on click example

So then I have an example of the vue on directive here where I am just using the [vue el](/2019/05/06/vuejs-el/) option to mount to a single div element in the hard coded html of the example. I then worked out a simple template with just a single input element that I made as a button type. This button element then uses the v-on directive to make it so that when the button is clicked a step method is called that steps a variable in the [vue data](/2019/05/18/vuejs-data/) object.

I am also using the [v-bind](/2019/05/31/vuejs-bind/) directive to bind a message variable in the data object for the value attribute of the input element. This is so that each time the button is clicked the current value of the data object property that is stepped is displayed as part of the buttons value. The v-bind is yet another example of a vuejs directive that also prefroms a kind of action on an element just the the v-on directive but the purpose is to bind a value as a value of an element or component attribute rather than prefrom event attachment.

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

This is a simple example of just making something where I am just stepping a variable in the data object, and each time I do so the current value of that number is displayed as part of the display value of the button. A real example depends on what I want to accomplish when it comes to event attachment, but never the less the general basic idea is there. 

Sometimes what I want to do can be done with a single event and handler, other times I need a few events and also then use additional directives on top of the vue on directive. For example I might need to set a data object boolen value to true when a canvas element is clicked with a mouse, or touched on a device that has a touch screen, and then set it back to false when a mouse button or finger is released. So with that being said lets look at some more examples of the vue on directive in action to help cover many of these little details when working with the v-on directive.

## 2 - A vue on key up, and on change example

Now for a vue on directive example that uses the on key up, and the [on change](/2019/01/04/js-onchange/) events, along with the [vue model directive](https://vuejs.org/v2/guide/forms.html). The onchange event is fired for a text input element when the text value of the element actually changes. However there is also the key up event that will fire each time a key is released so that is the event that one would want to use to do something when a text value of an element is in the process of being changed.

So then becuase the on key up event will fire when a keyboard key returns from the down position to the up position, this is the event that I would want to use when it comes to preforming some kind of action that should happen each time a key is pressed and released. There are a number of things that come to mind when it comes to using this kind of event in a projet such as checking the character length of the text input element, and updating a message as it goes up or down. A common task when working out a form that has to do with setting a username where there is a charicter limit, or a min amount of chars when it comes to password strength for another example.

The on change event will only fire once the value of a text element changes, that is when the return key is pressed, or tab is pressed, or for one reason or another the user moves on to something else after changing any value in the text input element. However it will not fire while the value is in the process of being edited. So it is useful for doing something that will happen when the inputted value is really changed rather than being edited.

The model directive is a way to go about creating a two way data binding between the value of the text input element, and the value in the data object. This makes it so any value that is set with javaScript will show up in the text input element, and any change to the text input element value will update the binded value in the data object. In many cases I might want to do this with a text input element, in other situstions maybe not, however in this section this will be an example that makes use of the v-model directive along with the v-on directive for the keyup and change events.

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

## 3 - Prevent default, and right click event modifiers

There are a number of modifiers when using the v-on directive such as the prevent modifier that is a short hand for using [e.PreventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) in the body of an event handler. This prevent default method is a way to chance any default behavior of an event that mightn have to do with a browser. For example when right clicking a canvas element without prevent default called will result in a context menu showing up. Say I want for that menu to now show up when a right click is preformed, doing so can be accomplished with event modifiers.

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

Calling provent default and also checking of the right mouse button was clicked can be prefromed in the body of an event hander by just calling e.preventDefault and looking at certian properties of the event object. However the use of these modufiers helps to reduce that kind of code in the handler, and allows be to focus more on what really matters in the body of that handler.

## 4 - Conclusion

The v-on directive is one of the first directives that oen should know about when starting to learn vuejs for the first time. When working out a static template there is often going to be a need to attach some events for certian elements in such a template, and the v-on directive is how to go about doing so with static templates.

It migth be a good idea to bruch up on event attachement in general when it comes to native javaScript also though. There are a wide range of events for all kinds of things that can happen on a page, and to and element.
