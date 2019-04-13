/*
wc-files:

Stands for word count files. creates a data folder and populates it with JSON files with a word count for each file
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
        json = {};

        json.wc = tokenizer.tokenize($('p').text()).length;
        json.filename = path.basename(item.path, '.md');

        console.log(json.filename + ' : ' + json.wc);

        siteTotal += json.wc;

        //next();


        return fs.writeFile(path.join('../data', json.filename + '.json'), JSON.stringify(json))

    })
    .then(() => {

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
