let klaw = require('klaw'),
through2 = require('through2'),
fs = require('fs'),
marked = require('marked'),
path = require('path'),
natural = require('natural'),
cheerio = require('cheerio'),
header = require('./header.js'),

tokenizer = new natural.WordTokenizer();

let sectionFromArray = exports.sectionFromArray = (arr) => {
    let section = {
        worth: 0
    };
    arr.forEach((w) => {
        section.worth += w.length
    });
    return section;
};

exports.fromPosts = (opt) => {

    opt = opt || {};
    opt.dir_posts = path.resolve(opt.dir_posts || '../../../_posts');
    opt.dir_target = path.resolve(opt.dir_target || './');
    opt.filename = opt.filename || 'tokens.json';

    let writer = fs.createWriteStream(path.join(opt.dir_target, opt.filename));

    writer.write('[');

    klaw(opt.dir_posts)

    // when done
    .on('end', () => {
        //opt.onDone();
        writer.write(']');
    })

    .pipe(through2.obj((item, enc, next) => {

            fs.readFile(item.path, (e, data) => {

                if (data) {

                    let md = data.toString(),
                    h = header.get(md);
                    html = '<h1>' + h.title + '</h1>\n\n';

                    html += marked(header.remove(md));

                    let $ = cheerio.load(html);

                    let tokens = tokenizer.tokenize($('p').text());
                    //console.log(tokens);

                    console.log(h.title);
                    writer.write('[' + tokens.map((w) => {
                            return '\"' + w + '\"';
                        }).toString() + '],');

                }

                next();

            });

        }));

};
