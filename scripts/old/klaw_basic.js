let klaw = require('klaw'),
through2 = require('through2');

let ct = 0;

klaw('../_posts')

.on('end', function () {

    console.log('end', 'ct=', ct);

})

.pipe(through2.obj(function (item, enc, next) {

        ct += 1;
        console.log(item.path);

        next();

    }))
