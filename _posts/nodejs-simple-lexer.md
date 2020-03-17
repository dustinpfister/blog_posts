---
title: A simple nodejs lexer
date: 2020-03-17 10:48:00
tags: [node.js]
layout: post
categories: node.js
id: 629
updated: 2020-03-17 11:30:59
version: 1.1
---

I can not say that I often find myself needing to write a lexer. I will often just use a user space module that was all ready written before hand by someone else that is a lexer, or contains a lexer such as with marked.js. However there might come a time now and then when I will want to write my own lexer, one such reason would be to develop my own language. One thing that comes to mind about that is to write a complier or interpreter for the language, but before I even get to that I will want a lexer.

<!-- more -->


## 1 - The nodejs lexer of my orbScript language

```js
const langTokens = [{
        desc: 'base',
        type: 'keyword',
        regEx: /base/
    }, {
        desc: 'cap',
        type: 'keyword',
        regEx: /cap/
    }, {
        desc: 'attack',
        type: 'property',
        regEx: /attack/
    }, {
        desc: 'speed',
        type: 'property',
        regEx: /speed/
    }, {
        desc: 'number',
        type: 'value',
        regEx: /\d+/
    }
];
 
// return an array of token objects for the given text line
let lineToTokenObjects = (line, lineNum) => {
    let lineTokens = line.split(' '),
    col = 0,
    tokenLen = langTokens.length;
    return lineTokens.map((lexem, lineTokenIndex) => {
        let i = 0,
        obj = {};
        while (i < tokenLen) {
            let t = langTokens[i];
            m = lexem.match(t.regEx);
            obj.lexem = lexem;
            obj.position = {
                line: lineNum,
                col: col,
                token: lineTokenIndex
            };
            if (m) {
                obj.ltID = i + '-' + t.desc;
                obj.type = t.type;
                break;
            }
            i += 1;
        }
        col += lexem.length + 1;
        return obj;
    });
};
 
// just export the lexer function
module.exports = (orbScript) => {
    let tokens = [],
    lines = orbScript.split(';');
    return lines.map((currentLine, i) => {
        return lineToTokenObjects(currentLine, i);
    });
};
```