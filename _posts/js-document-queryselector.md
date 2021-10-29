---
title: document querySelector method and other ways of getting references to elements in javaScript
date: 2020-06-23 10:17:00
tags: [js]
layout: post
categories: js
id: 670
updated: 2021-10-29 11:52:09
version: 1.17
---

In late specs of client side javaScipt there is now the [document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) method as well as another method called [document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) in the [document object](/2021/10/29/js-document/) in client side javaScript. The query selector method can be used to get a single element by way of an id, class name, or tag name. The query selector all method works in a similar way but can be used to get a collection of elements rather than just one. So these methods are yet another way to go about getting a reference to a single element, or an HTMLCollection that is a kind of array of elements.

For the most part using this method is safe as of this writing, unless for some reason you want to have support for older browsers that are not used that often any more. There are other options that I find myself still using just for the hell of it, for example if I do just want to get an element by id then I still find myself using [document.getElementById](/2018/12/27/js-document-getelementbyid/) to do so. Still the querySelector method works well at getting at an element not just by id t, but also in an array of different ways other then that of just an id property value of an element.

I thing that it is not a good idea to get caught up in this nit puck issues though, regardless if query selector is used, or a more tired yet true option, the end result is the same. One way or another I want to gain a reference to an element, or a collection of elements.

<!-- more -->

## 1 - The basics of Document.querySelector, and Document.querySelectorAll

If you are familiar with jQuery then you will like document querySelector as a way to gain references to an element. This allows for a wide range of possibilities for gaining accesses to dom elements. An element reference can be obtained by Id, class, and tag name. In addition there is also the document querySelectorAll method that works more or less the same, but as you would expect returns a collection of elements rather that just a single element.

### 1.1 - Query selector will return a single element reference

The query selector method will return an element reference just like a method such as document.getElementById. This differers from other methods that might return a collection of element references. So if I want to get a reference to an element such as by an id, or any unique value, then the query selector method works just fine. However if I want to get an element reference by way of something such as tag or class name that may present a problem as there will often be more than one element in the dom that will meet that kind of query criteria.

```html
<html>
    <head>
        <title>document querySelector</title>
    </head>
    <body>
        <div id="foo"></div>
        <p id="out"></p>
        <script>
var el = document.querySelector('#foo');
el.style.width = '320px';
el.style.height = '320px';
el.style.background = 'black';
        </script>
    </body>
</html>
```

So there are element reference objects, and then there are collections of these such objects. If I do just want an single element reference then maybe the regular query selector method will work just fine. However in most cases I will want to use a method that will give me a collection of elements rather than juts a single element object. With that said on top of the query selector method there is also the query selector all method.

### 1.2 - Query Selector all will return an HTMLCollection

The query selector all method will not return a single element reference, but an [NodeList collection](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) of element or node references. A NodeList is like an array, but it will not have the same prototype methods.

There are two kinds of NodeLists one type is call and alive NodeList where changes to the dom will automatically update the content of the NodeList. However the kind of NodeList that query selector all returns is a static NodeList.

```html
<html>
    <head>
        <title>document querySelectorAll </title>
    </head>
    <body>
        <span class="foo">one</span>
        <span class="foo">two</span>
        <span class="foo">three</span>
        <p id="out"></p>
        <script>
var foos = document.querySelectorAll('.foo'),
out = document.querySelector('#out')
 
// query selector all returns a NodeList
// while query selector returns an element
console.log( foos.constructor.name ); // 'NodeList'
console.log( out.constructor.name ); // 'HTMLParagraphElement'

out.innerText =  foos[1].innerText; // two
 
        
        </script>
    </body>
</html>
```

If you do not care at all about backward compatibility with other browsers that do not support these methods that one can just go ahead and use these methods as a way to get references to elements. Still there are other options when it comes to getting references to elements. I do still find myself using document.getElementById, and not always just because it has better backward compatibility. When I do just want to get an element by way of an id attribute it still woks just fine, and it makes the code more clear.

## 2 - The tired yet true get element by id method

The tired yet true way of getting a reference to a single element by way of an id attribute is the get element by id method. I do often still find myself using this method as a way of getting a reference to a single element if there is an id for it.

```html
<html>
  <head>
    <title>Demo</title>
  </head>
  <body>
    <div id="foo"><p>bar</p></div>
    <script>
 
    var el = document.getElementById('foo');
    console.log( el.children[0].innerText ); // bar
 
    </script>
  </body>
</html>
```

Of course I can also get a single element by way of id using query selector, but as long as this is here there is the added advantage of it still working on older clients. I can not say that it is an issue that concerns me that much these days when I look at the browser stats of this website at least. However I still find myself using this method over all others just for the hell of it anyway.

## 3 - The tired yet true get elements by tag name

Another option for getting at element references is the [get elements by tag name](https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName) method. This method is like query selector all in the sense that it will return a collection of element references rather than a single element. However it will only get collections by tag name as the same suggests, so it is limited in that regard. However one note worthy difference is that it will return an [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) rather than a NodeList.

```html

<html>
  <head>
    <title>Get By Tag Name</title>
  </head>
  <body>
    <div>one</div>
    <div>two</div>
    <div>three</div>
    <script>
 
    var html = document.getElementsByTagName('div');
    console.log(html.constructor.name); // 'HTMLCollection'
    console.log( html[0].innerText ); // 'one'
 
    </script>
  </body>
</html>
```

## 4 - Get an element from a window relative point position

The document get element from point method can be used to get the top most element at a given window relative position. To use this method I just need to call the document.elementFromPoint method and pass the position that I want to check for an element. In the event that there is an element there, it will be returned.

```html
<html>
    <head>
        <title>Demo</title>
        <style>
div{
    position: absolute;
    background: gray;
}
        </style>
    </head>
    <body>
        <div style="left:0px;top:0px;width:100%;height:100%;">
            <div style="left:32px;top:50px;width:50px;height:50px;background:red;">
        <div>
        <script>
var div = document.elementFromPoint(35, 52);
div.style.background = 'lime';
        </script>
    </body>
</html>
```

## 5 - Conclusion

So the document query selector method is one way to go about getting a single element in an HTML document. In addition there is also the query selector all method that can be used to get a collection of elements. One down side is that these methods have not been around as long as other options that there are to work with in client side javaScript, but if your sites browser stats show that it is safe to just go ahead and use them, maybe code will not break for that many visitors.

Another thing to remember is what it is that is returned by these methods. There might be this expectation that the methods that return collections will return an array of elements references and therefor there are array prototype methods like map that can be used with them. This is not the case with HTMLCollections and NodeLists there is a whole separate collection of prototype methods to work with when it comes to these kinds of collections.