let getId = require('../next-id').getId,
fs = require('fs-extra'),
klawPosts = require('../klaw-basic').klawPosts;

getId().then((nextId) => {

    let ct = 0;

    klawPosts({

        forPost: (item, next) => {

            ct += 1;

            fs.readFile(item.path)

            .then((data) => {

                console.log(item.path);
                console.log(data.toString());

                // if ct === nextId then we are done for real
                if (ct === nextId) {

                    console.log('done');

                } else {
                    next();
                }

            });

        }

    })

});
