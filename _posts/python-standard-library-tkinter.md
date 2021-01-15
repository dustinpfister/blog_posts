---
title: tkinter standard library in python
date: 2021-01-15 15:55:00
tags: [python]
categories: python
layout: post
id: 782
updated: 2021-01-15 16:07:56
version: 1.2
---

In python there is the [tkinter standard library](https://docs.python.org/3.7/library/tkinter.html) that is an official interface for the [TK GUI tool kit](https://en.wikipedia.org/wiki/Tk_%28software%29). This library can then be used as a way to create graphical front ends for python projects. The library works by providing a number of widgets that can be used to create various components in a window such as buttons, menus, a canvas, and text. With these widgets it is possible to make a basic yet functional graphical user interface for a python project.

<!-- more -->

## 1 

### 1.1 - Basic Hello world example

```python
import tkinter as tk
root = tk.Tk()
root.minsize(320, 240)
a = tk.Label(root, text ="Hello World") 
a.pack() 
root.mainloop() 
```

### 1.2 - A basic count example

```python
import tkinter as tk
 
root = tk.Tk()
root.minsize(320, 240)
btn_text = tk.StringVar()
btn_text.set('0')
 
def update_btn_text():
    n = int(btn_text.get())
    n = n + 1
    btn_text.set(str(n))
 
btn = tk.Button(root, textvariable=btn_text, command=update_btn_text)
btn.pack()
 
root.mainloop()
```

## 2 - canvas

```python
import tkinter as tk
root = tk.Tk()
root.minsize(320, 240)
 
can = tk.Canvas(root, bg="white", height=300, width=300)
coord = 10, 10, 300, 300
can.create_arc(coord, start=90, extent=90, fill="red")
 
can.pack() 
root.mainloop() 
```
