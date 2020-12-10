---
title: Linux Bash Script While loop examples
date: 2020-11-12 11:39:00
tags: [linux]
layout: post
categories: linux
id: 740
updated: 2020-12-10 12:31:20
version: 1.8
---

I think I will write at least a few posts on the [Linux bash](/2020/11/27/linux-bash-scripts/) command shell. This is a very complex topic in Linux compared to much of my other Linux content thus far on commands such as echo where there is only so much to write about.
Anyway when it comes to using bash there is not just learning how to manually enter a command or two, there is also learning how to write bash scripts, making them executable, and having them be part of a startup script, or a process of some kind. There is much to write about when it comes to this topic, but in this post I am just going to focus on [while loops](https://www.cyberciti.biz/faq/bash-while-loop/) in Linux Bash.

While loops strike me as one thing that comes to mind when it comes to learning a new language. On top of that in order to learn a thing or two about while loops with bash I am also going to need to pick up a thing or two about other aspects of bash scripts such as how to create an expression, and how to create shell variables. So while writing a thing or tow about while loops a few other topics should also come up in the process of doing so.

<!-- more -->

## 1 - Basic While loop Linux Bash examples and arithmetic binary operators

Maybe it would be best to read up on certain more basic concepts with bash scripts first such as Conditional Expressions. However if not I will be touching base on that with this basic while loop bash script example. A while loop starts with the keyword while, but then it must be followed by an expression that is contained in an opening and closing set of square brackets. Inside the square brackets is where I will want to have my expression that will evaluate to 0 or 1, or false and true if you prefer.

### 1.1 - Basic less than or equal to example

In any case lets start out with this very basic shell script example of a while loop that makes use of one of the arithmetic binary operators to work with. There are operators for equal to, not equal to, less than, less than or equal to, greater than, and greater than or equal to. For starters maybe it would be best to just start out with one of these operators such as the less than or equal to operator.

```bash
#!/bin/bash
c=0
while [ $c -le 5 ]
do
  echo "c=${c}"
  c=$(( $c + 1 ))
done
```

Inside the square brackets I am using the -le option which stands for less than or equal to. In the bash man page a full list of these can be found under Conditional Expressions. So I am using a shell variable called c with a literal of 5, and as log as c is less than or equal to file the while loop will continue to run.

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

### 1.2 - Basic equal to example

Another option when it comes to the arithmetic binary operators is the -eq option that is what I would want to use to create an equal to expression. Again I will want to have two values, one before the -eq, and one after just like all the other options to work with then it comes to using arithmetic for the expression to use with a while loop.

```
#!/bin/bash
a=0
c=1
while [ $a -eq 0 ]
do
  echo "c=${c} a=${a}"
  if [ $c -gt 4 ]
  then
    a=$((1))
  fi
  c=$(( $c + 1 ))
done
echo "done"
echo "c=${c} a=${a}"
```

Seems to work okay when I test it out.

```
$ bash basic-loop-eq.sh
c=1 a=0
c=2 a=0
c=3 a=0
c=4 a=0
c=5 a=0
done
c=6 a=1
```

## 2 - Infinite While loop example

It is possible to create an infinite loop example by just giving an empty expression. Conditions can be added in the body of the while loop, or else the only way to stop it would be to use CTRL+C or kill the process by some other means.

there are all kinds of simple scripts that come to mind that might be a good way to learn more about how to create bash scripts. However for now how about a bash script that will just keep longing the current time to the standard output.

```
#!/bin/bash
disp=foo
while :
do
  disp=$(date)
  echo "${disp} [ hit CTRL+C to stop]"
done
```

## 3 -Conclusion

I really Like Linux a lot, it is such a breath of fresh air compared to what I have been dealing with with Windows 10 these days. Just using it as a desktop operating system solution seems to be working okay for me when it comes to everything that I would consider critical when it comes to work and play.

I am interesting in taking some time to learn a whole lot more when it comes to working in a Linux operating system. When it comes to automating work I would say that javaScript is still my preferred environment to do so. However when it comes to working with just Linux itself, and not caring about making scripts that will work great across different operating systems bash seems like the best choice when it comes to working closely with Linux.

While loops are of course just one part of making bash scripts, it time I am sure that I will have more content to link to on this topic as a toy around with bash more.