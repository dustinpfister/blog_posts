let klaw = require('klaw'),
through2 = require('through2'),
fs = require('fs'),
marked = require('marked'),
path = require('path'),
natural = require('natural'),
cheerio = require('cheerio'),
header = require('./header.js'),

tokenizer = new natural.WordTokenizer();

// generate a section from an array of words
let sectionFromArray = exports.sectionFromArray = (arr, opt) => {

    opt = opt || {};
    opt.figWorth = opt.figWorth || function (w) {
        this.worth += w.length
    };

    let section = {
        worth: 0
    };

    arr.forEach((w) => {
        //section.worth += w.length
        opt.figWorth.call(section, w, section);
    });
    return section;
};

exports.fromPosts = (opt) => {

    opt = opt || {};
    opt.dir_posts = path.resolve(opt.dir_posts || '../../../_posts');
    opt.dir_target = path.resolve(opt.dir_target || './');
    opt.filename = opt.filename || 'sections.json';

    let writer = fs.createWriteStream(path.join(opt.dir_target, opt.filename));

    //writer.write('[');

    let sections = [];

    klaw(opt.dir_posts)

    // when done
    .on('end', () => {
        //opt.onDone();
        //writer.write(']');
        writer.write(JSON.stringify(sections));
        //  fs.writeFile(path.join(opt.dir_target, opt.filename), JSON.stringify(sections), function () {});
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
                    //writer.write('[' + tokens.map((w) => {
                    //        return '\"' + w + '\"';
                    //    }).toString() + '],');

                    let section = JSON.stringify(sectionFromArray(tokens));
                    //writer.write(section + '\n');

                    sections.push(section);

                }

                next();

            });

        }));

};
