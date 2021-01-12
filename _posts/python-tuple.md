---
title: Tuples in Python
date: 2021-01-12 14:32:00
tags: [python]
categories: python
layout: post
id: 779
updated: 2021-01-12 14:56:05
version: 1.3
---

There are a few built in data types in python, and one such type is a tuple. Like lists a tuple is a kind of sequence type, however one major diference is that a tuple is not mutabule. So once a tuple is created, the only way to mutate values is to create a new tuple. So then a tuple might be a good choice for some kind of data that I want to remain fixed, and then I can create additional tubles, and other sequence types from these tuples.

<!-- more -->

## 1 - create a tuple

To create a tuple I just need to use a parentheses syntax where I place the values that I want in a set of openeing and closing parentheses. Just like with a list where I use a bracket syntax in place of parentheses, values need to be sepearted with commas.

```python
t=(1,2,3,4,5)
print(t[0])   # 1
print(t[2:4]) # (3,4)
```