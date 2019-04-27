
var el_search_text = document.getElementById('search_text'),
el_search_button = document.getElementById('search_button'),
el_out = document.getElementById('search_out');

el_search_button.addEventListener('click', function (e) {
    http.search(el_search_text.value, function (res) {
        //console.log(res);
        var data = JSON.parse(res),
        html = '<p>Posts Found: ' + data.match_ct + '</p>';

        data.posts.forEach(function (post, i) {

            var color_wc = 'red';
            if (post.wc >= 500) {
                color_wc = 'orange';
            }
            if (post.wc >= 1000) {
                color_wc = 'green';
            }

            html += '<p>' + (i + 1) + ') ' + post.fn + '</p>' +
            '<ul>' +
            '<li>keyword full match count: ' + post.fullMatchCount + '<\/li>' +
            '<li>Word Counts: ' + JSON.stringify(post.wordCounts) + '<\/li>' +
            '<li style=\"color:' + color_wc + ';\">Post word count: ' + post.wc + '<\/li>' +
            '<li>weight (full match): ' + post.fullMatchWeight + '<\/li>' +
            '<li>weight (word match): ' + post.wordWeight + '<\/li>' +
            '<li>word ratio (kw count / post word count): ' + post.wordRatio + '<\/li>' +
            '<li>weight: ' + post.weight + '<\/li>' +
            '<\/ul><hr>'
        });

        el_out.innerHTML = html;
    });
});
