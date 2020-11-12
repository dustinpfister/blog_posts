---
title: Linux Bash Script While loop examples
date: 2020-11-12 11:39:00
tags: [linux]
layout: post
categories: linux
id: 740
updated: 2020-11-12 12:35:21
version: 1.3
---

I think I will write at least a few posts on the Linux bash command shell. This is a very complex topic in Linux comparted to much of my other Linux content thus far on commands such as echo where there is only so much to write about. Anyway when it comes to using bash there is not just learning how to manualy enter a command or two, there is also learning how to write bash scripts, making them exacutabule, and having them be part of a startup script, or a process of some kind. There is much to write about when it comes to this topic, but in this post I am just going to focus on while loops in Linux Bash.

<!-- more -->

## 1 - Basic While loop Linux Bash example

Maybe it would be best to read up on certin more basic concepts with bash scripts first such as Conditional Expressions. However if not I will be touching base on that with this basic while loop bash script example. A while loop starts with the keyword while, but then it must be followed by an expression that is contained in an opening and closing set of squar brackets. Inside the square brackets is where I will want to have my expresion that will evalute to 0 or 1, or false and true if you prefer.

In any case lets start out with this very basic shell script example of a while loop.

```bash
#!/bin/bash
c=0
while [ $c -le 5 ]
do
  echo "c=${c}"
  c=$(( $c + 1 ))
done
```

Inside the square brackets I am using the -le option whuch stands for less than or equal to. In the bash man page a full list of these can be found under Conditional Expressions. So I am using a shell variable called c with a literal of 5, and as log as c is less than or equal to file the while loop will continue to run.

So if I save the above example as something like basic-loop.sh, and then run it with bash I will get echo called to the console six times.

```
$ bash basic_loop.sh
c=0
c=1
c=2
c=3
c=4
c=5
```

## 2 - Infinite While loop example

It is possible to create an infinite loop example by just giving an empty expression. Conditions can be added in the body of the while loop, or else the only way to stop it would be to use CTRL+C or kill the process by some other means.

```
#!/bin/bash
while :
do
  echo "infinite loops [ hit CTRL+C to stop]"
done
```

## 3 -Conclusion

I really Like Linux a lot, it is such a breath of fresh air comparied to what I have been dealing with with Windows 10 these days. Just using it as a desktop opearting system solution seems to be working okay for me when it comes to everything that I would consider critical when it comes to work and play.