---
title: The javaScript Option constructor and select lists in general
date: 2019-11-06 13:24:00
tags: [js]
layout: post
categories: js
id: 557
updated: 2021-04-05 07:14:33
version: 1.15
---

So now and then when I work out various projects I sometimes want to use a [select element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement) to provide an interface to select two or more option elements as a way to change some kind of application setting. Just like any other html element, these option elements can be hard coded in the html itself, but they can also be added with javaScript when it comes to dom manipulation. 

So there is the document.createElement method which is what is often used when it comes to making Option elements, or any kind of element for that matter, but there are also dedicated constructors for creating many elements in client side javaScriopt also, and Options Elements are no exception. With that said on top of the create element method there is also the [javaScript Option](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option) constructor in the window object that can be used to quickly create an option element in client side javaScript.

There are a few things to cover when it comes to option elements, there is not just how to create them, but also how to use them. In this post I will be going over some basic examples of the javaScript Option constructor, but I will also be touching base on event handers, specifically the on change event that will fire each time an option is changed for a select element. In the process of doing so I might manage to cover many other related topics when it comes to making use of these elements in a client side javaScript project.

<!-- more -->

## 1 - JavaScript Option constructor basic example.

The javaScript Option constructor can be used as an alternative to document.createElement and given the additional parameters that can be given to it, it can also result in a more concise solution when it comes to create Option elements for a select element.

Here I have some very basic example of both general options when it comes to creating an option element with javaScript, as well as some options when it comes to how to append such and element to a select element.

```html
<html>
    <head>
        <title>javaScript option</title>
    </head>
    <body>
        <select id="select_modes">
            <option>default</option>
        </select>
        <script>
// get a reference to the select method one way
// or another
var sel = document.getElementById('select_modes');
 
// there is the document.createElement method
// that can be used to create an option element
// and then append child can be used to append
// the element to the select element
var opt = document.createElement('option');
opt.innerText = 'mode2';
sel.appendChild(opt)
 
// there is also window.Option constructor
// and the first param can be used to set the
// inner text of the element.
// also the add method of a select element
// that will also work in most clients
sel.add(new Option('mode3'));
        </script>
    </body>
</html>
```

So the javaScript Option constructor is yet another constructor like that of the Image constructor that is another way to go about creating an element in client side javaScript. The basic process is create the element, add some properties to it, and then append it to an existing mount point in the actual html by gaining a reference to a parent element in this case a select element.

So now that we have the very basics out of the way lets more on to some additional simple examples about using the javaScript Option constructor, such as the additional parameter options, and event handlers.

## 2 - Parameter options for the javaScript Option constructor

Here I have a simple example of the Option constructor where I am using all the available options. This results in an option element that has an inner text value of mode2, but a value of 2, more on that when we get into events. In addition there are two boolean values that can be passed to set the option as the default option and to make it selected when the page loads in that order.

```html
<html>
    <head>
        <title>javaScript option</title>
    </head>
    <body>
        <select id="select_modes">
            <option>default</option>
        </select>
        <script>
var sel = document.getElementById('select_modes');
// params to set the innerText, value, default element boolean, and the selected boolean
opt = new Option('mode2', '2', true, true);
sel.add(opt);
        </script>
    </body>
</html>
```

In this example I am also using the add method of the select elemets as a wa to add an additional option to a hard coded select element.


## 3 - On change event for a select and options

There are many options for event handlers when it comes to working with a select element, but the typical event to use will be the [on change](/2019/01/04/js-onchange/) event. This is an event that you will want to attach to the select element, and not each option. The reason why is that it is really the select option that stores the value of interest and all the options are just simple that, optional values for the select element.

```js
var sel = document.getElementById('select_modes');
// there is attaching an on change event to the select element
// and using the value property of the select element
sel.addEventListener('change', (el) => {
    var sel = el.target; // reference to the select element
    console.log(sel.value); // the current value of the select element
});
 
var opt = new Option('mode2', '2', true, true);
sel.add(opt);
```

In this example I get the string 'default' in the console because I did not set an actual value attribute for the hard coded option, so the inner text of the element is what is used in that case. However if I select the mode2 option I get 2 as a value because I set a value for that option with the javaScript Option constructor.

## 4 - Conclusion

That is it for now when it comes to the Option constructor, as well as option elements, and the select parent element that that option elements are nested in. There is a bit to write about when it comes to everything that surrounds an option element, so in time I might get back around to this post and expand it with some more examples when and if I get to it.

