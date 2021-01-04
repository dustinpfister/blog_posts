---
title: The Array library in Python
date: 2021-01-04 12:58:00
tags: [python]
categories: python
layout: post
id: 774
updated: 2021-01-04 14:42:32
version: 1.12
---

Built into python itself is the list data type, and for most situations this seems to work well as an array in python. However it is not like lists are the only option when it comes to arrays, or sequence types in python, another built in feature is arrays. Arrays might not be there to begin with, but they can quickly be added by way of the [array standard library](https://docs.python.org/3/library/array.html). Lists might still work just fine in most situations, however I think I should take a moment to at least touch base on these wheh it comes to being aware at least of an alterative to lists, and the other sequence types that are built into python itself.

<!-- more -->

The main difernce between arrays and lists would seem to be the data types of the elements. For example if you are familiur with javaScript in that lanague an Array, or at least the main built in Array class can be a collection of any data type in javaScript. You can have an array of numbers, strings, additional arrays, and so forth. There is also however in late specs of javaScript at least a collection of Typed Arrays where there is not this degreee of liberty as the the kinds of data types that one can use in an array. In python lists are somewhat like Arrays in javaScript, there are a few diferences such as the dense rather than sparse nature of lists, but for the most part I find them simular to jaavScript Ararys. So then there should be a way of creating the equavent of types arrays in python right? Well it would seem that the array standard library supplys just that. Again there are a few diferences though, but if you are familiout with typed arrays in javaScript the array standard module will proved something that is simular to thoese types of arrays.

## 1 - Some basic examples of arrays

In this section I will be going over just a few quick, simple, getting started examples of arrays with the array standard library. That is just creating a single array of a single type, and just a few other basic examples that have to do with getting the current type of the array if it is not know to begin with.

### 1.1 - A simple integer example of an array

For a basic getting started example of arrays in python, here is a basic example of a simple integer array.

```python
import array as arr
a=arr.array('i', [1,2,3,4])
 
print( a[1] ) # 2
print(type(a).__name__, type(a[0]).__name__) # array int
```

By using the type built in function and the name propery I can confirm the type of the array itself, and the data type of the elements. Becuase this is an integer array I can only add integer values to it. If I set an element to a value other than an integer that will result in an error. Also there is a limit when it comes to integer values, if I go over that value it will result in an error. Also this is not just an integer array, it is also an signed integher array, if I want unsigned integers I will want to use a capital I for the type code.

### 1.2 - Find the typecode of an array

What if I am in a situstion in which I need to know what the data type of the array that was created before hand. For this there is the type code of the array.

```python
import array as arr
 
a=arr.array('i', [1,2,3])
b=arr.array('I', [1,2,3])
 
print(a.typecode) # i
print(b.typecode) # I
```

### 1.3 - Show all the type codes for arrays

So it is imporatnt to know what the type codes are for arrays. With that said there is the type codes property of the array module. However this will just give a string of all the type codes, it will not explain what each of them are.

```python
import array as arr
print(arr.typecodes) # bBuhHiIlLqQfd
```

To really know which one is which a table is needed.

```
Type code
b            signed char            int 
B            unsigned char          int
u            wchar_t                Unicode character
h            signed short           int
H            unsigned short         int
i            signed int             int
I            unsigned int           int
l            signed long            int
L            unsigned long          int
q            signed long long       int
Q            unsigned long long     int
f            float                  float
d            double                 float
```

## 2 - Some of the basic functions of arrays

Now that I have covered some of the very basics of arrays in python, I think that I should move on to some more examples of arrays. This time I will be focusing on what there is to work with when it comes to functions in the array library. I will not be getting to all of them here, but I think I should cover some of the most imporant ones at least real quick.

### 2.1 - The append method

Just like lists in python by itself these arrays are dense, not sparse. So I can not just set any index value I want to an array, I must stay within the range of the array. There are ways of incressing the range of the array though in place without creating a new array. Just like with lists there is also an append method, this will append a new element to the end of the array, incressing the range of the array in the process of doing so.

```python
import array as arr
 
a = arr.array('i', [1,2])
 
# len can be used to get the length
print(len(a)) # 2
 
# append can be used to append a new element to the end
a.append(3)
 
print(a[2]) # 3
print(len(a)) # 3
```

### 2.2 - The pop method

The append method is one way to go about adding additional elememnts to an array, but then there is the pop method which is the first methohd that comes to mind when it comes to removing elements from an array. By default it will remove the last element from an array, but an index value can be given as the first an only argument. So the pop method can eb used to remove any element from an array, assuming that you know the index value to begin with.

```python
import array as arr
 
a = arr.array('i', [1,2,3])
 
print( a.pop(0) ) # 1
print( a.pop() )  # 3
 
print( a[0] )     # 2
print( len(a) )   # 1
```

### 2.3 - The count method

The count method of an array instnace os one way to get a count of a number of elements in an array that are of a given value.

```python
import array as arr
 
a = arr.array('i', [1,0,0,1,1,1,0,1,1,1])
 
print(a.count(0)) # 3
print(a.count(1)) # 7
print(a.count(2)) # 0
```

### 2.4 - The to list method

There should be a way to create a list from an array.

```python
import array as arr
 
a = arr.array('i', [255])
b = a.tolist()
 
print(type(a), type(b)) # <class 'array.array'> <class 'list'>
```

## 3 - Conclusion

I am not going to say that arrays should always be used over lists, or anything to that effect. There is no golden hammer when it comes to these types of things. In fact most of the time I am sure that I would prefer to use lists, it is just that in some situtsions I should probibnly use these arrays in place of lists. 

When it comes to javaScript there is of course the nature of types arrays, and with some kinds of code projects the use of these kinds of arrays is a better choice as it will help enforce a kind of data type. If I am working out some code that manipulates binary data then useing a 8bit clamped array might prove to be a good choice. However more often than not I am just not writing that kind of code, and just plain old javaScript Arrays work find for the kind, and style of coding that I do. I guess I can say more or less the same when it comes to lists, and these kinds of arrays in python so far.
