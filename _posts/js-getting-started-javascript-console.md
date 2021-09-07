---
title: The JavaScript console and getting started with javaScript
date: 2019-07-29 14:15:00
tags: [js]
layout: post
categories: js
id: 510
updated: 2021-09-07 13:07:51
version: 1.17
---

In just about any web browser there is a [javaScript console](https://developers.google.com/web/tools/chrome-devtools/console/javascript) to work with for debugging, but also to test out a little javaScript code often if the console supports doing so. There are [many ways to go about getting started with javaScript](/2018/11/27/js-getting-started/), some of which require the installation of software that might not all ready be installed on the computer however, but this is often not the case when it comes to monkeying around in the javaScript console of a web browser. You see this console can be used as a way of getting started with javaScript, without installing any additional software beyond the web browser that you all ready have installed on your computer. So because of this the javaScript console might be a good starting point as anyone that has a browser like chrome installed can open the javaScript console, and start learning a thing or two about javaScript coding.

So then with the javaScript console with chrome at least there is no need to even look into editors, and javaScript related plug-ins for such editors, at least when it comes to just getting started at least. There is no need to install nodejs first, any package managers, git, or any additional special software. There is no need for any expensive software or hardware, or even to take classes when starring out with javaScript because there is so much great content for free on the open Internet way beyond the content of this post, that should go without saying naturally.

So then if you are reading this in a modern web browser such as chrome 92 or higher, that is running on top of a modern fully featured traditional desktop operating system when it comes to windows, Mac OSX or Linux, then that is all that is needed. So lets start out with the javaScript console as a way to get started learning the javaScript programing language.

<!-- more -->

## 1 - javaScript console getting started

In this post I am using the [chrome devtools](https://developers.google.com/web/tools/chrome-devtools/) javaScript console in [google chrome](https://en.wikipedia.org/wiki/Google_Chrome) 86.x. It might still be possible to use the javaScript console as a way to get started with javaScript coding in other browsers, but for the sake of the content of this post I was using chrome when I wrote this.

To open the javaScript console at any web page use Control + Shift + J and the javaScript console should appear. By default the console tab should be selected, if not for whatever reason select the console tab. There is a lot to cover when it comes to the dev tools in chrome when it comes to the other tabs of interest, but in this post I will just be covering some basics with the javaScript console.
In this section I will be going over just some very basics when it comes to starting to play around with javaScript this way. This will include some basic expressions, variables, and functions.

### 1.1 - First line of javaScript as a simple addition expression

So lets getting started with javaScript in the google chrome javaScript console by just clicking in the console window and typing in a javaScript expression. The very first line of code could be something very simple like adding to numbers together, or concatenating a string by using the addition operator to add a number to a string.

```
> 5 + 5;
< 10
5 + '5'
> "55"
```

So in the above example I entered five plus five which of course returns ten as expected, however the same does not happen when one of the operands is a string of the number five. It does not result in an error, but returns the string "55". This is because in javaScrit the addition operator is used for both addition and string concatenation.

### 1.2 - Variables

Now lets pull some variables into the mix that can be used to store a value. One way to go about doing so would be to use the var keyword. Using var might still be the best way to do so when it comes to working out some basic expressions in the javaScript console at least, I say that because using a modern alternative will require me to reload the page. There are modern alternatives such as let, and const, but getting into that here would be going off in a tangent for now at least.

```
> var n = 40;
< undefined
> n;
< 40
> n + 10;
< 50
> n = n + 60;
< 100
> n;
< 100
```

## 2 - Doing something with a page

So now that we have something basic covered lets get into something that actually does something with the page. One of the fun things about that javaScript console is that it can be used to do something involving the content of the page. Of course it will only effect the current loaded state in the browser locally, and undoing any changes is as simple as just reloading the browser. However it can still be a fun way to get started with client side web programing. In this section I will be going over some javaScript examples that can be copied and pasted into the javaScript console that do something cool with the content of the page.

### 2.1 - Concatenate all the paragraph elements in the page

There are many ways to go about getting references to one or more html elements in the page. In this example I am using the query selector all method to get all paragraph elements in the page. This method returns an HTMLCollection class instance rather than a plain old javaScript array, so in order to do anything with a javaScript array method I need to do some magic with the function call method.

```js
> document.body.innerHTML = [].map.call(document.querySelectorAll('p'), (el) => {
    return el.innerText;
}).join('<hr>');
```

The end result of pasting this into the JavaScript console is having just the paragraph elements of the page with an hr element after each paragraph. This kind of copy and paste javaScript code example can be useful for various news sites that have a load of crap that loads bogging down my system. The result is then just the text that I want to read, and nothing else at all. Also because I am replacing all the content in the page this will result in errors happening when any preexisting scripts try to inject additional content, or do anything allowing with dom manipulation as the elements they are tiring to append to are no longer there.

## 3 - Conclusion

So the javaScript console is a great way to get started with the javaScript programing language, but there are many other ways to get started with JavaScript as well. There is hand coding an html file and having some javaScript code in a script tag that can then be used via the file protocol in the web browser as well that can still work okay for some simple examples. There is also getting into nodejs and finding all kinds of ways to serve javaScript to the browser via the http protocol.

What is great about javaScript is that it can be used right away in the browser right now, but can also be used to write client systems, back end code, and even Command line tools. These days javaScript is really hot, and given the nature of the web will likely remain so for a long time, making javaScript one of the best choices for a first language.