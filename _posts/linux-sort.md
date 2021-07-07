---
title: Sort lines of text in Linux with the sort command
date: 2021-03-09 11:15:00
tags: [linux,js]
layout: post
categories: linux
id: 819
updated: 2021-07-07 14:04:00
version: 1.18
---

The [Linux sort](https://man7.org/linux/man-pages/man1/sort.1.html) command is a way to go about sorting lines of text by some kind of index value that is in each line. For example say I am using the Linux ps command to get a long list for each process running on a system, and I want that list sorted by how much memory each process is using, the Linux sort command can help me with that kind of task.

So to use the Linux sort command first I need some output that I can pipe into the Linux sort command. This output can be from a command like the ps command, ls command, and so forth. In addition it can also be some text in a file that I can open with something like the cat command and pipe to the Linux sort command. In any case the text does need to be in a Linux friendly format where each field is separated by a space, and each line is terminated with a line feed. Most Linux commands do this to begin with, however in some cases the output might have to be formated for sort first.

<!-- more -->

## 1 - Basic Linux sort examples using the Echo Command

I will be starting out with some basic examples of the Linux sort command using the Linux Echo command, and also some basic piping. If you are not familiar with the Linux echo command it is a basic command tool for just creating some standard output from the command line that I can then pipe to the standard input of another command, such as the Linux sort command.

The Linux echo command is one of the first commands that a new Linux user should be aware of when it comes to learning a thing or two about bash, along with commands such as cd, ls, and so forth. I Will not be getting into the echo command in detail here as I have wrote a post on it. You should also know a thing or two about piping in Linux also, which is another topic that Linux users should get up to speed right away if they have not done so all ready.

So then if you have a basic working knowledge of echo and piping the focus here will be more so on the sort command then. Echo is just a good command for generating some basic test output to pipe to the sort command.

### 1.1 - Just using sort by itself

If I want to I can just use the Linux sort command by itself without any options. Doing so will work just fine actually if it just so happens that it is the first field of each line that I want to sort by. With the [Linux echo](/2019/08/15/linux-echo/) command I can create some standard output that is just a bunch of lines of numbers each of which end with a line feed by using the -e option and the /\n syntax to create the line feeds. If I then pipe this standard output to the Linux sort command the result will be those lines of numbers sorted by the value of each number.

```
$ echo -e "2 \n7 \n8 \n3 \n5 \n9 \n1 \n6 \n0 \n4" | sort
0
1
2
3
4
5
6
7
8
9
```

So then there you have the basic idea of the Linux sort command for what it is worth. However there is a bit more to cover when it comes to lines of output where there is another field or key of interest that I want to sort by, there is also how to go about sorting by names rather than numbers, how to go about reversion the order of the sort, and so on. So maybe at least a few more basic examples that make use of the echo command are called for.

### 1.2 - Using the key option

So then say that I have some output where there is more than one field or key per line separated by whitespace for each key. By default the sort command will sort by the first key in such lines, but what if i want to sort by another key? For this there is the -k option of sort. I just type the option followed by a number from 1 upward where 1 is the first key, 2 is the second key, and so forth.

```
$ echo -e "0 42 \n1 17 \n2 9 \n3 100" | sort -k 2
```

Many Linux commands such as ls and ps will spit out this kind of output, there are often ways of changing the format of the output with these commands to make them spit out a desired value for the first key, but it is nice to have this option never the less.

### 1.3 - Reverse the order

There is then the matter of how to go about reversing the order of something. If the sort is working as expected and I just want to reverse the order of the sort then doing so is as simple as just using the -r option. The -r option will just simply reverse the order of a sort.

```
$ echo -e "1 \n2 \n3"
1
2
3
$ echo -e "1 \n2 \n3" | sort -r
3
2
1
```

### 1.4 - Random Sort

Another thing that might come up now and then is to have a randomized sort. For this there is the uppercase -R option that will not reverse the sort, but give a random sort order. For example say I want to have a simple command that will just return a random 0 or 1 in a bash script. One way to do so would be to use echo to create two lines one with the number 0 and another with the number one. That text can then be piped to the Linux sort command with the -R option, and then that output can be piped once again to yet another useful command called the head command that I can then use to just output the first line of the random sort of these two lines.

```
$echo -e "0 \n1" | sort -R | head -n 1
```

### 1.5 - General Number sort option

In some cases I might need to use the general Number sort option to sort by a number value. In some cases the sorting of a number value will still make sense, but from an alphabetical way rather than a value way. For these kinds of situstions there is the -g option that will fix these kinds of isshues with sorting.

```
$ echo -e " 3.1 \n15.2 \n 1.4" | sort -gr
15.2
3.1
1.4
```

## 2 - ps command example

The ps command is a command that I often find myself using to know what is going on with processes running on a Linux system. The command can be used to get just about all basic info that I would want to know about a process such as the process id, the name of the command that is running, but also things like the percentage of memory or cpu usage for each process. 

The -o option of the ps command can be used to set what the output is for the ps command, with this I can the set what the first key is for the output of each line, such as cpu usage. It is then just a matter of piping that output to sort and then setting any additional options I might want to set for the sort command. If the cpu percetange that I want to sort by is in the second key I can use the key option to set that key as what to sort by, I can also reverse the order and use the gerenal number sort. I can then pipe the output to the head command to get a top ten of processes that are eating up cpu run time.

```
ps -e -o pid,%cpu,comm | sort -k 2 -rg | head -n 10
```

With the ps command the cpu field is the percetange of cpu useage sense the process first started runing, so if you get confused as to why the percetnages are not jumping up and down with each call of somethind liek this that is why.

## 3 - Die bash script example

With the basic random sort example in mind it would be not so hard to make a die bash script that would give a value between and including 1 and 6. Just like with the random sort example I covered before hand I will just need some text that is the values that I want, one for each line, and then pipe that to sort with the -R option, then pipe that to head with the -n option set to 1.

With that said I could then work out a very simple bash script like this:

```
#!/bin/bash
 
sides="1\n2\n3\n4\n5\n6"
 
echo -e $sides | sort -R | head -n 1
```

I would then just need to save this above text as something like die.sh, and then make it executable with the chmod command. Once I do that I can just call the script directly and have a nice little die script that works as expected.

```
$ chmod 755 die.sh
$ ./die.sh
```

This might not be the most useful example, but that is okay as I just want to cover a basic bash script example of sort just for starters.

## 4 - Conclusion

The sort command then is one of several commands that I can think of that are often used together with other commands when piping things together. There is using a command like ps. or ls to end up with a long list of something and then piping it to grep to filter things down into a sorter list. However there is then piping the output once again to something that I can use to sort the results, and for that there is the sort command that seems to worm well for what I would often use if for when it comes to working out bash scripts and so forth.
