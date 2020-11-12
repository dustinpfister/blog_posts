---
title: Linux Bash Script While loop examples
date: 2020-11-12 11:39:00
tags: [linux]
layout: post
categories: linux
id: 740
updated: 2020-11-12 11:56:26
version: 1.1
---

I think I will write at least a few posts on the Linux bash command shell. This is a very complex topic in Linux comparted to much of my other Linux content thus far on commands such as echo where there is only so much to write about. Anyway when it comes to using bash there is not just learning how to manualy enter a command or two, there is also learning how to write bash scripts, making them exacutabule, and having them be part of a startup script, or a process of some kind. There is much to write about when it comes to this topic, but in this post I am just going to focus on while loops in Linux Bash.

<!-- more -->

## 1 - Basic While loop Linux Bash example

```bash
#!/bin/bash
c=0
while [ $c -le 5 ]
do
  echo "c=${c}"
  c=$(( $c + 1 ))
done
```

## 2 -Conclusion

I really Like Linux a lot, it is such a breath of fresh air comparied to what I have been dealing with with Windows 10 these days. Just using it as a desktop opearting system solution seems to be working okay for me when it comes to everything that I would consider critical when it comes to work and play.