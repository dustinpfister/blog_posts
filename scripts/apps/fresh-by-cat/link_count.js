// 'foo [bar](/foo/bar) and also [external](https://www.foosite.com/)'.match(/\]\(\S+/g)

var markdown = 'foo [bar](/foo/bar) and also [external](https://www.foosite.com/)';
//var markdown = 'this makrdown sample has no links, ![GitHub Logo](/images/logo.png) but it does have an image' ;

var patt_img = /\!\[[\s\S]+\]\([\s\S]+\)/g
    patt_link = /\]\(\S+/g,
patt_linkurl = /([a-z]|[:/.])+/;

var forLink = function (a) {
    var m = a.match(patt_linkurl),
    url = '',
    external = false;
    if (m) {
        url = m[0].toLowerCase();
        if (url.substr(0, 8) === 'https://') {
            external = true;
        }
        if (url.substr(0, 7) === 'http://') {
            external = true;
        }
    }
    return {
        extrenal: external,
        url: url
    }
};

var removeImg = function (text) {
    return text.replace(patt_img, '');
};

var m = removeImg(markdown).match(patt_link);

if (m) {
    var a = m.map(forLink);
    console.log(a);
}
