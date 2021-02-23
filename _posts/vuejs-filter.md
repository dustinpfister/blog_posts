---
title: vue filter global level and asset options
date: 2019-05-10 09:47:00
tags: [vuejs]
layout: post
categories: vuejs
id: 440
updated: 2021-02-23 10:07:58
version: 1.25
---

In [Vuejs](/2021/02/05/vuejs/) a [Filter](https://vuejs.org/v2/guide/filters.html) can be used to help with formating tasks, and can be used when working out a simple static template. Filters differ from methods in that they can only be used in mustache interpolations and when using the v-bind directive. However using the filters option of a vue instance, and setting up global filters is a great way to go about pulling alway this kind of method from other methods that have to do with handing events, or mutating the data object that can remian in the methods option.

A [vue filter](https://vuejs.org/v2/api/#Vue-filter) can be registered at the global level, or it can be an [asset of a single Vue constructor](https://vuejs.org/v2/api/#filters) instance. So in other words like many other features in vuejs like methods, and components there can be both global and local sets of these filters. 

In this post I will be going over some use case examples of filters in vuejs, and also about filtering in general in javaScript. 

<!-- more -->

## 1 - Vue filter basics

This is a post on filters in vuejs, the popular front end javaScript framework. In vuejs filters are methods that are often used for text formating. So they are like methods, but they are not as flexabule as they can only be used for formatting with a few features when working out a sttaic template. 

Filters in vuejs might differ slightly from what you might be familial with when it comes to methods like the [lodash \_.filter collection method](/2018/05/18/lodash_filter/) or the [filter array prototype method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) in native javaScript. When it comes to vuejs a filter has to do more with filtering some text into a method that will do something to that text such as making all the letters uppercase.

### 1.1 - Get the examples here and for all other vuejs examples at my guthub repo

All the examples here as well as for all my other vuejs examples that i write about here can be [found at my test\_vuejs github repo](https://github.com/dustinpfister/test_vuejs/tree/master/public/forpost/vuejs-filter).

## 2 - Vue filter as an Vue Instance Option

When making a new instance of the Vue Constructor, one of the options that can be passed via the object that is passed as the first argument to the constructor is the filters option. The value for this filters option can be an object with one or more additional properties that each contain a method that can then be used in templates to apply filters to text values. 

So when using vuejs by calling the main constructor that is of course one way to define some filters that apply just to the single instance of the Vue Constructor, rather than a filter that might be registered globally. So in this section I will be starring out with some examples of local filters.

### 2.1 - vue filter option basic example

For a basic example of a vue filter option here I have just a filter that appends the string 'foo' to the beginning of anything that it is used with via the pipe symbol when using the mustache interpolation syntax. I just add the method that I want to the filters object, this method will have one argument that is the value that will be piped into it when it is used in a template. Inside the body of the method I do whatever it is that I want to do with the value that is passed and return the result.

I can then use my fooanate filter in a template whenever I use the mustache syntax of the v-bind directive. When it comes to using the filter I start out with the value I want to filter and then use the \| symbol after the value followed by the name of the filter that I want to use. 

```js
<html>
  <head>
    <title>vue filter example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <p id="bar">{{ mess | fooanate }}</p>
  <script>
  
  new Vue({
    el:'#bar',
    data: {
      mess: 'bar'
    },
    filters: {
      fooanate : function(val){
        return 'foo' + val;
      }
    }
  });
  
  </script>
  </body>
</html>
```

### 2.2 - Filters can be used with the v-bind directive

Typically filters are used when doing mustache interpolation in a static template. However in a static template that can also be used when creating a value for an attribute with the v-bind directive.

```html
<html>
  <head>
    <title>vue filter example list</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <div id="demo"></div>
    <script>
new Vue({
    el: '#demo',
    template:'<input ' + 
        'v-bind:value="state | buttonText" ' +
        'v-on:click="click(state)" ' +
        'type="button" >',
    data: {
        state: {
            amount: 40,
            delta: 5
        }
    },
    filters: {
        buttonText: function (state) {
            return 'step by ' + state.delta + ' ( ' + state.amount + ' ) ';
        }
    },
    methods : {
        click: function(state){
            state.amount += state.delta;
        }
    }
});
    </script>
  </body>
</html>
```

### 2.3 - vue filter option array to text example

What about if I am in a situation in which I have an array of items and I want a custom way to go about converting that array of items to a string form. Doing so often requires a little custom logic because I might want some values in that string but not others. So for a more advanced example of a vue filter that is used via the filters Vue constructor option, here is an example that creates a plain text presentation of data from an array of objects. 

```html
<html>
  <head>
    <title>vue filter example list</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <pre id="list">{{ items | toText }}</pre>
    <script src="./totext.js"></script>
  </body>
</html>
```

```js
new Vue({
    el: '#list',
    data: {
        items: [{
                name: 'fooBox',
                cost: '$20'
            }, {
                name: 'bazAnaTer',
                cost: '$35'
            }
        ]
    },
    filters: {
        toText: function (items) {
            return items.map(function (item) {
                return 'name: ' + item.name + '\ncost: ' + item.cost + '\n\n';
            })
            .reduce(function (acc, item) {
                return acc + item;
            });
        }
    }
});
```

## 3 - Global Filters

So there is making filters that are for just a single instance of the Vue constructor, but what of you are doing something that involves more than one instance of vuejs in a page? For example say that I want a format money filter but I want to use it in more than one component or plain Vuejs instance. I could place the method into an object and then just refernce that method in the filters option of any vuejs instance, but there is also a way to go about making a filter global so it will be there for any Vuejs instance.

So in this section I will be going over some examples that involve defining filters at a global level. This involves the use of the Vue.filter global api method rather than the filters Vue Constructor option. The result is then a filter that can be used across multipliable instances of Vue in a page.


### 3.1 - A Basic Global filter example

For just a quick example of this how about a simple anwser check filter that will just check if a value that is passed to it will equal a desired value just for the sake of getting the basic idea here.

```html
<html>
  <head>
    <title>vue filter global example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <div id="guesswork">
      <p>{{ 'The wind in your hair!' | answerCheck }}</p>
      <p>{{ '42' | answerCheck }}</p>
      <p>{{ 'To crush your enemies, see them driven before you, and to hear the lamentation of their women' | answerCheck }}</p>
      <p>{{ 42 | answerCheck }}</p>
      <p>{{ 40 + 2 | answerCheck }}</p>
    </div>
  <script>
  
  // registering answer check as a global filter
  Vue.filter('answerCheck', function(val){
     if(parseInt(val) === 42){
        return 'YES that is the answer to everything!'
     }
     return 'Nope, sorry';
  });
  
  
  new Vue({
    el: '#guesswork'
  })
  
  
  </script>
  </body>
</html>
```

### 3.2 - Global Money filter

One kind of filter that I would often want to have in a project is a filter that will take a number, or string of a number, and spit out a string that is formatted in a way that makes sense when it comes to money. That is have the number set to a fixed number of decimal places for cents, with commas for every three decimnal places with the dolar amount, and of course the dollar sign added to the string.

When it comes to making this kind of feature I could work out my own solution, but this does strike me as a very common problem so there should be a quick copy and pase solution for this. I would think that there should also be some kind of standard, web browser built in solutuon for this sort of thing even. Well it turns out that there is and it is called the [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) object that has decent browser support by todays standards at least.

```html
<html>
  <head>
    <title>vue filter global example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <div id="demo">
    </div>
  <script>
  
    // global money filter
    Vue.filter('money', function(val){
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
        var number = Number(val);
        if(String(number) === 'NaN'){
            number = 0;
        }
        return formatter.format(number); 
    });
  
    // using the global money filter in a component
    Vue.component('moneydivs', {
        props: ['amounts'],
        template: '<div>' +
            '<div v-for="m in $props.amounts">{{ m | money }}</div>' +
        '</div>'
    });
 
    // using the money filter in a main Vuejs instance
    new Vue({
        el: '#demo',
        template: '<div>' +
            '<h3>Amounts: </h3>' +
            '<moneydivs v-bind:amounts="amounts" ></moneydivs>' +
            '<h3>Other Amount: {{other | money}}</h3>' +
        '</div>',
        data: function(){
            return {
                other: 1357.68,
                amounts: [9.99, 3.25, 1.75]
            };
        }
    });
  </script>
  </body>
</html>
```


## 4 - Conclusion

So this this post I just wanted to work out a few quick examples of filters when using vuejs as part of a client side javaScript project. The filters in vuejs are not to be confused with other methods in other frameworks such as [lodash filter](/2018/05/18/lodash_filter/), and native prototype methods like Array.filter. Those methods have to do with filtering out elements from collections rather that text formatting. When it comes to text formatting it does not always have to be done this way of course, but it seems like it might be the best choice if I am using vuejs as part of the stack compared to any other way to go about doing so.