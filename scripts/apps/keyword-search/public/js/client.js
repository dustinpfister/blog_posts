
var el_search_text = document.getElementById('search_text'),
el_search_button = document.getElementById('search_button'),
el_out = document.getElementById('search_out');

el_search_button.addEventListener('click', function (e) {
    http.search(el_search_text.value, function (res) {
        //console.log(res);
        let data = JSON.parse(res),
        html = '<p>Posts Found: ' + data.match_ct + '</p>';

        data.posts.forEach((post) => {

            html += '<p>' + post.fn + '</p>' +
            '<ul>' +
            '<li>keyword full match count: ' + post.count + '<\/li>' +
            '<li>Word Counts: ' + JSON.stringify(post.wordCounts) + '<\/li>' +
            '<li>Post word count: ' + post.wc + '<\/li>' +
            '<\/ul><hr>'
        });

        el_out.innerHTML = html;
    });
});
