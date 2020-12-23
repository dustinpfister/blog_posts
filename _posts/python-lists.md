---
title: Lists in Python
date: 2020-12-23 11:57:00
tags: [python]
categories: python
layout: post
id: 768
updated: 2020-12-23 13:44:52
version: 1.14
---

In [python Lists](https://docs.python.org/3.7/library/stdtypes.html#lists) are a mutabule kind of sequence data type. These lists might be somewhat simular to Arrays in javaScript, but with at least a few note worthy diferences such as beging a dense rather than sparce kind of array. Lists are not the only option when it comes to arrays in python there is a standard library called array that might prove to be a better option in some cases. However the thing about lists is that it is a type that is built into python itself, and it is just one kind of sever other kinds of sequence types to work with.

In this post I will be going over the basic of lists, how to create them to beging with, how to add and remove elements from them, and also how to sort them. However in the process of doing so I will also be touching base on sequences in general. For example when it comes to built in functions in python there is the list built in function that can be used to create a list, but there is also the range keywod that can eb used as a way to create another kind of sequence that is not mutabule.

<!-- more -->

## 1 - Basics of Lists in python

So first off I guess I should start off with some very basic examples of lists in python. These are just ways of how to go about creating a list to begin with, and maybe a few other realted topics that help when it comes to learniong how to work with lists and types in general in python.

This might be a very basic post on lists in python, but I assume that you have at least some background when it comes to the very begining of getting stared with python. This post is very basic, but still only so basic, if you have no background at all with python it might be a good idea to start with my [getting started post on python](/2020/12/14/python-getting-started/). In that post I touch base on lists a little, but I also get into the very basic of getting started with python when it comes to runing code to begin with.

### 1.1 - Just a simple list of numbers

A list can be just a collection of numbers, such as an integer type. There is the list built in function that can be used to create a list, but there is also a square bracket syntax.

```python
nums = [0,1,2,3,4,5]
print(nums[3])
print(nums)
```

### 1.2 - A list of strings

A list can also be a collection of strings, in fact it would seem that there are not restrections when it comes to types. A list can be all iniegers, strings, or a mix of values.

```python
strs = ['one', 'two', 'three']
print(strs[1]) # 'two'
print(strs)    # ['one', 'two', 'three']
```

### 1.3 - Nested lists

Lists can also be nested, that is that I can have a list of lists. The way of doing this is very simular to that of Arrays of Arrays in javaScript so if you know a thing or two about javaScript you should find the process of making these kinds of lists pretty easy.

```python
grid = [[0,1,2],[3,4,5],[6,7,8]]
print(grid[0])     # [0, 1, 2]
print(grid[0][2])  # 2
print(grid)        # [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
```

## 2 - Adding elements to a list

So there is creating a list, and when doing so it is possible to define some starting elements for a list also. However what if I want to add elements to a list that has been created to begin with. Or maybe just chnage the value of a given element that is in the range of the list.


### 2.1 - Change the value of an element

If I just want to add an element that is in range of the length of the list then I can just use the bracket syntax to do so. That is that I can use a set of square brackets with an index value betwen them after the name of the list, and then use the equal symbol to set a new value for an element that is all ready there.

```python
a=list(range(0,2))
a[0]='foo'
a[1]='bar'
print(a)
```

However this is not really adding an element to a list, it is just changing the value of an element that is there to begin with. If I try to add an element to a list this way by giving an index that is out of range, then I will get an error. This isactaully a good thing to some extent, the reason why I say that is that lists are a kind of dense array. In javaScript it is possible to create what are called sparse arrays where there can be gaps in arrays. This sparse arary thing can casue some effects that might not be exspected when it comes to things like using a map function. However this is not really allowed in python, at least not with lists anyway.

Still how does one go about adding elements to a list in python? Well lets look at somre more examples.

### 2.2 - The append method

The apppend method of a list is one way to go about adding an element to the end of a list. This way of adding and element to a liest will also increase the lnegth of the list. You might find that you can not just use the bracket

```python
a=[]
a.append('foo')
print(a)
```


Here in this example I am using ther range function to create a range that is another kind of sequence type in python.

## 3 - removing elements from a list

So there is adding elememnts to a list that might increase the range of a list, but then there is also removing elements from a list.

### 3.1 - del

The del keyword is one way to go about removing an element from a list

```python
a=list(range(0,2))
print(a) # [0,1]
del a[0]
print(a) # [1]
```

### 3.2 - clear

The clear funciton will clear out all elements from a list.

```python
a=list(range(0,4))
print(a) # [0, 1, 2, 3]
a.clear()
print(a) # [1
```

## 4 - the len function and lists

The len fuinction is anotgher built in function of interest when it comes to lists, as this is a function that will return the length of a list in terms of its elements.

```python
a=[1,2,3,4]
print(len(a)) # 4
```

## 5 - loops, control flow and lists

So I think that I have covered many of the basic when it comes to lists, so now I think that I should get into at least a few control flow examples involving lists.

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

## 6 - Sorting a list

There will comes times where I will want to sort the elements of a list. For this there is a sort method that can be called off of an instnace of a list. This sort function will mutate the list in place, and there are several parameterts for reverseing the order of the elements, and setting a function that can be used to define the logic used to sort the elements.

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

I can also set a key functon which is one way to do about defining some custom logic for the sort.

```python
def mOf2(el):
    return el % 2 == 0
nums = [7,3,5,6,1,0,0,4,9,9]
nums.sort(key=mOf2, reverse=True)
print(nums) # [9, 9, 7, 6, 5, 4, 3, 1, 0, 0]
```

## 7 - The map built in function and lists

The map built in function usfule for creating a new list with some logic that is to be appled to all elements in a source list.

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

## 8 - range

A range is another kind of sequece type to work with beyond that of just lists. A range is a great way to create, well a range of numbers by just giving for example a starting and ending value for the range. A therd argumen can also be given to define a steping value other than that of one. However one draw back of a range is that it is a kind of sequence type in python that can not be mutated, however this is eaily fixed by using the list built in function to convert a range to a list, and of course as we have establed in this post lists are toally mutabule.

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

## 9 - conclusion

So that is it for now when it comes to lists in python. I think that I have touched base on many of the basics at least when it somes to lists, but I am sure there is a great deal more to write about that I have not got to just yet. As of this writing I am still fairly new to python myself, so at some point in the future I am going to want to edit this post. Hopfully by then I will have somre more intersting examples worked out to expand this post more, and aslo cover some additioanl topics that are impoarant to be aware of when it comes to getting started with lists in python.
