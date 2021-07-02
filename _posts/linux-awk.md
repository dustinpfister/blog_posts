---
title: Linux awk command for text processing
date: 2021-07-02 08:43:00
tags: [linux]
layout: post
categories: linux
id: 902
updated: 2021-07-02 10:54:02
version: 1.17
---

The [Linux awk](https://en.wikipedia.org/wiki/AWK) command is another command like that of [grep](/2020/09/14/linux-grep/) as it would seem that it is mainly used for text pattern matching tasks. However it would also seem that awk is more or less a full programing language also, although I can not say that this is a language that is widely uses these days. 

The pattern matching and replacement tasks that are typically done with awk can also be done with other Linux commands such as grep, and also such tasks, and much more can be done with more modern scripting languages such as nodejs, and python. The Awk language is very much a language, and as such it can also be used to preform general programming tasks, but I am pretty sure I would prefer to do anything like that in another language. It would seem that awk is more or less just a kind of grep on steroids that can to pattern matching, preform all kinds of actions with those matches, and even general programing tasks. 

Still for the sake of just writing more on various Linux commands, and leaning more about what there is to work with in a typical Linux system, I thought that I would take a moment to come up with a few hello world type examples of awk. aIt would also be nice to write a quick post on this subject, as well as maybe a few more examples that have to do with pattern matching, and working with text in general in a Linux system.

<!-- more -->

# 1 - Basic Linux awk command

For a basic example of the awk command I will be using the [Linux echo](/2019/08/15/linux-echo/) command as a way to create some standard output to which I can then [pipe into the standard input](/2020/10/09/linux-pipe/) of awk. This text that I am piping into awk is two lines, and I am just using awk to print the first word of each line.

```
$ echo -en "text output \nsample text \n" | awk '{print $1}'
text
sample
```

So one way to use awk is to just call the command, and just use a single print command with \$1 which is a special variable that will be the first field for each line of text.

## 2 - Match static pattern

Typically what I would want to do with awk is to filter out all lines except lines that contain some kind of pattern. In this example I am looking for a fixed static text pattern, and I only want the lines that contain that pattern.

```
$ echo -en "text output \nsample text \n" | awk '/output/ {print}'
text output
```

Although something like this might work okay for just finding the first instance of a pattern there is still the question of finding all instances of a pattern for each line, and there is also how to go about looking for patterns that are not static. Also I would like to know how to get just the text that is the match, rather than the full line. So lets look at a few more examples to see how to go about getting some of those things worked out.

## 3 - Match only digits of each line

So I covered an example where I am printing lines that contain a given pattern, but what if I just want to have the text of the match rather than the full line. One way to go about doing this would be to use the match function with a patten, and then use the sub string function with the RSTART and RELENGTH variables.

```
$ echo -en "abc hhh\n123 fgh\nxdf\nzxy 456" | awk 'match($0,/[0-9]+/) {print substr($0,RSTART,RLENGTH)}'
123
456
```

So now things are starting to get a little involved, but this is still a fairly simple one liner type program. There is still a bit more that I might like to do beyond this though, for example this will work with what I want it to do, but only with the first match per line. What if I want to do something for all patten matches for all lines? Well of course there is a way to go about doing that with awk, this is a full scripting language after all, but now I am going to want to maybe get into something that involves arrays, and other advanced features of the language.

## 4 - Conclusion

I am not sure if I really want to get into learning awk in detail when it comes to every little function, and feature of the language though. Although it is true that awk is there to work with in just about any Linux system, typically I can install and work with a more modern scripting language such as javaScript, or Python, and the kind of tasks that I would typically do with awk can of course be done with those languages.

One question that comes to mind is of awk is to text processing and python is to data science? If so maybe getting into learning a thing or two more about awk is not such a bad thing if I really want to get into text processing type work. However even if that is the case this is still the kind of thing that I can do in other languages that are far more popular, and prove to be better environments for many things other than just text pattern matching type tasks. It is not like I cant do more than just text processing with awk, it does seem to be a full scripting language, but it was really just made for working with text. I can not say that I would want to make any kind of real, serious, production application with awk in place of languages like python, javaScript or C.
