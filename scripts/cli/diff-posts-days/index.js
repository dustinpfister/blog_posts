// paths
let path = require('path'),
os = require('os')
let dirs = require( path.join(__dirname, '../paths/index.js') ).createDirObject(__dirname);
let spawn = require('child_process').spawn;

let purgeEmpty = (arr) =>{
	
	return arr.filter(function(el){
		return el != '';
	});
};

let gitLog = spawn('git', ['log', '-n', '10', '--format=%H/%cD;']);
let str = '';
gitLog.stdout.on('data', function(data){
	str += data.toString();
	//console.log(data.toString());
    //console.log( data.toString().split(';;') );
	
});

gitLog.on('exit', function(){
	
	var arr = purgeEmpty(str.trim().split(';'));
	
	arr = arr.map(function(str){
		
		return str.split('/');
		
	});
	
	console.log(arr);
	
});
