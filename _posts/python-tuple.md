---
title: Tuples in Python
date: 2021-01-12 14:32:00
tags: [python]
categories: python
layout: post
id: 779
updated: 2021-01-12 16:04:22
version: 1.9
---

There are a few built in data types in python, and one such type is a tuple. Like lists a tuple is a kind of sequence type, however one major diference is that a tuple is not mutabule. So once a tuple is created, the only way to mutate values is to create a new tuple. So then a tuple might be a good choice for some kind of data that I want to remain fixed, and then I can create additional tubles, and other sequence types from these tuples.

<!-- more -->

## 1 - create a tuple

To create a tuple I just need to use a parentheses syntax where I place the values that I want in a set of openeing and closing parentheses. Just like with a list where I use a bracket syntax in place of parentheses, values need to be sepearted with commas.

```python
t=(1,2,3,4,5)
print(t[0])   # 1
print(t[2:4]) # (3,4)
```

## 2 - Tuples and Lists

Both lists and tuples are sequence types, and for the most part it would seem that the only real diference is that a tuple can not be changed once it is created. So when it comes to working with data from a tuple there is creating new tuples from a source tuple, and then there is converting a tuple to a list, which is another kind of sequence type where the values can be changed.

### 2.1 - Use the list built in function to convert to list

Tubles can not be mutated, however a list can, so often I might want to convert a tuple to a list so I can then mutate values. one way to do so would be to just pass the tuple to the list built in function.

```python
t=(1,2,3,4,5)
l=list(t[2:4])
 
print( type(l).__name__ ) # list
print( l ) # [3, 4]
```

### 2.2 - Chainging a value in a list created from a tuple should not effect the source

The main thing about creating a list from a tuple is that generaly any change to a resulting list created from a tuple should not effect the source value in the tuple. This should go without saying becuase a tuple can not be mutated, but this is true only with the tuple itself, and not any nested values that it might have. More on that later in this section, but first maybe I should start with just a basic example of what I mean by this.

If I have just a simple tuple of numbers, I can then just create a new list from that tuple of numbers by using the list built in function. Once I have this new list of numbers from the tuple any change that I make to the values of the list will not effect the source tuple from which the list was created.

```python
t=(1,2,3,4,5)
l=list(t)
 
i=0
while i < len(l):
    l[i] = l[i] * 7
    i = i + 1
 
print(l) # [7, 14, 21, 28, 35]
print(t) # (1, 2, 3, 4, 5)
```

So for so good, but do not exspect for this to always be the case, as there are actully some exceptions to this kind of behaviour when it comes to nested values in tuples. Maybe tuples themselfs can not be mutated, but a nested value in a tuple can be of it is a value of another sequence type that can be mutated such as a list.

### 2.3 - nested lists in tuples can cause a problem

It is possible to have lists as values for a tuple, when doing so it is possibule to change a value in one of the nested lists. In some cases this might not present a problem if this just happens to be what I want to happen. However in some cases I might want a tuple to serve as a default set of values that can then be mutated.

```python
t=([1,2,3],[4,5,6])
l=list(t)
 
# mutating a value in this list can effect the source
l[0][0]= 40
print( type(l).__name__ ) # list
print( l ) # [[40, 2, 3], [4, 5, 6]]
print( t ) # ([40, 2, 3], [4, 5, 6])
```
