---
title: A simple nodejs lexer
date: 2020-03-17 10:48:00
tags: [node.js]
layout: post
categories: node.js
id: 629
updated: 2020-03-17 13:02:03
version: 1.4
---

I can not say that I often find myself needing to write a lexer. I will often just use a user space module that was all ready written before hand by someone else that is a lexer, or contains a lexer such as with marked.js. However there might come a time now and then when I will want to [write my own lexer](https://blog.mgechev.com/2017/09/16/developing-simple-interpreter-transpiler-compiler-tutorial/), one such reason would be to develop my own language. One thing that comes to mind about that is to write a complier or interpreter for the language, but before I even get to that I will want a lexer.

<!-- more -->

## 1 - An orbScript language basic lexer module and test

### 1.1 - The nodejs lexer of my orbScript language

I will want an array of objects that can be used to identify tokens in a code example string. This array of objects will contain a regular expression property that will be used to find out if a given lexum is a known keyword, operator, value or other value of the language.

I will also want a helper function that breaks down a line of code into token objects, and a main lexer method that is what will be exported by the module.

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

### 1.2 - 

```js
let orbScriptLexer = require('./lexers/orbscript-dsl.js');
 
let tokens = orbScriptLexer('base attack 30');
 
console.log(JSON.stringify(tokens));
```

```
[
  [
    {
      "lexem": "base",
      "position": {
        "line": 0,
        "col": 0,
        "token": 0
      },
      "ltID": "0-base",
      "type": "keyword"
    }, {
      "lexem": "attack",
      "position": {
        "line": 0,
        "col": 5,
        "token": 1
      },
      "ltID": "2-attack",
      "type": "property"
    }, {
      "lexem": "30",
      "position": {
        "line": 0,
        "col": 12,
        "token": 2
      },
      "ltID": "4-number",
      "type": "value"
    }
  ]
]
```