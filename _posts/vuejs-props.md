---
title: vue props in vue components
date: 2019-05-19 06:47:00
tags: [vuejs]
layout: post
categories: vuejs
id: 453
updated: 2021-02-04 14:15:24
version: 1.11
---

When making a [vue component](/2019/05/16/vuejs-component/) there is sometimes a need to have properties for the component that serve as a way to pass some values to it when using the component in a template or reder function. This is where the [vue props](https://vuejs.org/v2/guide/components-props.html) option comes into play, it can be used as a way to set some properties for a component just like attributes when it comes to actual html elements. 

There is a fare amount of things to cover when it comes to vue props such as how to set default values for them, how to go about using these prop values. However I think I should also at least mention what not to do with prop values also such as mutation of prop values. The props option is not a replacment for the vue data object of a component, that is used in conjuntion with props as a way to store values that are local to the component. When it comes to mutating prop values that should not, and actaully can not be done, however events are how one would go about sending a mutated values back to a parent vue instance.

So lets get to some examples of props in vuejs.

<!-- more -->

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

So that is just a simple hello world style example of a prop option, but you get the basic idea. I can create compoents that can be used in templates, or render functions. When doing so there should be a way to define some properties like that of html element attributes, and the way to do so is with a props option for the component.

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

## 2 - Conclusion

That is it for now when it comes to the props option of a vuejs instance. The next step migth be to look into more of the vaious options of a vue instance when it comes to learning the basics of vuejs. However at one point or another it would be a good idea to start to work on at least a few simple full examples of vuejs. Maybe working out just a few simple hello world style examples is just want needs to happen when starting from zero experence, but the best way to learn might be to just start making an idea for a project and learn as you go.

