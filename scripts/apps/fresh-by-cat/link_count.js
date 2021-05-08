// 'foo [bar](/foo/bar) and also [external](https://www.foosite.com/)'.match(/\]\(\S+/g)

var markdown = 'foo [bar](/foo/bar) and also [external](https://www.foosite.com/)';

var patt_link = /\]\(\S+/g,
patt_linkurl = /([a-z]|[:/.])+/;

var forAllLinks = function (a) {
    var m = a.match(patt_linkurl);
    if (m) {
        var text = m[0].toLowerCase(),
        external = false;
        if (text.substr(0, 8) === 'https://') {
            external = true;
        }
        console.log(text, external);
    }
};

markdown.match(patt_link).forEach(forAllLinks);
