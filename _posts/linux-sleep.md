---
title: Linux sleep command
date: 2021-07-09 13:27:00
tags: [linux]
layout: post
categories: linux
id: 907
updated: 2021-07-09 14:45:01
version: 1.18
---

The [Linux sleep](https://linux.die.net/man/3/sleep) command can be used as a way to go about [setting a delay between the execution](https://linuxhint.com/sleep_command_linux/) of commands. This might prove to be useful when writing a [bash script](/2020/11/27/linux-bash-script/) and I want to set a delay for each each time a loop is in effect as I can call it over and over again in the body of a while loop for example. So in this post I will be going over a few quick examples that involve using it in the command line, and also a few basic bash script examples where this kind of command will typically be used most of the time.

<!-- more -->


## 1 - Some basic examples of the Linux sleep command

In this section I will just be going over a few examples that involve just playing around with the Linux sleep command in a bash window. Which might prove to be a good starting point when it comes to learning what the sleep command is all about, but sooner or later it would be called for to get into writing one or two bash scripts that make use of the sleep command. The sleep command strikes me as an example of a command that is not typically used by itself but in conjunction with other commands and bash features. So in this section I will not just be going over sleep command examples, but touch base on some additional commands and features of bash.

### 1.1 - Just calling in in the command line

If I just call the sleep command at a bash prompt, and pass a number as the first and only option that will result in a delay of sections equal to the number that I give as an option. So the expected result is just nothing for the amount of time that I give in seconds, and then I will end up going back to what should be a bash prompt.

```
$ sleep 5
$
```

So then that is more or less all there is to the Linux sleep command, however actual use case examples would not be like this of course. In a real use case example the sleep command is intended to be used in conjunction with other commands. So maybe there is playing around with at least one or two more examples of the sleep command at a bash prompt, but most real use case examples will typically be when writing a few bash scripts.

### 1.2 - Another example using the Linux echo command

In this example I am using the sleep command in conjunction with one additional command called the [Linux echo](/2019/08/15/linux-echo/) command. The echo command is just a way to echo some text given as an argument to the standard output, so I call the echo command with a message, then end it with a semi colon which is a way to go about having more than one command on a single line. After that I can then call the sleep command, followed by another semi color, and then the echo command again. The end result is then the first message, followed by a delay, and then the final message as one might expect.

```
$ echo "waiting a few seconds";sleep 5;echo "done"
waiting a few seconds
done
```

## 2 - Some bash script examples

So now there is getting into a few bash script examples that make use of the sleep command. This involves creating an external file typically with an option sh file name extension. There is starting the file off with something called a [shebang](/2017/03/26/linux_shebang/) which might not be so impotent with bash scripts, but it is a good habit to get into when it comes to making scripts written in other scripting languages executable.

### 2.1 - Basic loop example of Linux Sleep

When creating a [while loop](/2020/11/12/linux-bash-script-while-loop-examples/) it might be nice to use the sleep command to set a delay for each time something is done in the body of a loop. For this example I will once again just be using the Linux echo command in the body of a loop, but now I will be using a form of [bash parameter expansion](/2020/12/04/linux-bash-script-parameter-expansion/) to step a shell variable.

```
#!/bin/bash
i=1
while [ $i -lt 10 ];do
    echo "$i"
    sleep 3
    echo " "
    ((i=$i+1))
done
```

```
$ chmod 755 sleep-basic-loop.sh
$ ./sleep-basic-loop.sh
```

### 2.2 - An example using nodejs to call some javaScript

In this example I am using the node command to run a little javaScrpt code, and delay the call of the next call of node each time. One option of the node command is to evaluate a string of javaScript code rather than a file, so I can do something that involves using bash to create an update a value that I use to create a javaScript string.

```
#!/bin/bash
i=1
while [ $i -lt 10 ];do
    js="console.log(Math.pow(2, $i))"
    echo -en "running javaScript: $js\n"
    node -e "$js"
    sleep 5
    echo -en "done\n\n"
    ((i=$i+1))
done
```

## 3 - Conclusion

That will be it for now at least when it comes to the Linux sleep command. It is a fairly simple command by itself so there really is not that much more to write about with this one. If I get around to doing some more editing and expansion of this post it would have to have a lot more to do with bash script examples, and any and all topics that branch off from the Linux sleep command.


