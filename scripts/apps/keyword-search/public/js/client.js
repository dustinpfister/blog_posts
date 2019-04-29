
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

            html += '<h3>' + (i + 1) + ') ' + post.fn + '</h3>' +
            '<span>total weight: ' + post.weight.toFixed(2) + '<\/span><br>' +
            '<span>key words percent: ' + Math.round(post.keyWords.wcPer * 100) + '<\/span><br>' +
            '<span style=\"color:' + color_wc + ';\">post total word count: ' + post.wc + '<\/span><br>' +
            '<ul><li>weights:</span><ul>';

            post.weights.forEach((w) => {
                html += '<li>' + w.name + ' : ' + w.weight.toFixed(2) + '<\/li>';
            });

            html += '<\/ul><\/li><\/ul><hr>';

        });

        el_out.innerHTML = html;
    });
});
