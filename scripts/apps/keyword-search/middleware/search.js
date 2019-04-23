let express = require('express'),
klawAll = require('../../../cli/klaw-readall/index.js').klawAll,
router = module.exports = express.Router();

router.use(require('body-parser').json());

router.post('*', [
        // get keyword data
        (req, res, next) => {
            let match_ct = 0,
            total = 0,
            posts = [];
            console.log('request for keyword: ' + req.body.keyword);
            klawAll({
                forPost: (item, next) => {
                    let match = item.md.match(new RegExp(req.body.keyword, 'gi'));
                    if (match) {
                        posts.push({
                            fn: item.fn,
                            count: match.length,
                            wc: item.wc
                        });
                        match_ct += 1;
                    }
                    next();
                },
                onDone: () => {
                    console.log('done with request for posts');
                    req.data = {
                        match_ct: match_ct,
                        posts: posts
                    };
                    next();

                }
            });
        },

        // send
        (req, res) => {

            req.data.posts.sort((a, b) => {
                if (a.count < b.count) {
                    return 1;
                }
                if (a.count > b.count) {
                    return -1;
                }
                return 0;
            })

            res.json(req.data);
        }

    ]);
