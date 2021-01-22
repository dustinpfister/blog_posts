---
title: Random Numbers in Python
date: 2021-01-22 15:30:00
tags: [python]
categories: python
layout: post
id: 787
updated: 2021-01-22 15:37:03
version: 1.1
---

There should be a built in way to create random numbers in python, and there is at least one way by making use of the [random standard library](https://docs.python.org/3.7/library/random.html).


<!-- more -->

## 1 - Basic random example

```python
import random
 
r=random.random()
print(r)
```

## 2 - Getting a random range

### 2.1 - random int range

```python
import random
 
r=random.randint(1, 6)
print(r)
```

### 2.2 - random float range

```python
import random
 
r=random.randint(1, 6)
print(r)
```

