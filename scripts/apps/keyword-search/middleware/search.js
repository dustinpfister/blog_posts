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
                    // if full match
                    let match_full = item.md.match(new RegExp(req.body.keyword, 'gi')),
                    result = null;
                    if (match_full) {
                        result = {}
                        result.fullMatchCount = match_full.length;
                        match_ct += 1;
                    }
                    // if the number of words in keyword is greater than 1
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
                    // if there is a result for the post
                    if (result) {
                        result.fn = item.fn;
                        result.wc = item.wc;
                        result.fullMatchCount = result.fullMatchCount || 0;
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

        // figure post weight
        (req, res, next) => {
            req.data.posts.forEach((post) => {
                let wordWeight = 0;
                post.wordCounts.forEach((word) => {
                    wordWeight += word.count * 5;
                });
                post.wordWeight = wordWeight;
                post.fullMatchWeight = post.fullMatchCount * 100;
                post.weight = post.wc / 10 + (post.fullMatchWeight+ post.wordWeight) * (post.wordCounts.length);
            });
            next();
        },

        // send
        (req, res) => {
            // sort by full match count
            req.data.posts.sort((a, b) => {
                if (a.weight < b.weight) {
                    return 1;
                }
                if (a.weight > b.weight) {
                    return -1;
                }
                return 0;
            })

            res.json(req.data);
        }

    ]);
