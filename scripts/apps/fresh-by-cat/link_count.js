// 'foo [bar](/foo/bar) and also [external](https://www.foosite.com/)'.match(/\]\(\S+/g)

var markdown = 'foo [bar](/foo/bar) and also [external](https://www.foosite.com/)';

markdown.match(/\]\(\S+/g).forEach(function (a) {
    var text = a.match(/([a-z]|[:/.])+/)[0].toLowerCase(),
    external = false;
    if (text.substr(0, 8) === 'https://') {
        external = true;
    }
    console.log(text, external);
});
