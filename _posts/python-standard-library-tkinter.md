---
title: tkinter standard library in python
date: 2021-01-15 15:55:00
tags: [python]
categories: python
layout: post
id: 782
updated: 2021-01-15 16:34:58
version: 1.10
---

In python there is the [tkinter standard library](https://docs.python.org/3.7/library/tkinter.html) that is an official interface for the [TK GUI tool kit](https://en.wikipedia.org/wiki/Tk_%28software%29). This library can then be used as a way to create graphical front ends for python projects. The library works by providing a number of widgets that can be used to create various components in a window such as buttons, menus, a canvas, and text. With these widgets it is possible to make a basic yet functional graphical user interface for a python project.

At the time of this writing I do not yet have much experence working with tkinter, and I also only have about a month of experence so far with python as a whole. So for now this will be just a few basic examples of the standard library. In time if I do start creating and maintaining some real projects with python this will likley be how I will want to create a GUI for the project.

<!-- more -->

## 1 - Some very basic tkinter getting started examples

So I need to start somewhere when it comes to using tkinter and python, so In thism section I will be going over just a few very basic getting started types examples of tkinter.

### 1.1 - Basic Hello world example

First thing is first, I just want to start with a very basic hello world style example of this library. That is just a simple hello world example of the tkinter library where I am just displaying the text hello world in a window. For this there is the Label widget which would be a good starting example of using widgets to create an interface.

```python
import tkinter as tk
root = tk.Tk()
root.minsize(320, 240)
a = tk.Label(root, text ="Hello World") 
a.pack() 
root.mainloop() 
```

### 1.2 - A basic count example

Another idea of a basic example would be to create an example where I have a button, and each time I click the button a value goes up by one.

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

## 2 - The canvas widget

When it comes to javaScript I love canvas elements, they can be used to create all kinds of graphics with a little javaScript code. In tkinter there is also a canvas widget that can eb used as a way to create some graphics with a little python code. This is a subject that will likley call for a whole other post, maybe even a few posts actually. However for now maybe it will not be to hard to work out at least just a few basic examples of the canvas widget in tkinter.

### 2.1 - A basic Arc example

For starters how about just draing an arc in a canvas widget.

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

## 3 - Conclusion

This is if for now when it comes to tkinter, I will need to get some more time to work on a project or two with python where I will want a GUI for the project. When doing so this is the librray that I am going to want to use for sure.
