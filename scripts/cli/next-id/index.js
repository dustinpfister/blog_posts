let klawPosts = require('../klaw-basic').klawPosts;

let getId = (cb) => {

    cb = cb || function () {};

    return new Promise((resolve, reject) => {

        // start ct at zero
        let ct = 0;

        klawPosts({
            forPost: (item, next) => {
                ct += 1;
                next();
            },
            onDone: () => {
                cb(ct);
                resolve(ct);
            }
        });

    });

};

// if called from CLI
if (require.main === module) {

    // call klaw files
    getId((id) => {

        console.log(id)

    });

} else {

    // else export
    exports.getId = getId;

}
