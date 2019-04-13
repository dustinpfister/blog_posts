/*
wc-files:

Stands for word count files.
 */
let klawFiles = require('./klaw.js').klawFiles,
marked = require('marked'),
cheerio = require('cheerio'),
natural = require('natural'),
fs = require('fs-extra'),
path = require('path'),

tokenizer = new natural.WordTokenizer(),
siteTotal = 0;

klawFiles(function (item, next) {

    // make sure there is a data folder
    fs.mkdirs('../data')
    // then read the file
    .then(() => {
        return fs.readFile(item.path)
    })
    .then((data) => {

        let html = marked(data.toString().replace(/---[\s|\S]*---/, '')),
        $ = cheerio.load(html),
        wc = tokenizer.tokenize($('p').text()).length;

        console.log(path.basename(item.path) + ' : ' + wc);

        siteTotal += wc;

        next();

    })
    .catch ((e) => {

        console.log(e.message);

        next();
    })

},

    function () {

    console.log('site total: ' + siteTotal);

});
