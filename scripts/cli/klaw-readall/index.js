
let fs = require('fs-extra'),
path = require('path'),
klawPosts = require('../klaw-basic').klawPosts,
getId = require('../next-id').getId,

header = require('./header'),
wc = require('./wc'),
linkCount = require('./link_count');

opt_defaults = {
    forPost: function (item, next) {
        console.log(item.path);
        next();
    },
    onDone: function () {}
};

let getInteralLinkCount = (linkObjects) => {
    if (linkObjects.length === 0) {
        return 0;
    }
    if (linkObjects.length === 1) {
        var n = linkObjects[0].external === true ? 0 : 1;
        return n;
    }
    return linkObjects.reduce((acc, linkObj) => {
        acc = typeof acc === 'object' ? Number(!acc.external) : acc;
        return acc + Number(!linkObj.external);
    });
};

let klawAll = (opt) => {

    opt = Object.assign({}, opt_defaults, opt || {});

    getId().then((nextId) => {
        let ct = 0;
        // using klaw-basic
        klawPosts({
            forPost: (item, next) => {
                ct += 1;
                fs.readFile(item.path)
                .then((data) => {
                    let md = data.toString();
                    item.md = header.remove(md);
                    item.header = header.get(md);
                    item.wc = wc.getWC(item.md);
                    item.linkObjects = linkCount(item.md);
                    item.linkInternalCount = getInteralLinkCount(item.linkObjects);
                    item.fn = path.basename(item.path, '.md');
                    opt.forPost(item, () => {
                        // if ct === nextId then we are done for real
                        if (ct === nextId) {
                            opt.onDone();
                        } else {
                            next();
                        }
                    }, ct);
                })
                .catch((e) => {
                    console.log(e.message);
                    next();
                })
            }
        })
    });
};

// if called from CLI
if (require.main === module) {
    klawAll({
        forPost: (item, next) => {
            console.log(item.header.title, item.wc);
            next();
        },
        onDone: () => {
            console.log('done');
        }
    });
} else {
    // else export
    exports.klawAll = klawAll;
}
