var httpGetRes = function (url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp;
};

// get internal links helper
var getInteralLinks = function () {
    // get links
    var links = document.querySelectorAll('a');
    return [].reduce.call(links, function (acc, a) {
        var u = new URL(a.href);
        if (u.host === document.location.host) {
            acc.push(a);
        }
        return acc;
    }, []);
};

var highLightInterals = function () {
    var links_intern = getInteralLinks();
    var count = 0;
    links_intern.forEach(function (a) {
        a.style.background = 'gray';
        count += 1;
    });
    var el_unkown = document.querySelector('#count_internal_unkown');
    el_unkown.innerText = count;
};

highLightInterals();

var links_intern = getInteralLinks();
links_intern.forEach(function (a) {
    var xml = httpGetRes(a.href);
    var el_unkown = document.querySelector('#count_internal_unkown');
    var count_unkown = parseInt(el_unkown.innerText);
    var el_200 = document.querySelector('#count_internal_200');
    var count_200 = parseInt(el_200.innerText);
    var el_404 = document.querySelector('#count_internal_404');
    var count_404 = parseInt(el_404.innerText);
    var el_500 = document.querySelector('#count_internal_500');
    var count_500 = parseInt(el_500.innerText);
    if (xml.status === 200) {
        a.style.background = 'lime';
        count_unkown -= 1;
        count_200 += 1;
        console.log(xml.status);
    }
    if (xml.status === 404) {
        a.style.background = 'red';
        count_unkown -= 1;
        count_404 += 1;
        console.log(xml.status);
    }
    if (xml.status === 500) {
        a.style.background = 'red';
        count_unkown -= 1;
        count_500 += 1;
        console.log(xml.status);
    }
    el_unkown.innerText = count_unkown;
    el_200.innerText = count_200;
    el_404.innerText = count_404;
    el_500.innerText = count_500;
});

//console.log(links.map((a)=>{ return a.href;}));
