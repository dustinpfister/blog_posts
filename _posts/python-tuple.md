---
title: Tuples in Python
date: 2021-01-12 14:32:00
tags: [python]
categories: python
layout: post
id: 779
updated: 2021-01-20 14:23:43
version: 1.16
---

There are a few built in data types in python, and one such type is a [tuple](https://www.tutorialspoint.com/python/python_tuples.htm) which is yet another option when it comes to data structure in python. Like lists a tuple is a kind of sequence type, however one major difference is that a tuple is not mutable. So once a tuple is created, the only way to mutate the tuple is to create a new tuple. However when it comes to nested values in a tuple they can still be mutated assuming that it is a type that allows for that such as a list. So then a tuple might be a good choice for some kind of data that I want to remain fixed, and then I can create additional tuples, and other sequence types from these tuples.

In javaScript I often have a collection of hard coded data in a module, and often I want to create a copy of that collection of that data that is completely separate from it. So when I make a change to the copy of the hard coded data, such a change effects the copy and not the hard coded source. So then I often have a way to go about creating what is called a deep copy of that hard coded data. In python I can use tuples as a way to go about creating that kind of fixed hard coded data. I can have just a single tuple, and nested tuples. Then I just need to have a way to go about creating a nested lists form of that hard coded data in tuple form.

<!-- more -->

## 1 - create a tuple

To create a tuple I just need to use a parentheses syntax where I place the values that I want in a set of opening and closing parentheses. Just like with a list where I use a bracket syntax in place of parentheses, values need to be separated with commas.

```python
t=(1,2,3,4,5)
print(t[0])   # 1
print(t[2:4]) # (3,4)
```

## 2 - Tuples and Lists

Both lists and tuples are sequence types, and for the most part it would seem that the only real difference is that a tuple can not be changed once it is created. So when it comes to working with data from a tuple there is creating new tuples from a source tuple, and then there is converting a tuple to a list, which is another kind of sequence type where the values can be changed.

### 2.1 - Use the list built in function to convert to list

Tubles can not be mutated, however a list can, so often I might want to convert a tuple to a list so I can then mutate values. one way to do so would be to just pass the tuple to the list built in function.

```python
t=(1,2,3,4,5)
l=list(t[2:4])
 
print( type(l).__name__ ) # list
print( l ) # [3, 4]
```

### 2.2 - Changing a value in a list created from a tuple should not effect the source

The main thing about creating a list from a tuple is that generally any change to a resulting list created from a tuple should not effect the source value in the tuple. This should go without saying because a tuple can not be mutated, but this is true only with the tuple itself, and not any nested values that it might have. More on that later in this section, but first maybe I should start with just a basic example of what I mean by this.

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

So for so good, but do not expect for this to always be the case, as there are actually some exceptions to this kind of behavior when it comes to nested values in tuples. Maybe tuples themselves can not be mutated, but a nested value in a tuple can be of it is a value of another sequence type that can be mutated such as a list.

### 2.3 - Nested lists in tuples can cause a problem (or not)

It is possible to have lists as values for a tuple, when doing so it is possible to change a value in one of the nested lists. In some cases this might not present a problem if this just happens to be what I want to happen. Maybe I am working on a project where I want a set of lists to be a fixed thing, but the values in the list can change. If that is the case then maybe there is not a problem when it comes to having lists as values in a tuple.

However in some cases I might want a tuple to serve as a default set of values that can then be mutated later by creating a list from the tuple that is saving as something that I expect to be a find of fixed source. So if I do just pass the tuple to list, and then mutate a value in one of the nested lists, such a change will effect the source list in the tuple.

```python
t=([1,2,3],[4,5,6])
l=list(t)
 
# mutating a value in this list can effect the source
l[0][0]= 40
print( type(l).__name__ ) # list
print( l ) # [[40, 2, 3], [4, 5, 6]]
print( t ) # ([40, 2, 3], [4, 5, 6])
```

If I do not want the source tuple of lists to mutate then I would need to not just simply pass the tuple of lists to the list built in function. The list function will not just create a deep clone for the nested values. So I will need to deep copy the lists somehow, and also to help make sure that the values will not ever be mutated I might want to have nested tuples rather than a tuple of lists.

### 2.4 - Nested tuples in a tuple

In some projects maybe it is a good thing to be able to have lists as element values in a tuple, so then I can not change that an elements of a tuple is anything but a list, but I can still change the list itself. Still in some situations I might want to have nested values that can not be mutated. In such a situation it might be best to have nested tuples, rather than a tuple of lists.

```python
t=((1,2,3),(4,5,6))
l=list(t)
l[0] = list(t[0])
l[1] = list(t[1])

# mutating a value in this list will not effect source
l[0][0]= 40
print( type(l).__name__ ) # list
print( l ) # [[40, 2, 3], [4, 5, 6]]
print( t ) # ((1, 2, 3), (4, 5, 6))
```

## 3 - Conclusion

That is it for now when it comes to tuples in python. They are a decent data type when it comes to writing anything that is a kind of fixed record of data that should not be mutated. There are some things to look out for when it comes to nested values, but there is just having nested tuples if the desired effect is for all values to remain constant.
