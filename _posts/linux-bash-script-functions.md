---
title: Functions in Linux Bash Scripts
date: 2020-11-20 13:00:00
tags: [linux]
layout: post
categories: linux
id: 746
updated: 2020-12-10 12:31:19
version: 1.10
---

When working out a [bash script](/2020/11/27/linux-bash-scripts/) there are some times situations in which I find myself repeating the same bash code over and over again in a script. So there should be a way to define a block of bash script code as part of a function that will take one or more arguments, and then just call that function over and over again rather than repeating the whole block of code.

So in this post I will be going over some of the basics of [functions when writing bash scripts](https://linuxize.com/post/bash-functions/).

<!-- more -->

## 1 - basic bash function

Lets start with the very basics of bash functions. I can define one by typing a name for a function, followed by and opening and closing set of parentheses after which I will be placing what I want the function to be inside a set of curly brackets.

Once I have my function worked out I can call it any number of times that I want in the body of a script.

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

So once I have my bash script together in an editor I can save it as something like func_basic.sh. I can then call it with bash or make the script executable with chmod and run it directly because of the bash shebang at the top of the file.

```
$ chmod 755 func_basic.sh
$ ./func_basic.sh
 hello bash functions -  hello bash functions -  hello bash functions - 
```

So now we have the basic idea of a function in bash. However maybe there is a few more things to cover when it comes to functions in bash scripts. There is the question of arguments, how to return something, and other function related topics. So maybe at least a few more examples are called for before moving on to some other bash script related topics.

## 2 - Arguments in bash functions

So now about arguments with bash functions. Each bash function has its own set of positioned arguments just like that of the main script file. When I do to call the function I just need to pass the values that I want for $1 $2 and so forth.

```
#!/bin/bash
 
# a function has its own set of positioned arguments
func_add(){
    echo $(( $1 + $2 ))
}
 
# using shell arguments too
let "a = 0"
let "b = 0"
if [ ! -z $1 ]; then
   let "a = $1"
fi
if [ ! -z $2 ]; then
   let "b = $2"
fi
# can call a function with arguments like this
func_add $a $b
```

```
$ chmod 755 func_argu.sh
$ ./func_argu.sh
0
$ ./func_argu.sh 5
5
$ ./func_argu.sh 5 7
12
```

## 3 - Return something from a function

There is a return keyword in bash, but it does not work the same way as in other languages such as javaScript. There seems to be no standard way to defined a return value for a function, but there are a few tricks that give a similar result.

The best way to go about defining a return value might be to just echo out the return value as ways just use $\(\) as a way to call it.

```
#!/bin/bash
 
# math_pow base exponent
# echo $(math_pow 2 4)
# 16
math_pow(){
    local n=$(($1 ** $2))
    echo $n
}
 
a=$(math_pow 2 4)
let "b = $a - 100"
echo $b
echo $n
```

```
$ chmod 755 func_return.sh
$ ./func_return.sh
-84

$
```

## 4 - Math functions example

Now for a more complex example of bash functions that has to do with making a few math functions with bash. It might be better to make use of a command that will tap into another language such as node, or awk, when it comes to doing some actually programing. However it is possible to do some basics with bash itself at least.

```
#!/bin/bash
 
# math_pow base exponent
# echo $(math_pow 2 4)
# 16
math_pow(){
    local n=$(($1 ** $2))
    echo $n
}
 
## math_sqrt n
math_sqrt(){
    echo $(awk "BEGIN {printf \"%.30f\n\", sqrt($1)}")
}
 
## math_round n
math_round(){
    echo $(awk "BEGIN { rounded = sprintf(\"%.0f\", $1); print rounded }")
}
 
# math_dist x1 y1 x2 y2
math_dist(){
    local a=$(($1 - $3))
    local b=$(($2 - $4))
    local c=$(math_pow $a 2)
    local d=$(math_pow $b 2)
    local e=$(($c + $d))
    echo $(math_sqrt $e)
}
 
d=$(math_dist 10 5 20 5)
dr=$(math_round $d)
echo $dr 
```

```
$ chmod 755 example_math.sh
$ ./example_math.sh
10
```

In this example I used awk for some of the math methods, but if you do not know awk no problem there is a whole would of Linux commands to play with. Awk is a fairly good one to tap into, and that deserves one ore more posts when it comes to getting into that one. However another great language is javaScript so lets look as a node example next.

## 5 - Using node to do math in bash

In bash I can use any Linux command that I want to produce some kind of result including node. When it comes to working in a more powerful programing environment than bash I like javaScript. In core javaScript there is the Math object that has a whole bunch of useful Math functions. So if I really want to I can make a quick javaScript file that I can then call from bash where I can bass the math function that I want to use followed by some arguments for it.

### 5.1 - The math.js file to use with node

First off I will want a javaScript file that will serve as a way to use the Math object, and maybe a few custom methods from the command line.

```js
#!/usr/bin/node
// parse options
var prop = process.argv[2],
len = process.argv.length;
args = process.argv.slice(3, len);
// log
var log = function(num){
    process.stdout.write(String(num) + '\n');
};
if(prop){
   var MathProp = Math[prop];
   // a Math function
   if(typeof MathProp === 'function'){
       log(MathProp.apply(null, args));
   }
   // a Math propery
   if(typeof MathProp === 'number'){
       log(MathProp);
   }
   // some of my own
   if(typeof MathProp === 'undefined'){
      // multiply two numbers
      if(prop === 'multi'){
          log(args[0] * args[1]);
      }
      // distance between two points
      if(prop === 'dist'){
          var a = Math.pow(args[0] - args[2], 2)
          b = Math.pow(args[1] - args[3], 2);
          log(Math.sqrt( a + b));
      }
      // eval an expression
      if(prop === 'eval'){
          log(eval(args[0]));
      }
   }

}
```

So now I have a little javaScirpt that I can use with node.

## 5.2 - using Math.js by itself with node

So I can test out the javaScript file with node on the command line just to make sure everything works as I want it to.

```
:$ node math.js PI
3.141592653589793
```

Just like bash scripts I can make the script executable because I placed the nodejs shebang at the top of the file.

```
$ chmod 755 math.js
$ ./math.js atan2 50 0
1.5707963267948966
```

Looks like my eval method works for what it is worth also.

```
$ ./math.js eval "Math.floor(Math.atan2(0,50)/(Math.PI*2)*360)"
90
```

Okay cool, now it is just a matter of making some functions in bash that will make use of this little javaScript file.

## 5.3 - Making a bash script that will use math.js

So now that I have my math.js script I can now do whatever I want to do in bash with these javaScript math methods.

```
#!/bin/bash

node_math(){
    echo $(node "math.js" $1 $2 $3)
}

get_angle(){
    x=$1
    y=$2
    echo $(node_math "eval" "Math.floor(Math.atan2($y,$x)/(Math.PI*2)*360)")
}

pi=$(node_math "PI")
pi2=$(node_math "eval" "$pi*2")
atan2=$(node_math "atan2" "50" "0")
a=$(node_math "eval" "($atan2/$pi2*360).toFixed(2)")

echo "$pi $pi2 $atan2"
echo $a
```

```
$ chmod 755 example_math_js.sh
$ ./example_math_js.sh
16
90
```

The math object is just one thing, when it comes to javaScript programing in nodejs there is a wide range of things that I can do with it of course. I can make http requests, read and write files, start up a sever, and work with a whole world of npm packages. There are of course other programing environments, and also every Linux command to play with. Linux commands can be used from within nodejs via the child process module, and of course there is using them with bash outside of nodejs.

## 6 - Conclusion

So functions in bash are yet another feature in bash that one should become familiar with to learn how to read and write bash scripts. They ming be a bit lacking compared to what I am useful in other languages, but the basic features that I would expect in an environment such as bash are there.