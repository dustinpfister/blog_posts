---
title: The Array library in Python
date: 2021-01-04 12:58:00
tags: [python]
categories: python
layout: post
id: 774
updated: 2021-01-04 13:39:13
version: 1.5
---

Built into python itself is the list data type, and for most situations this seems to work well as an array in python. However it is not like lists are the only option when it comes to arrays, or sequence types in python, another built in feature is arrays. Arrays might not be there to begin with, but they can quickly be added by way of the array standard library.

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

By using the type built in function and the name propery I can confirm the type of the array itself, and the data type of the elements. Becuase this is an integer array I can only add integer values to it.

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

## Conclusion

I am not going to say that arrays should always be used over lists, or anything to that effect. There is no golden hammer when it comes to these types of things. In fact most of the time I am sure that I would prefer to use lists, it is just that in some situtsions I should probibnly use these arrays in place of lists. 

When it comes to javaScript there is of course the nature of types arrays, and with some kinds of code projects the use of these kinds of arrays is a better choice as it will help enforce a kind of data type. If I am working out some code that manipulates binary data then useing a 8bit clamped array might prove to be a good choice. However more often than not I am just not writing that kind of code, and just plain old javaScript Arrays work find for the kind, and style of coding that I do. I guess I can say more or less the same when it comes to lists, and these kinds of arrays in python so far.
