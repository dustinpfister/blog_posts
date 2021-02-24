---
title: Lists in Python
date: 2020-12-23 11:57:00
tags: [python]
categories: python
layout: post
id: 768
updated: 2021-02-24 17:44:33
version: 1.25
---

In [python Lists](https://docs.python.org/3.7/library/stdtypes.html#lists) are a mutable kind of sequence data type. These lists might be somewhat similar to Arrays in javaScript, but with at least a few note worthy differences such as being a dense rather than sparse kind of array. Lists are not the only option when it comes to arrays in python there is a standard library called array that might prove to be a better option in some cases. However the thing about lists is that it is a type that is built into python itself, and it is just one kind of sever other kinds of sequence types to work with.

In this post I will be going over the basics of lists, how to create them to begin with, how to add and remove elements from them, and also how to sort them. However in the process of doing so I will also be touching base on sequences in general. For example when it comes to built in functions in python there is the list built in function that can be used to create a list, but there is also the range built in function that can be used as a way to create another kind of sequence that is not mutable.

<!-- more -->

## 1 - Basics of Lists in python

So first off I guess I should start off with some very basic examples of lists in python. These are just ways of how to go about creating a list to begin with, and maybe a few other related topics that help when it comes to learning how to work with lists and types in general in python.

This might be a very basic post on lists in python, but I assume that you have at least some background when it comes to the very beginning of getting stared with python. This post is very basic, but still only so basic, if you have no background at all with python it might be a good idea to start with my [getting started post on python](/2020/12/14/python-getting-started/). In that post I touch base on lists a little, but I also get into the very basic of getting started with python when it comes to ruining code to begin with.

### 1.1 - Just a simple list of numbers

A list can be just a collection of numbers, such as an integer type. There is the list built in function that can be used to create a list, but there is also a square bracket syntax.

```python
nums = [0,1,2,3,4,5]
print(nums[3])
print(nums)
```

### 1.2 - A list of strings

A list can also be a collection of strings, in fact it would seem that there are not restrictions when it comes to types. A list can be all integers, strings, or a mix of values.

```python
strs = ['one', 'two', 'three']
print(strs[1]) # 'two'
print(strs)    # ['one', 'two', 'three']
```

### 1.3 - Nested lists

Lists can also be nested, that is that I can have a list of lists. The way of doing this is very similar to that of Arrays of Arrays in javaScript so if you know a thing or two about javaScript you should find the process of making these kinds of lists pretty easy.

```python
grid = [[0,1,2],[3,4,5],[6,7,8]]
print(grid[0])     # [0, 1, 2]
print(grid[0][2])  # 2
print(grid)        # [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
```

## 2 - Adding elements to a list

So there is creating a list, and when doing so it is possible to define some starting elements for a list also. However what if I want to add elements to a list that has been created to begin with. Or maybe just change the value of a given element that is in the range of the list.


### 2.1 - Change the value of an element

If I just want to add an element that is in range of the length of the list then I can just use the bracket syntax to do so. That is that I can use a set of square brackets with an index value between them after the name of the list, and then use the equal symbol to set a new value for an element that is all ready there.

```python
a=list(range(0,2))
a[0]='foo'
a[1]='bar'
print(a)
```

However this is not really adding an element to a list, it is just changing the value of an element that is there to begin with. If I try to add an element to a list this way by giving an index that is out of range, then I will get an error. This is actually a good thing to some extent, the reason why I say that is that lists are a kind of dense array. In javaScript it is possible to create what are called sparse arrays where there can be gaps in arrays. This sparse array thing can cause some effects that might not be expected when it comes to things like using a map function. However this is not really allowed in python, at least not with lists anyway.

Here in this example I am using the range function to create a range that is another kind of sequence type in python. The range function will create and return another kind of sequence type called, you guessed it a range. This kind of sequence type is like a list, but with some note worthy differences one of which is that they can not be mutated. I will be getting into the range function more in this post, but for now lets get back to lists.

Still when it comes to a list, how does one go about adding elements to a list in python? Well lets look at some more examples of doing so that might prove to be better solution for adding elements.

### 2.2 - The append method

The append method of a list is one way to go about adding an element to the end of a list. This way of adding and element to a list will also increase the length of the list. You might find that you can not just use the bracket

```python
a=[]
a.append('foo')
print(a)
```

## 3 - removing elements from a list

So there is adding elements to a list that might increase the range of a list, but then there is also removing elements from a list. When it comes to this there are a number of ways to go about doing so. There is a del keyword, but then also a number of sequence class methods that can also be used to remove elements from a list. So in this section I will be going over some quick simple examples of removing elements from a list.

### 3.1 - The del keyword

The del keyword is one way to go about removing an element from a list, to use it I just need to type del followed by the element that I want to delete using the bracket syntax.

```python
a=list(range(0,2))
print(a) # [0,1]
del a[0]
print(a) # [1]
```

### 3.2 - The clear function

The clear function will clear out all elements from a list.

```python
a=list(range(0,4))
print(a) # [0, 1, 2, 3]
a.clear()
print(a) # [1
```

## 4 - the len function and lists

The len function is another built in function of interest when it comes to lists, as this is a function that will return the length of a list in terms of its elements.

```python
a=[1,2,3,4]
print(len(a)) # 4
```

## 5 - loops, control flow and lists

So I think that I have covered many of the basic when it comes to lists, so now I think that I should get into at least a few control flow examples involving lists. There are two general types of loops in python for loops, and while loops. although I tent to like while loops when it comes to working with lists and sequence types in general often it would seem that for loops are a better choice. However in any case in this section I will be going over loops and lists, and maybe touch base on some control flow examples in general in the process of doing so.

### 5.1 - Using a list with a for loop

One of the types of loops to work with when it comes to lists is a for loop.

```python
a=[1,2,3,4]
# a for loop is one way to loop over elements
for n in a:
  p=pow(2,n)
  print(n,p, sep=",", end=" | ")
# 1,2 | 2,4 | 3,8 | 4,16 |
```

### 5.2 - Basic while loop example

For the most part it might be best to stick with for loops when it comes to lists. However another options is of course a while loop.

```python
a=[1,2,3,4]
i=0
while i < len(a):
  print(i, a[i], sep="-", end=" | ")
  i = i + 1
# 0-1 | 1-2 | 2-3 | 3-4 |
```

### 5.3 - Looping backwards with a while loop

With a while loop I can also loop backwards when it comes to a main index number, but I can still get elements from the beginning forward by just subtracting from length.

```python
a=[1,2,3,4]
length=len(a)
i=length
while i > 0:
  i = i - 1
  index = length - i - 1
  el = a[index]
  print(i, el, sep="-", end=" | ")
# 3-1 | 2-2 | 1-3 | 0-4 |
```

### 5.4 - if statements

Another major component of control flow is an if statement, so how about a quick example of that just for the sake of getting a little exercise in on how to do basic coding not just with lists, but control flow statements in general with python.

```python
a=[ ['pow', 2,4], ['div', 16,7], ['sum', 6, 7] ]
b=[];
for params in a:
    what=params[0]
    p1=params[1]
    p2=params[2]
    if(what == 'pow'):
        b.append(pow(p1, p2))
    if(what == 'div'):
        b.append(p1 / p2)
    if(what == 'sum'):
        b.append(p1 + p2)
print(b) # [16, 2.2857142857142856, 13]
```

## 6 - Sorting a list

There will comes times where I will want to sort the elements of a list. For this there is a sort method that can be called off of an instance of a list. This sort function will mutate the list in place, and there are several parameters for reversing the order of the elements, and setting a function that can be used to define the logic used to sort the elements.

### 6.1 - Just sort a list of numbers

If I just want to sort and array of elements that are numbers I can just call the sort function of the list and that is all there is to it.

```python
nums = [7,3,5,6,1,0,0,4,9,9]
nums.sort()
print(nums) # [0, 0, 1, 3, 4, 5, 6, 7, 9, 9]
```

### 6.2 - Reverse

To reverse the order of th sort there is the reverse parameter than can be used to do so.

```python
nums = [7,3,5,6,1,0,0,4,9,9]
nums.sort(reverse=True)
print(nums) # [9, 9, 7, 6, 5, 4, 3, 1, 0, 0]
```

### 6.3 - Use a key function

I can also set a key function which is one way to do about defining some custom logic for the sort. For example say that I want to sort a list of elements not just by there over all value, but if they are a multiple of 2 or not. I can create a function that will accept and element as a parameter and then return the result of an expression that preforms a modulo operation with the element value and tests if the result is equal to zero or not.

```python
def mOf2(el):
    return el % 2 == 0
nums = [7,3,5,6,1,0,0,4,9,9]
nums.sort(key=mOf2, reverse=True)
print(nums) # [9, 9, 7, 6, 5, 4, 3, 1, 0, 0]
```

## 7 - The map built in function and lists

The map built in function useful for creating a new list with some logic that is to be applied to all elements in a source list. What is create about this built in function is that it will not mutate the source list that is used with it. The function will return a type of its on called map, however converting a map back to a list is as easy as just passing the map to the list built in function.

```python
def power(n):
  return pow(2, n)
 
a=[0,1,2,3,4,5]
b=map(power, a)
c=list(b)
 
# the use of map will create a map type
print(type(b).__name__) # map
# the list function can turn it back into a list
print(c) # [1, 2, 4, 8, 16, 32]
# none of this will mutate the source list
print(a) # [0, 1, 2, 3, 4, 5]
```

## 8 - The range function and sequence type

A range is another kind of sequence type to work with beyond that of just lists. A range is a great way to create, well a range of numbers by just giving for example a starting and ending value for the range. A third argument can also be given to define a stepping value other than that of one. However one draw back of a range is that it is a kind of sequence type in python that can not be mutated, however this is easily fixed by using the list built in function to convert a range to a list, and of course as we have established in this post lists are totally mutable.

```python
a=range(0,10)
# use of range will return a range type
# this is a kind of non mutabule sequence
print(type(a).__name__) # range
 
# The list function can qucikly turn a range
# into a list which is mutabule
b=list(a)
b[2]="two"
print(type(b).__name__) # list
print(b) # [0, 1, 'two', 3, 4, 5, 6, 7, 8, 9]
```

## 9 - Safe get index method

So it would be nice if List had a [safe list get method](https://stackoverflow.com/questions/5125619/why-doesnt-list-have-safe-get-method-like-dictionary) But it would seem there is is not one. However it is not so hard to make one by just making use of a try statement in the body of a function with just a few arguments.

```python
def safe_list_get (l, idx, default):
    try:
        return l[idx]
    except IndexError:
        return default
 
l=[1,2,3]
print( safe_list_get(l, 0, 42) ) # 1
print( safe_list_get(l, 7, 42) ) # 42
```

## 10 - conclusion

So that is it for now when it comes to lists in python. I think that I have touched base on many of the basics at least when it comes to lists, but I am sure there is a great deal more to write about that I have not got to just yet. As of this writing I am still fairly new to python myself, so at some point in the future I am going to want to edit this post. Hopefully by then I will have some more interesting examples worked out to expand this post more, and also cover some additional topics that are important to be aware of when it comes to getting started with lists in python.
