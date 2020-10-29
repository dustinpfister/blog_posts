---
title: Linux Environment Variables
date: 2020-10-29 13:53:00
tags: [linux]
layout: post
categories: linux
id: 732
updated: 2020-10-29 16:57:14
version: 1.14
---

When taking the time to get a little more into how to work with Linux, and Bash, the topic of [environment variables](https://en.wikipedia.org/wiki/Environment_variable) will come up from time to time. These are bash values that can effect how programs work in Linux. For example there is a $HOME environment variable that is the home path for the current user, many programs will use this value to know where to place a hidden config file for user settings then. There are many other such environment variables, and there are also ways of creating ones own such variables when doing so is called for, often when working out some kind of bash script.

There is knowing how to at [least list, and set environment variables](https://linuxize.com/post/how-to-set-and-list-environment-variables-in-linux/) for starters. However there is also doing a few simple bash commands, and maybe event go so far as to make a program or two to really know why they are useful.

In this post I will be starting out with the basics when it comes to environment variables in Linux. This is just listing what the current variables are, and setting and deleting such variables. In addition at the end I might get into a few more advanced examples that Might help to get better insight as to how environment variables work, and how they can prove to be useful.

<!-- more -->

## 1 - List current Linux Enviorement Variables

First things first, how does one know what the current state of environment variables are on a system? One such command for getting such a list would be the [Linux printenv](https://man7.org/linux/man-pages/man1/printenv.1.html) command.

```
$ printenv
```

This will spit out all of the current environment variables that there are. Take a moment to look over them and you should see a few of interest such as HOME, PATH, USER, PWD, and SHELL just to name a few. These variables store values that are important as they help to give programs a way to know things like the current user, and where to store files for this user.

## 2 - Printing the value of a Variable

If you know the Environment variable that you want to print that can be passed as an argument to printenv and just the value of that variable will be logged to the standard output.

```
$ printemv HOME
/home/dustin
```

However it might be best to get up to speed with how to go about printing them in string values that can then be passed to any argument such as echo. To do this I just need to use the dollar sign symbol followed by the name of the variable, however if I am going to use it in a string I will want to place curly brackets around the variable name.

```
$ echo $HOME
/home/dustin
$ echo "The Home path is: ${HOME} and all is well"
The Home path is: /home/dustin and all is well
```

## 3 - Setting Shell and Environment variables

So now that I have covered how to go about Listing, and printing environment variables, now it might be a good idea to go over how to go about creating one also. It is also worth mentiong that there are not just environment variables, but Shell variables also. So a variable can start out as just a Shell variable, but it must be exported in order for it to become an environment variable.
First off I think that it should go without saying that you should not overwrite any important variables in the shell. So just use the printenv command to make sure that any name that is set for a variable name is not taken just yet. In addition if you really want to change an environment variable value, just make sure that you know what it is used for.

### 3.1 - Setting just a simple static string value to a Shell variable

One way to set a simple shell variable for starters is to just type the variable name that I want, followed by an equals sign, followed by what I want for a value. If the value that I want is a static string, then I can just place the content of that between to quotation marks.

```
$ foo="bar"
$ echo "foo${foo}"
foobar
```

This is an example of a simple shell variable, in order for this to become an environment variable it must be exported first. More on that later, but for now I think I should keep up with how to go about creating the simple shell variables first. The process of exporting them is fairly easy, but there is more to cover when it comes to creating values for them first.

### 3.2 - Setting the result of a command to a variable

What if I want to set the result of a command to an shell variable? In this case I just need to use the dollar sigh symbol followed by and opening and closing parentheses. Inside these parentheses I will place the command that will create the value that I want for the environment variable. For example say I have a whole bunch of mark down files start start with Linux, and I want to store all the file names in a variable, I can do this to create such a variable.

```
$ LINUX_POSTS=$( ls linux* )
$ echo $fLINUX_POSTS
```

### 3.3 - Exporting a Shell variable to become an Environment variable

In order to make a shell variable a environment variable it must be exported with the [Linux export](http://linuxcommand.org/lc3_man_pages/exporth.html) command. The printenv command can be used as a way to confirm if it is a environment variable or not.

```
$ SERVER_PORT=8000
$ printenv SERVER_PORT
$ export SERVER_PORT
$ printenv SERVER_PORT
8000
```


## 4 - Now for some bash script examples

So now that I have the basics of environment variables out of the way, maybe I should do something not so basic with them. I have wrote a post on the base32 command, and there is also the base64 command. I wanted to find a way to go about using these commands to encode and decode a collection of mark down files. It looks like in order to do so I will end to make use of environment variables, as well as writing a simple bash shell script file. So this might prove to be a great simple example of how to go about using environment variables.

### 4.1 - My md\_b64\_encode.sh file

So first I have my file that will use the base64 command to encode any markdown files that are found into base64 files. In this file I start off with a shebang that will inform bash that I will be using bash as the command to run this script when I make the script executable with chmod after I save the file.

After the shebang I start out a for loop where I am using the ls command to get all the mark down files in the current working path. Then for each item in the list I am create a variable for the full file name of the mark down file, as well as the base name, and extension. I am then using the file variable for the argument for cat to open the content of the markdown file, to which I am then piping to the base64 command. Finally I am using Linux redirection to redirect the output of base64 to a new file that will be the file base name, followed by a period, followed by the extension, followed by another period, followed by b64

```bash
#!/bin/bash
for i in $( ls *.md ); do
    file=$i
    fileBaseName=$( echo -n "$file"  | cut -d '.' -f 1 )
    fileEXT=$( echo -n $file | cut -d '.' -f 2 )
    cat $file | base64 > "${fileBaseName}.${fileEXT}.b64"
done
echo 'done'
```

So if I copy and past the following into an editor, and save it as something like md\_b64\_encode.sh I will want to make it executable with chmod.

```
$ chmod +x md_b64_encode.sh
```

Once I make it executable I can call it in bash like this.

```
$ ./md_b64_encode.sh
```

So when I call this script the following files:

```
file1.md file2.md
```

will become:

```
file1.md file1.md.b64 file2.md file2.md.b64
```

Where each b64 file will be a base64 encoding of the original files. So now what if I delete the original files, and just have b64 files? In that case I would want a script that would decode them back right?


### 4.2 - My md\_b64\_decode.sh file

So then there is making a decode script that is just a little different. I just need to make a few simple changes to the script such as adding the -d option to the base64 command so it will decode rather than encode. I also need to make use that the ls command is looking for b64 files rather than markdown files, and I want to drop the b64 extension when redirecting the output.

```bash
#!/bin/bash
for i in $( ls *.b64 ); do
    file=$i
    fileBaseName=$( echo -n "$file"  | cut -d '.' -f 1 )
    fileEXT=$( echo -n $file | cut -d '.' -f 2 )
    cat "${file}" | base64 -d > "${fileBaseName}.${fileEXT}"
done
echo 'done'
```

## 5 - A Nodejs script that makes use of $PORT if there

Do you like javaScript? I know I do, and in nodejs there is the proces global and in that object there is the provess.env property. The process.env propery is then an Object where each key is the name of an, you guess it, envioronment variable and then the key value is the value of that variable. So say I want to make a script that is a basic sever script, and I want the script to make use of a $PORT variable if it is there. 

```js
#!/bin/node
let http = require('http'),
fs = require('fs'),
path = require('path'),
 
// use the $PORT Environment Variable if it is there
// $ PORT=8080;export PORT
port = process.env.PORT || process.argv[3] || 8888;
 
let server = http.createServer((req, res) => {
    res.write('foo');
    res.end();
});
 
// start server
server.listen(port, function () {
    console.log('server up on port: ' + port);
});
```

So when I just run the script, and give no argument the hard coded value for port is used.

```
$ node sever
server up on port: 8888
```

If I give an argument for the port that will be used.

```
$ node sever 8000
server up on port: 8000
```

However if there is an $PORT variable that will be used.

```
$ PORT=3000
$ export PORT
$ node sever
server up on port: 3000
```

I could add event more features to this where it will look for a config file in home and etc but you get the idea. These are the kinds of values that are often stored in environment variables.

## 6 - Conclusion

So environment variables are useful for telling programs how to work, it is a way to go about setting or changing some basic application settings aside from that of arguments. The thing about arguments is that they are only for the single call of a command, while environment variables will be for all calls of a command that will make use of them. In addition an environment variable will work with any command that will use a given environment variable when arguments are just for a single command.

When writing shell scripts variables are ways of storing values that can then be used as a way to create argument values. Which is of course yet another reason why they are very helpful when it comes to automating work. WHen it comes to my base64 script examples I would have to manually enter the same command over and over gain for each file, but with environment variables and a little bash script magic, I can avoid wasting time doing that.