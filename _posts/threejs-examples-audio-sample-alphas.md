---
title: Audio Sample Data Alphas and threejs projects
date: 2022-11-11 06:53:00
tags: [three.js]
layout: post
categories: three.js
id: 1013
updated: 2022-11-11 07:35:38
version: 1.3
---

I have been making a few [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) videos lately in which I am testing out how to go about syncing video with audio. Thus far though I am just working out the timing in terms of time stamps and duration and thus I am not taking into account any kind of actual audio sample data to adjust things that are going on when rendering my frames. However I have found that I can [export audio sample data](https://manual.audacityteam.org/man/sample_data_export.html) in an HTML file format when using [Audacity](https://en.wikipedia.org/wiki/Audacity_%28audio_editor%29) to work out the audio tracks that I want in this video. So I can adjust the sample rate so that I have just one sample per frame, and then I can export the sample data in an HTML file in which I have at least one sample point for each frame of the video. I can then also do this on a track by track basis, so that I have an HTML file of sample data for say drums, then another for bass, and yet another of samples, and so forth.

I then just need to make another [threejs examples](/2021/02/19/threejs-examples/) project that will use something like the [THREE.FileLoader](https://threejs.org/docs/index.html#api/en/loaders/FileLoader) to load these HTML files of audio sample data. The just do a little additional work to create a kind of standard object of this data that I extract from the HTML files. I can then use an array of audio sample numbers that have been adjusted to be in the range of 0 and 1 as alpha values for anything and everything that will call for such a value to adjust things like scale, position, rotation, and any additional effects for any module that I am using and so forth. In other words the goal here is to create [music visualization](https://en.wikipedia.org/wiki/Music_visualization) using threejs, and audio sample data exported from Audacity.

<!-- more -->


## 1 - The first revision of the module

In this section I will be going over the source code of the first revision of the module as well as a few demos of the module as well.

### 1.0 - The source code of the module

The main method of interest for getting started with this is the load public method of the module. When I call this I give a base URL where I store the sample data files that I exported from Audacity. On top of giving a base URL I then give a list of HTML files that I would like to load from that base url. The file names for these files do very much matter a lot as the string values of the file names are what i will be using for key values of the resulting object that will contain the final sample objects.

```js
// sample_alphas.js - r0 - from threejs-examples-audio-sample-alphas
(function(api){
    //-------- ----------
    // HELPERS
    //-------- ----------
    const htmlStringToDOM = (html) => {
        const parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    };
    // create a sample object for the given html string
    const createSampleObj = (html, colNum) => {
        colNum = colNum === undefined ? 2 : colNum;
        const sampleObj = {
            raw: [],
            abs: [],
            maxABS: 0, maxRaw: 0, minRaw: 0
        };
        const doc = htmlStringToDOM(html);
        const nodes = doc.querySelectorAll('tr');
        const len = nodes.length;
        let i = 1;
        while(i < len){
            let a1 = parseFloat(nodes[i].children[colNum].textContent);
            sampleObj.raw.push(a1);
            sampleObj.abs.push( Math.abs(a1) );
            i += 1;
        }
        sampleObj.maxRaw = Math.max.apply(null, sampleObj.raw);
        sampleObj.minRaw = Math.min.apply(null, sampleObj.raw);
        sampleObj.maxABS = Math.max.apply(null, sampleObj.abs);
        return sampleObj;
    };
    //-------- ----------
    // MANAGER
    //-------- ----------
    const createLoadingManager = (onDone, onError) => {
        const manager = new THREE.LoadingManager();
        // done
        manager.onLoad = function ( ) { onDone(); };
        // ERROR
        manager.onError = function ( url ) { onError(url); };
        return manager;
    };
    //-------- ----------
    // MAIN LOAD PUBLIC METHOD
    //-------- ----------
    api.load = function(opt){
        opt = opt || {};
        opt.URLS_BASE = opt.URLS_BASE || '';
        opt.URLS = opt.URLS || [];
        opt.colNum = opt.colNum === undefined ? 2 : opt.colNum;
        opt.keyer = opt.keyer || function(url, html){
            const file_name = url.split('/').pop().split('.')[0];
            return file_name;
        };
        const files = {};
        // return a promise
        return new Promise(function(resolve, reject){
            const manager = createLoadingManager(
                () => {
                    resolve(files);
                },
                (url) => {
                    reject(url);
                }
            );
            const loader = new THREE.FileLoader(manager);
            opt.URLS.forEach((url) => {
                // set base url path
                loader.setPath(opt.URLS_BASE);
                // load files from base
                loader.load(url, (html) => {
                    // KEY IN THE SAMPLE OBJECT
                    const key = opt.keyer(url, html);
                    files[key] = createSampleObj(html, opt.colNum);
                });
            });
        });
    };
    //-------- ----------
    // Get method
    //-------- ----------
    // return a sample alpha value ( 0 - 1 ) for a given alpha value ( 0 - 1 )
    // for the given result object and sample key
    api.getByAlpha = (result, key, alpha) => {
        const sampleObj = result[key];
        const absNum = sampleObj.abs[ Math.round( ( sampleObj.abs.length - 1) * alpha) ];
        return absNum / sampleObj.maxABS;
    };
    // get an array of alpha values for the given result object and key. The count value
    // will then be the number of elements in the array
    api.getArray = (result, key, count) => {
        count = count === undefined ? 10 : count;
        let i = 0;
        const alphas = [];
        while(i < count){
           alphas.push( sampleAlpha.getByAlpha(result, key, i / ( count - 1) ) );
           i += 1;
        }
        return alphas
    };
}( this['sampleAlpha'] = {} ));
```

### 1.1 - Using two tracks

```js
```

### 1.2 - AlphaSum helper example

```js
```

### 1.3 - Sample Mean method to help smooth things out

```js
```

## Conclusion

The module is working okay as I have it all ready, but I can all ready see that I am going to want to make at least one revision in which I bake some of the things that I have worked out in my demos into the module itself. There is also not just loading and processing sample data, but also what it is that I can do with just data. I would like to have better methods for things like certain paths that are the result of sample data and things to that effect, however maybe all of that is something that should all be part of another project.

