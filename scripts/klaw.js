let klaw = require('klaw'),
fs = require('fs-extra'),
through2 = require('through2'),
yaml = require('js-yaml');

let dir = process.argv[2] || '../_posts',
pat_lb = /\r\n|\n/;

// get the header from markdown
let getHeader = function (text) {

    let head = text.match(/---[\s|\S]*---/);

    if (!head) {

        return {};

    }

    return yaml.safeLoad(head[0].replace(/---/g,''));

};

// klaw over the dir
klaw(dir)

.pipe(through2.obj(function (item, enc, next) {

        let self = this;

        fs.readFile(item.path)
        .then(function (data) {

            //item.text = data.toString();
            item.header = getHeader(data.toString());
            self.push(item);

            next();

        })
        .catch (function (e) {

            console.log(e);
            next();

        });

    }))

.on('data', function (item) {

    console.log(item);

});
