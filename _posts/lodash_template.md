---
title: lodash template
date: 2019-04-05 14:27:00
tags: [js,lodash]
layout: post
categories: lodash
id: 411
updated: 2022-01-18 11:25:20
version: 1.18
---

The [lodash template](https://lodash.com/docs/4.17.11#template) method is one way to go about creating and using templates to turn javaScript code into formatted html, and other formates as well for that matter. When making any kind of web based project with javaScript there will often be a need to take some data that is retrieve from a server for example and then present that data to the user in some way such as a canvas, or html view. The lodash template method is then one of a wide range of options for this sort of thing, and even if the lodash template method is not used a lot of other ways of doing this sort of thing work in a similar way. 

Another application that come to mind is making a project that can be described as a static site generator. One of the aspects of a static site generator is that plain text, or markdown source files need to be converted into HTML and injected into an HTML page.

This is where methods like the \_.template method in lodash can be useful, so lets take a look at some lodash template method examples.

<!-- more -->

## 1 - lodash template basic example

So a basic lodash template involves passing a string that will be the template as the first argument to the \_.template method. This string can contain one or more delimiters that are used to inject data from an object when using the method that is returned when calling the \_.template method.

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

## 3 - Using javaScript in a lodash template

It is also possible to use a little javaScript code in the template as well when needed. This can be used to help loop over arrays, as well as create results that are the result of some kind of expression as well.

### 3.1 - javaScript that returns something \_.every example

So here I have some arrays of booleans and I want  the result of an \_.every call to be part of the result in the template.

```js
comp = _.template('all passed: <%- _.every(tests) %>'),

tests1 = comp({tests:[true,true,true]}),
tests2 = comp({tests:[true,false,true]});
 
console.log(tests1); // 'all passed: true'
console.log(tests2); // 'all passed: false'
```

So then what will be render as the result of a delimiter like that of the escape delimiter does not have to always be just an object property it can be the result of a method like \_.every that returns true then all elements in an array are truthy.

### 3.2 - Looping and evaluate delimiters

So when I do not use an equal sign or dash when making an opening pointy bracket that can be called an evaluation delimiter when can be used to embed javaScript into the template, and combine doing so with an escape or interpolate delimiter.

```js
comp = _.template('<% _.forEach(cans,function(can){ %><span><%- can %><\/span><br><%});%>'),
 
html = comp({
        cans: ['beens', 'peas', 'carrots']
    });
 
console.log(html);
```

## 4 - Vanilla javaScript altertaives to the lodash template method

Although it is true that there are a lot of lodash methods that still bring some functionality to javaScript that is not built into the core f javaScript itself, when it comes to modern javaScript specs there is not that much that remains at this point. There are a few options built into late specs of javaScript that can also be used to do things that are very similar to that of what the lodash template function does. With that said in this section I will be going over a few features that are now built into core javaScript as well as various javaScript environments such as client side javaScript that can also possible be used as options for creating and using templates in a project.

### 4.1 - Back Ticks, AKA Template Literals, AKA Template Strings

One of many options to take into account would be [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) which might also often be referred to as Template strings, or just simply backticks.

```js
// simple template function using back ticks
var template = (mess) => {
    return `<p>${mess}</p>`;
};
 
var html = template('Hello World');
console.log(html); // <p>Hello World</p>
```

### 4.2 - Template elements in client side javaScript

When it comes to client side javaScript specifically there are also [template elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template).

```html
<html>
  <head>
    <title>Template Element Hello World</title>
    <style>
.wrap_mess{ color: red;}
    </style>
  </head>
  <body>
    <h1>Template Element Hello World</h1>
    <template id="messTemplate">
        <p class="wrap_mess">
        </p>
    </template>
    <script>
// feature test
var hasTemplates = function(){
    return 'content' in document.createElement('template');
};
// if we have templates
if (hasTemplates()) {
    var template = document.querySelector('#messTemplate');
    var clone = template.content.cloneNode(true);
    clone.querySelector('.wrap_mess').innerText = 'Hello World';
    document.body.appendChild(clone);
}else{
    document.write('This web app requires support for Template Elements. Please use a more up to date web browser.');
}
    </script>
  </body>
</html>
```

## 5 - Conclusion

So the lodash template method is useful for creating and using templates. However it is not a replacement for other options when it comes to doing this sort of thing. In most applications I might use some dependency outside that of the lodash template method to preform these kinds of tasks. For example when it comes to parsing markdown into HTML I would use [marked.js](/2017/11/19/nodejs-marked/), and when it comes to parsing a JSON string into a workable object I would use the JSON.parse method, and the JSON.stringify method to do the inversion of this, that is turning an object into a JSON string.

Also I like vuejs a lot, and of course when it comes to using that framework on the front end there is [working with templates with vuejs](/2019/05/07/vuejs-template/).
