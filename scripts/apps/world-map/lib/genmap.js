let klaw = require('klaw'),
through2 = require('through2'),
fs = require('fs'),
marked = require('marked'),
path = require('path'),
natural = require('natural'),
cheerio = require('cheerio'),
header = require('./header.js'),

tokenizer = new natural.WordTokenizer();

exports.fromPosts = (opt) => {

    opt = opt || {};
    opt.dir_posts = opt.dir_posts || path.resolve('../../../_posts');

    klaw(opt.dir_posts)

    .pipe(through2.obj((item, enc, next) => {

            fs.readFile(item.path, (e, data) => {

                if (data) {

                    let md = data.toString(),
                    h = header.get(md);
                    html = '<h1>' + h.title + '</h1>\n\n';

                    html += marked(header.remove(md));

                    let $ = cheerio.load(html);

                    let tokens = tokenizer.tokenize($('p').text());
                    console.log(tokens);

                }

                next();

            })

        }));

};
