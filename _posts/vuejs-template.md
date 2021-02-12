---
title: vue template option for defining templates in vuejs
date: 2019-05-07 15:21:00
tags: [vuejs]
layout: post
categories: vuejs
id: 437
updated: 2021-02-12 12:10:36
version: 1.17
---

In [vuejs](https://vuejs.org/) the [vue template option](https://vuejs.org/v2/api/#template) is one of the options for creating HTML that will be used for a vue instance, the other option being a [render function](/2019/05/12/vuejs-render/). Templates are easy to make, at least compared to render functions at least, and I also find them easier to read and maintain when compared to render functions. However the one draw back from render functions is that they are less powerful when it comes to making full use of javaScript. Still the general rule that I am following is to start out with a template for a vue instance or component, and only switch to using a render function if I am in a situation in which it appears that I have to.

The html that will be generated with a template can end up being injected into a mount point in the hard coded html of a web page by using the [vue el](/2019/05/06/vuejs-el/) option, or the mount vue instance method. When it comes to component design a template will end up being the html that composes an instance of the use of that component.

There are a few options when it comes to defining a template, but in this post I will just be writing about the string and X-Template options for templates in vuejs.

<!-- more -->

## 1 - vue template basics

This is a post on the vuejs template option in vuejs, and as such I assume that you have at least some background with javaScript, html and so forth. This is not a getting started post on vuejs, so I will not be bothering with the very basics of vuejs here. However in this section I will be going over some very basic examples of templates that are not the far beyond the first steps of getting started with vuejs. 

There are a few things to cover even when it comes to just starting out with just a very simple hello world style example of a vue template. For example when it comes to injecting text nodes there is using the [mustache syntax](https://vuejs.org/v2/guide/syntax.html#Text), but then there is also using the v-text directive to do the same thing. There are a wide range of directives to work with when working out a template, but in this basic section I will just be touching base on a few of them.

### 1.2 - vue templates in string form

Using a string template just simply involves setting a string form of the template to the template option when creating a new vue instance. This string form template will then be used to compile the contents that will be used in the mount point set with the vue el DOM option, or compose the html of a component that will be used in such a main vue instance. A very basic hello word example of a vue template might involve the use of the mustache syntax to display a string value in a vue data object as a text node for an element in the template.

```html
<html>
  <head>
    <title>vue template example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
  new Vue({
    el:'#demo',
    template: '<p>{{mess}}<\/p>',
    data: {
      mess: 'Hello World'
    }
  });
  </script>
  </body>
</html>
```

The mustache syntax is just used for creating text nodes when working out a template, and even then it can be replaced with the v-text directive. When it comes to doing anything with attributes of elements directives must be used, and in some cases templates must be dropped all together in favor of render functions. However for now in this basic section lets just look at a few more basic examples of templates when it comes to directives, and other options that can be used for templates beyond just a simple string format covered in this basic hello world example.

### 1.2 - Directives in templates

A directive is a way to go about doing something to and element, such as injecting a text node with the v-text node, repeating an element for each element in a collection in the data object with the v-for directive, or attaching an event handler by way of the v-on directive. For now in this basic getting started with templates section though it might be a good starting point to work out a simple example using the v-bind, and v-text directives.

The v-bind directive is how to go about making a value in the data object a value for an element of component attribute in the template. For example if I have a string in the data object that I want to use as the value for an in line style attribute of a paragraph element they way to do so would be with v-bind. The v-text directive is another directive that just serves as another way to create a text node for an element.

```html
<html>
  <head>
    <title>vue template example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
  new Vue({
    el:'#demo',
    template: '<p v-bind:style="redness" v-text="mess"><\/p>',
    data: {
      mess: 'Hello World!',
      redness: 'color:red;'
    }
  });
  </script>
  </body>
</html>
```

### 1.3 - vue templates on x-template form

Another option is to use an x-template this will require a script tag, but with the type attribute of the script tag set to 'text/x-template'. This is a nice option because it allows for me to define the html of the template in just pure raw html form. In addition this can be used as a standard way to create external template files.

```html
<html>
  <head>
    <title>vue template example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="foo"></div>
  <script type="text/x-template" id="xtemp">
    <p v-bind:style="redness">{{mess}}</p>
  </script>
  <script>
  new Vue({
    el:'#foo',
    template: '#xtemp',
    data: {
      mess: 'bar',
      redness: 'color:blue;'
    }
  });
  </script>
  </body>
</html>
```

## 2 - Templates and render functions

Templates are great, I find them ver easy to use, read, and maintain compared to render functions. However there are some situations in which I just need to use a render function because there does not seem to be any built in directive to do what I want to do with one or more nodes. Render functions are far more powerful, they allow me to work with the full unchained power of vuejs as well as native javaScript outside of the framework for that matter. Still I thing that they are something that I should only use when and where doing so is called for. 

The draw back of render functions is that although they are more powerful, that in turn is also the reason why I want to avoid them, it makes working on a vue project far more time consuming, and hard to read if I just go all out with them over templates. So I think the best course of action here is to use render functions to help with some of these situations in which they just simply need to be used, while still using basic simple templates for simple tasks where they continue to work just fine.

### 2.1 - generating a node name with javaScript using a render function

So far I am not aware of any way to generate a node name for an element or component in a template using just directives. This is then one reason why I sometimes find myself using a render function over that of a simple template. 

So far this is something that happens when I start creating my own components as a way to start to break down what would otherwise be a very complex single vue instance that is hard to read and debug. I then end up with a bunch of components where the node names follows a certain pattern like text-red, text-green, and so forth. I then often might want to have a way to generate the proper component name using a javaScript expression. When it comes to templates there is the v-text directive to create a text node value for a node, then there is the v-bind directive for creating a node attribute value with javaScript. However what about attribute names nodes, and the names of nodes themselves? Well when it comes to this degree of control it would seem that this is one reason why I would just need to use a render function over a template.

```html
<html>
  <head>
    <title>vue template example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
 
Vue.component('text-red',{
   template: '<p style="color:red;"><slot></slot></p>'
});
Vue.component('text-green',{
   template: '<p style="color:green;"><slot></slot></p>'
});
 
  new Vue({
    el:'#demo',
    render: function(createElement){
       var children = [];
       this.$data.arr.forEach(function(obj){
           // generating the node name with a javaScript expression
           var nodeName = 'text-' + obj.color;
           children.push(createElement(nodeName, { props: props}, obj.mess));
       });
       return createElement('div', children);
    },
    data: {
        arr: [
            {mess: 'Hello', color: 'red'}, 
            {mess: 'World', color: 'green'}
        ]
    }
  });
  </script>
  </body>
</html>
```

## 3 - Conclusion

Hope this post helps with the basics of templates in vuejs which is a great starting point for working out what the html should be for a vue instance. Also more often then not it is not always necessary to switch to using a render function, there are a few situations in which doing so is called for, but render functions make a vue project harder to read, and maintain. Even when I do use a render function I try to compartmentalize what I am doing with a render function into a component and continue using templates as the default.
