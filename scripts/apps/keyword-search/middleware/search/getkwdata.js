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

            let match_full = item.md.match(new RegExp(req.body.keyword, 'gi')),
            result = null;

            // if full match
            if (match_full) {
                result = {}
                result.fullMatchCount = match_full.length;
            }

            // if the number of words in keyword is greater than 1
            words.forEach((word) => {
                let match_word = item.md.match(new RegExp(word, 'gi'));
                if (match_word) {
                    //foundWord = true;
                    result = result || {}
                    result.wordCounts = result.wordCounts || [];
                    result.wordCounts.push({
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
                result.fullMatchCount = result.fullMatchCount || 0;
                result.wordCounts = result.wordCounts || [];
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
