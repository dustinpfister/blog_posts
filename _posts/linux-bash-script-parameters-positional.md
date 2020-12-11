---
title: Positional Parameters in Linux Bash scripts
date: 2020-12-10 12:25:00
tags: [linux]
layout: post
categories: linux
id: 759
updated: 2020-12-10 20:20:08
version: 1.10
---

This post on [bash scripts](/2020/11/27/linux-bash-scripts/) will quickly cover the topic of positional parameters. When it comes to bash scripts there are actually several sets of parameters to be aware of. There is the set of parameters that have to do with the bash command itself, there are a number of special parameters to work with, and then there is the set of parameters for the script that is called with bash. I have wrote a post on bash parameters in general, however in this post the focus will be just on positionals alone.

So In this post I will be going over a few quick examples of Linux bash scripts that make use of one or more arguments in the form of positional parameters that are given at the command line, or wherever the script is called.

<!-- more -->

## 1 - The basics of positional parameters

So you want to learn what the deal is with paramerets when writing a bash script. Well you have to start somewhere and maybe a good starting point is to lean how to access and make use of positional argumnets. In this section I will be going over just a few quick examples of positionals.

### 1.1 - Basic bash Positional argumnets example

When a bash script is called there might be one or more positional argumnets that where passed when it was called. In fact even if no additional positionals where given when the script was called there is always at least one that is the file name of the script, or the name of the command that was called. Positionals start with the \$0 variable that will be the name of the command or script to begin with, followed by \$1 that wil be the first argument, followed by \$2 that will be the second, and so on. These kinds of variabkles hold the state of the argumnets that where gievn in order of there position from left to right starting with the command name, as such they are often called positional parameters.

So a Basic positional argument example bash script might look somethiong like this:

```bash
#!/bin/bash
echo "$0 - $1 - $2"
```

I can then save this as something like basic.sh, and then call it in the command line. When doing so I can pass argumnets to the script.

```
$ chmod 755 basic.sh
$ ./basic.js foo bar
./basic.sh - foo - bar
```

## 2 - Positional argumnets and special arguments

Although this is a post just on positional arguments alone I should take a moment to at least cover a few basic examples on special arguments in bash. There are a few special parameters in bash that can be used to get things like the name of the current script that is beging called, and so forth. However when it comes to positional parameters there are two special parameters that comes to mind that might be the most important. One of which helps with getting a count of how many argumnets where passed when the script is called, and the other is how to get a collection of all the argumnets that where given.

So in this section I will be going over a few quick examples of special parameartes in bash.

### 2.1 - Special arguments for getting all positionals and count of positionals

In this example I will be going over two special argumnets that are the first two that I think are the most imporantant when first starting out with writing basic bash scripts. One is the \$\# special parameter that will give me the total count of positionals that where passed and the other is the \$\@ special parameter that will give me the full collecton of positionals.


So if I have a basic bash script like this:

```
#!/bin/bash
echo "number of arguments: $#"
echo "arguments: $@"
```

it will given me a count of argumnets, and all the arguments

```
$ ./basic.sh foo bar baz
number of arguments: 3
arguments: foo bar baz
```

So then these two values can be used to create basic loops that will loop over all of the positionals and do something for each.

## 3 - Positional Parameters and bash Parameters

Now that I have covered not just the basics of positional parameters and a few basic special parameters I should also take a moment to wrint about the bash command itself. That command too can be passed a few argumnets also that have to do with its own set of parameters. many of my bash scripts examples thus far involve making a bash script exacutabule, to which it can then be called dirrectly. However another options world be to call bash, then pass the script, and then pass some positionals for the script.

In other words something like this:

```
$ bash -c "./basic.sh 1 2"
./basic.sh - 1 - 2
```

Here I am calling the bash command first and then using the c option that will make bash run the following string as a command. This then means that when a bash script is called there is yet another set of parameters to be aware of. There are the positionals, then the special paramaters, and then there are the parameters of the bash comamnd itself. This is why it is importantn to refer to positionals as such, to help elemnate confusion with all these other sets of parameterts that are at play.

So then lets look at a few more examples of bash script parameters in general now.

### 3.1 - An all.sh file that will log the state of both positionals and bash parameters

Here I have a shell script that will just log out the current state of bash paramaters, as well as positional paramaters, by making use of two special parameters. So then this script can be though of as a basic script that makes use of the three diferent types of parameters in bash.

```bash
#!/bin/bash
echo "bash: $-"
echo "positionals: $@"
```
Now that I have this basic script worked out the state of what is loged out will depedn on how it is called. So with that said lets now look at another script that will call this script in diferent ways. So lets save this above script as something like all.sh, and moive on to the next example.

### 3.2 - Just calling a script, and calling bash first

There is calling a script directly if it has been set as exacutabule with chmod, and then there is calling bash frist and passing the script as an argument for the bash command. When callign bash a number of argumnets can be given to the bash command, and the all.sh script that I just covered will log out the state of these options.

```bash
#!/bin/bash
 
echo ""
 
# just calling the script
./all.sh 1 2
 
echo ""
 
# calling bash first with some options
bash -v all.sh 1 2
```

```
$ chmod 755 bash.sh
$ ./bash.sh

bash: hB
positionals: 1 2

#!/bin/bash
echo "bash: $-"
bash: hvB
echo "positionals: $@"
positionals: 1 2
```

## 4 - Conclusion

The positional parameters of a script are the first set of paramerets that I have become aware of while learniong bash. However there are of course a number of other sets of parameters that I should be aware of when writing bash scripts also. In addition there are other topics to write about when it comes to parameters in bash scripts. When it comes to basic scripts just working with positionals alone is okay, however what if I do make a bash script that can take up to say 10 argumnets? With that said theer should be a way to parse positional argumnets into named argumnets.

So one next step from here that might come to mind is to read my post on [parsing positional argumnets into named options](/2020/12/09/linux-bash-script-parameters-named/)  by way of option parsing with the getopts bash built in command. There is also my [main post on bash paramters](/2020/11/16/linux-bash-parameters/) in general also.