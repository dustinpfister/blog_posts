var httpGetRes = function(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp;
};

// get internal links helper
var getInteralLinks = function(){
    // get links
    var links = document.querySelectorAll('a');
    return [].reduce.call(links, function(acc, a){
        var u = new URL(a.href);
        if(u.host === document.location.host){
            acc.push(a);
        }
        return acc;
    }, []);
};

var highLightInterals = function(){
    var links_intern = getInteralLinks();
    links_intern.forEach(function(a){
        a.style.background = 'gray';
    });
};

highLightInterals();

var links_intern = getInteralLinks();
links_intern.forEach(function(a){
    var xml = httpGetRes(a.href);
    if(xml.status === 200){
        a.style.background = 'lime';
        console.log(xml.status);
    }
    if(xml.status === 404){
        a.style.background = 'red';
        console.log(xml.status);
    }
});

//console.log(links.map((a)=>{ return a.href;}));

