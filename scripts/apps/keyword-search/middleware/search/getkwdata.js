let express = require('express'),
klawAll = require('../../../../cli/klaw-readall/index.js').klawAll,
router = module.exports = express.Router();

router.use(

    // get keyword data
    (req, res, next) => {

    let match_ct = 0,
    total = 0,
    posts = [],
    words = req.body.keyword.split(' ');

    // klaw all posts
    klawAll({

        forPost: (item, next) => {

            console.log(item.i === undefined ? '': '#' + item.i, 'id: ' + item.header.id, 'title: ' + item.header.title);

            let match_full = item.md.match(new RegExp(req.body.keyword, 'gi')),
            result = null;

            // if full match
            if (match_full) {
                result = {}

                result.fullMatch = {
                    count: match_full.length
                };

            }

            // if the number of words in keyword is greater than 1
            words.forEach((word) => {
                let match_word = item.md.match(new RegExp(word, 'gi'));
                if (match_word) {
                    result = result || {}
                    result.keyWords = result.keyWords || {
                        counts: []
                    };
                    result.keyWords.counts.push({
                        word: word,
                        count: match_word.length
                    });

                }
            });

            // if there is a result for the post
            if (result) {
                match_ct += 1;
                result.fn = item.fn;
                result.wc = item.wc;

                // full Match
                result.fullMatch = result.fullMatch || {
                    count: 0
                };

                // key words
                result.keyWords.inPost = result.keyWords.counts.length;
                result.keyWords.inPostPer = result.keyWords.inPost / words.length;
                result.keyWords.total = 0;
                result.keyWords.counts.forEach((word) => {
                    result.keyWords.total += word.count;
                });
                result.keyWords.wcPer = result.keyWords.total / result.wc;

                posts.push(result);
            }

            next();

        },

        // when walking of files is done
        onDone: () => {
            req.data = {
                match_ct: match_ct,
                posts: posts
            };
            next();
        }

    });

});
