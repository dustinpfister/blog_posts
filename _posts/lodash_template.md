---
title: lodash template
date: 2019-04-05 14:27:00
tags: [js,lodash]
layout: post
categories: lodash
id: 411
updated: 2019-04-05 16:38:26
version: 1.7
---

The [lodash \_.template](https://lodash.com/docs/4.17.11#template) method is one way to go about creating and using templates to turn javaScript code into formatted html, and other formates as well for that matter. When making any kind of web based project with javaScript there will often be a need to take some data that is retrieve from a server for example and then present that data to the user in some way. This is where options like the \_.template method in lodash can be useful, so lets take a look at some lodash template examples.

<!-- more -->

## 1 - lodash template basic example

So a basic lodash template involves passing a string that will be the template as the first argument to the \_.template method. This string can contain one or more delimiters that are used to inject data from an object when using the method that is retruned when calling the \_.template method.

```js
let comp = _.template('(<%= x %>,<%= y %>)'),
 
str = comp({x:47,y:15});
 
console.log(str); // '(47,15)'
```

In this basic example I am using the interpolate delimiter that is an equal sign before and opening pointy bracket and percent sign pattern. This kind of [syntax is similar to ejs](/2017/12/07/nodejs-ejs-javascript-templates/) a popular template language used in node.js related projects as a way or writing templates.


## 2 - lodash template interpolate and escape delimiters

There is a significant dereference between using an equals (interpolate) sign and a dash (escape) when delimiters. For the most part when creating a template I would want to use the equal sign so that tags are made in a way that will render in the browser. However in some cases I would want to use a dash so that the resulting string is escaped.

```js
let init = _.template('<div><%= html %></div>'),
esc = _.template('<div><%- html %></div>'),
 
obj = {
    html: '<script>console.log(\'boo\');<\/script>'
},
 
str = init(obj),
str_esc = esc(obj);
 
console.log(str); 
// '<div><script>console.log('boo');</script></div>'
console.log(str_esc); 
// '<div>&lt;script&gt;console.log(&#39;boo&#39;);&lt;/script&gt;</div>'
```

## 3 - Using javaScript

### 3.1 - javaScript that returns something

```js
comp = _.template('all passed: <%- _.every(tests) %>'),

tests1 = comp({tests:[true,true,true]}),
tests2 = comp({tests:[true,false,true]});
 
console.log(tests1); // 'all passed: true'
console.log(tests2); // 'all passed: false'
```

### 3.2 - Looping

```js
comp = _.template('<% _.forEach(cans,function(can){ %><span><%- can %><\/span><br><%});%>'),
 
html = comp({
        cans: ['beens', 'peas', 'carrots']
    });
 
console.log(html);
```