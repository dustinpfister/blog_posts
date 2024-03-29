---
title: Get the parent element in client side javaScript
date: 2019-02-21 18:37:00
tags: [js]
layout: post
categories: js
id: 388
updated: 2021-11-29 11:10:55
version: 1.55
---

This is a post on getting a parent HTML element of a given child element with native client side javaScript. To cut quickly to the chase with this one, when it comes to vanilla javaScript alone, there are two element object properties of concern with this which are [parentElement](https://developer.mozilla.org/en/docs/Web/API/Node/parentElement) and [parentNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode). The two of these more or less do the same thing but with just one little subtle difference. As the name suggests the parent element property will only return html elements, and thus will not return any parent node that is not an html element, however the parent node property will.

If you do not care at all about supporting Internet explorer, there is a new element method called [closest](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) which can be used as a way to get the closest element that matches a given query string. It then goes without saying that this method is yet another tool in the toolbox when it comes to this sort of thing, and it is also a little more versatile beyond just getting the parent element of an element. There are pollyfills, but it might still be best to just use the older properties if you just simply want to get the parent element and not much of anything else.

I might also touch base on some other related topics as well when it comes to a chain of elements from document up to a given element as well, that is getting all parent elements of a given node. There is also of course the various options that can be used to get an element reference to begin with also, and the fact that these options are also a way of getting a parent element reference and references in general. So there is a bit of ground to cover when it comes to getting really into what all the options are, however I will be keeping the basic stuff that will work well at the top of this post.

<!-- more -->

## 1 - First off el.parentElement, and el.parentNode

First off there are the el.parentElement, and el.parentNode properties that come to mind when it comes to the first solution for getting the parent element of an element or node in general in client side javaScript. So the basic process is to first get a reference to the element to which I want to find the parent for, any method for doing so will work find for that such as [document.getElementById](/2018/12/27/js-document-getelementbyid/) or [document.querySelector](/2020/06/23/js-document-queryselector/) whatever works when it comes to getting an node reference to begin with to which one would like to get a parent node of. Once that has been obtained the parentElement or parentNode properties of an element of interest will refer to the parent element of that element if it has one. There are some slight difference between the two options, and there are also a whole lot of other options, but for the sake of this basic getting started type section these two options should work fine in most of not all situations.

So then in this section I will just be getting to some quick simple examples of these options for getting a reference to a parent element or node in general. I also often use this section to go over any additional topics of interest before reading the rest of the post, so these examples will touch base on various other topics that should help you if you are still new to javaScript. However this is still not a [getting started with javaScript type post](/2018/11/27/js-getting-started/), so if you are still really new to javaScript you might want to start there first.

### These source code examples, and much more are in my test vjs guthub repository

The source code examples in this post can be found in my [test vjs github repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-get-parent-element) as is the case with all of my other posts on vanilla javaScript. At the source code folder I might have examples that are a little more up to date compared to what I have here, also that is a good place to make a pull request.

### 1.1 - Get parent element AKA DOM NODE if there is one

Once a reference to an element is gained by use of a method like getElementById or querySelector, there is the parentElement property of the element reference if it has one. This property is there to get a parent DOM element rather than a node in general, as there are some kinds of nodes that are often used that are not really actual html elements, such is the case with things like SVG. Tis then is the main different between parent element and parent node, the node property is more general and should work with nodes in general and not just standard html elements that are part of an html spec.

```js
<html>
    <head>
        <title>parent element example</title>
    </head>
    <body>
        <div class="wrap">
            <div id="gamearea"></div>
        </div>
        <script>
var ga = document.querySelector('#gamearea'),
container = ga.parentElement;
console.log(container.className); // wrap
        </script>
    </body>
</html>
```

In the event that the element does not have a parent element, or the parent element is not a DOM element the property will have a [value of null](/2019/03/11/js-javascript-null/). This might be desired in some cases as the value of null will evaluate to false and can then be used as a way to break out of looping for example. 

In the event that the node is not a DOM node it will return null, this would make sense because the name of the property is indeed parent element, so if the parent is NOT A DOM Element, but some other kind of node then it should return false. If for some reason I want to use another property that will work with nodes in general then there is the parent node property which might be a more robust option for this sort of thing.

### 1.2 - Parent Node for getting any kind of node.

Another option is the parent node property, this works in more or less the same way as parentElement but with one note worthy difference. If there is a non DOM element node of sorts it will give that in place of what would otherwise be a null value when using the parent element property.

```js
<html>
    <head>
        <title>parent node example</title>
    </head>
    <body>
        <script>
var el = document.getElementsByTagName('html')[0];
console.log(el.parentElement); // null
console.log(el.parentNode); // #document
        </script>
    </body>
</html>
```

So then these are the two main properties of interest when it comes to getting a parent element with native javaScript by itself, but there are of course event more ways of getting a parent element. Maybe for whatever the reason I do not just want a single element but the whole tree of elements. So lets look at some additional examples of this task.

## 2 - The closest method for getting parent nodes with a query string

So a modern option now is the closest element method that works on most modern browsers. One draw back though is that it will get the closest element that matches the query string including the element from which it is called. So it may not work out so well when it comes to getting the parent element depending on the situation, and how it is used. However I think that it is of course work mentioning here in this post, as the method strikes me as a more flexible way of getting elements near a target element of interest. There is of course going beyond just getting that parent element, and being able to get any element that meets a given query that is near a given element regardless if it is a parent or a child element.

```html
<html>
    <head>
        <title>closest example</title>
    </head>
    <body>
        <div id="f1" class="foo">
            <div id="b1" class="bar">
                <div id="b2" class="bar">
                    <div id="fb1" class="foobar"></div>
                </div>
            </div>
        </div>
        <script>
var el = document.getElementById('fb1');
var parent = el.closest('.bar');
console.log( parent.id ); // 'b2'
parent = el.closest('.foo');
console.log( parent.id ); // 'f1'
        </script>
    </body>
</html>
```

## 3 - Loop back over all parent elements

So for now I am not aware of any native browser method that can be used to get all the parent elements of a given element, but it is not to hard to write one. Once way to do so would be to write a method that will take a child element, and a function to call for each parent until a return value of the function is true. So in this section I will be going over the source code of a loop parents method, and a few use case examples of such a method.

### 3.1 - loop back method

First off here is an example that makes use of a loop back method that I have made that is [based off of an example that I found while doing research for this post](https://stackoverflow.com/questions/6856871/getting-the-parent-div-of-element/6857116#6857116). The method works by taking a child element reference as the first argument, and then it will fire a for parent method for each parent node until the return value of the for parent method is true, or until a null value is reached for a parent node value.

```html
<html>
    <head>
        <title>parent node example</title>
        <meta name="google" content="notranslate" />
    </head>
    <body>
        <div id="wrap">
            <div id="header">
                <div id="logo"></div>
            </div>
        </div>
        <script>
// loop parents function
var loopParents = function (el, forParent) {
    var node = el,i = 0;
    while (node != null) {
        node = node.parentNode;
        if(node){
            if(forParent.call(node, node, i, el)){
                return false;
            }
        }
        i += 1;
    }
    return true;
};
// getting ref to logo div
var logo = document.getElementById('logo');
// looping back all the way
loopParents(logo, function(el, i, child){
   console.log(el.nodeName, i, child.id);
});
// loop back until body
loopParents(logo, function(el, i, child){
   if(el.nodeName === 'BODY'){
       return true;
   }
   console.log(el.nodeName, i, child.id);
});
        </script>
    </body>
</html>
```

This method can then be used in a whole range of different ways depending on what it is that I want to get when it comes to looping down the list of parent elements. In this example alone I have two use case examples that are doing to separate things one of which is looping back all the way and logging the results to the console, the other is stopping when the body element is reached. With that said the rest of this section will just be different use case examples of this method, and using it to create additional methods for specific situations.

### 3.2 - Get an array of all parent nodes

Now that is have a decent loop parents method I can use this method to create another method that will return an array of all parent elements. This can be done by just creating a new array in the body of a function that will take a single element as an argument that is the child element to loop back from. I then call my loop parents method passing this child argument as the first argument for that method, and in the for parent method I just push the elements into the array. Once done I just return the array that will contain all the parent elements. After that I can use any additional array prototype method to filter, or preform some kind of action for each parent element.

```html
<html>
    <head>
        <title>parent node example</title>
        <meta name="google" content="notranslate" />
    </head>
    <body>
        <div id="wrap">
            <div id="header">
                <div id="logo"></div>
            </div>
        </div>
        <script>
// loop parents function
var loopParents = function (el, forParent) {
    var node = el,i = 0;
    while (node != null) {
        node = node.parentNode;
        if(node){
            if(forParent.call(node, node, i, el)){
                return false;
            }
        }
        i += 1;
    }
    return true;
};
// get all parents method
var getAllParents = function (child) {
    var parents = [];
    // loop back until body
    loopParents(child, function(el, i){
        if(el){
            parents.push(el);
        }else{
            return true;
        }
        return false;
    });
    return parents;
}
var el = document.getElementById('logo');
getAllParents(el).forEach(function (el) {
    console.log(el.nodeName, el.id || '');
});
// DIV header
// DIV wrap
// BODY
// HTML
// #document
        </script>
    </body>
</html>
```

I can use this loop parents method to create an array of all the parents if I want to. However what I really have in mind with this is to have a method where I loop back until I find what I want. Often I might just be looping for one parent element that meets a given condition rather than building an array of elements without any additional conditions other than it just being an element or node in general. So then with that said maybe at least a few more examples of this method are called for.

## 3.3 -  Get a parent by node name method

In this example I am not once again using the loop parents method to loop over all the parent nodes from a starting child node. This time I am looking for a parent node that has a given tag name such as a div element. So when I call the loop parents method I am looking at the node name property of each parent node, and in the event that the parent node name is the name I am looking for that parent node will be returned. The default value for the parent is the null value, and this is what will be returned in the event that there is no match for the given tag name.

```html
<html lang="en-US">
    <head>
        <title>get parent by tag</title>
        <meta name="google" content="notranslate" />
    </head>
    <body>
        <div id="f1">
            <div id="b1">
                <ul id="u1">
                    <li id="li1">foo</li>
                    <li id="li2">bar</li>
                    <li id="li3">baz</li>
                </ul>
            </div>
        </div>
        <script>
// loop parents function
var loopParents = function (el, forParent) {
    var node = el,i = 0;
    while (node != null) {
        node = node.parentNode;
        if(node){
            if(forParent.call(node, node, i, el)){
                return false;
            }
        }
        i += 1;
    }
    return true;
};
// get parent by tag
var getParentByTag = function(child, tagName) {
    var parent = null;
    // loop back until body
    loopParents(child, function(el, i){
        if(el.nodeName === tagName.toUpperCase()){
            parent = el;
            return true;
        }
        return false;
    });
    return parent;
};
 
var li = document.getElementById('li3');
console.log( getParentByTag(li, 'div').id ); // 'b1'
        </script>
    </body>
</html>
```

Making a variation of this that looks at the class name property would not be so hard as well. In such a case I would want to do more or less the same thing that I am doing here only I would be looking at the class name property of each parent element.

## 4 - Parent Elements and Event bubbling

So a related topic of interest when it comes to getting parent elements is the subject of [event bubbling](https://en.wikipedia.org/wiki/Event_bubbling), when it comes to working with [event handlers](/2019/01/16/js-event-listeners/), and the various properties of the [event objects](/2020/07/23/js-event-object/) that can be worked with inside of such event handlers. When an element is clicked for example it will fire an on click event that is set for that element, but it will also bubble up to the top most parent element and fire event handlers all the way up unless this is stopped. So then it is possible to set an event listener for a parent element, and then if any child element is clicked that event handler will fire. Inside the body of the event handler the target property of the event object should refer to the child element, and the current target property should refer to the parent element. So then in this section I will be going over some code examples that explore this related topic of interest when it comes to getting references to one or more parent elements.

### 4.1 - basic example of getting parent and child references in an event handler

To start this off just take a moment to look at a fairly simple example of what this is all about. Say I attach and event handler to a parent element such as the body element of a page for the click event. Whenever any element in the body of the document is clicked, that will result in the event handler firing. Inside the body of this event hander I can access the event object, and it is the target, and current target properties of this event object that are of interest.

```html
<html>
    <head>
        <title>Get parent element on event</title>
    </head>
    <body>
        <div id="wrap" style="width:640px;height:480px;background:red;">
            <div id="header" style="height:120px;background:green;">
                <div id="logo" style="width:120px;height:120px;background:blue;"></div>
            </div>
        </div>
        <script>
var onClick = function(e){
    console.log(e.target); // the element that was clicked
    console.log(e.currentTarget ); // the element this handler is attached to
};
document.body.addEventListener('click', onClick);
        </script>
    </body>
</html>
```

So when it comes to event handers the target property of the event object will refer to the element where the event happened and the current target property will refer to the element where the event handler is attached. In most cases I would assume then that the current target property of the event object would be the parent, and the target property would be the child.

### 4.2 - Attach to parent method example

Now for a more advanced example of this that may help to really show how these properties are helper when it comes to attaching just a single event handler to a parent element. This time I am making a single for parent child method that can take a for child method, a for parent method, and a for only array of string values that can be used to set what child elements to call the for child method for for each client event that happens for a parent element and all children of the parent to which this method is used with.

When calling this for parent child method the first argument is a parent element, or a query string that can be used to get a parent element to attach a main event hander to. The second argument is then an options object that can contain an array of string values that can be used to find out if a for child method should be called or not. With that said this options object can also be used to set what the for child method is, and a for parent method can also be attached that will always fore for each event.

```js
<html>
    <head>
        <title>Get parent element on event</title>
        <style>
#wrap_main{
  width:640px;height:480px;background:black;
}
#wrap_header{
  height:120px;background:green;
}
#wrap_logo{
  width:120px;height:120px;background:blue;
}
#wrap_content{
  width:360px;height:auto;background:red;
  margin: 20px;padding:20px;
}
.block_div{
  display:inline-block;width:64px;height:64px;background:cyan;
  margin:10px;
}
canvas{
  display:inline-block;width:64px;height:64px;background:black;
  margin:10px;
}
        </style>
    </head>
    <body>
        <div id="wrap_main">
            <div id="wrap_header" class="custom_action">
                <div id="wrap_logo"></div>
            </div>
            <div id="wrap_content">
                <div class="block_div custom_action"></div>
                <div class="block_div"></div>
                <div class="block_div custom_action"></div>
                <canvas width="64" height="64"></canvas>
            </div>
        </div>
        <script>
var forParentChildren = function(parent, opt){
    opt = opt || {};
    opt.forOnly = opt.forOnly || ['*']
    opt.forChild = opt.forChild || function(){};
    opt.forParent = opt.forParent || function(){};
    // if parent is a string assume it is a query string to get one
    if(typeof parent === 'string'){
        parent = document.querySelector(parent);
    }
    // the listener
    var listener = function(e){
        var callForChild = false,
        child = e.target,
        i = opt.forOnly.length;
        while(i--){
            // if first char === '*' set true and break
            if(opt.forOnly[i][0] === '*'){
                callForChild = true;
                break;
            }
            // if first char === '.' check className prop
            if(opt.forOnly[i][0] === '.'){
                var classNames = child.className.split(' '),
                ci = classNames.length;
                while(ci--){
                    if('.' + classNames[ci] === opt.forOnly[i]){
                        callForChild = true;
                        break;
                    }
                }
            }
            // if first char === '#' check id prop
            if(opt.forOnly[i][0] === '#'){
                if(opt.forOnly[i] === '#' + child.id){
                    callForChild = true;
                    break;
                }
            }
            // check node name
            if(opt.forOnly[i].toUpperCase() === child.nodeName.toUpperCase()){
                    callForChild = true;
                    break;
            }
        }
        // call forChild only if e.target is not e.currentTarget
        if(child != e.currentTarget && callForChild){
            opt.forChild.call(e, child, e.currentTarget, e, opt);
        }
        // always call forParent for what should be the parent element at e.currentTarget
        opt.forParent.call(e, e.currentTarget, e.currentTarget.children, e, opt);
    };
    parent.addEventListener('click', listener);
};
// using the method
forParentChildren('#wrap_main', {
   forOnly: ['.custom_action', '#wrap_logo', 'canvas'],
   forChild: function(child, parent, e, opt){
        var colors = ['orange', 'white', 'lime'],
        style = colors[Math.floor(Math.random() * colors.length)];
       // change color if div
       if(child.nodeName === 'DIV'){
           child.style.background = style
       }
       if(child.nodeName === 'CANVAS'){
           var box = child.getBoundingClientRect(),
           x = e.clientX - box.left,
           y = e.clientY - box.top,
           ctx = child.getContext('2d');
           //child.width = 64;
           //child.height = 64;
           ctx.beginPath();
           ctx.fillStyle = style;
           ctx.arc(x,y,5,0, Math.PI * 2);
           ctx.closePath();
           ctx.fill();
       }
   },
   forParent: function(parent, children, e, opt){
        //console.log(parent.id)
   }
});
        </script>
    </body>
</html>
```

When this example is up and running when I click any child of the main warp div that I attached to that is a div that applies to any of the rules set with the for only array the color of that div will change. When I click a div that is a child that does not apply to any of the roles then the for child method will not fire. Also I made it so that when the canvas element is clicked I draw circles to it.

So maybe I went a little overboard with this example, I then to do that now and then, but I wanted to have at least one examples that helps to really showcase why something like this is helpful when working out certain kinds of system where I want to get references to parent and child elements when some kind of event happens.

## 5 - Other possible future ways with querySelector

As of this writing there is no css selector that I know of that can be used to get a parent element, so there is no way of getting a parent element with querySelector. There is of course chatter about possible future selectors and pseudo classes that might be a way to do so, but so far nothing solid or well supported.

## 6 - Conclusion

So getting the parent element of an html element reference is just a matter of choosing an option for doing so. There are two main properties that come to mind one of which will work with just html elements, and the other will work with nodes in general for the most part. There are many other ways of doing so, but for the most part there are just those two properties that can be used to just do so and move on. 

In some cases I might want to do something that is a little more advanced and for that it is not so hard to use the fact that these properties return null as a way to get out of a loop where I just keep setting the current value of a node variable to the value of of the previous nodes parent node property. There is then making a simple loop parents method that will take a function to call for each parent method, and then this kind of method can be used in all kinds of different ways to address just about any issue that might come up when it comes to the need to looking into parent elements.

