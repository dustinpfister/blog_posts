---
title: vue filter global level and asset options
date: 2019-05-10 09:47:00
tags: [vuejs]
layout: post
categories: vuejs
id: 440
updated: 2021-02-24 09:10:05
version: 1.36
---

In [Vuejs](/2021/02/05/vuejs/) a [Filter](https://vuejs.org/v2/guide/filters.html) can be used to help with formating tasks, and can be used when working out a simple static template. Filters differ from methods in that they can only be used in mustache interpolations and when using the v-bind directive. However using the filters option of a vue instance, and setting up global filters is a great way to go about pulling alway this kind of method from other methods that have to do with handing events, or mutating the data object that can remain in the methods option.

A [vue filter](https://vuejs.org/v2/api/#Vue-filter) can be registered at the global level, or it can be an [asset of a single Vue constructor](https://vuejs.org/v2/api/#filters) instance. So in other words like many other features in vuejs like methods, and components there can be both global and local sets of these filters. 

In this post I will be going over some use case examples of filters in vuejs, and also about filtering in general in javaScript. 
<!-- more -->

## 1 - Vue filter basics

This is a post on filters in vuejs, the popular front end javaScript framework. In vuejs filters are methods that are often used for text formating. So they are like methods, but they are not as flexible as they can only be used for formatting with a few features when working out a static template. 

Filters in vuejs might differ slightly from what you might be familial with when it comes to methods like the [lodash \_.filter collection method](/2018/05/18/lodash_filter/) or the [filter array prototype method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) in native javaScript. When it comes to vuejs a filter has to do more with filtering some text into a method that will do something to that text such as making all the letters uppercase.

### 1.1 - Get the examples here and for all other vuejs examples at my guthub repo

All the examples here as well as for all my other vuejs examples that i write about here can be [found at my test\_vuejs github repo](https://github.com/dustinpfister/test_vuejs/tree/master/public/forpost/vuejs-filter). I will not be getting into detail about how to clone down and set up the repo here as I have outlined that in detail in my [getting started post on vuejs](/2019/05/05/vuejs-getting-started/).

## 2 - Vue filter as an Vue Instance Option

When making a new instance of the Vue Constructor, one of the options that can be passed via the object that is passed as the first argument to the constructor is the filters option. The value for this filters option can be an object with one or more additional properties that each contain a method that can then be used in templates to apply filters to text values. 

So when using vuejs by calling the main constructor that is of course one way to define some filters that apply just to the single instance of the Vue Constructor, rather than a filter that might be registered globally. So in this section I will be starring out with some examples of local filters.

### 2.1 - vue filter option basic example

For a basic example of a vue filter option here I have just a filter that appends the string 'foo' to the beginning of anything that it is used with via the pipe symbol when using the mustache interpolation syntax for the text node of an element in a template. 

I just add the method that I want to the filters object that will be the value for the filters option for a Vue instance. This method that will be a filter will have one argument that is the value that will be piped into it when it is used in a template. Inside the body of the method I do whatever it is that I want to do with the value that is passed and return as the result of the filter. For this example I just append the string foo to whatever the value is and return the resulting string.

I can then use my foo filter in a template whenever I use the mustache syntax of the v-bind directive. When it comes to using the filter I start out with the value I want to filter and then use the \| symbol after the value followed by the name of the filter that I want to use. 

```js
<html>
  <head>
    <title>vue filter example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <div id="demo"></div>
  <script>
  
  new Vue({
    el:'#demo',
    template: '<p>{{ mess | foo }}</p>',
    data: {
      mess: 'bar'
    },
    filters: {
      foo : function(val){
        return 'foo' + val;
      }
    }
  });
  
  </script>
  </body>
</html>
```

The result of this example then is just having the string 'foo' appended to the value of the mess data prop value that is 'bar' resulting in the string 'foobar' being the value of the text node of the paragraph in the template. This might not be the most compelling examples, but never the less you should get the basic idea. Real examples of filters might format a number value to a string version of that number that is more expressive than just simple a number, such as placing a dollar sign in front of a number if the number is an amount of money.

### 2.2 - Filters can be chained

Filters can be chained into a line of two or more filters. This way to result of one filter can end up being the value used for the next filter and so forth. So as with the basic example where I just appended the string 'foo', I can have another filter that will append the string 'bar', and yet another that will turn the whole result to uppercase letters. A data value can be piped into the bar function, then the result of that can be piped into the bar function, and then piped into an uppercase function.

```html
<html>
  <head>
    <title>vue filter example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <div id="demo"></div>
  <script>
  
  new Vue({
    el:'#demo',
    template: '<p>{{ mess | foo | bar | upper }}</p>',
    data: {
      mess: 'what is '
    },
    filters: {
      foo : function(val){
        return val + ' foo';
      },
      bar : function(val){
           return val + 'bar?';
      },
      upper : function(val){
          return val.toUpperCase();
      }
    }
  });
  
  </script>
  </body>
</html>
```

So all kinds of filters can be made to break a complex task into a bunch of smaller steps. There are many other use cases that come to mind with this that I will be getting to in additional examples here. Such as taking a value that is an array and filtering it down into a smaller array, and then piping the result of that to yet another filter that will create a text form of the array values.

### 2.3 - Filters can be used with the v-bind directive

Typically filters are used when doing mustache interpolation in a static template. However in a static template they can also be used when creating a value for an attribute with the v-bind directive. If you are not familiar with the v-bind directive it might be a good idea to check out my post on the topic for more examples on v-bind. However the basic idea is to just a data object property or some javaScript to create a value for an attribute value.

In this example I am using the v-bind directive and a filter to create a text value for the value attribute of a button type input element.

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

### 2.4 - vue filter option array to text example

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

### 2.5 - Using Array.filter in a vue filter

If I am creating a Vue instance that has an Array as a data object value, or a prop value in a component I can maybe make some filters that will work with an array value. For example say that I have an array of objects and each object has an active property that means that it is an object in a stack of objects that is currently being used. This is something that I often do when it comes to creating an object pool for a project. Anyway I can use the Array.filter method in a vuejs filter as a way to create a new array that is then a collection of objects that just have an active prop set to true. I can then feed this array to yet another filter that will create a final text version of the array for an element.

```js

new Vue({
    el:'#demo',
    template: '<p>{{ arr | get_active | to_text }}</p>',
    data: {
        arr: [
            {active:false, mess: 'foo'},
            {active:true, mess: 'man'},
            {active:false, mess: 'chew'},
            {active:true, mess: 42}
        ] 
    },
    filters: {
        get_active : function(arr){
            return arr.filter(function(obj){
                return obj.active;
            })
        },
        to_text : function(arr){
            var text = '';
            arr.forEach(function(obj){
                text += obj.mess + ' ';
            });
            return text;
        }
    }
});
```

## 3 - Global Filters

So there is making filters that are for just a single instance of the Vue constructor, but what of you are doing something that involves more than one instance of vuejs in a page? For example say that I want a format money filter but I want to use it in more than one component or plain Vuejs instance. I could place the method into an object and then just reference that method in the filters option of any vuejs instance, but there is also a way to go about making a filter global so it will be there for any Vuejs instance.

So in this section I will be going over some examples that involve defining filters at a global level. This involves the use of the Vue.filter global api method rather than the filters Vue Constructor option. The result is then a filter that can be used across multipliable instances of Vue in a page.


### 3.1 - A Basic Global filter example

The process of making a global filter is not all that much more complected then making a local filter. The main difference is that I am just calling the Vue.filter global API function and then passing the name of the filter as the first argument. This name is a string value that would be the key value of the filter in the object that is used in the filters option when it comes to local filters. The next argument is then the function that will be used for the filter and from there everything is the same as with local filters when it comes to arguments and the return value.

For just a quick example of a global filter how about a simple answer check filter that will just check if a value that is passed to it will equal a desired value just for the sake of getting the basic idea here.

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

### 3.2 - Global Money filter example

One kind of filter that I would often want to have in a project is a filter that will take a number, or string of a number, and spit out a string that is formatted in a way that makes sense when it comes to money. That is have the number set to a fixed number of decimal places for cents, with commas for every three decimal places with the dollar amount, and of course the dollar sign added to the string.

When it comes to making this kind of feature I could work out my own solution, but this does strike me as a very common problem so there should be a quick copy and paste solution for this. I would think that there should also be some kind of standard, web browser built in solution for this sort of thing even. Well it turns out that there is and it is called the [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) object that has decent browser support by todays standards at least.

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

So then in this example I am not just using the money filter in the main vuejs instance, I am also using the filter in a component. So then there you have the basic idea of a global filter in action, I can use my filter in my main vuejs instance, but I can also now use it in all of my components, extensions, ans so forth.

I will not be getting into component design in detail here, but you should [read up more on component design](/2019/05/16/vuejs-component/) if you have not done so at this point. Components are a great way to break down what would otherwise be a very complex vuejs instance into smaller more manageable parts that can then be used in a main vuejs template or render function.

## 4 - Kelvin temp to display unit example

Maybe one real example would be to have a filter that will take a kelvin temperature unit and convert it to one of several options when it comes to a display unit. When it comes to temperatures the kelvin scale is a good scale to stick to when it comes to preforming logic that has to do with temperature values as it is a scale where a kelvin value of zero is considered absolute zero when it comes to the subject of temperature. So it makes sense to stick to that scale when it comes to business logic, but then convert to one of several options when it comes to a system that most people understand such as Celsius or Fahrenheit.

```js
    // kelvin to display unit filter
    Vue.filter('kelvinToUnit', function(kelvin, unit){
        unit = unit === undefined ? 'k' : unit;
        if(unit.toLowerCase() === 'c'){
            return String( Number(kelvin) - 273.15) + 'c';
        }
        if(unit.toLowerCase() === 'f'){
            return String( ( Number(kelvin) - 273.15) * 9 / 5 + 32 ) + 'f';
        }
        return kelvin + 'k';
    });

   // use case example
    new Vue({
        el: '#demo',
        template: '<div>' +
            '<h3>{{ kelvin | kelvinToUnit(displayUnit) }}</h3>' +
            '<h3>{{ kelvin | kelvinToUnit("f") }}</h3>' +
            '<h3>{{ kelvin | kelvinToUnit }}</h3>' +
        '</div>',
        data: function(){
            return {
                kelvin: 303.15,
                displayUnit: 'c'
            };
        }
    });
```

## 5 - Conclusion

So this this post I just wanted to work out a few quick examples of filters when using vuejs as part of a client side javaScript project. The filters in vuejs are not to be confused with other methods in other frameworks such as [lodash filter](/2018/05/18/lodash_filter/), and native prototype methods like Array.filter. Those methods have to do with filtering out elements from collections rather that text formatting. When it comes to text formatting it does not always have to be done this way of course, but it seems like it might be the best choice if I am using vuejs as part of the stack compared to any other way to go about doing so.