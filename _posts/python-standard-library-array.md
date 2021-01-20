---
title: The Array library in Python
date: 2021-01-04 12:58:00
tags: [python]
categories: python
layout: post
id: 774
updated: 2021-01-20 14:00:35
version: 1.17
---

Built into python itself is the list data type, and for most situations this seems to work well as an array in python. However it is not like lists are the only option when it comes to arrays, or sequence types in python, another built in feature is arrays. Arrays might not be there to begin with, but they can quickly be added by way of the [array standard library](https://docs.python.org/3/library/array.html). Lists might still work just fine in most situations, however I think I should take a moment to at least touch base on these when it comes to being aware at least of an alternative to lists, and the other sequence types that are built into python itself.

<!-- more -->

The main difference between arrays and lists would seem to be the data types of the elements. For example if you are familiar with javaScript in that language an Array, or at least the main built in Array class can be a collection of any data type in javaScript. You can have an array of numbers, strings, additional arrays, and so forth. There is also however in late specs of javaScript a collection of Typed Arrays where there is not this degree of liberty as the the kinds of data types that one can use in an array. In python lists are somewhat like Arrays in javaScript, there are a few differences such as the dense rather than sparse nature of lists, but for the most part I find them similar to jaavScript Arrays. So then there should be a way of creating the equivalent of types arrays in python right? Well it would seem that the array standard library supplies just that. Again there are a few differences though, but if you are aware of typed arrays in javaScript the array standard module will proved something that is similar to those types of arrays.

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

By using the type built in function and the name property I can confirm the type of the array itself, and the data type of the elements. Because this is an integer array I can only add integer values to it. If I set an element to a value other than an integer that will result in an error. Also there is a limit when it comes to integer values, if I go over that value it will result in an error. Also this is not just an integer array, it is also an signed integer array, if I want unsigned integers I will want to use a capital I for the type code.

### 1.2 - Find the typecode of an array

What if I am in a situation in which I need to know what the data type of the array that was created before hand. For this there is the type code of the array.

```python
import array as arr
 
a=arr.array('i', [1,2,3])
b=arr.array('I', [1,2,3])
 
print(a.typecode) # i
print(b.typecode) # I
```

### 1.3 - Show all the type codes for arrays

So it is important to know what the type codes are for arrays. With that said there is the type codes property of the array module. However this will just give a string of all the type codes, it will not explain what each of them are.

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

Now that I have covered some of the very basics of arrays in python, I think that I should move on to some more examples of arrays. This time I will be focusing on what there is to work with when it comes to functions in the array library. I will not be getting to all of them here, but I think I should cover some of the most important ones at least real quick.

### 2.1 - The append method

Just like lists in python by itself these arrays are dense, not sparse. So I can not just set any index value I want to an array, I must stay within the range of the array. There are ways of increasing the range of the array though in place without creating a new array. Just like with lists there is also an append method, this will append a new element to the end of the array, increasing the range of the array in the process of doing so.

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

The append method is one way to go about adding additional elements to an array, but then there is the pop method which is the first method that comes to mind when it comes to removing elements from an array. By default it will remove the last element from an array, but an index value can be given as the first an only argument. So the pop method can be used to remove any element from an array, assuming that you know the index value to begin with.

```python
import array as arr
 
a = arr.array('i', [1,2,3])
 
print( a.pop(0) ) # 1
print( a.pop() )  # 3
 
print( a[0] )     # 2
print( len(a) )   # 1
```

### 2.3 - The count method

The count method of an array instance is one way to get a count of a number of elements in an array that are of a given value.

```python
import array as arr
 
a = arr.array('i', [1,0,0,1,1,1,0,1,1,1])
 
print(a.count(0)) # 3
print(a.count(1)) # 7
print(a.count(2)) # 0
```

### 2.4 - The to list method

There should be a way to create a list from an array, and onw way to go about doing so is the to list method.

```python
import array as arr
 
a = arr.array('i', [255])
b = a.tolist()
 
print(type(a), type(b)) # <class 'array.array'> <class 'list'>
```

## 3 - Looping over arrays

Just with lists arrays to and be looped over with for a while loops. In this section I will just go over a few quick examples of looping and arrays.

### 3.1 - For loop example

One way to loop over the contents of an array is to use a for loop.

```python
import array
 
a = array.array('i', [1,2,3,4])
 
for x in a:
    y = pow(2,x)
    print(x, y, sep="-", end="; ")
# 1-2; 2-4; 3-8; 4-16;
```

## 4 - Multidimensional arrays

It would seem that these kinds of arrays can not be arrays of arrays. However I often make all of my arrays linear anyway even arrays that I want to make multidimensional.

```python
import array
 
def createMulti(w=3, h=3):
    a = array.array('i')
    i=0
    while(i < w * h):
        a.append(i)
        i = i + 1
    return {'a': a, 'w': w, 'h': h}
 
def getMultiPos(m, x=0, y=0):
    a=m['a']
    return a[int(y * m['w'] + x)];
 
m=createMulti(5, 5)
print(getMultiPos(m, 2, 1)) # 7
```

## 5 - Conclusion

I am not going to say that arrays should always be used over lists, or anything to that effect. There is no golden hammer when it comes to these types of things. In fact most of the time I am sure that I would prefer to use lists, it is just that in some situations I should probably use these arrays in place of lists. 

When it comes to javaScript there is of course the nature of types arrays, and with some kinds of code projects the use of these kinds of arrays is a better choice as it will help enforce a kind of data type. If I am working out some code that manipulates binary data then using a 8bit clamped array might prove to be a good choice. However more often than not I am just not writing that kind of code, and just plain old javaScript Arrays work find for the kind, and style of coding that I do. I guess I can say more or less the same when it comes to lists, and these kinds of arrays in python so far.
