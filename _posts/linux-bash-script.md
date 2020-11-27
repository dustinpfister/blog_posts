---
title: Linux Bash Scripts
date: 2020-11-27 11:44:00
tags: [linux]
layout: post
categories: linux
id: 750
updated: 2020-11-27 13:13:00
version: 1.4
---


In a Linux system it pays to know a thing or two about [bash scripts](https://ryanstutorials.net/bash-scripting-tutorial/bash-script.php). A bash script is a way to take a bunch of commands and place them in a text file, the text file can then be called with the bash command, or be made exacutabule by adding a bash shebang at the top of the file, and then using the chmod commnad to set the permissions of the file so that it is exacutabule, thus the script can be called dirrectly.

In any case bash scripts are a way to take a task consisiting of one or more commands that one might find themselfs repating often and pull the string of commands into a file that can then be called just once. There are then ways to edit various configuration files to make it so that the bach scripts can be called from a terminal window with just a single command name. Although it might be outside the scope of this post there is also the idea of making the script run each time a system starts, or to act as some kind of service.

Bash is not the most capabule langaue when it comes to programing, but it is a way to interact with Linux commands inclusing commands such as node which allows for running javaScript code. There is also wriring ones own commands with node, or any other perfered programing enviorment and using bash as a way to tied things togeather.

In this post I will be going over the very basics of bash scripts though, and will be linking off into other topics as needed. So this is a getting started post, but also a general index post on all things bash script related that I have written about thus far.

<!-- more -->

## 1 - Basic bash script example

In this section I will be going over a very basic example of a bash script that just makes use of the Linux echo command to log hello world to the console.

### 1.1 - A hello.sh file

First off I will want to have a plain text file that I will be calling with the bash command. I start off these files with the shebang for the bash command. This is not needed if I intend to call bash first always, however if I want to make the script exacutabule I will want to have it there. After the shebang I just call the echo command, and place the string Hello world after that closed off in double quotes.

```
#!/bin/bash
echo "Hello World"
```

So then I just need to save this text as something like hello.sh, and then I am ready to call the script from the command line.

### 1.2 - Call the file with bash

One way to call the script would be to call the bash command and pass the path to the file as the first argument.

```
$ bash hello.sh
Hello world
```

What is nice about this is that I do not have to bother with the shebang syntax at the top of the file if I do not want it there for whtever the reason becuase I am calling bash direcly. I also do not have to wory about permission settings for the file as long as I can read file file at least.

### 1.3 - Use chmod to make the file exacutabule

Another way to call the script would be to make the script exacutbule with the chmod command. Once I do that I can call the script directly because of the shebang that I placed at the top of the file.

```
$ chmod 755 hello.sh
$ ./hello.sh
Hello world
```

I will not be getting into the chmod command in detail here as I have wrote a post on the chmod command before hand. However this is the basic idea, becuase a bash script is a plain text file there needs to be a way to tell bash with binary to use in order to run the script. So I just need to place the path to bash in the top of the bash script with the shebang syntax shown in the hello.sh file above. I can the use chmod to make the script and when calling the script directly that shebang will be used toi find the binary to run the script which in this case is bash. However this can be used with any langaueg that does not involve using a combinl;ar to create a binary, another lanague that comes to mind is javaScript, in that case the shebang should point to node.