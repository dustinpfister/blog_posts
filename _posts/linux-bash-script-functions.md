---
title: Functions in Linux Bash Scripts
date: 2020-11-20 13:00:00
tags: [linux]
layout: post
categories: linux
id: 746
updated: 2020-11-20 15:49:26
version: 1.2
---

When working out a bash script there are some times situations in which I find myself repeating the same bash code over and over again in a script. So there should be a way to define a block of bash script code as part of a function that will take one or more argumnets, and then just call that function over and over again rather than repating the whole block of code.

So in this post I will be going over some of the basics of functions when writing bash scripts.

<!-- more -->

## 1 - basic bash function

Lets start with the very basics of bash functions. I can define one by typing a name for a function, followed by and opending and closing set of parentheses after which I will be placing what I want the function to be inside a set of curly brackets.

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

So once I have my bash script togeather in an editor I can save it as something like func_basic.sh. I can then call it with bash or amke the script exacutabule with chmod and run it dirrectly becuase of the bash shebang at the top of the file.

```
$ chmod 755 func_basic.sh
$ ./func_basic.sh
 hello bash functions -  hello bash functions -  hello bash functions - 
```

So now we have the basic idea of a function in bash. However maybe there is a few more things to cover when it comes to functions in bash scripts. There is the question of argumnets, how to return something, and other function related topics. So maybe at least a few more examples are called for before moving on to some other bash script related topics.

## 2 - Argumnets in bash functions

```
#!/bin/bash
 
# a function has its own set of positioned arguments
func_add(){
    echo $(( $1 + $2 ))
}
 
# using shell argumnets too
let "a = 0"
let "b = 0"
if [ ! -z $1 ]; then
   let "a = $1"
fi
if [ ! -z $2 ]; then
   let "b = $2"
fi
# can call a function with argumnets like this
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

## 3 - Return something

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
echo $a
echo $n
```

```
$ chmod 755 func_return.sh
$ ./func_return.sh
16

$
```

## 4 - Math functions example

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

## 5 - Using node to do math in bash

### 5.1 - The math.js file to use with node

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

## 5.2 - using Math.js by itself with node

```
:$ node math.js PI
3.141592653589793
```

```
$ chmod 755 math.js
$ ./math.js atan2 50 0
1.5707963267948966
```

```
$ ./math.js eval "Math.floor(Math.atan2(0,50)/(Math.PI*2)*360)"
90
```

## 5.3 - Making a bash script

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

## 6 - Conclusion