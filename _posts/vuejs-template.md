---
title: vue template option for defining templates in vuejs
date: 2019-05-07 15:21:00
tags: [vuejs]
layout: post
categories: vuejs
id: 437
updated: 2021-02-06 09:10:36
version: 1.13
---

In [vuejs](https://vuejs.org/) the [vue template option](https://vuejs.org/v2/api/#template) is one of the options for creating HTML that will be used for a vue instance, the other option being a [render function](/2019/05/12/vuejs-render/). Templates are easy to make, at least compared to render functions at least, and I also find them easier to read and maintain when compared to render functions. However the one draw back from render functions is that they are less powerful when it comes to making full use of javaScript. Still the general rule that I am following is to start out with a template for a vue instance or component, and only switch to using a render function if I am in a situstion in which it apears that I have to.

The html that will be generated with a template can end up beining injected into a mount point in the hard coded html of a web page by using the [vue el](/2019/05/06/vuejs-el/) option, or the mount vue instance method. When it comes to component design a template will end up being the html that composes an instance of the use of that component.

There are a few options when it comes to defining a template, but in this post I will just be writing about the string and X-Template options for templates in vuejs.

<!-- more -->

## 1 - vue template basics

This is a post on the vuejs template option in vuejs, and as such I assume that you have at least some background with javaScript, html and so forth. This is not a getting started post on vuejs, so I will not be bothering with the very basics of vuejs here. However in this section I will be going over some very basic examples of templates that are not the far beyond the first steps of getting started with vuejs. 

There are a few things to cover even when it comes to just starting out with just a very simple hello world style example of a vue temaplte. For example when it comes to injecting text nodes there is using the [mustache syntax](https://vuejs.org/v2/guide/syntax.html#Text), but then there is also using the v-text directive to do the same thing. There are a wide range of directves to work with when working out a template, but in this basic section I will just be touching base on a few of them.

### 1.2 - vue templates in string form

Using a string template just simply involves setting a string form of the template to the template option when creating a new vue instnace. This string form template will then be used to compile the contents that will be used in the mount point set with the vue el DOM option, or compose the html of a component that will be used in such a main vue instance. A very basic hello word example of a vue template might involve the use of the mustache syntax to display a string value in a vue data object as a text node for an element in the template.

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

The mustache syntax is just used for creating text nodes when working out a template, and even then it can be replaced with the v-text directive. When it comes to doing anything with attributes of elements directives must be used, and in some cases templates must be droped all togetaher in favor of render functions. However for now in this basic section lets just look at a few more baasic examples of templates when it comes to directives, and other options that can be used for templates beyond just a simple string format coverd in this basic hello world example.

### 1.2 - Directives in templates

A directive is a way to go about doing something to and element, such as injecting a text node with the v-text node, repeating an element for each element in a collection in the data object with the v-for directive, or attaching an event handler by way of the v-on directive. For now in this basic getting started with templates section though it might be a good starting point to work out a simple example using the v-bind, and v-text directives.

The v-bind directive is how to go about making a value in the data object a value for an element of component attribute in the template. For example if I have a string in the data object that I want to use as the value for an inline style attrabute of a paragraph element they way to do so would be with v-bind. The v-text directive is another directive that just serves as anorther way to create a text node for an element.

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

## 2 - Conclusion

To write a vuejs template the  can be used to inject text, but for attribute values the [v-bind directive](https://vuejs.org/v2/guide/syntax.html#Attributes) must be used.

Hope this post helps with the basics of templates in vuejs. As of this writing I am still fairly new with vuejs, so I will likely update this post at some point as my content on vuejs grows.