---
title: Arrays in Linux Bash scripts
date: 2020-12-07 13:16:00
tags: [linux]
layout: post
categories: linux
id: 756
updated: 2020-12-07 16:08:25
version: 1.7
---

Arrays in [bash scripts](/2020/11/27/bash-scripts/) can be indexed or associative. There is a simple syntax that can be used to create indexed arrays with ease, and the declare bash built in command can be used to create associative arrays. These are the two kinds of arrays that are supported in bash, and there is no support of multidimentional arrays in bash.

There is not just the question of how to go about creating an array in bash, but there is also how to go about looping over them, and prefrom all kinds of various tasks that one might be familout with in other lanagues. Keep in mind that there is much that is lacking when it comes to things like class methods for example. However the basic functionalituy that one might exspect in a langaue such as bash is very much there.

<!-- more -->

## 1 - Create Indexed Arrays

There are several ways to create indexed arrays where each element of the array has a numbered rather than named key value. In this section I will just be quckly going over a few ways to go abotu creating these kinds of arrays in bash. In the process of doing so I will also be touching base on basic curly bracket paramater expansion which is the way that one will want to go about accessing elememt values of an array once one is created.

### 1.1 - bracket syntax

One pretty simple way to go about creating a basic indexed array is to just use a bracket syntax with a variable name. That is just create a simple variable as always, but just place an opening and closing set of square brackets at the end of the variable name and before equals. Then place the desired index value for the element that will be assignined for that index in between the square brackets.

```bash
#!/bin/bash

# One way to create an array is to just use a square 
# bracket syntax like this:
arr[0]="one"

# additional elements can be added by just changing
# the index value
arr[1]="two"
arr[2]="three"

# curly bracket parameter expansion is your friend
# when it comes to accessing values
echo $arr # "one"
echo ${arr[1]} # "two"
echo ${arr[@]} # "one two three"
```

Simple enough, but there are a few other ways to go about creating an array in the first place. Aslo this is just one example of how to create an indexed array, if I want to create an associtaive arary it can not be done this way.

### 1.2 - expression syntax

Expressions are another way to create indexed Arrays. This is just placing the desired values for each element in between a set of parentises with a space used as a way to seperate them.

```bash
#!/bin/bash
 
# another way is to create an expression
# like this:
arr=("one" "two" "three")
 
echo $arr # "one"
echo ${arr[1]} # "two"
echo ${arr[@]} # "one two three"
```

## 2 - Create associative Arrays

To [create an associative](https://www.linuxjournal.com/content/bash-associative-arrays) array the declare bash built in command can be used with the -A option to do so. Once that is done the process of adding elements is the same as indexed ones, only I just give a named key value rather than a numbered one.

```bash
#!/bin/bash
 
# must use declare with the -A option
# to create an Associative array
declare -A arr
arr["one"]="1"
arr["two"]="2"
 
echo ${arr[@]} "2 1"
```

## 3 - For in loops and arrays in bash Scripts

So now that I got the basics out of the way whe it comes to creating arrays, maybe not I should cover how to go about looping over the contents of them with for in loops. There are just a few simple examples to cover whe it comes to the basics of using this kind of loop with arrays that mainly just have to do with looping values, and looping key names of Arrays.

### 3.1 - Looping over an Indexed Array with a for in

When it comes to looping over the values of an indexed array there is just using the curly bracket syntax with the at symbol when it comes to the value after typeing in.

```bash
#!/bin/bash
 
files=('file1' 'file2' "file3")
for fileName in ${files[@]}; do
    echo ${fileName}
done;
```

### 3.2 - Looping over an Associcative Arrays values with braces paramater expansion 

To loop over the values of an an Associcative array I just need to do more or less the same thing as I would with an indexed Array.

```bash
#!/bin/bash
 
declare -A files
files["main"]="./main.js"
files["state"]="./lib/state.js"
files["draw"]="./lib/state.js"
 
for fileName in ${files[@]}; do
    echo ${fileName}
done;
```

### 3.3 - Get key value pairs of an Associcative Array with braces paramater expansion and a little variable indirection 

So the same bash code can be used to get values with any kind of array, but what if I want to get [bolth key values as well as the names](https://stackoverflow.com/questions/3112687/how-to-iterate-over-associative-arrays-in-bash). To get bolth key values as well as the key names a little variable indirection as it is called in the bash man page can be used.

```
#!/bin/bash

declare -A files
files["main"]="./main.js"
files["state"]="./lib/state.js"
files["draw"]="./lib/state.js"
 
echo -e "\n"
for keyName in ${!files[@]}; do
    echo "key: ${keyName}"
    echo "value: ${files[$keyName]}"
    echo -e "\n"
done;
```

## 4 - Conclusion

Of course the best source on Arrays in bash, and using bash in general might be to check out the [man page on bash](https://linux.die.net/man/1/bash). Of course the man page is one real long sucker and it can take a while to read through the whole thing, but if you really want to learn bash that will be the man source.

There are a number of other [posts on Arrays in bash](https://opensource.com/article/18/5/you-dont-know-bash-intro-bash-arrays) on the open internet of course also where the topic is just on arrays alone though. Also it is ture that a man page does not always do the best job of convarying something, and it can never hurt to have more actaul examples of a certian something with bash.