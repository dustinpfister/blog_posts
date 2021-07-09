---
title: Linux sleep command
date: 2021-07-09 13:27:00
tags: [linux]
layout: post
categories: linux
id: 907
updated: 2021-07-09 13:38:33
version: 1.2
---

The [Linux sleep](https://linux.die.net/man/3/sleep) command can be used as a way to go about [setting a delay between the execution](https://linuxhint.com/sleep_command_linux/) of commands. This might prove to be useful when writing a [bash script](/2020/11/27/linux-bash-script/) and I want to set a delay for each each time a loop is in effect as I can call it over and over again in the body of a while loop for example.

<!-- more -->


## 1 - Some basic examples of the Linux sleep command

### 1.1 - Just calling in in the command line

```
$ sleep 5
```

### 1.2 - Another example using the Linux echo command

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

