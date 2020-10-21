---
title: javaScript and select tags
date: 2019-09-04 15:10:00
tags: [js]
layout: post
categories: js
id: 530
updated: 2020-10-21 11:38:40
version: 1.14
---

When working out some kind of interface for a client side javaScript project [select tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) are often used to give the user a range of options to choose from with additional [option tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option) nested in a select tag. In other words the use of select tags along with option tags will result in a drop down menu of sorts, where one option might serve as a default of sorts along with at least one other option.

There might be other ways of doing so that involve a canvas element, and some additional javaScript code to make some kind of more artful solution for selecting something from a range of options. However the select tag is a nice quick solution for doing something to that effect with other html elements outside of canvas.

A select tag or select element consists of a select tag and then a few nested option tags for each option in the selection tag. There are a few things to be aware of when it comes to using this kind of html element in a project when it comes to making it actually do something with javaScript. There are events such as the on change event, and additional html attributes that come into play also, so lets look at some select element examples.

<!-- more -->

## 1 - Select tag basic example

Here I have a basic example of a select tag for starters. So the basic idea here is to have a single select element, and then a nested option element for each option in the selection element. By default the inner text of the option element will be the value property of the select element. So when I set an on change event listener to the selection element the value of the selection element will change each time the user selects one of the options in the select element drop down menu.

```html
<html>
    <head>
        <title>javaScript create element</title>
    </head>
    <body>
        <select id="selections">
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
        </select>
        <script>
var select = document.getElementById('selections');
select.addEventListener('change', function (e) {
  var sel = e.target;
  console.log(sel.value);
});
        </script>
    </body>
</html>
```

## 2 - The value property and select tags

So by default the value of the select tag will be the inner text of the current option element that is selected. However the value property can be used to set that to something else, and then the inner text can eb used for a display name, and the value can be used as some kind of id for the selection option.

```html
<html>
    <head>
        <title>javaScript select tag</title>
    </head>
    <body>
        <select id="selections">
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
        <script>
var select = document.getElementById('selections');
select.addEventListener('change', function (e) {
  var sel = e.target;
  console.log(sel.value);
});
        </script>
    </body>
</html>
```

## 3 - The disabled attribute and select tags

The disabled property of an select element can be used to disable a selection element, or any option in a selection tag if it is not currently applicable. For example say you are making some kind of simple game demo that contains a display object that can be controlled by an AI script, or user input. A select tag can be used to switch between the two, and depending on the current value of the first select tag another select tag can be enabled or disabled.

```html
<html>
    <head>
        <title>javaScript select tag</title>
    </head>
    <body>
        <select id="obj-control">
            <option value="ai">AI Control</option>
            <option value="user">User Control</option>
        <select>
        <select id="obj-control-user-options" disabled>
            <option value="1">keyboard only (wasd)</option>
            <option value="2">mouse only</option>
            <option value="3">mouse and keyboard (wasd)</option>
        </select>
        <script>
var sel_control = document.getElementById('obj-control'),
sel_control_useropt = document.getElementById('obj-control-user-options');
 
sel_control.addEventListener('change', function(e){
    sel_control_useropt.setAttribute('disabled', 'true');
    if(e.target.value === 'user'){
        sel_control_useropt.removeAttribute('disabled');
    }
});
 
        </script>
    </body>
</html>
```

So then the disable attribute will come into pay when working out some kind of user interface that is a little involved. Where there are whole menus that will end up being disabled depending on other settings, or the state of the application.

## 4 - Conclusion

So select tags in combination with option tags are the standard html way of creating an interface where a user can select from two or more options. it is often used with additional events such as the on change event to define what happens when the state of the select tag changes.