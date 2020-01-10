---
title: Using _.uniqueId in lodash, and alternatives
date: 2018-10-03 18:14:00
tags: [js,lodash]
layout: post
categories: lodash
id: 296
updated: 2020-01-09 20:38:53
version: 1.9
---

Writing more content on [lodash](https://lodash.com/) this month for now, and have noticed that I did not get around to [\_.uniqueId](https://lodash.com/docs/4.17.15#uniqueId) yet. The method addresses something that comes up a lot now and then when developing projects, so it deserves a post. Also in these lodash posts I often take a moment to brush up on how hard it is to go about making a vanilla js solution, or if there are native methods that can be used, and as such this post will be no exception. So lets take a look at \_.uniqueId, and some other solutions for generating unique ids.

<!-- more -->

## 1 - What to know

This is a post on the \_.uniqueId method in lodash. This method can be used to create a unique id for something each time it is called. This method will work for the purpose of assigning a unique id for most use cases, but not with complex projects that require a unique id always even if the project restarts. In any case this will be a brief post on this topic.

## 2 - An \_.uniqueId example

Using the \_.uniqueId method is fairly straight forward to use, I just need to call it, passing an optional prefix as the first argument, and a unique id will be returned.

```js
let _ = require('lodash');
 
let id = _.uniqueId('id_');
 
console.log(id); // 'id_1'
 
let i = 10, ids = [];
while (i--) {
    ids.push(_.uniqueId('id_'));
}
 
console.log(ids[0]); // id_2
console.log(ids[9]); // id_11
```

The value might be unique in a relative way, but it is not at all the best solution for many other use case examples. The method is just a lazy way to get a value that is unique each time it is called, and one way to do that is to have it so it just returns a count each time.

## 3 Vanilla js alternative to \_.uniqueId

Making my own solution for this is not to hard, all is needed is the power of closure. I just write a self executing function expression and then inside the body of that function expression I have a local num variable, I then return a function that when called will step the num variable, and use that as part of the string that is returned that will be unique each time.

```js
let uniqueId = (function () {
    let num = 0;
    return function (prefix) {
        prefix = String(prefix) || '';
        num += 1;
        return prefix + num;
    }
}
    ());

let id = uniqueId('id_');
console.log(id); // 'id_1'
```

## 4 - Conclusion

This is not really one of the most compelling methods that I can think of that warrant the use of the full lodash library. The functionally of this methods can be quickly implemented with vanilla javaScript, and often it is something that should be custom tailored anyway. Just stepping a number can make a value unique in a relative way, but it is not the same thing as more complex methods that might involve additional data that helps to make a far more unique value.