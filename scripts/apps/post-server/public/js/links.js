
var getInteralLinks = function(){
    // get links
    var links = document.querySelectorAll('a');

    return [].reduce.call(links, function(acc, a){
        var u = new URL(a.href);
console.log(u.host);
console.log(u.pathname);
console.log('');
        if(u.host === document.location.host){
            acc.push(a);
        }


        return acc;
    }, []);
};

var links = getInteralLinks();
console.log(links);

