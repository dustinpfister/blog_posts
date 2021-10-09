---
title: The Linux test bash built in command
date: 2021-10-08 11:06:00
tags: [linux]
layout: post
categories: linux
id: 932
updated: 2021-10-09 15:12:53
version: 1.43
---

I have a lot of pots boiling when it comes to things to learn and research more, one of which is to become more competent when it comes to working with a Linux system. A major part of doing so is to learn a hold lot more about bash, and with that that bash built in commands once of which is the [Linux test](https://linux.die.net/man/1/test) bash built in command.

In a previous Linux post on bash scripts I wrote about [special parameters](/2020/12/08/linux-bash-script-parameters/) one of which is the \$\? parameter. This parameter will give the exit status of the last command that was called in the shell. With that said what the test command does is it, well, preforms some kind of test and then will exit with a status code of 0 if all goes well with that test, else it will exit with 1.

The test command by itself will not produce any output to the standard output of the bash console, so often it should be used in conjunction with a other commands and bash features with the special parameter that contains the exit status to produce some kind of output. However often when the test command is used it is when making bash scripts and thus it is just used as a way to make some kind of choice when it comes to doing something or not, as such that is likely why it will not produce any output unless something is done to make it do so.

<!-- more -->

## 1 - Basic examples of Linux test command

To start out with in this section I will be going over a few simple examples of the Linux test command. Sense the command by itself will not produce any output to the standard output, many of these examples will also involve other bash features that might be worth looking into further also. 

I often mention in these sections of posts that all the source code, in this case in the from of bash scripts can be found in my [demos Linux repository](https://github.com/dustinpfister/demos_linux/tree/master/forpost/linux-test) in Github. That is where you can find the latest revisions of the examples in this post, that in some cases can be a little out of date here. Also that would be a good place to make a pull request with something.

### 1.1 - Using the echo command with test

To start out with the test command it might be best to just work out a few simple examples in the bash console. For this example I am just using the equal to expression with the test command. When doing so the exit status for the test command will be 0, or 1, but to see the output I will need to use a command link the [Linux echo](/2019/08/15/linux-echo/) command.

```
$ test 5 -eq 5; echo $?
0
$ test 5 -eq 10; echo $?
1
```

### 1.2 - Using and and or in a line

Another option would be to use the and and or [control operators](https://opensource.com/article/18/11/control-operators-bash-shell). In the above example in which I am just using the Linux echo command I am using a semicolon control operator as a way to end the test command, and start a new command that is to just echo out the exit status of the last command which was the test. In this example I am just using the \|\| and \&\& control operators for the sake of or and and operations.

```
MESSTRUE="Yep"
MESSFALSE="Nope"
$ test 100 -gt 99 && echo $MESSTRUE || echo  $MESSFALSE
Yep
$ test 80 -gt 99 && echo $MESSTRUE || echo  $MESSFALSE
Nope
```


### 1.3 - A test command call as an if statement

One major part of getting into writing bash scripts is to make use of the [if statement](/2020/12/02/linux-bash-script-conditional-statements/) that is another way to go about using the test command. Although it might be best to start write files when it comes to this sort of thing, it is also possible to work with them write away by just typing something like this into the bash console.

```
$ if [ 1 -eq 1 ];then echo 'yep'; fi;
```

### 1.4 - Redirection

One more way to go about using the test command would be to make use of [redirection](/2020/10/02/linux-redirection/) as a way to write some output to a file. This is yet another feature of bash that is worth looking into more at some time is it will come up a lot when it comes to bash script examples that have to do with creating files.

```
$ test 5 -eq 5 && echo "Yep" > foo.txt || echo "Nope" > foo.txt
$ cat foo.txt
Yep
$ rm foo.txt
```

### 1.5 - The test command is a bash built in command

The test command is one of many commands that are built into the bash command. One way to confirm this would be to use another useful bash built in command called the [Linux type](/2021/02/11/linux-type/) command. This is just one thing that I like to check when looking into the various Linux commands to gain a sense of this is the kind of command that should be there to work with in just about all Linux system or not, and with that said the test command is one of those commands as it is built into bash.

```
#!/bin/bash
type test
#test is a shell builtin
```

## 2 - Expressions in detail

Now that I have the very basics of the Linux test command out of the way, In this section I will be going over some of the expressions in greater detail. All the various expressions have to do with preforming some kind of comparison between two values, of checking if a file exists, or something to that effect. Keep in mind that the test command is not typically used by itself, but is used by way of conditional statements when writing bash scripts actually.

### 2.1 - Testing if two values are Equal to each other

In the basic section above I have all ready covered the equal two expression. This is a typical expression that will be used often when writing bash scripts, and in programing in general actually. However in that example I was just using the -eq option which is used to check of two numbers equal each other or not. If you are like me and you are used to how this sort of thing working in javaSscript they you should be wondering about how to go about preforming equality in general when it comes to strings, and other types of values. For this there are other options such as = when it comes to string values rather than numbers.

```
$ test 5 -eq 5; echo $?
0
$ test 5 -eq 10; echo $?
1
$ MESS=foo
$ test "foo" -eq $MESS; echo $?
bash: test: foo: integer expression expected
2
$ test "foo" = $MESS; echo $?
0
```

### 2.2 - Not equals

So then there is testing if two number values equal each other, as well as doing the same for string values. However what about doing so for testing if two values are not equal to each other? When it comes to numbers there is the -ne option for test, and when it comes to string values != is what can be used to do so.

```
$ test 5 -ne 5; echo $?
1
$ test 5 -ne 10; echo $?
0
$ MESS=bar
$ test "foo" -ne $MESS; echo $?
bash: test: foo: integer expression expected
2
$ test "foo" != $MESS; echo $?
0
```

### 2.3 - Greater and less than expressions

There are then expressions for greater than, less than, greater than or equal to, and less than or equal to. These are typical expressions to use when working out conditional statements, so this will often be used when writing bash scripts that call for the use of them. However there is also just quickly doing a few simple expressions in the bash console just for the sake of confirming how these work.

Greater than examples in the bash console

```
$ test 7 -gt 5; echo $?
0
$ test 5 -gt 5; echo $?
1
$ test 5 -ge 5; echo $?
0
```

Less than examples in the bash console.

```
$ test 5 -lt 7; echo $?
0
$ test 5 -lt 5; echo $?
1
$ test 5 -le 5; echo $?
0
```

### 2.4 - testing for a Folder

The test command can be used to check if a folder is there or not, for this I just need to use the -d option when calling the test command. So then this kind of test can be preformed to test if a folder exists or not, and in the event that it does not the [mkdir command](/2021/06/30/linux-mkdir/) can be used to create it. However when it comes to just making sure that a path of folders exists in the event that it does not, just the mkdir command can be used alone with the -p option. So then this kind of test will typically just be used in bash scripts for the sake of doing something else when testing for the presence of a folder.

```
$ test -d ~/foo; echo $?
1
$ mkdir ~/foo
$ test -d ~/foo; echo $?
0
$ rmdir ~/foo
```

### 2.5 - Symbolic links

The test command can be used to check for [symbolic links](/2021/10/01/linux-ln/), also known as a soft link, by making use of the -h option and then a path to a file to check if it is a symbolic link or not. If you are not yet familiar with symbolic links they are a way of creating a file that is a link to another file or folder. There is much more to read about when it comes to this subject as there is a difference between symbolic links, and hard links. Hard links are another kind of link, but they do not point to a path, rather that actual data of the file in the file system, as such they continue to work even if the source file is deleted.

```
$ echo "hello world" > foo.txt
$ ln -s foo.txt fooLink
$ test -h foo.txt; echo $?
1
$ test -h fooLink; echo $?
0
$ rm fooLink
$ rm foo.txt
```

## 3 - Custom test programs and exit status

There is taking into account what the core of the test command is when it comes to its nature. Sure there are a lot of options and features of the command, but the basic idea of what it does is simple enough. What it does is it preforms some kind of test, and if the test is a success it will exit with a code of 0, else if something goes wrong it will exit with a non zero exit status number. This kind of nature can be applied to things outside of just using the test command as a way to go about making my own custom test scripts for various things where it would make sense to create such a test script. These test scripts can be bash scripts, or they can be written in javaScript, python, ect, as long as the nature is the same when it comes to the exit status codes.

So then in this section I will be going over some examples of this kind of script, the nature of which is just making a script that will check if a folder contains 1 or more mark down files. In the event that there are more that one mark down files in the folder the script will exit with a status of 0, in the event that there are no mark down files the exit status will be 1. Of course there is writing bash scripts, but there is also writing these kinds of scripts in some other high level language in order to make the script more portable.

### 3.1 - Creating a bash script

So first off there is of course getting into [writing bash scripts](/2020/11/27/linux-bash-scripts/) when it comes to this sort of thing. The basic process of this is to just place bash commands into a file, then make the file executable with the [chmod command](/2020/11/13/linux-chmod/), or call the file with the bash command. Even if I do just run the script with bash rather than calling it directly I still think it is a good idea to place a shebang that will point to the binary that will be used to run this script, in this case it would be the bash command.

So then to make a bash script that will check a folder for markdown files I will want to use the [ls command](/2020/10/14/linux-ls/) with a [positional parameter](/2020/12/10/linux-bash-script-parameters/) that is the folder to check for markdown files. I will then [want to pipe](/2020/10/09/linux-pipe/) that [to grep](/2020/09/14/linux-grep/) and use that to get a filtered list of files that are just markdown files. The filtered list of markdown files can then in turn be piped into the [Linux wc command](/2020/10/13/linux-wc/) with the -l option that will be the number of lines, which would then be the number of markdown files. I can then use a from of [parameter expansion](/2020/12/04/linux-bash-script-parameter-expansion/) to set this result to a shell variable, and that variable can then be used with the test command, by way of an if statement to test if the result is greater than zero or not. I can also set a status shell variable and default the code to 1, in the event that the count is grater than 0 then I can set the value of the status variable to, you guessed it 0. At the end of the script I then just need to use the [Linux exit command](/2021/03/12/linux-exit/) and pass the value of the status variable to it.

```bash
#!/bin/bash
MDCOUNT=$(ls $1 | grep ".md$" | wc -l)
STATUS=1;
if [ $MDCOUNT -gt 0 ]; then STATUS=0; fi
exit $STATUS;
```

Now that I have my bash script file I will just need to give it a file name, and make the file executable. Once that is done I can call it from the bash console, and pass a path to a folder to check as the first and only positional parameter. The script will then wok just like the test command in that it will set the exit status code, but not print anything to the standard output by itself. So once again I will need to do something with the echo command to see the exit status code.

```
$ chmod 777 test-has-md.sh
$ ./test-has-md.sh; echo $?
1
$ ./test-has-md.sh posts; echo $?
0
```

So then this bash script seems to work as I would want it to. I just pass a path to a folder, if there are one or more markdown files in that folder I get a 0 status, else 1. Although this script works great, it will only work in environments that have bash to work with. If I want to make a test like this a little more portable, when it comes to windows mainly, I will want to create this kind of test in some other language then.

### 3.2 - Writing the same test script in javaScript

So then when it comes to other high level languages outside of that of bash for me what comes to mind first and for most would be javaScript. So then there is seeing about write that same simple test script only [for node](/2017/04/05/nodejs-helloworld/) rater than bash. The end result will be the same by calling the [exit method of the process object](/2019/08/13/nodejs-process-exit/), aside from that I just need to do the same thing as I did in my bash script only now with core javaScript and nodejs features. With that said there is using the read dir method of the [file system module](/2018/02/08/nodejs-filesystem/) to get a list of file names from the first given positional argument that I can access by way of the [process argv array](/2018/02/11/nodejs-process/). I can then use the [array filter](/2020/10/03/js-array-filter/) prototype method in conjunction with the [string match method](/2019/04/06/js-string-match/) to get a filtered list of mark down file names. In place of using the Linux word count command I can just get the [length of the resulting array](/2018/12/14/js-array-length/) that is returned using array filter and string match methods.

```js
#!/bin/node
var fs = require('fs');
 
var getMDFiles = function(files){
    return files.filter(function(fileName){
        var m = fileName.match(/.md$/);
        if(m){
            return true
        }
        return false;
    });
};
 
var getMDCount = function(files){
    return getMDFiles(files).length;
};
 
fs.readdir(process.argv[2] || './', function(e, files){
    if(e){
        process.exit(2);
    }else{
        if(getMDCount(files) > 0){
            process.exit(0);
        }else{
            process.exit(1);
        }
    }
});
```

Now that I have my script I can use it just like my bash script as I have placed the appropriate shebang for node rather than bash at the top if the source code file.

```
$ chmod 777 test-has-md.js
$ ./test-has-md.js; echo $?
1
$ ./test-has-md.js posts; echo $?
0
```

So great now I have a script that will work just like my bash script, but now it is written in javaScript, so then I can run the script in any operating system that I can run node on top of. Whatever language I use the basic idea is the same though, the script, or binary preforms some kind of test, and if all goes will it will exit with a status code of zero, else it will not.

### 3.3 - Creating a binary with c

I have came up with a few simple C language source code files for my post on the [Linux gcc](/2020/11/17/linux-gcc/) command which can be used to compile binaries using C. I have been toying with the idea of writing a few posts on the C language just for the sake of learning at least a little about how to do something with a low level language. So then in this example I am once again creating the same simple test program, only this time it is in C so it can be compiled to its own standard alone binary rather than calling bash, node, or python to run the program.

```c
#include <stdio.h>
#include <dirent.h>
#include <regex.h>        
 
regex_t regex;
int reti;
int mdcount = 0;
 
int main(int argc, char *argv[]){
    DIR *folder;
    struct dirent *entry;
    int files = 0;
    char *dirpath =  ".";
    // if we have a positional use that
    if(argc > 1){
        dirpath = argv[1];
    }
    // open folder
    folder = opendir(dirpath);
    if(folder == NULL){
        // return a status of 2 for folder not found
        return 2;
    }
    while( (entry=readdir(folder)) ){
        files++;
        reti = regcomp(&regex, "\\.md$", 0);
        if(reti){
            // failed to compile a regex
            return 2;
        }
        reti = regexec(&regex, entry->d_name, 0, NULL, 0);
        if(!reti){
            mdcount++;
            //printf("%s\n", entry->d_name);
        }
        regfree(&regex);
    }
    closedir(folder);
    // if mdcount is greater than 0 then return exit with code 0
    //printf("%i\n", mdcount);
    if(mdcount > 0){
        return 0;
    }
    // else exit with code 1
    return 1;
}
```

## 4 - Conclusion

So then the Linux test command can preform certain comparisons, and checks on files, and then exit with a 0, or 1 exit status code. This can then be used as a way to make certain kinds of conditional statements in bash scripts when it comes to preforming certain kinds of actions or not. There are then ways of writing bash scripts, or scripts in another language such as javaScript and python that can serve as another way to go about making some kind of test also. The trick is to just set th exit status of the script so that it will end with a status code of 0 if the test passes, else set an exit code status of 1.

I get around to editing and expanding my content now and then, I have some plans together when it comes to expanding this post. However if there is anything else that comes to mind there is the comments section below here than can be used as one way to bring something up with this.