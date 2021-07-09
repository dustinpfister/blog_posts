---
title: Linux sleep command
date: 2021-07-09 13:27:00
tags: [linux]
layout: post
categories: linux
id: 907
updated: 2021-07-09 13:48:39
version: 1.7
---

The [Linux sleep](https://linux.die.net/man/3/sleep) command can be used as a way to go about [setting a delay between the execution](https://linuxhint.com/sleep_command_linux/) of commands. This might prove to be useful when writing a [bash script](/2020/11/27/linux-bash-script/) and I want to set a delay for each each time a loop is in effect as I can call it over and over again in the body of a while loop for example. So in this post I will be going over a few quick examples that involve using it in the command line, and also a few basic bash script examples where this kind of command will typically be used most of the time.

<!-- more -->


## 1 - Some basic examples of the Linux sleep command

In this section I will just be going over a few examples that involve just playing around with the Linux sleep command in a bash window. 

### 1.1 - Just calling in in the command line

If I just call the sleep command at a bash prompt, and pass a number as the first and only option that will result in a delay of sections equal to the number that I give as an option. So the expected result is just nothing for the amount of time that I give in seconds, and then I will end up going back to what should be a bash prompt.

```
$ sleep 5
$
```

So then that is more or less all there is to the Linux sleep command, however actual use case examples would not be like this of course. In a real use case example the sleep command is intended to be used in conjunction with other commands. So maybe there is playing around with at least one or two more examples of the sleep command at a bash prompt, but most real use case examples will typically be when writing a few bash scripts.

### 1.2 - Another example using the Linux echo command

In this example I am using the sleep command in conjunction with one additional command called the [Linux echo](/2019/08/15/linux-echo/) command.

```
$ echo "waiting a few seconds";sleep 5;echo "done"
waiting a few seconds
done
```

## 2 - Some bash script examples

### 2.1 -

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

### 2.2 - 

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

