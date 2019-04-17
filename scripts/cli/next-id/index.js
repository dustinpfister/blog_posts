let klawPosts = require('../klaw-basic').klawPosts,
ct;

let getId = (cb) => {

    // start ct at zero
    ct = 0;

    cb = cb || function () {};

    klawPosts({
        forPost: (item, next) => {
            ct += 1;
            next();
        },
        onDone: () => {
            cb(ct);
        }
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
