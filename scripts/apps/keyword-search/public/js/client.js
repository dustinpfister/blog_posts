
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
            '<ul><li>keyword count: ' + post.count + '</li>' +
            '<li>Word Count: ' + post.wc  + '</li></ul><hr>';
        });

        el_out.innerHTML = html;
    });
});
