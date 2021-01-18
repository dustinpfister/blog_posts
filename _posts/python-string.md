---
title: Strings in python
date: 2021-01-18 15:24:00
tags: [python]
categories: python
layout: post
id: 783
updated: 2021-01-18 14:53:01
version: 1.3
---

One of the many basic data types of a programing lanague is the [string data type](https://en.wikipedia.org/wiki/String_%28computer_science%29), this post will be just a quick overview of [strings in python](https://docs.python.org/3.7/library/string.html). A string can often be considered a sequence of characters, so they are often used as a way to store text values, however they can also often be used to store an array of values like that of a list.

<!-- more -->

## 1 - basics of strings in python

Well I ahve to start somewhere when it comes to learning a thing or two about strings in python. In this section I will just be going over a few quick basic examples of strings. There is just creating a string literal value for starters, but then there are other basic things that I should have solid when it comes to learning about strings in a new lanague such as pythion. One thing that comes to mind with this is concatanation of strings, there is also the qusition of how to go about convertuing a string of a number to an actual number data type, and much more just when it comes to the basics. So lets get this part out of the way so i can move on to the good stuff.

### 1.1 - Basic string example

```python
str='hello world'
print( type(str).__name__ ); # 'str'
print( str )                 # 'hello world'
```
