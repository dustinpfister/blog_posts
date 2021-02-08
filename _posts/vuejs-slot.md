---
title: vue slots in vuejs component design
date: 2019-05-17 12:28:00
tags: [vuejs]
layout: post
categories: vuejs
id: 451
updated: 2021-02-08 18:13:55
version: 1.14
---

When making vue components there might be a time now and then to use a [vue slot](https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots) when working out a template, or render method for a component. A vue slot is what can be used to define in the template, where anything that is passed inside the custom element of the component should go. That is that the component is like that of an html element where there is an opening and closing tag for the element, and with such elements there is the question of what should go between them. With a paragraph element it is a text node, with a div element it is additional html. With vuejs components slots are how to go about declaring where this content should go in the template of a component.

If you still are a little confused, maybe it would be a good idea to look at a few simple code examples of vue slots. I have found that learning by doing is just the best way to go about getting a solid grasp on something. So lets take a look at one or two examples of vue slots when it comes to vue component design.

<!-- more -->

## 1 - vue slot basic example

Vue slots come into play when making a vue component, I will not be getting into components in general here but I have wrote a post on that. However understanding slots is an important part of vue component design. In this basic vue slot example I am just using a component that is just template. When I use the custom element of the component in a Vue instance I can define the inner html of what the slot is in the component within the template of the vue instance. 

Here is the html of the example I just have a single div element hard coded and I am linking to a basic.js file. In this file I will have my component and the vue instance that makes use of that component and mounts to the div element.

```html
<html>
  <head>
    <title>vue slot example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-data"></div>
  <script src="./basic.js"></script>
  </body>
</html>
```

Here I have the basic.js file. In the file I create a component with the name of foo, this results in a custom element named foo that I can use in other templates. When making the component template I just place the slot element where I want the inner html to go when I just the custom foo element.

```js
// very simple component with a slot
Vue.component('foo', {
    template: '<div><slot></slot></div>'
})
 
// a Vue instance using the component element
// that has some inner content in the form of a
// simple text node
new Vue({
    el: '#demo-data',
    template: '<foo>hello</foo>'
});
```

I then of course have a plain old vue instance that makes use of the custom foo element that the component creates.

## 2 - More that one vue slot

If for some reason I need more than one slot there is the named property that can be used to define what slot should be used when making a template that makes use of a component.

```html
<html>
  <head>
    <title>vue slot example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-slot"></div>
  <script src="./named.js"></script>
  </body>
</html>
```

```js
Vue.component('foo', {
    template: '<div>' +
    '<slot name="title" ></slot>' +
    '<slot></slot>' +
    '<slot name="footer"></slot>' +
    '</div>'
})
 
new Vue({
    el: '#demo-slot',
    template: '<div>' +
    '<foo v-slot:title>Slots are fun</foo>' +
    '<foo>If no name is given then it is the defulat slot</foo>' +
    '<foo v-slot:footer>So names help with more than one slot</foo>' +
    '</div>'
});
```

## 3 - Conclusion

Vue slots are one of many little things to be aware of when it comes to starting to really get into vuejs as a way to go about creating a client side system of one kind or another. I like to break things down into components in order to make things more modular and thus reusable, and when doing so slots are how I can take advantage of the space between the component tags when using these components.

