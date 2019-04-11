---
title: Onchange event handler in action.
date: 2019-01-04 12:27:00
tags: [js]
layout: post
categories: js
id: 355
updated: 2019-04-11 10:36:31
version: 1.9
---

The [onchange](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onchange) event hander is for attaching call backs that will fire when the content of an input element changes. This is one of many events that a javaScript developer should be aware of when making any kind of client system that involves the use of html input tags. In this post I will be going over some quick examples of the onchange event in client side javaScript.

<!-- more -->

## 1 - onchange event example

For a simple example of the onchange event hander here is a simple example that uses document.querySelector to get references to an input tag, and a paragraph tag. When the text of the text input element changes the event fires, and the value of the input element can be used to update the output that is set in the paragraph element.

```html
<html>
    <head>
        <title>on change</title>
    </head>
    <body>
        <input class="pow" type="text" placeholder="4">
        <p id="out"></p>
        <script>
 
        var inputPow = document.querySelector('input.pow'),
        out = document.querySelector('#out');
 
        // set to the giver power
        var set = function(pow){
            out.innerText = Math.pow(2,pow);
        };
 
        // set the new power when input changes
        inputPow.addEventListener('change', function(e){
           set(e.target.value);
        });
 
        // start out at placeholder
        set(inputPow.placeholder);
 
        </script>
    </body>
</html>
```

When adding an event listener for the onchange event with addEventListener the first argument is the event that I want to attach for, in this case it is onchange. The second argument is a call back method that will fire each time this event occurs for the input element. the first argument that is suppled to this callback method is an [event object](https://developer.mozilla.org/en-US/docs/Web/API/Event) that can be used to gain the value of the element from which the event fired. 

In this event object I am using the target property of the event object as a way to gain a reference to the input element as well. In this example it is not a big deal to just use the inputPow global, however in a more complex project that involves a lot of elements it is often better to use the target property inside the body of a callback method as a way to gain access to the element from which an event like onchange as fired.

## 2 - Setting onchange for many elements

For a more advanced example of the onchange event, it made a quick little app that can be used to estimate the amount of money that a blog can make if the revenue per mille, and page views counts are known. In this example I am attaching the same event handler for more than one input element.

So I just have a simple html file that has some input elements for rpm and pageviews, and then I am linking o an external javaScript file that makes use of the onchange event to update the output via the inner text of a div element each time the value of the rpm or pageviews input elements changes.

```html
<html>
    <head>
        <title>on change</title>
    </head>
    <body>
        <div id="controls">
            <input class="rpm" type="text" placeholder="1.95">
            <input class="pageviews" type="text" placeholder="20000">
        </div>
        <p id="out"></p>
        <script src="onchange.js"></script>
    </body>
</html>
```

Here I have the code in my onchange.js file that makes use of the onchange event to update the text each time a change event fires. I have a state object that holds the current values for money, pageviews and rpm.

```js
var state = {
    onChange: function (e) {
        state[e.target.className] = e.target.value;
        state.figure();
    },
    figure: function () {
        this.money = this.rpm * (this.pageviews / 1000);
        document.getElementById('out').innerText = 'money: ' + this.money;
    }
};
 
[].forEach.call(document.getElementById('controls').children, function (el) {
    if (el.nodeName == 'INPUT') {
        el.addEventListener('change', state.onChange);
        state[el.className] = el.placeholder;
    }
});
 
state.figure();
```

Here I am using Function.call to use the Array.forEach method as a way to loop over the children property of my controls div. This is necessary if I want to use an Array method like Array.forEach with the children property becuase it is not an Array but rather an HTMLCollection.