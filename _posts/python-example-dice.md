---
title: Python Basic Dice example
date: 2021-02-24 12:44:00
tags: [python]
categories: python
layout: post
id: 810
updated: 2021-02-24 17:29:44
version: 1.7
---

I would like to start off a few posts on some basic, and maybe a few not so basic python applaction examples. Just for the sake of learning how to progress beyond just picking up the basics when it comes to the langue itself, and the standard libries. After all the long term plan of picking up a langue should be to create some actual projects of one kind or another.

I think at least a few posts should be on very basic single file programes that just do one little thing. This is becuase I would like to have a few very simple getting started type posts where the goal is to make something that is a finished product rather than just soemthing that helps with one little problem. However I also think that often that should be the goal anyway when it comes to making a python applaction. Often I might think of an applaction as just one product, but often one product can be just a whole bunch of products that work togetaher.

So to start off this collection of python example posts I think I will start off with a simple dice applaction. That is just a way to spit out one or more numbers to the standard output between and including 1 and 6. However there is still more to it than just that even when it comes to such a simple getting started project. I would like to be able to use the script as bolth a module that I can use in other pythin scripts, and stand alone project by itself. There are also at least a few additional options that I can add to the project such as being able to set the number of sides for a set of dice, or just one dice in a set of dice. There is also being able to have control over how the output is formated, such has having some kind of plain text format, or spit out some JSON. So maybe this example will not be so basic, but still I will try to keep from going to nuts with this one becuase I would like to make this one of my getting startd with python type posts.

<!-- more -->

## 1 - The /lib/dice.py module

First off is the dice module that I worked out that will be used in my main index file that will be called from the command line. The dice librray will make use of the random standard library that helps to make quick work of a librray like this. The method that I wil be using is the rand int method that will do rounding for me, I just need to give a low and high number. For my main roll die function the low number will always be 1, and the high number will be a sides argument that will default to the ushual 6.

```python
import random;
 
# safe list get method
def safe_list_get (l, idx, default):
    try:
        return l[idx]
    except IndexError:
        return default
 
# roll a single die of given sides
def roll_die(sides=6):
    return random.randint(1, sides)
 
# roll a set of dice
def roll_set(count=2, sides=['6', '6'], default_sides=6):
    set=[]
    i=0
    while i < count:
        s = int(safe_list_get(sides, i, default_sides))
        set.append(roll_die(s))
        i = i + 1
    return set
```

## 2 - The main index.py file

I made this example two files, and I could have made those two files in the same folder. However I am thinking ahead and it is possible that I might want to add additional files. So I would like to keep things in folders as a way to keep things a little neat. So I have mu dice.py module in a lib folder, however that makes things a little complacted when it comes to importing the module. In my post on the os module though I worked out a way to go about getting an absolute path to the current script that is running, and using that I can then just concatanate a sytring for the lib folder to that path, and then add that paths to the sys.path list. By doing so python will now look there too when importing modules inclduing my dice module.

in my main index python script I am also using the argparse librray to parse any and all options given from the command line. I want to set up some options for the count of dice, as well as options for setting the number of sides for dice, and have a default sides option also.

```python
import argparse, os,sys,inspect
# insert lib folder
dir_current = os.getcwd()
dir_script = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
sys.path.insert(0, dir_script + '/lib')
# import dice from lib folder
import dice
 
# create a argument parser
parser = argparse.ArgumentParser(description='Basic argparse example.')
 
# arguments
parser.add_argument('--count',
                    dest='count',
                    action='store',
                    default=1,
                    help='Set the count of dice (default: 1)')
parser.add_argument('--sides',
                    dest='sides',
                    action='store',
                    default='6',
                    help='sides list (default: [6])')
parser.add_argument('--default_sides',
                    dest='default_sides',
                    action='store',
                    default=6,
                    help='default side count (default: 6)')
# parse the arguments
args = parser.parse_args()
 
sides = args.sides.split(',');
 
# using dice lib
set=dice.roll_set( count = int(args.count),  sides = sides, default_sides = args.default_sides )
print(set)
```

Once I have my options parsed I can then use them for arguments when calling my roll set method in the dice module, I can then print the results of that to the standard output by calling the print built in function.

## 3 - Conclusion

This example came togeather fairly quickly but I did spend a fair amount of time working out some basic examples before hand when writing examples for other posts. In my post on the os module that is where I found a decent example of using the os module to find the absolute path to a current python script that is running that can then be used to add the lib folder to the paths list. That in itself is one major setback for me when it comes to working out a basic python example that I got around before hand. I also wrote a post on the argparse librray and know that it is a decent option parser so I was able to get the part of the example out of the way very fast also. It takes time to study all these little libraries and what they are usfule for, but now that I have a sold grasp on them I can quickly put togeather an example like this.

I have some plans all ready drafted out for additional features and improvements for this python example, but I still think there is opnly so much more to add, and most of it is just for the sake of getting a better feel for how to go about making an actual project ofsome kind with python.
