---
title: regular expressions in Python
date: 2021-01-20 15:06:00
tags: [python]
categories: python
layout: post
id: 785
updated: 2021-01-20 15:12:09
version: 1.0
---

When working with source code and text in general there are times where i will want to know if a substring is in a string or not. Other times I will want to know a bit more then just if there is a substring, but one or more substrings. Also I might want to know even more about the state of a substring such as the starting and ending index values for each match. Also there might be times now and then where I am not looking for a fixed, static substring, but a pattern that might have some degree of variation, but follows a kind of reason.

There are a number of options when it comes to looking for a substring in a string. If I just want to know if there is a given fixed substring in a string or not there are some simple basic options to do that and just move on. However when it comes to doing something more advanced for situations in which doing so is called for, such as creating a lanaguge tokenizer, then I might need to get into using regular expressions.

<!-- more -->
