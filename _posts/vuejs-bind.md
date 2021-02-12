---
title: Vue bind directive
date: 2019-05-31 21:00:00
tags: [vuejs]
layout: post
categories: vuejs
id: 468
updated: 2021-02-12 12:03:14
version: 1.17
---

The term [vue bind](https://vuejs.org/v2/guide/syntax.html) may refer to one of the many ways to bind some text to an element in a vue js template. However when it comes to the idea of binding text to an element in a vue template there is more than one thing that comes to mind about that. For example there are text nodes of elements, there are attribute names and values for elements, and then there is raw html itself all of which can be thought of as a kind of text. So then there are a few ways to go about binding something to a template in vue js depending on what it is that needs to be bound to a template, and where, so it is a good idea to get these things worked out when it comes to working with text and templates in a vuejs project.

There are ways to go about binding some kind of value to the text node of an element, for that there is the mustache syntax, and also the text directive. There is also not just text nodes, but also parsing an html string into actually html and appending that to a template, which can also be done with the mustache syntax. However on top of all of that, what if I want to use some text not as the value of a text node, but as a value for an attribute of an element in a vuejs template? For these kinds of tasks there is the [vue bind directive](https://vuejs.org/v2/guide/syntax.html#v-bind-Shorthand) that can be used in a number of ways to bind some text in a vue data object, or as the result of a simple javaScript expression, as the value for one or more elements in a vue example. 

This might all be a little complicated, but just a few quick examples are enough to iron things out with this. So lets take a look at a few simple examples of binding text to elements, using various ways of doing so including the text, and bind directives.

<!-- more -->

## 1 - Bind text as a text node for an element, or bind as HTML

First off before getting into the bind directive it might be a good start to iron out any confusion when it comes to creating text nodes, and html elements to begin with in the template. When first starting out with vuejs there is the mustache syntax that is one way to go about creating text nodes. It is a good idea to get it solid that the mustache syntax is just for text nodes and only text nodes. If you are trying to use the mustache syntax in a vue template as a way to create html elements, add an attribute, or attribute value to an element, then you might want to read over this section.

### 1.1 - Bind a value in the data object as a text node

So when it comes to binding text to an element in a template there is the mustache syntax that can be used of course, however there is also the v-text built in directive as well that can be used as a way to bind text from a property in the vue data object to a text node in a template.

```html
<html>
  <head>
    <title>vue bind example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-bind"></div>
  <script>
new Vue({
    el: '#demo-bind',
    template: '<div>' +
    '<p>{{ mess1 }}</p>' +
    '<p v-text=\"mess2\"></p>' +
    '</div>',
    data: {
        mess1: 'mustache syntax',
        mess2: 'bind text directive'
    }
});
  </script>
  </body>
</html>
```

Binding text is one thing but what about attributes ans raw html, well lets take at some more examples that involve binding in vuejs.

### 1.1 - The html directive and binding a data object value as html rather than a text node

So the mustache syntax is just for creating, or replacing text nodes of elements that are in place all ready in the template. However what if I want to add some html to a template that is created by way of an html string? In vanilla javaScript there is the innerHTML property of element reference objects that can be used as a way to create html from an html string. In vuejs there is the html directive that can be used to the same effect.

```html
<html>
  <head>
    <title>vue html example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-bind"></div>
  <script>
new Vue({
    el: '#demo-bind',
    template: '<div>' +
 
    // will result in a text node "{ html1 }"
    '<div>{ html1 }</div>' +
 
    // will result in a text node "<p style="background:red;">mustache syntax</p>"
    '<div>{{ html1 }}</div>' +
 
    // the use of the html directive is what is needed to inject as html
    '<div v-html=\"html1\"></div>' +
    '</div>',
    data: {
        html1: '<p style="background:red;">mustache syntax</p>'
    }
});
  </script>
  </body>
</html>
```

## 2 - Vue bind directive for element attributes

When it comes to binding a value in the vue data object to a text node that can be done with the mustache syntax just fine, but it will not aways work out so great when attempting to bind a value to an html element attribute value in a template. If you are running into trouble with that one you will want to check out the v-bind directive. So lets look at a few examples of this directive when it comes to working with element attribute values in a template, rater than text nodes.

### 2.1 - Basic v-bind example

Lets start out with a very basic example of this v-bind directive just the get the general idea of what it is used for. Say I have a very simple template in which I just want to set the value for an in line style attribute of an element in the template. I can have the CSS that I want as a property in the vue data object, and then use the v-bind directive to bind that value to the style attribute of the element that I want to have that style.

```js
new Vue({
    el: '#demo-bind',
    template: '<p v-bind:style="red">red text</p>',
    data: {
        red: 'color:red;'
    }
});
```

### 2.2 - Using v-bind, an v-for to set id element attributes with a collection of objects in the data object

A static value in the data object can be use for the value of an attribute and doing so is fairly simple. However what if I have an array of objects in the data object, and I want to use a property of these objects in the array as a value for an id attribute for a collection of elements in the template for each object in the array? This is of course a little more involved, and also it will take a bit more than just the vue bind directive.

```html
<html>
  <head>
    <title>vue bind example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-bind"></div>
  <script>
new Vue({
    el: '#demo-bind',
    template: '<div>'+
        '<div v-bind:style="item.locked?\'display:none;\':\'display:block\'" v-for="item in items">'+
            '<input v-bind:value="item.id" v-bind:id="\'item_\'+item.id" type="button"  v-on:click="click">'+
            '<span> {{ item.count }} </span>'+
        '</div>'+
    '</div>',
    data: {
        items: [{ id: 'one', count:0 },{ id: 'two', count: 0, locked: true },{ id: 'three', count: 0 }]
    },
    methods: {
        click : function(e){
            var itemArr = e.target.id.split('_')
            var dat = this.$data;
            var i = dat.items.length, item;
            while(i--){
                item = dat.items[i];
                if(item.id === itemArr[1]){
                    item.count += 1;
                    break;
                }
            }
        }
    }
});
  </script>
  </body>
</html>
```

## 3 - Binding raw html

Then there is of course raw html and how to go about binding that to a vue template. Well there was once a time when a special syntax similar to the mustache syntax could be used but in 2.x of vuejs that is no longer the case. However there is now the v-html directive that can be used as a way to bind raw html to a vue template.

```js
new Vue({
    el: '#demo-bind',
    template: '<div v-html="html"></div>',
    data: {
        html: 'This is some html'
    }
});
```

## 4 - Conclusion

So the v-bind directive is generally what I will want to use when it comes to binding a value to an element attribute in a template rather than a text node. When it comes to text nodes often I can just use the mustache syntax, or the v-text directive. It also pays to be aware of all the other little built in directives that come into play then working out a vuejs powered project such as the v-for directive.
