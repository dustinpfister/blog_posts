---
title: JSON parse method in javaScript
date: 2020-02-28 10:34:00
tags: [js,JSON]
layout: post
categories: js
id: 619
updated: 2021-10-25 11:19:45
version: 1.37
---

This will be a general post on the [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method. The JSON.parse method is a native javaScript built in way to parse a JSON string into a workable object, at least on all modern platforms that support this method. The JSON parse method is a is then an inversion of the [JSON stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method is for turning a workable object into a JSON string.

If you are new to javaScript a [JSON string is a data interchange format](https://en.wikipedia.org/wiki/JSON) that is often the default solution for such a thing in a javaScript environment. However the standard is not used with javaScript alone, the format is often used in many other programing languages because of its close relationship to the web. There are of course other options when it comes to data interchange, or data serialization, but getting into that would be off topic.

The use of the method is fairly straight forward just call the method off of the JSON object and pass a JSON string to parse into an object, the returned object is then the workable object from that json string. The JSON.stringify method works in a similar way, only the first argument passed should be the object that I want to convert into a JSON string.

There are still a few additional things a javaScript developer should be ware of such as browser support, what happens when an invalid string is passed, and some additional related methods and features. So in this post I will be touching base on some additional things to work with when using JSON parse such as the [try catch](/2019/03/02/js-javascript-try/) statement. So in this post I will be going over they very basics, but also any additional things to look out for when working with JSON.parse, and JSON in general.

<!-- more -->

## 1 - JSON parse basics

For starters in this section I will be going over the basics of the JSON.parse method. This will include just using the method on a simple string of JSON, error handling, and other basic example of the JSON parse method that should work okay in most environments that support JSON. 

In addition there is also the reviver method argument that is a way to go about setting a function that can be used to set values for the final object that is returned. This can sometimes lead to more complex examples of the JSON.parse method, but I will still be going over a quick simple example of it here.

It should go without saying that this is not a [total beginner type post on javaScript in general](/2018/11/27/js-getting-started/). I will be keeping the examples fairly simple in this section, but I will not be covering every little detail that you should know at this point thus far.

### - The source code examples in this post are on Github

The source code examples that I am writing about here on JSON as well as all the source code example for all [my other posts in vanilla javaScript](/categories/js/) can be found in my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-json-parse). I do get around to editing my content on javaScript now and then and this post is not exception, I have a lot planed out all ready for future edits of this post, and the notes and latest source code examples on JSON can be found there. If you are on Github and would like to make a pull request that would be a good place to do so when it comes to the source code, the comments section at the bottom of this post can also be used as a way to bring something up.

### 1.1 - basic json parse example

The JSON parse method can be used to parse a JSON string into a workable object by just passing the JSON string as the first argument. The workable object will then be returned by the method, assuming that nothing goes wrong, which can then be stored in a variable.

```js
var str = "{\"x\":42,\"y\": 15}";
var obj = JSON.parse(str);
console.log(obj.x, obj.y); // 42 15
```

Here I am using a STring literal that just happens to be valid JSON, but in a real example this JSON string would be obtained by reading a file, or receiving a HTTP request body that that is a JSON string. The JSON parse method is just simply a way to convert this kind of string to an object.

### 1.2 - Errors and try catch

In certain projects where the json parse is being used to parse from a source that possible give invalid json it is possible for an error to happen. So it is often generally a good idea o use the json parse method in a try catch statement, and then have a way to handle such errors.

```js
var str = "{f7--!", // not valid json
obj;
try {
    obj = JSON.parse(str);
} catch (e) {
    obj = {
        x: 0,
        y: 0
    };
}
console.log(obj.x, obj.y); // 0 0
```

### 1.3 - The json parse reviver method argument

A reviver method can be given as a second argument to the json parse method after giving the string to parse. This method will have a key and value argument, and the returned value will become the new value in the resulting object returned by json parse. 

```js
var str = '[1,2,3,4,\"a\"]',
obj;
var revive = function (key, val) {
    if (typeof val === 'number') {
        return Math.pow(2, val);
    }
    return val;
};
try {
    obj = JSON.parse(str, revive);
} catch (e) {
    obj = [];
}
 
console.log(obj);
// [ 2, 4, 8, 16, 'a' ]
```

the use of this method might come in handy if the JSON code has a bunch of values that need to be used to create new instances of a class or something to that effect.

## 2 - Some nodejs examples

So now that I have the basics out of the way it is now time to work out a simple text program that makes use of the JSON.parse method, as well as maybe other features of [nodejs](/2017/04/05/nodejs-helloworld/) when it comes to doing something with JSON in a nodeje environment. There is also getting into client side javaScriot examples, and also a few examples that have to do with full stack development using both nodejs and a little client side javaScript. However in this section I will just be focus on nodejs features alone, and I will also be trying to keep things from getting to advanced at this time.

### 2.1 - Using node.js require to parse JSON

In [nodejs require](/2019/06/13/nodejs-require/) is used as a way to go about loading in additional javaScript modules, however it can also be used as a way to parse JSON actually. The way to go about doing this would involve just passing the path to the JSON file as the first argument just like I would with a user space library in a project folder.

```js
let obj = require('./foo.json');
console.log(obj.mess);
```

### 2.2 - positional arguments

Of course when it comes to using require as a way to parse and load JSON into a script in nodejs just like with the JSON.parse method an error can happen in the event that the file is not there, or of the file is there but it is not JSON, or a file is there and it is JSON but it is malformed. So just like with the JSON.parse method it is a goo idea to use require in the body of a try block so that I can run some code in the event that there is an error.

```js
let path = require('path');
let uri_json = path.resolve(process.argv[2] || 'foo.json');
// log mess that is the value of uri_json
console.log('parsing json file at: ');
console.log(uri_json);
// try using require to parse json
let obj = null;
try {
    obj = require(uri_json);
    console.log(obj);
} catch (e) {
    console.warn(e.message);
}
```

### 2.3 - The read file file system method ans JSON.parse

The nodejs require object is a great tool for loading JOSN, but there is also using the file system module and the various methods in that module such as the read file method.

```js
let path = require('path'),
fs = require('fs'),
uri_json = path.resolve(process.argv[2] || 'foo.json');
// reading the file
fs.readFile(uri_json, 'utf8', (e, text) => {
    if (e) {
        console.warn(e.message);
    } else {
        try {
            let obj = JSON.parse(text);
            console.log(obj);
        } catch (e) {
            console.warn(e.message);
        }
    }
});
```

### 2.4 - Using promises

This nodejs example will check for a JSON file in the current users home dir, if the file is there or there is not any other kind of error that happens reading the file for some reason, then the JSON.parse method will be used to parse the json string into an object. If there is an error parsing the JSON then the next catch statement will fire, the error code for file not found will not be in the error object so things will just continue to the last catch statement where the error will be logged to the standard error and thats it. This way I will only take action if the file is not there, and not overwrite a malformed json file in the event of a syntax error.

So this nodejs example makes use of the read file, and write file methods of the file system module. I am also using the home dir method of the os module to get the path to the home folder in an operating system independent kind of way, and I am using the join method of the path module as a way to handling the joining and parsing of path names. The promsify method of the utils method is a way to make sure that I am working with file system methods that will return a promise, in late versions of node this will happen all ready so it is just a backward support thing.
```js
let fs = require('fs'),
promisify = require('util').promisify,
os = require('os'),
path = require('path'),
read = promisify(fs.readFile),
write = promisify(fs.writeFile),
 
fileName = '.node-json-example.json',
filePath = path.join(os.homedir(), fileName);
 
read(filePath)
.then((data) => {
    let obj = JSON.parse(data);
    return Promise.resolve(obj);
})
.catch((e) => {
    if (e.code === 'ENOENT') {
        return Promise.resolve({
            count: 0
        });
    }
    return Promise.reject(e);
})
.then((obj) => {
    obj.count += 1;
    console.log('count: ' + obj.count);
    return write(filePath, JSON.stringify(obj));
})
.then(() => {
    console.log('updated json file at: ' + filePath);
})
.catch((e) => {
    console.warn(e);
    console.log(e.code);
});
```

So then here I have a basic example of the JSON parse method where I am reading a JSON file, parsing the JSON file into an object, and updating the state of that object. Once I have an updated state of the object I am then using the JSON.stringify method to create a string from that object, and then write this new state back to the file.

## 3 - Client side javaScript examples of the JSON parse method

There is covering the very basics of the JSON parse method by itself, and there is then going over a few quick examples of the JSON parse method in a nodejs environment. However in this section I will now be going over at least one if not more examples of the JSON parse method in a client side javaScript environment.

These examples will then not just involve the JSON parse method but also things like the script tag inside the body of some HTML, as well as various other client side javaScript features such as attaching one or more [event listeners](/2019/01/16/js-event-listeners/) to an event like that of the key up event, as well as working with [event objects](/2020/07/23/js-event-object/) inside the body of the functions used for such handers.

### 3.1 - A simple textarea element example

For this example I am creating a [text area element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) that will default to some hard coded JSON. I can then use this text area element to mutate the state of this JSON, and when I do so the inner text of another element will change to inform me that the JSON is valid or not.

So then for this example I am using the [document.querySelector method](/2020/06/23/js-document-queryselector/) as a way to gain references to the text area element as well as the div element that I will be using to update the inner text of depending on the state of the JSON in the text area element. I then have a parse helper method that will use the JSON.parse method to parse a given text string, in the event that it is valid JSON the resulting object will be returned, else if something goes wrong the error object will be what is returned by the method. With that said I then  also have a is valid helper method that will call the parse method and check the constructor of the returned object to see if it is a Syntax Error or not, in the event that it is the method returns false, else the method will return true. Finally I have a JSON check method that will pass the current value of the text area element as the text to check if it is vailid json or not, in the event that it is the inner text of the display method will give a message that everything is okay, else it will give another message.

```html
<html>
    <head>
        <title>JSON parse</title>
    </head>
    <body>
        <textarea id="json_in"cols="60" rows="15">
{
    "foo": "bar",
    "n" : 42,
    "grid" : [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
}
        </textarea>
        <div id="json_disp"></disp>
        <script>
var json_in = document.querySelector('#json_in'),
json_disp = document.querySelector('#json_disp');
// parse a JSON string and return the object
// of an error object if something goes wrong doing so
var parse = function(text){
    try{
        return JSON.parse(text);
    }catch(e){
        return e;
    }
};
// check if the given text is valid json or not by checking 
// for a 'SyntaxError' object as the constructor when calling parse
// valid json should be just a plain 'Object'
var isValid = function(text){
    var result = parse(text);
    if(result.constructor.name === 'SyntaxError'){
        return false;
    }
    return true;
};
// Check the JSON in the textarea and set the inner text of the display div
var jsonCheck = function(){
    if(isValid(json_in.value)){
        json_disp.innerText = 'Valid JSON';
    }else{
       json_disp.innerText = 'JSON Not Valid';
    }
};
// attach and event hander for the 'keyup' event
json_in.addEventListener('keyup', function(){
    jsonCheck();
});
// call JSON check for the first time
jsonCheck();
        </script>
    </body>
</html>
```

## 4 - Conclusion

So that is it for now when it comes to the JSON parse method. There is way more to write about when it comes to the use of the JSON parse method when it comes to some real code examples maybe. There is also of course the JSON.stringify method that is also worth mentioning when it comes to converting a workable object to a JSNON string for example.

If I get some time to come around to updating this post again I might add some additional examples of both parsing and stringify objects with JSON. That may or may not happen as I have some many other posts, and projects that are more deserving of my attention.