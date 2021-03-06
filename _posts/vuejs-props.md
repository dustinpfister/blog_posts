---
title: vue props in vue components
date: 2019-05-19 06:47:00
tags: [vuejs]
layout: post
categories: vuejs
id: 453
updated: 2021-02-05 15:12:43
version: 1.14
---

When making a [vue component](/2019/05/16/vuejs-component/) there is sometimes a need to have properties for the component that serve as a way to pass some values to it when using the component in a template or render function. This is where the [vue props](https://vuejs.org/v2/guide/components-props.html) option comes into play, it can be used as a way to set some properties for a component just like attributes when it comes to actual html elements. 

There is a fare amount of things to cover when it comes to vue props such as how to set default values for them, how to go about using these prop values. However I think I should also at least mention what not to do with prop values also such as mutation of prop values. The props option is not a replacement for the vue data object of a component, that is used in conjunction with props as a way to store values that are local to the component. When it comes to mutating prop values that should not, and actually can not be done, however events are how one would go about sending a mutated values back to a parent vue instance.

So lets get to some examples of props in vuejs.

<!-- more -->

## 1 - basic vue props examples

There is a great deal to cover not so much with props themselves, but with a whole bunch of other little topics that branch off from props when it comes to components. Still one has to start somewhere, so in this section I will be going over just a few quick simple basic examples of the vue props option when it comes to basic component design.

## 1.1 - vue props basics

Here I have a basic example of a vue props option just to get started with. I have a single div element that will serve as a mount point for the example, additional html will be rendered with vuejs via a template.

I just use the vue props option to define a single property for my custom component in the example. The vue props option can also be define with an object notation that might be a better play when it comes to making a more serious vue component, but for a simple example such as this just an array of string names for the properties should work just fine. Once I have the property for my component define I can the use it in other templates that use the custom component in a template.

```html
<html>
  <head>
    <title>vue props example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-props"></div>
  <script>
Vue.component('custom', {
    props: ['foo'],
    template: '<div>{{ foo }}</div>'
});
 
new Vue({
    el: '#demo-props',
    template: '<div><custom foo="baz"></custom><custom></custom></div>'
});
  </script>
  </body>
</html>
```

So that is just a simple hello world style example of a prop option, but you get the basic idea. I can create components that can be used in templates, or render functions. When doing so there should be a way to define some properties like that of html element attributes, and the way to do so is with a props option for the component.

### 1.2 - Setting defaults for a vue prop

To set default values for a property one way is to use the object syntax rather than an array of strings for each prop that I want for a component. In place of just a string of the type expected for the property it can be an object with a default property. The default property is then where I can set the value that will be the default value for the prop of the component.

```html
<html>
  <head>
    <title>vue props example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-props"></div>
  <script>
Vue.component('custom', {
    props: {
        foo: {
            default:'foobar'
        }
    },
    template: '<div>{{ foo }}</div>'
});
 
new Vue({
    el: '#demo-props',
    template: '<div>' +
    '<custom foo="baz"></custom>' + // 'baz'
    '<custom></custom>' + // 'foobar'
    '</div>'
});
  </script>
  </body>
</html>
```

## 2 - Props and events

What about mutating prop values that where passed from a parent vuejs instance? Well if I attempt to do so it will result in an error so I can not just mutate a prop value. A better way of going about doing so would be to emit and event that will return a mutated form of a prop value. It is then up to the parent vue instance as to what to do with that mutated value.

```html
<html>
  <head>
    <title>vue props example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-props"></div>
  <script>
Vue.component('ui-pos', {
    props: ['pos'],
    template: '<div>'+
        '{{ pos.x * pos.y }}<br>' +
        ' x: <input id="input_x" type="text" v-bind:value="pos.x" v-on:keyup="posSet"> | '+
        ' y: <input id="input_y" type="text" v-bind:value="pos.y" v-on:keyup="posSet">'+
    '</div>',
    methods: {
        posSet: function(e){
            var idArr = e.target.id.split('_');
            var newPos = {
               x: this.$props.pos.x,
               y: this.$props.pos.y
            };
            newPos[idArr[1]] = Number(e.target.value);
            this.$emit('event-poschange', newPos);
        }
    }
});
 
new Vue({
    el: '#demo-props',
    data: function(){
        return {
           pos: {x: 10, y: 45}
        };
    },
    template: '<div>'+
        '<ui-pos v-bind:pos="pos" v-on:event-poschange="updatePos" ></ui-pos>'+
    '</div>',
    methods: {
       updatePos: function(newPos){
           this.$data.pos = newPos;
       }
    }
});
  </script>
  </body>
</html>
```

## 3 - Conclusion

That is it for now when it comes to the props option of a vuejs instance. The next step might be to look into more of the various options of a vue instance when it comes to learning the basics of vuejs. However at one point or another it would be a good idea to start to work on at least a few simple full examples of vuejs. Maybe working out just a few simple hello world style examples is just want needs to happen when starting from zero experience, but the best way to learn might be to just start making an idea for a project and learn as you go.

