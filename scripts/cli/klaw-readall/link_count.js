// patterns
var patt_img = /\!\[[\s\S]+\]\([\s\S]+\)/g,
patt_link = /\]\(\S+/g,
patt_linkurl = /([a-z]|[:/.])+/;

// for a link
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
        external: external,
        url: url
    }
};

// remove image links
var removeImg = function (text) {
    return text.replace(patt_img, '');
};

var processMarkdown = function (markdown) {
    var m = removeImg(markdown).match(patt_link);
    if (m) {
        return m.map(forLink);
        
    }
    return [];
};

//var markdown = 'foo [bar](/foo/bar) and also [external](https://www.foosite.com/)';
//var markdown = 'this markdown sample has no links, ![GitHub Logo](/images/logo.png) but it does have an image' ;
//var markdown = 'this markdown [sample](http://foo) text, ![GitHub Logo](/images/logo.png) with an image' ;
// console.log( processMarkdown(markdown) );

// export
module.exports = processMarkdown;