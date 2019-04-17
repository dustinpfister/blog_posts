let marked = require('marked'),
cheerio = require('cheerio'),
natural = require('natural'),

tokenizer = new natural.WordTokenizer();

exports.getWC = function (md) {

    let html = marked(md, ''),
    $ = cheerio.load(html);

    return tokenizer.tokenize($('p').text()).length;

};