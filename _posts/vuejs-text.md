---
title: The vue text directive
date: 2020-10-30 13:017:00
tags: [vuejs]
layout: post
categories: vuejs
id: 733
updated: 2021-02-28 11:53:47
version: 1.14
---

The [vue text](https://vuejs.org/v2/api/#v-text) directive is one of the first directives that one might start to use when getting [started with vue directives](/2019/05/14/vuejs-directive/). The vue text directive just updates the text content of an element to the value that is given when using it in a vue template. This is an alternative to using the mustache syntax that often pops up in mnay basic examples, simply put the v-text directive is just a directive way of doing the same thing actually. However there is also the native javaScript way of setting the text node of an element also, and there is also setting the inner html of an element as well.

There are other ways of updating the text content of an element in vuejs, as well as native javaScript, and there are also some related topics to this such as the vue html directive that might also need to be covered here while I am at it. So this post will be just a few quick examples on the vue text directive in vuejs, but I also will be touching base on Mustache syntax, native javaScript methods for editing a text node, and other vuejs directives and features that might come up when it comes to text and vuejs.

<!-- more -->

## 1 - Basic vue text example

The basic idea of the vue text directive is that I just type v-text=\"mess\" in an element where mess is a value in my data object, or something that will evaluate to text that I want to be the inner text of an element. So for a very basic hello word style example of the vue text directive there is just having a simple one element template, and a value in a data object that I want to be the inner text of that element.

```html
<html>
  <head>
    <title>vue bind example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
  new Vue({
    el:'#demo',
    template: '<p v-text="mess"><\/p>',
    data: {
      mess: 'bar'
    }
  });
  </script>
  </body>
</html>
```

That is about it when it comes to the very basics, but there is more than one way to go about doing this, and not just with vuejs. Also the v-text directive is just for text nodes, it can not be used to set the text of element attributes for that another directive is needed such as the v-bind directive. However when it comes to this post at least I am mainly just going to be going over some other examples of updating text nodes, and maybe other things that might be touch of as such at least.

## 2 - Mustache syntax and expressions in templates

On top of the v-text directive there is also the mustache syntax in vuejs, this is also a way to go about setting the value for text content in an element of a template. When it comes to this mustache syntax A nested set of curly brackets is placed between the opening and closing tag of the element where I want text content to be. I can then pass a property name of the data object, or work out an expression consisting of strings, numbers, and methods that will then evaluate to the text content that I want.

```html
<html>
  <head>
    <title>vue bind example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
  new Vue({
    el:'#demo',
    template: '<div><span>{{ \'hello \' }}</span><span>{{ \"count: \" + ct + \";\" }}<\/span></div>',
    data:{
      ct: 3
    }
  });
  </script>
  </body>
</html>
```

## 3 - Native javaScript innerText, $ref, and the mounted life cycle hook

Yet another way to update the text content of an element, would be to use the native client side javaScript innerText property of an element object reference. There is just one problem, how does one get a reference to an element in a template in vuejs? Well there are several ways to go about doing so, one would be the $ref property, and another would be the $el property. In this section I will be going over some examples of how to go about getting a reference to an element in a template to change the text node value.
 
### 3.1 - Using the $ref prop of a vue instance

One way  to get a reference to a template element would be to use the [ref attribute](https://vuejs.org/v2/api/#ref) to tag an element in the template. Once that is one then a reference to the element can be obtained by the [$refs instance property](https://vuejs.org/v2/api/#vm-refs) of a vue instance inside the body of a mounted life cycle hook for example.


```html
<html>
  <head>
    <title>vue bind example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
  new Vue({
    el:'#demo',
    template: '<p ref=\"p\"></p>',
    mounted: function(){
        this.$refs.p.innerText = 'foo';
    }
  });
  </script>
  </body>
</html>
```

So then the ref attribute and $refs instance property is a great way to go about doing whatever I want or need to do with an element with plain old javaScript features. There is not just the innerText property of an element object reference after all when it comes to that. Still I think that something like this should only happed when I need to, and even then I must ask myself what it is that I am doing wrong actually. When it comes to just setting the text of an element in vuejs there is the v-text directive, and the mustache syntax that should be used. If I keep using native things then eventual i gets to the point where it kind of defeats the purpose of using vuejs.

### 3.2 - The $el prop of a vue instance

Another option would be to use the vue el property of a vue instance. This is a reference to the root element of the template of the vue instance. Off of this reference any native client side javaScript element can be used to get a reference to any element in the template by way of using something like query selector all.

```html
<html>
  <head>
    <title>vue html example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
  new Vue({
    el:'#demo',
    template: '<div><p></p></div>',
    mounted: function(){
        this.$el.querySelectorAll('p')[0].innerText = 'foo';
    }
  });
  </script>
  </body>
</html>
```

## 4 - HTML rather than plain text

The v-text directive works well when it comes to setting the value of a text node. However what if the text that I have is some html code and I want that html code to be part of the template? For these kinds of tasks there is the v-html directive that should work okay in most situations. Just like with the innerText property there is also the native javaScript innerHTML property also that is another way to go about doing this sort of thing. There is then the other native ways to go about creating html for a vue template.

### 4.1 - The html directive

The html directive is one way to go about making an html string part of a vue template. It works more or less the same way as the v-text directive only the value will be treaded as HTML rather than plain text.

```html
<html>
  <head>
    <title>vue bind example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
  new Vue({
    el:'#demo',
    template: '<table v-html="tableHTML"><\/table>',
    data: {
      tableHTML: '<tr><td>foo</td><td>bar</td></tr>' +
          '<tr><td>42</td><td>24</td></tr>'
    }
  });
  </script>
  </body>
</html>
```

## 5 - Conclusion

So that is it for now when it comes to the v-text directive as well as other alternatives when it comes to updating text content of elements in vuejs. I have been neglecting my content of vuejs for much to long, and in the coming days I intend to try to focus on this subject a little more when it comes to writing new vuejs content, as well as editing some of the older stuff I have wrote thus far.

The best way to get up to speed with vuejs, and get used to how to go about addressing some of the more less trivial aspects of the framework would be to just start working on some basic projects, or application examples using vuejs. I only have a few vuejs project examples posts, and I would like to see abound expanding that soon.