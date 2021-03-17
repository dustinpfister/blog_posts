---
title: Doing sentiment analysis in node.js
date: 2018-02-22 18:45:00
tags: [js,node.js]
layout: post
categories: node.js
id: 157
updated: 2021-03-17 16:27:19
version: 1.4
---

A form of natural language processing can be referred to as [Sentiment analysis](https://en.wikipedia.org/wiki/Sentiment_analysis), which can be thought of as a way to get a sense of the attitude of a speaker, or writer when it comes to text content. The subject can get a little involved, but working out a basic system for getting some kind of emotional index of some text does not have to be to hard. It can just involve a database of values for common words, and use that as a way to get some kind of index value.

In a node.js environment there is an npm package called [sentiment](https://www.npmjs.com/package/sentiment) that can be used to get an emotional index value for some text content. It is very easy to use, just feed it some text, and a score can be retrieve that will help give an idea of what the emotional impact of that text is. As of the last time that I edited this post it would seem that this package is not maintained anymore. However that is not always just a bad thing, depending on what needs to happen with Sentiment analysis in a nodejs project this package might still work okay to get the job done.

<!-- more -->

## 1 - Installing

Setting up a test project for sentiment is as simple as any other npm package. There are no additional back ends that need to be installed, making it a stand alone javaScript package. So for this example I just created a new test_sentiment folder and did a usual npm init to start a new npm folder and create a package.json file. After that I just install sentiment and make use to add it to my package.json file.

```
$ mkdir test_sentiment
$ cd test_sentiment
$ npm init
$ npm install sentiment --save
```

## 2 - Why sentiment is pretty cool.

It is possible to have some fun with this one as it seems to work kind of well with the task of generating some kind of numerical score for some given text that is an inaction of positive or negative emotion.

For example consider this example.

```js
let sentiment = require('sentiment');
 
let r1 = sentiment('I hate you, and your stupid little dog too.');
 
console.log(r1.score); // -5
 
let r2 = sentiment('everything about you is just awesome, and I love your cute little dog also!');
 
console.log(r2.score); // 9
```

As you can see it seems to work pretty well oddly enough. So far any text that is hateful, or insulting ends up getting a negative score, while kind, and supportive text gets a positive score.

## 3 - Conclusion

Its easy to see why this package can be fun to play with for a while. Part of me wants to copy and past peoples comments into it can just start responding to them with a score just for the fun of it. It also goes without saying that this can also have practical uses as well, such as maybe auto flagging a comment if it actually gets a score that is low enough.