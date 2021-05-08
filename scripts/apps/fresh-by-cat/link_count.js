// 'foo [bar](/foo/bar) and also [external](https://www.foosite.com/)'.match(/\]\(\S+/g)

//var markdown = 'foo [bar](/foo/bar) and also [external](https://www.foosite.com/)';
var markdown = 'this makrdown sample has no links, ![GitHub Logo](/images/logo.png) but it does have an image' ;

var patt_img = /\!\[[\s\S]+\]\([\s\S]+\)/g
    patt_link = /\]\(\S+/g,
patt_linkurl = /([a-z]|[:/.])+/;

var forAllLinks = function (a) {
    var m = a.match(patt_linkurl);
    if (m) {
        var text = m[0].toLowerCase(),
        external = false;
        if (text.substr(0, 8) === 'https://') {
            external = true;
        }
        console.log(a, text, external);
    }
};

var removeImg = function (text) {
    return text.replace(patt_img, '');
};

console.log( removeImg(markdown) );

//var m = markdown.match(patt_link);

//if (m) {
//    m.forEach(forAllLinks);
//}
