---
title: javaScript and select tags
date: 2019-09-04 15:10:00
tags: [js]
layout: post
categories: js
id: 530
updated: 2021-10-23 14:03:58
version: 1.24
---

When working out some kind of interface for a client side javaScript project [select tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) are often used to give the user a range of options to choose from with additional [option tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option) nested in a select tag. In other words the use of select tags along with option tags will result in a drop down menu of sorts, where one option might serve as a default of sorts along with at least one other option.

There might be other ways of doing so that involve a canvas element, and some additional javaScript code to make some kind of more artful solution for selecting something from a range of options. However the select tag is a nice quick solution for doing something to that effect with other html elements outside of that of the canvas element, and the 2d drawing context. Making something from the ground up for this will often prove to be a bit more flashy, and allow for a greater deal of control when it comes to selecting things, but it will also prove to be far more time consuming also.

A select tag or select element consists of a select tag and then a few nested option tags for each option in the selection tag. There are a few things to be aware of when it comes to using this kind of html element in a project when it comes to making it actually do something with javaScript. There are events such as the on change event, and additional html attributes that come into play also. So lets look at some select element examples, and also touch base one other related topics when it comes to events, and other elements and attributes that will come into play when working with such an element.

<!-- more -->

## 1 - Select tag basics

So the basic idea with select tags is to have a single select element, and then a nested option element for each option in the selection element. By default the inner text of the option element will be the value property of the select element, however it is advisable to have a separate display value, and actual value. 

So when I set an on change event listener to the selection element the value of the selection element will change each time the user selects one of the options in the select element drop down menu. In addition I can define what I want to happen in the body of that event listener when it comes to what needs to happen each time the user changes something with the select tag menu.

So then in this section I will be starting out with some basic examples of the select tag. I will be trying to keep these examples fairly simple, but I still assume that you have at least some background with javaScript. If you are totally new it might be best to start out with some [getting started type post on javaScript](/2018/11/27/js-getting-started/). In additional to just the very basics it might also be a good idea to read up more on events in terms of [event objects](/2020/07/23/js-event-object/), and the various kinds of events that can be attached for when create [event listeners](/2019/01/16/js-event-listeners/).

### - The source code examples here are on Github

I have the source code examples I am using in this post stored in my [test vjs Github repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-select-tag). Which is also where I store all my other source code examples for my various [other posts on vanilla javaScript](/categories/js/).

### 1.1 - Just display the current select value

So for starters here is a fairly simple copy and past select tag example. I have a span element the text of which will be set to whatever the value of the select tag is. In then have three option elements for the select tag each of which have some inner text that will be the value for the select tag if the option is the one selected. I then have a simple set disp method that when called will just set the inner text of the disp element to the value of the select element. I then make my set disp method the handler for the [on change event](/2019/01/04/js-onchange/) for the select element, and also call it once for starters right away to make sure that it is set to the current value of the select element right away before any other option is selected.

```html
<html>
    <head>
        <title>javaScript select tag</title>
    </head>
    <body>
        <span>Option: </span><span id="disp"></span><br><br>
        <select id="selections">
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
        </select>
        <script>
// get references to select tag, and disp span
var select = document.getElementById('selections'),
disp = document.getElementById('disp');
// setDisp method
var setDisp = function (e) {
  disp.innerText = select.value;
};
// call setDisp on every change event for the select tag
select.addEventListener('change', setDisp);
// call setDisp once for starters
setDisp();
        </script>
    </body>
</html>
```

### 1.2 - The value and selected attributes of option tags

So by default the value of the select tag will be the inner text of the current option element that is selected. However the value can be set to something else by way of the value attribute of the option element. So then the value of an option can be used to set some other value from the inner text of the option. So then the inner text can be used for a display name, and the value can be used as some kind of id for the selection option.

On top of the value attribute of the option elements there is also the selected attribute that is worth mentioning also. This attribute can be used as a way to set a default option in the collection of options other than the first child element.

So once again here is the same example as before, just with some additional changes by way of adding value attributes, and having an option other than the first one serve as a starting option for the select tag.

```html
<html>
    <head>
        <title>javaScript select tag</title>
    </head>
    <body>
        <span>Option: </span><span id="disp"></span><br><br>
        <select id="selections">
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3" selected>Three</option>
        </select>
        <script>
var select = document.getElementById('selections'),
disp = document.getElementById('disp');
var setDisp = function (e) {
  disp.innerText = select.value;
};
select.addEventListener('change', setDisp);
setDisp();
        </script>
    </body>
</html>
```

This is helpful because in many situations I might want to actually value of the select element to be some kind of simplified key value for an object. However this key value might not be a good description of what the option is in plain English, so it is good to have two sets of info per option tag.

## 2 - The disabled attribute and select tags

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

So select tags in combination with option tags are the standard html way of creating an interface where a user can select from two or more options. It is often used with additional events such as the on change event to define what happens when the state of the select tag changes.

In this post I did not cover every little thing about select tags though, there is much more to cover when it comes to making a select tag that is to sever as a way to interact with a back end system.