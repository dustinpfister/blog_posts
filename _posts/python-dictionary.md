---
title: Dictionaries in Python
date: 2020-12-31 13:41:00
tags: [python]
categories: python
layout: post
id: 772
updated: 2020-12-31 14:56:58
version: 1.15
---

In an effert to continue learning the basic of python it was only a matter of time until I got around to writing a post on [dictionaries](https://docs.python.org/3/library/stdtypes.html#mapping-types-dict) as a data type option to work with. In python a dictionary is one of several built in data types on top of other options like integers, strings and lists, so they are there to work with right away with the python lanague itself. 

A dicitionary is somewhat simular to a list in some ways, as it is also a [data structor option](https://docs.python.org/3/tutorial/datastructures.html), but with a few very imporant diferences. First off unlike a list, a dictionary is a way to create a named collection of values rather than a numbered one. The other imporatant diference is that I can not just loop over a dicitionary, at least not a dictionary value by itself anyway.

In this post I will be going over some of the basics of dictionary values in python, how to go about creating them, and looping over the contents of them.

<!-- more -->

## 1 - The basic of dictionaries in python

In this section I will be going over just the very basic of dictionaries for starters. There are a number of ways to go about creating them to begin with, and on top of that I think there are a few more things that should be covered in a basic getting staretd section such as this. A dictionary works a little diferent from what you might be familiey with in other programing enviormentbs. For example in javaScript if I try to get a property of an object to which there is not key then that does not typically result in an error, but a value of undefined. In python however this will cuase an error, so even when it comes to the basics of this kind of data type there is a need to quikcly go over some simple examples first.

### 1.1 - Creating a dictionary with the bracket syntax

One way to go about creating adictionary is to use the bracket syntax, when doing so it is also possible to set some starting values for the dictionary also.

```python
d={'a': 0, 'b': 1}
 
print(type(d).__name__) # dict
print(d['a']) # 0
```

### 1.2 - The dict built in function is another way to create a dictionary

Another way to go about creating a dictionry value would be to use the dict built in function. All other built in types have such functions when it comes to lists, and integers, so of course a dictionary value is not an exception with this. When using the dict function as with the bracket syntax it is psooble to set some starting values for the dictionary, although with a slightly diferent syntax.

```python
d=dict([('a', 0)])
d['b']=1
 
print(type(d).__name__) # dict
print(d['a']) # 0
print(d['b']) # 1
```

### 1.3 - Getting and setting key value pairs

The process of getting and setting values with a dictionay is not as straght forward as it might be in other lanagues, at least when it comes to javaScript anyway. If I try to get a value of a key that is not defined for an object in javaScript i end up with the value undefined, however in python this will cause an error. So to get at key value pairs that might not be there in an error free way it might be best to use the get method of a dictionary. Also setting the key values is a little diferent from what I am used to with javaScript, I must use the bracket syntax and only that to set a key afetr it has been created.

```python
# a blank dict
d={}

# keys can be added like this
d['a'] = 1
 
# The get method of a dict is what can be used
# to get any key in an Error Free way
print( d.get('a', 0) ) # 1
print( d.get('b', 0) ) # 0
print( d.get('b') )    # None
 
# just getting a key that is not there
# without uisng get will cause an Error
print( d['b']) # Error
```

### 1.4 - Creating a list from a dictionary

Another basic thing that I think is important to know right away is how to go about creating a list from a dictionary. There are many reasons why I would want to convert a dictionary to a list, such as when it comes to creating a way to loop over the contents of a dictionary. However there are other options when it comes to that beyond converting to a list, and in some situations it might be better to go with those options. I will be getting into the subject of looping over a dicitiopnty in the next section, but maybe it is a good idea to look over what the options are for getting started with that at least when it comes to creating other forms of a dicitiory that will work with loops.

When creating something from a dicitionary to loop over there are the key names, and the values, so there should be a way of creating a list of each. If I want a list of key names I can just pass the dictionary value to the list built in function, the return result will be a list of key names. Howeve another option for this would be to use the keys method of the dictionary, this by itself will not return a list, but it can be easily converted to one. If I want a list of value there is the values method of a dictionary, but again I will want to pass the result to the list built in function.

```python
a={'a': 0, 'b': 1}
b=list(a)
c=a.values()
d=list(c)
 
print(type(b).__name__) # list
print(b) # ['a', 'b']
 
print(type(c).__name__) # dict_values
 
print(type(d).__name__) # list
print(d) # [0, 1]
```

I will be  getting into the dict values class and why that is useful later in this post as I think that is a more advanced topic.

### 1.5 - Geting the length of a dictionary

Getting the length of a dictionry is more or less the same as getting the length of a list. I just need to pass the dictionary to the len built in function and that seems to give the result I would exspect.

```python
# a blank dict
d={'a': 1, 'b': 2, 'c': 3}
 
# just using len seems to work okay
print( len(d) ) # 3
 
# some other ways that give the same result
print( len(d.keys()) )    # 3
print( len(d.values()) )  # 3
print( len(d.items()) )   # 3
```

## 2 - Looping over the contents of a dictionary

If you try to just go ahead and loop over a dictionary like you would a list you will run into errors. However this problem is easly remadued by converting the dictionary to another from that can be looped over with a for loop, or any other loop, such as by creating a list from the dictionary first.

In this section I will be going over some code options when it comes to looping over the contents of a dictionary.

### 2.1 - The items method of a dictionary

The items method of a dictionary might be one of the best ways to go about looping over a dictionary, it will allow having both a key and value varaible to work with in the body of the loop like this:

```
d = {'site': 'dustinpfister.github.io', 'subject': 'python'}
for key, value in d.items():
    print(key, ' ==> ', value, sep="")
# site ==> dustinpfister.github.io
# subject ==> python
```

### 2.2 - The keys and values methods

Another option would be to use the keys method of a dictionry which will work fine if I just want to loop over the key values of a dictionry. In addition there is also the values method if I just want to loop over values.

```python
d = {'site': 'dustinpfister.github.io', 'subject': 'python'}
 
## keys method
for key in d.keys():
    print(key)
# site
# subject
 
for value in d.values():
    print(value)
# dustinpfister.github.io
# python
```

### 2.3 - The list built in function

Yet another option is the list built in function that will create a list of key names from a dictionary. So then that is also an option if I just want to loop over key names.

```python
d = {'site': 'dustinpfister.github.io', 'subject': 'python'}
for key in list(d):
    print(key)
# site
# subject
```

## 3 - View objects of dictionaries

Methods like the items method of an instance of a dictionary will not return just a plain old dumb list, but an instance of a special class that is actaully a view of the dictionary. So in other words as changes are made to a dictionry to which one of these views is created from that will reflect in the view. If I do truly create a list from a dictionry for example this kind of effect will be lost, and changes will of course not effect that list that is truly sepeate from the dictionary.

```python
# creating a dict
d={}
 
# creating a view of dict
v=d.items()
# creating a list from dict
l=list(d)
 
# adding key value pairs to the dict after creating view
d['a']=40
d['b']=2
 
# the view reflects the current state of the dict
print(list(v)) # [('a', 40), ('b', 2)]
 
# the plain old list does not
print(l) # []
```

## 4 - Conclusion

That is it for now when it comes to dictionary values in python. I would write more about them, but I am still fairly new to python myself, so maybe I should log some more hourse coding examples before getting into expanding this post.
