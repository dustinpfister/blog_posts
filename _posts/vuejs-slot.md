---
title: vue slots
date: 2019-05-17 12:28:00
tags: [vuejs]
layout: post
categories: vuejs
id: 451
updated: 2019-05-17 21:03:58
version: 1.9
---

When making vue components there might be a time now and then to use a [vue slot](https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots) when working out a template, or render method for a component. A vue slot is what can be used to define in the template where anything that is passed inside the custom element of the component should go. If you still are a little confused, maybe it would be a good idea to look at a few simple code examples. So lets take a look at one or two then.

<!-- more -->

## 1 - vue slot basic example

Vue slots come into play when making a vue component, I will not be getting into components in general here but I have wrote a post on that. However understanding slots is an important part of vue component design. In this basic vue slot example I am just using a component that is just template. When I use the custom element of the component in a Vue instance I can define the inner html of what the slot is in the component within the template of the vue instance. 

Here is the html of the example I just have a single div element hard coded and I am linking to a basic.js file. In this file I will have my component and the vue instance that makes use of that component and mounts to the div element.

```html
<html>
  <head>
    <title>vue data example</title>
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
    template: '<foo>hello</foo>',
    data: {
        foo: 'bar'
    }
});
```

I then of course have a plain old vue instance that makes use of the custom foo element that the component creates.

## 2 - More that une vue slot

If for some reason I need more than one slot there is the named property that can be used to define what slot should be used when making a template that makes use of a component.