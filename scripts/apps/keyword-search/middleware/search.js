let express = require('express'),
klawAll = require('../../../cli/klaw-readall/index.js').klawAll,
router = module.exports = express.Router();

router.use(require('body-parser').json());

router.post('*', [
        // get keyword data
        (req, res, next) => {
            let match_ct = 0,
            total = 0,
            posts = [],
            words = req.body.keyword.split(' ');
            console.log('request for keyword: ' + req.body.keyword);
            klawAll({
                forPost: (item, next) => {
                    let match_full = item.md.match(new RegExp(req.body.keyword, 'gi')),
                    result = null;

                    if (match_full) {

                        result = {}
                        result.count = match_full.length;
                        /*
                        posts.push({
                        fn: item.fn,
                        count: match.length,
                        wc: item.wc
                        });
                         */
                        match_ct += 1;
                    }
                    if (words.length > 1) {

                        words.forEach((word) => {

                            let match_word = item.md.match(new RegExp(word, 'gi'));
                            if (match_word) {

                                result = result || {}
                                result.wordCounts = result.wordCounts || [];

                                result.wordCounts.push({
                                    word: word,
                                    count: match_word.length
                                });
                            }

                        })

                    }
                    if (result) {
                        result.fn = item.fn;
                        result.wc = item.wc;
                        result.count = result.count || 0;
                        result.wordCounts = result.wordCounts || [];
                        posts.push(result);
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
