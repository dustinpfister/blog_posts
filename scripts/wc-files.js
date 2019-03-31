/*
wc-files:

Stands for word count files.
*/
let klawFiles = require('./klaw.js').klawFiles,
marked = require('marked'),
cheerio = require('cheerio'),
natural = require('natural'),
fs = require('fs'),
path = require('path'),

tokenizer = new natural.WordTokenizer();

klawFiles(function (item) {

    fs.readFile(item.path, function (e, data) {
        if (data) {

            let html = marked(data.toString().replace(/---[\s|\S]*---/, '')),
            $ = cheerio.load(html);

            console.log(path.basename(item.path) + ' : ' + tokenizer.tokenize($('p').text()).length);

        }
    })

});
