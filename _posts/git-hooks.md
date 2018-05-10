---
title: Git hooks.
date: 2017-03-24 18:15:00
tags: [git,js,node.js,automation]
layout: post
categories: git
id: 5
updated: 2017-04-04 08:23:55
version: 1.0
---

{% mytags_postwords js,web,development,git,git&#32;hooks,hooks,source&#32;control %}

[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) are scripts that I can place in the hooks folder that resides in the hidden .git folder of a project working tree. Because I use git as my system of source control this is an option that I can use to help automate tasks. However there are other options for task automation that I prefer, so for the most part I see hooks as a way to enforce compliance with certain standards before being allowed to make a commit to a git folder.

<!-- more -->

So a simple little hello world "pre-commit" node.js hook might look something like this.

```js
#!/usr/bin/env node
 
console.log('Hey a commit was made.');
```

I will want to use the node.js shebang at the top of my script to make it clear that the environment i am using is node. In addition I will want to name the file "pre-commit" in the hooks folder if I want a script to run every time I make a commit.

When it comes to writing a more useful pre-commit hook, I could write something that will check if everything is up to snuff before allowing a commit to be made. The basic idea here is to call a process.exit(1) if something does not look good, therefore keeping me from making a commit until it is resolved.

For an example of this say I want a simple little script that will check if a setting in a JSON file is set to a value that it should be set to every time I make a commit. Say it is a value that I would change while developing, but would want it to always be set to a certain other value every time I make a commit that will be merged into the master branch.

So the first thing I would want to do is check if my settings.json is even there at all. Yeah that would all ready be a pretty good reason the throw an error and stop the commit if this where a real project.

```js
#!/usr/bin/env node
 
var fs = require('fs');
 
fs.readFile('settings.json', 'utf8', function (err, data) {
 
    if (err) {
 
        console.log('Error reading settings.json');
        console.log(err);
        process.exit(1);
 
    }
 
});
```

So far I have a script that is somewhat useful in that it will not allow for a commit to be made if my settings.json file is not present at all. To make it even more useful I just need to add more functionality to the script such as attempting to read the data in settings.json and throwing an error if there is a problem parsing the data.

```js
#!/usr/bin/env node
 
var fs = require('fs');
 
fs.readFile('settings.json', 'utf8', function (err, data) {
 
    var settings;
 
    if (err) {
 
        console.log('Error: Problem reading settings.json');
        console.log(err);
        process.exit(1);
 
    } else {
 
        try {
 
            settings = JSON.parse(data);
 			
			if(settings.mode){
 				
				if(settings.mode === 'production'){
 					
					console.log('Settings mode is production, looking good.');
					process.exit(0);
 
				}else{
					
					console.log('Error: the settings mode is not set to production.');
					process.exit(1);
 
				}				
 				
			}else{
 				
				console.log('Error: No mode property in settings!');
				process.exit(1);
 				
			}
 
        } catch (e) {
 
            console.log('Error: Parsing JSON data');
            process.exit(1);
 
        }
 
    }
 
});
```

This script will only allow a commit if there is a settings.json file, that will parse without issue, and has a mode property that has a value of production. So now you should get the idea, these kinds of scripts are useful for enforcing certain kinds of rules that must be met before a commit can be made. They could also be used to set things up for the next commit as well, saving some time. 
