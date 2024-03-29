---
title: lodash template
date: 2019-04-05 14:27:00
tags: [js,lodash]
layout: post
categories: lodash
id: 411
updated: 2022-01-18 11:49:10
version: 1.24
---

The [lodash template](https://lodash.com/docs/4.17.11#template) method is one way to go about creating and using templates to turn javaScript code into formatted html, and other formates as well for that matter. When making any kind of web based project with javaScript there will often be a need to take some data that is retrieve from a server for example and then present that data to the user in some way such as a canvas, or html view. The lodash template method is then one of a wide range of options for this sort of thing, and even if the lodash template method is not used a lot of other ways of doing this sort of thing work in a similar way. 

There is a wide range of various projects and ideas for applications that come to mind where some kind of template system might be called for. One example of an application that came to mind for might right away is making a project that can be described as a static site generator. One of the aspects of a static site generator is that plain text, or markdown source files need to be converted into HTML and injected into an HTML page. However there are also all kinds of other application where a developer would want to go with at least some kine of template system.

This is where methods like the \_.template method in lodash can be useful, However there are a whole lot of other options to be aware of when it comes to this sort of thing. There are other libraries and also frameworks such as VUEJS that might prove to be a better options for templates. These days there are also a whole lot of native options for templates built into javaScript itself, so lets take a look at some lodash template method examples, but also touch base on some other options for this sort of thing.

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

## 4 - Vanilla javaScript alternatives to the lodash template method

Although it is true that there are a lot of lodash methods that still bring some functionality to javaScript that is not built into the core f javaScript itself, when it comes to modern javaScript specs there is not that much that remains at this point. There are a few options built into late specs of javaScript that can also be used to do things that are very similar to that of what the lodash template function does. With that said in this section I will be going over a few features that are now built into core javaScript as well as various javaScript environments such as client side javaScript that can also possible be used as options for creating and using templates in a project.

### 4.1 - Back Ticks, AKA Template Literals, AKA Template Strings

One of many options to take into account would be [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) which might also often be referred to as Template strings, or just simply backticks. Although these might often be called a kind of string, they are not, and can not be used in with any kind of function that might call of a string. Also when creating a template function with a Template Literal a string value might not always be what is returned, that of course depends on how one goes about creating the final return value of the function just like any other kind of function.

For a simple hello world style example of Template Literals there is just creating an arrow function, or any kind of function for that matter and have a single argument for that function that will be a message. There is then using the return keyword in the body of the function to return a template literal starting with an opening back tick \` then before a closing back tick create what the template should be. When doing so I can define what is called a placeholders by using the dollar sign character and then place a value that I want in that are of the template between a set of opening and closing curly brackets.

```js
// simple template function using back ticks
var template = (mess) => {
    return `<p>${mess}</p>`;
};
 
var html = template('Hello World');
console.log(html); // <p>Hello World</p>
```

### 4.2 - Template elements in client side javaScript

When it comes to client side javaScript specifically there are also [template elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) that are yet another built in option for templates. What is great about this is that it allows for me to define templates right along with the hard coded HTML of a web page. When doing so the template by itself will not render, but it can be used with just a little javaScript code as a way to create content with the template element.

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

So the lodash template method is useful for creating and using templates. However it is not a replacement for other options when it comes to doing this sort of thing. In most applications I might use some dependency outside that of the lodash template method to preform these kinds of tasks. For example when it comes to parsing markdown into HTML I would use [marked.js](/2017/11/19/nodejs-marked/), and when it comes to parsing a JSON string into a workable object I would use the [JSON.parse method](/2020/02/28/js-json-parse/), and the JSON.stringify method to do the inversion of this, that is turning an object into a JSON string.

When it comes to [using nodejs](/2017/04/05/nodejs-helloworld/) and working out a sever side script of some kind I have to say that chances are I would not end up using the lodash template method to do so. If I am making a quick script from the ground up in a nodejs environment there are the native Template Literals that work well in just about all versions of node that I care about at this time. Also when it comes to working in a framework more often than not that framework would be express, and with that I would use a [render engine like EJS with express as a template system](/2019/04/25/express-view/).

When it comes to client side development I have come to like VUJS a whole lot, and of course when it comes to using that framework on the front end there is [working with templates with vuejs](/2019/05/07/vuejs-template/). Yet another options when it comes to working in vuejs would be to use [render functions](/2019/05/12/vuejs-render/) that prove to be more flexible allowing for a great deal of control when creating a view for a data object in vuejs.
