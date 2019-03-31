let klawFiles = require('./klaw.js').klawFiles,
marked = require('marked'),
cheerio = require('cheerio'),
fs = require('fs');

var report = {};

klawFiles(function (item) {

    var d = new Date(item.header.date),
    fy = d.getFullYear();

	if(!report[fy]){
		
		report[fy] = {};
		
	}
	
    /*
    fs.readFile(item.path, function (e, data) {
    if (data) {
    let html = marked(data.toString().replace(/---[\s|\S]*---/, '')),
    $ = cheerio.load(html);
    }
    })
     */

}, 

function(){
	
	
	console.log(report);
	 
});

//console.log(report);
