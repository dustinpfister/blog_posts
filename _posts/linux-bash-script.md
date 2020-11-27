---
title: Linux Bash Scripts
date: 2020-11-27 11:44:00
tags: [linux]
layout: post
categories: linux
id: 750
updated: 2020-11-27 15:58:42
version: 1.20
---


In a Linux system it pays to know a thing or two about [bash scripts](https://ryanstutorials.net/bash-scripting-tutorial/bash-script.php). A bash script is a way to take a bunch of commands and place them in a text file, the text file can then be called with the bash command, or be made executable by adding a bash shebang at the top of the file, and then using the chmod command to set the permissions of the file so that it is executable, thus the script can be called directly.

In any case bash scripts are a way to take a task consisting of one or more commands that one might find themselves repeating often and pull the string of commands into a file that can then be called just once. There are then ways to edit various configuration files to make it so that the bash scripts can be called from a terminal window with just a single command name. Although it might be outside the scope of this post there is also the idea of making the script run each time a system starts, or to act as some kind of service.

Bash is not the most capable language when it comes to programing, but it is a way to interact with Linux commands including commands such as node which allows for running javaScript code. There is also writing ones own commands with node, or any other preferred programing environment and using bash as a way to tied things together.

In this post I will be going over the very basics of bash scripts though, and will be linking off into other topics as needed. So this is a getting started post, but also a general index post on all things bash script related that I have written about thus far.

<!-- more -->

## 1 - Basic bash script example

In this section I will be going over a very basic example of a bash script that just makes use of the Linux echo command to log hello world to the console. This section is of course intended for people who are completely new to writing and editing bash scripts, if you have progress beyond the hello world of bash script files you might want to skip over this to get to the good stuff later on in this post.

### 1.1 - A hello.sh file

First off I will want to have a plain text file that I will be calling with the bash command. I start off these files with the shebang for the bash command. This is not needed if I intend to call bash first always, however if I want to make the script executable I will want to have it there. After the shebang I just call the echo command, and place the string Hello world after that closed off in double quotes.

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

What is nice about this is that I do not have to bother with the shebang syntax at the top of the file if I do not want it there for whatever the reason because I am calling bash directly. I also do not have to worry about permission settings for the file as long as I can read file file at least.

### 1.3 - Use chmod to make the file executable

Another way to call the script would be to make the script executable with the chmod command. Once I do that I can call the script directly because of the shebang that I placed at the top of the file. there are several ways to go about doing this will chmod, but I have come to find that I like to use the octal syntax for it. I could get into detail about that here, but that would be off topic, for now maybe it is best to just know that the values 755 will make the file executable for the owner of the file, but not others, and that the value 777 wil make the script executable for everyone.

```
$ chmod 755 hello.sh
$ ./hello.sh
Hello world
```

I will not be getting into the chmod command in detail here as I have wrote a post on the chmod command before hand. However this is the basic idea, because a bash script is a plain text file there needs to be a way to tell bash with binary to use in order to run the script. So I just need to place the path to bash in the top of the bash script with the shebang syntax shown in the hello.sh file above. I can the use chmod to make the script and when calling the script directly that shebang will be used to find the binary to run the script which in this case is bash. However this can be used with any language that does not involve using a combination to create a binary, another language that comes to mind is javaScript, in that case the shebang should point to node.

## 2 - [Bash scripts and piping commands](/2020/10/09/linux-pipe/)

One important thing to understand when getting started with bash scripts, and in Linux in general is to understand piping. In Linux and post of not all other posixs systems it is possible to pipe the standard output of one command as the standard input of another command. 

For example I can use the ls command with the all option to get a list of all files and directories in a folder. I can then pipe the result of the ls command as the standard input of grep and use that to filter out all results that do not meet a certain pattern such as not being a javaScript file. The result of grep could then be piped yet again to another command, and so forth, until I have a desired end result. That end result would then be spit out to the console, or it could be piped to a text editor, or used with redirection to create a file.

So in this section I will be going over some examples of piping and bash scripts. I might also touch based on a lot of useful commands in the process also.

### 2.1 - Basic ls piping to grep example

So for starters lets take into account the ls command. It is fairly simple command that will list the contents of the current working folder, or any folder given as an argument. However there is also a number of options for the ls command such as the list all option, and an option that will append a slash to any and all items in a listing that are folders rather than files.

So I can use the ls command to get a list of all files and folders in the home folder of the current user, with a slash for all folders like this.

```
$ ls -ap ~
./                Desktop/          gPodder/     Public/
../               .dillo/           hello.txt    radio/
.asoundrc         .dmrc             .lesshst     Templates/
.aspell.en.prepl  Documents/        .local/      .thumbnails/
.aspell.en.pws    Downloads/        .mozilla/    Videos/
.bash_history     .elementary/      Music/       .Xauthority
.bash_logout      .fltk/            .npm/        .xscreensaver
.bashrc           foo/              Pictures/    .xsession-errors
Bookshelf/        .gitconfig        .pki/        .xsession-errors.old
.cache/           .git-credentials  .pp_backup/
.config/          .gnupg/           .profile
```

I can then pipe that result to grep to filter out all items that are folders then.

```
$ ls -ap ~ | grep -v /
.asoundrc
.aspell.en.prepl
.aspell.en.pws
.bash_history
.bash_logout
.bashrc
.dmrc
.gitconfig
.git-credentials
hello.txt
.lesshst
.profile
.Xauthority
.xscreensaver
.xsession-errors
```

So say I want to have a way in which I can repeat this by just calling a single file. For this I just need to pull the command into a bash file.

```
#!/bin/bash
ls -ap ~ | grep -v /
```

I can then save this as something like list-files.sh, and then do the usual chmod 755 or call with bash to get this result each time by just calling the single file.

```
$ chmod 755 list-files.sh
$ ./list-files.sh
.asoundrc
.aspell.en.prepl
.aspell.en.pws
.bash_history
.bash_logout
.bashrc
.dmrc
.gitconfig
.git-credentials
hello.txt
.lesshst
.profile
.Xauthority
.xscreensaver
.xsession-errors
```

I could then pipe the result of this to yet even another command, to filter things even further. In any case the basic idea is there. Bash scripts do not have to just be instances where I am calling just a single command. Commands can be used together one after another to create a final result.

### 2.2 - Piping to yet another command ls to grep to wc to get a count of files

So lets take the script that I worked out before, and just filter things threw yet another command. This next command is the wc command which stands for word count. This command can be used to get the word count of a file as one might suspect, however there are a few more useful options such as the -l option that will count the lines of a file, or the standard input.

```
#!/bin/bash
ls -ap ~ | grep -v / | wc -l
```

```
$ chmod 755 count-files.sh
$ ./count-files.sh
16
```

Even more examples might be call for when it comes to piping, but you should get the basic idea. The thing about this is to just read over what a command can do when it comes to what a command will take from the standard input, and how the output of a command can be formated.

## 3 - [Bash scripts and variables](/2020/10/29/linux-enviornment-variables/)

When making a bash script variables can be used as a way to store values that can then be used again in a later part of a script one or more times. In this section I will be going over the basics of variables, and other related topics such as how to capture the output of a command as a value for a variable and how to do basic math operations.

### 3.1 - A Basic bash script variable example

One way to create a variable is to just type a name for the variable followed by equals, and then the value as a string value.

```
#!/bin/bash
 
start="This is some text on"
subject="bash"
end="which is prerrty cool"
echo "$start the subject of $subject and other stuff, ${end}."
```

```
$ chmod 755 basic.sh
$ ./basic.sh
This is some text on the subject of bash and other stuff, which is prerrty cool.
```

## 4 - [Positional parameters](/2020/11/16/linux-bash-script-parameters/)

Every time I use a Linux command there is a way to make use of one or more options. For example the ls command can just be called by itself, and when doing so it will display the contents of the current working folder. However I can pass a path to a folder other than where I currently am in the command line, and also some additional options that will for example show all items in a folder including hidden files.

When writing bash scripts I can make use of one or more positional arguments, and in this section I will be going over a few examples of how to go about making use of such arguments.

```
#!/bin/bash
echo "Hello $1"
```

## 6 - [While loops](/2020/11/12/linux-bash-script-while-loop-examples/)

Like many other languages there are ways to go about writing loops, and one such kind of loop to work with is a while loop. A while loop starts off with the the while beyond followed by an expression that will result in zero or one in square brackets. Then between do and done keywords one just needs to place whatever commands they want to run for each instances of the loop while the condition is true, and step any variables that might need to be updated.

```bash
#!/bin/bash
c=0
while [ $c -le 5 ]
do
  echo "c=${c}"
  c=$(( $c + 1 ))
done
```

## 7 - [Functions in bash scripts](/2020/11/20/linux-bash-script-functions/)

Functions can also be defined in a bash script when I want to define a string of commands, or some kind of block of code that I want to repeat over and over again elsewhere in a script.

```
#!/bin/bash
 
# here I have a mess shell variable
mess="hello bash functions"
 
# I can create a function that will echo that
# $mess variable each time it is called
hw(){
    echo -n " $mess - "
}
 
# Now I can call mess as many times as I like
hw
hw
hw
echo ""
```

## 8 - Conclusion

There is a great deal more to write about when it comes to bash scripts in general with respect to all the little basic details there are needed to know how to go about writing them. In time I might get around to expanding this post more with additional examples that showcase everything that there is to work with when it comes to the bash script syntax at least.