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

var links_intern = getInteralLinks();

links_intern.forEach(function(a){
   a.style.background = 'gray';
});

//console.log(links.map((a)=>{ return a.href;}));

