---
title: Conditional Statements in Linux Bash scripts
date: 2020-12-02 10:27:00
tags: [linux]
layout: post
categories: linux
id: 753
updated: 2020-12-10 12:31:19
version: 1.11
---

In [bash scripts](/2020/11/27/linux-bash-scripts/) it is possible to define [conditional statements](https://ryanstutorials.net/bash-scripting-tutorial/bash-if-statements.php), or just simply if statements if you prefer. These statements work more or less the same as in many other languages, however the syntax is of course a little different.

if statements are ways to go about making decisions in bash scripts by having some kind of expression that will result in a true of false value. If the expression is true then additional code in the if statement will run, if not it will not. In addition there is also the option of including and else statement where some code that will only run if an expression evaluates to false. 

There are also case statements that are like what is often referred to as a switch statement in other languages. These kinds of statements can also be thought of as a kind of conditional statement in bash scripts.

<!-- more -->

## 1 - Basics of conditional statements in bash scripts

There is starting somewhere when it comes to if statements and bash scripts. This is not really a getting started post on bash scripts, but I think that I will start out this section in a way in which it can function as a getting started post. The very first sub section in this section I will be covering a very basic conditional statement if example that should function as a decent starting point even for people with zero experience writing bash scripts.

After that I will be getting into a few other very basic if statement examples for conditionals in bash. If you think that you all ready have a solid grasp on the very basics of if statements in bash, you might choose to skip this section to get to a few more advanced examples later in this post.


### 1.1 - Basic if statement example

First off I am going to start out with a very basic example of a bash script that just contains a single if statement. This if statement uses and expression with the -gt option to test if one variable is greater than another. If so a custom message will echo out to the standard output. In any case the message done will be echoed out to the command line.

```bash
#!/bin/bash
 
a="10"
b="5"
if [ $a -gt $b ]; then
    echo "${a} IS greater than ${b}"
fi
echo "done"
```

If I then save this as something like gt.sh and then use chmod to make the file executable I can then run it directly without calling bash first.

```
$ chmod 755 gt.sh
$ ./gt.sh
10 IS greater than 5
done
```

So that is the basic idea of an if statement. You start off with the if keyword followed by an expression enclosed within square brackets. After that I must have a then keyword at which point I can do whatever it is that I want to do if the expression evaluates to true. In then just need to close the if statement by inverting the letters in if.

However there is much more to write about, even when it comes to a basic if statement example such as this. the square bracket syntax is a kind of shortcut for the use of the test command. The test command itself deserves a section in this post, and maybe even a whole post by itself actually.

However for now there is just a bit more to write about when it comes to the very basics of if statements, such as the use of the else keyword. So lets look at a few simple examples of an if statement before moving on to some more advanced topics.

### 1.2 - Else

Another Basic feature of an if statement is the use of else in the statement. This is a way of defining some additional code that will only fire in the event that the expression evaluates to false. So once again if I take the above simple example of an if statement and just adjust the value of the a variable so that the value is now lower than b, then the code right after the opening if statement will not fire. I can then use the else keyword between the code that would have fire if the expression is true and then ending inverted if statement that will only fire when the expression is false.

```bash
#!/bin/bash
 
a="3"
b="5"
if [ $a -gt $b ]; then
  echo "${a} IS greater than ${b}"
else
  echo "${a} IS NOT greater than ${b}"
fi
echo "done"
```

So this works as expected.

```
$ ./gt-else.sh
3 IS NOT greater than 5
done
```

So the else statement is a way to close off two sets of code one set that will fore if the expression is true, and another set of code that wil run only when the expression is false. If I want some code to always fire no matter what I can just place that outside of the if statement.

## 2 - The Test command

In this post I think that it is important to at least mention a few things about the test command. The test command is what is used in if statements to evaluate an expression to find out if it is true or not. In the event that you take the time to just directly play with the test command in a bash shell you will note that it will not spit out anything into the standard output. That is because the test command does not do anything then it comes to the standard output like many other commands, however what it will do is exit with a code of zero if the expression is true, and it will exit with a code of one if it is not. This exit code is then stored in a special variable that can then be used as a way to log what the result is. So starting to play around with the test command in the bash shell should actually be a combination of two commands one of which is test, and the other is echoing the value of the variable that will hold the result of the test.

in other words something like this:

```
$ test 3 -gt 10; echo $?
1
$ test 12 -gt 10; echo $?
0
```

When it comes to bash scripts, and programs in general an exit code of zero means that the program ended without any kind of error happening. That is that the program ran and everything when just fine, all is good. An exit code of a value that is anything other than zero means that something went wrong. So when it comes to using the test command it is all about what the exit code is.

### 1.1 - A text command bash script

After playing around with the test command in the bash shell manually one might want to create a bash script that will echo out the results of a whole bunch of different expressions.

```
#!/bin/bash
 
a=$( test;echo $? )
b=$( test 1 -gt 5;echo $? )
c=$( test 10 -gt 5;echo $? )
 
echo "${a} - ${b} - ${c}"
```

When it comes to translating anything worked out with the test command into an expression for an if statement, generally it is just a process of dropping the test command and enclosing the expression into the square brackets that are used in if statements.


## 3 - A Argumnets Defaults Example of an If Statement

Now for an actual example that might prove to be helpful. This example will not just make use of an if statement but also functions in bash also. Functions are another helpful aspect of bash scripts that allow for the creating of reusable blocks of code in a bash script.

This if statement example will just look at some arguments inside the body of a function. In the event that the first argument is an empty value then a given default value as the second argument will be echoed back. Otherwise the given value as the first argument will be what is echoed back.

```
#!/bin/bash
 
# give a positional argument for first argument,
# and a default value for the second, the function
# will echo back the argument or default value
opt_default(){
  result=$1;
  default=$2;
  if [ -z $result ]; then
    echo -n $default
  else
    echo -n $result
  fi
}
 
a=$( parse_opt $1 0 )
b=$( parse_opt $2 0 )
 
echo $(( $a + $b ))
```

So then this kind of function that makes use of an if statement can be helpful when it comes to working out a simple script that expects some positional arguments. However will still give a default value of some kind if zero or just one of the two arguments is given.

```
$ chmod 755 option_defaults.sh
$ ./option_defaults
0
$ ./option_defaults 2
2
$ ./option_defaults 5 3
8
```

## 4 - Conclusion

So there might be a fare amount more to write about when it comes to if statements and bash scripts. I think that I was able to cover at least some of the basics to say the least, but there is much more to write about when it comes to some typical expressions. On top of that there is a whole world of examples that I could write about when it comes to practical application of if statements in bash when used with all the other little aspects of the scripting languages and the whole world of what is to work with with Linux commands. However maybe a great deal of all of that is called for in another post.
