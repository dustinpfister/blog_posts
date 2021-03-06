---
title: A simple nodejs lexer
date: 2020-03-17 10:48:00
tags: [node.js]
layout: post
categories: node.js
id: 629
updated: 2020-03-17 13:44:42
version: 1.9
---

I can not say that I often find myself needing to write a lexer. I will often just use a user space module that was all ready written before hand by someone else that is a lexer, or contains a lexer such as with marked.js. However there might come a time now and then when I will want to [write my own lexer](https://blog.mgechev.com/2017/09/16/developing-simple-interpreter-transpiler-compiler-tutorial/), one such reason would be to develop my own language. One thing that comes to mind about custom lexers is that I might want to write a one for my own complier, interpreter, or method that applies some kind of custom  domain specific language.

A lexer is an important part of [lexical analysis](https://en.wikipedia.org/wiki/Lexical_analysis). Say I want to work out some code that makes sense of English language, the first part of such a process would be to break the text into an array of objects where each object is for a word, or other aspect of the language such as a period. this array of objects can be thought of as an array of tokens, and each token object would contain useful data about each token such as the index value at which is appears in the text, the word itself, if it is a noun or verb, and so forth.

<!-- more -->

## 1 - An orbScript language basic lexer module and test

For a simple example of a nodes lexer I first need a language that I want to make a lexer for. For this section at least I will be making up my own simple domain specific language for a game prorotype that involves orbs that are used in the game as a way to fight monsters. In other words some kind of tower define game in which orbs are socketed into them.

I will not be getting into detail about the game really, if it even every exists. For the sake of this post all that matters is that I have some kind of language that I want to make a lexer for. So with that said and example of my orb script language might look like this.

```
base attack 30;
base speed 10;
cap speed 15;
```

The language consists thus far of collections of lines of code that are terminated with a simi colon. Each line starts out with a keyword followed by a property and then a value. The simi color can be used as a way to break the code down into lines, although it might be better to use line breaks. In any case there is a way to know if a certain statement is over or not. In addition white space can be used as a way to split one of these lines or statements into tokens, or a collection of what might be called a lexem.

once I have an array of tokens I can just map over them creating an array of objects that contains properties such as the line number, col number, the type of token and so forth. This array of tokens can then be used as a way to parse this orb script of mine into another language such as javaScript, or will sever as an argument for an engine or function that will apply or execute this custom language code.

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

### 1.2 - Testing out the lexer

Now to test out my lexer with a simple test script of sorts. I will and just a single javaScript file that requires in the lexer module, and then uses it do create an array of token objects for a given code example of my orbScript language.

So something like this:

```js
let orbScriptLexer = require('./lexers/orbscript-dsl.js');
 
let tokens = orbScriptLexer('base attack 30');
 
console.log(JSON.stringify(tokens));
```

The result of which spits out this json to the console.

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

So it would seem that my simple little lexer works as expected thus far at least. My language is not much of a language at this point, but the basic idea of a nodejs lexer is there. Taking this to the next level would involve further developing the language to begin with, as well as this lexer. In addition I would want to write some kind of function or other moduel that will take this array of tokens and do something useful with it. Such as apply the orb script to some kind of orb object.