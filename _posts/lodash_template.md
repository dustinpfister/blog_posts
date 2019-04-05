---
title: lodash template
date: 2019-04-05 14:27:00
tags: [js,lodash]
layout: post
categories: lodash
id: 411
updated: 2019-04-05 14:34:21
version: 1.1
---

The lodash \_.template method is one way to go about creating and using templates to turn javaScript code into formatted html, and other formates as well for that matter. When making any kind of web based project with javaScript there will often be a need to take some data that is retrieve from a server for example and then present that data to the user in some way. This is where options like the \_.template method in lodash can be useful, so lets take a look at some lodash template examples.

<!-- more -->

## 1 - lodash template basic example

```js
let comp = _.template('(<%= x %>,<%= y %>)'),
 
str = comp({x:47,y:15});
 
console.log(str); // '(47,15)'
```

## 2 - 

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